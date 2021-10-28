terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.50.0"
    }
  }
  backend "s3" {
    bucket = "sinnerschradercom-tf-state-bucket"
    key = "states"
  }
}

resource "aws_s3_bucket" "sinnerschradercom-tf-state-bucket" {
  acl = "private"
  bucket = "sinnerschradercom-tf-state-bucket"
  lifecycle {
    prevent_destroy = true
  }
  versioning {
    enabled = true
  }
}

provider "aws" {
  region = "eu-central-1"
}

variable "secrets" {
  description = "JSON with secrets"
  type = object({
    OAUTH_CLIENT_ID = string,
    OAUTH_CLIENT_SECRET = string,
    HCAPTCHA_SECRET = string,
  })
  sensitive = true
}

resource "aws_ssm_parameter" "OAUTH_CLIENT_ID" {
  name  = "OAUTH_CLIENT_ID"
  type  = "SecureString"
  value = var.secrets.OAUTH_CLIENT_ID
}

resource "aws_ssm_parameter" "OAUTH_CLIENT_SECRET" {
  name  = "OAUTH_CLIENT_SECRET"
  type  = "SecureString"
  value = var.secrets.OAUTH_CLIENT_SECRET
}

resource "aws_ssm_parameter" "HCAPTCHA_SECRET" {
  name  = "HCAPTCHA_SECRET"
  type  = "SecureString"
  value = var.secrets.HCAPTCHA_SECRET
}

data "aws_ssm_parameter" "OAUTH_CLIENT_ID" {
  name = "OAUTH_CLIENT_ID"
  with_decryption = true
  depends_on = [aws_ssm_parameter.OAUTH_CLIENT_ID]
}

data "aws_ssm_parameter" "OAUTH_CLIENT_SECRET" {
  name = "OAUTH_CLIENT_SECRET"
  with_decryption = true
  depends_on = [aws_ssm_parameter.OAUTH_CLIENT_SECRET]
}

data "aws_ssm_parameter" "HCAPTCHA_SECRET" {
  name = "HCAPTCHA_SECRET"
  with_decryption = true
  depends_on = [aws_ssm_parameter.HCAPTCHA_SECRET]
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "test_policy" {
  name = "ses_policy"
  role = aws_iam_role.iam_for_lambda.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ses:SendEmail",
            "Resource": "*"
        }
    ]
}
EOF
}



data "archive_file" "cms_lambda_archive" {
  type        = "zip"
  source_dir = "${path.module}/cms-auth"
  output_path = "${path.module}/files/cms-lambda.zip"
}

data "archive_file" "emailer_lambda_archive" {
  type        = "zip"
  source_dir = "${path.module}/emailer"
  output_path = "${path.module}/files/emailer-lambda.zip"
}


resource "aws_lambda_function" "auth" {
  filename = data.archive_file.cms_lambda_archive.output_path
  function_name = "auth_lambda"
  role = aws_iam_role.iam_for_lambda.arn
  handler = "legacy_auth.auth"
  source_code_hash = data.archive_file.cms_lambda_archive.output_base64sha256

  runtime = "nodejs12.x"

  environment {
    variables = {
      OAUTH_CLIENT_ID = data.aws_ssm_parameter.OAUTH_CLIENT_ID.value
      OAUTH_CLIENT_SECRET = data.aws_ssm_parameter.OAUTH_CLIENT_SECRET.value
    }
  }

  depends_on = [data.aws_ssm_parameter.OAUTH_CLIENT_SECRET, data.aws_ssm_parameter.OAUTH_CLIENT_ID]
}

resource "aws_lambda_function" "callback" {
  filename = data.archive_file.cms_lambda_archive.output_path
  function_name = "callback_lambda"
  role = aws_iam_role.iam_for_lambda.arn
  handler = "legacy_auth.callback"
  source_code_hash = data.archive_file.cms_lambda_archive.output_base64sha256

  runtime = "nodejs12.x"

  environment {
    variables = {
      OAUTH_CLIENT_ID = data.aws_ssm_parameter.OAUTH_CLIENT_ID.value
      OAUTH_CLIENT_SECRET = data.aws_ssm_parameter.OAUTH_CLIENT_SECRET.value
    }
  }

  depends_on = [data.aws_ssm_parameter.OAUTH_CLIENT_SECRET, data.aws_ssm_parameter.OAUTH_CLIENT_ID]
}

resource "aws_lambda_function" "emailer" {
  filename = data.archive_file.emailer_lambda_archive.output_path
  function_name = "emailer_lambda"
  role = aws_iam_role.iam_for_lambda.arn
  handler = "emailer.handler"
  source_code_hash = data.archive_file.emailer_lambda_archive.output_base64sha256

  runtime = "nodejs12.x"

  environment {
    variables = {
      HCAPTCHA_SECRET = data.aws_ssm_parameter.HCAPTCHA_SECRET.value
    }
  }

  depends_on = [data.aws_ssm_parameter.HCAPTCHA_SECRET]
}




