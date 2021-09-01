terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.50.0"
    }
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


data "archive_file" "lambda_archive" {
  type        = "zip"
  source_dir = "${path.module}/lambda"
  output_path = "${path.module}/files/lambda.zip"
}


resource "aws_lambda_function" "auth" {
  filename = data.archive_file.lambda_archive.output_path
  function_name = "auth_lambda"
  role = aws_iam_role.iam_for_lambda.arn
  handler = "legacy_auth.auth"
  source_code_hash = data.archive_file.lambda_archive.output_base64sha256

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
  filename = data.archive_file.lambda_archive.output_path
  function_name = "callback_lambda"
  role = aws_iam_role.iam_for_lambda.arn
  handler = "legacy_auth.callback"
  source_code_hash = data.archive_file.lambda_archive.output_base64sha256

  runtime = "nodejs12.x"

  environment {
    variables = {
      OAUTH_CLIENT_ID = data.aws_ssm_parameter.OAUTH_CLIENT_ID.value
      OAUTH_CLIENT_SECRET = data.aws_ssm_parameter.OAUTH_CLIENT_SECRET.value
    }
  }

  depends_on = [data.aws_ssm_parameter.OAUTH_CLIENT_SECRET, data.aws_ssm_parameter.OAUTH_CLIENT_ID]
}



