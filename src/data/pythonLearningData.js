export const PYTHON_MODULES = [
  {
    moduleNumber: 25,
    title: 'Python for Cloud & DevOps Engineering',
    slug: 'python-for-cloud-devops',
    description: 'Learn Python from the ground up, then use it to test, automate, and deploy a small AWS service through a secure CI/CD workflow.',
    icon: 'code',
    level: 'Beginner',
    topics: [
      {
        topicNumber: 1,
        title: 'Python Foundations: Values, Collections & Control Flow',
        slug: 'python-foundations-values-collections-control-flow',
        summary: 'Work with variables, strings, numbers, booleans, lists, dictionaries, conditions, and loops by building a small cloud-resource inventory.',
        difficulty: 'Beginner',
        estimatedMinutes: 30,
        keyTakeaway: 'Choose a data type that matches the information, then use clear conditions and loops to transform collections safely.'
      },
      {
        topicNumber: 2,
        title: 'Functions, Modules, Exceptions & JSON Files',
        slug: 'python-functions-modules-exceptions-json',
        summary: 'Break programs into reusable functions, import modules, handle expected failures, and read or write structured JSON data.',
        difficulty: 'Beginner',
        estimatedMinutes: 35,
        keyTakeaway: 'Small functions with explicit inputs, outputs, and errors are easier to test and reuse in automation.'
      },
      {
        topicNumber: 3,
        title: 'Virtual Environments, HTTP APIs & Automated Testing',
        slug: 'python-venvs-http-apis-pytest',
        summary: 'Isolate dependencies, call a JSON API, validate input, and write pytest tests that check both normal and invalid behavior.',
        difficulty: 'Intermediate',
        estimatedMinutes: 40,
        keyTakeaway: 'Reproducible environments and automated tests make Python tools dependable in a developer laptop and CI pipeline.'
      },
      {
        topicNumber: 4,
        title: 'Python on AWS: boto3, Lambda & Secure CI/CD',
        slug: 'python-aws-boto3-lambda-cicd',
        summary: 'Connect Python code to AWS using boto3 and Lambda, package an API with AWS SAM, and deploy from GitHub Actions using short-lived OIDC credentials.',
        difficulty: 'Intermediate',
        estimatedMinutes: 45,
        keyTakeaway: 'Keep credentials out of code: use a narrowly scoped IAM role, GitHub OIDC, automated tests, and explicit deployment cleanup.'
      }
    ]
  }
];

export const PYTHON_NOTES = {
  'python-foundations-values-collections-control-flow': {
    simpleExplanation: 'Python programs are instructions that work with values. A string stores text, a number stores a quantity, a boolean represents true or false, and collections group related values. Conditions choose what to do; loops repeat work for each item. For example, a list of cloud resources can be filtered to find only resources marked as development.',
    coreConcepts: [
      { term: 'Variable', definition: 'A readable name bound to a value, such as region = "us-west-2". Python infers the value type at runtime.' },
      { term: 'List', definition: 'An ordered, changeable collection. Use it when position matters or you need to loop through several items.' },
      { term: 'Dictionary', definition: 'A mapping of keys to values, useful for records such as {"name": "api", "environment": "dev"}.' },
      { term: 'Condition', definition: 'An if/elif/else expression selects a code path based on a boolean test.' },
      { term: 'Loop', definition: 'A for loop processes each item in an iterable; a while loop repeats while a condition remains true.' }
    ],
    internalsExplanation: 'Python executes statements in order. A variable name refers to an object; collections can hold references to other objects. A for loop asks an iterable for its next item until it is exhausted. Indentation defines statement blocks, so consistent four-space indentation is part of the program structure.',
    cliExamples: [
      { command: 'python --version', explanation: 'Check the Python interpreter available in your environment.' },
      { command: 'python -c "resources = [{\'name\': \'api\', \'env\': \'dev\'}]; print([r for r in resources if r[\'env\'] == \'dev\'])"', explanation: 'Filter a list of resource dictionaries by environment.' }
    ],
    quickRevision: ['Strings represent text; numbers represent quantities; booleans represent true/false.', 'Lists are ordered collections; dictionaries map keys to values.', 'Use if/elif/else to branch and for loops to process collections.', 'Use descriptive names and consistent four-space indentation.'],
    securityNotes: 'Do not put passwords, API keys, or AWS credentials in source code or example files. Treat external input as untrusted.',
    costImplications: 'These exercises run locally and do not create AWS resources.'
  },
  'python-functions-modules-exceptions-json': {
    simpleExplanation: 'As a script grows, divide it into named functions that each do one job. Put reusable functions in modules, handle expected errors near the operation that can fail, and use JSON when data needs to be saved or exchanged with another program.',
    coreConcepts: [
      { term: 'Function', definition: 'A reusable block defined with def. Parameters are inputs; return sends a result back to the caller.' },
      { term: 'Module', definition: 'A Python file that can be imported so related functions and constants can be reused.' },
      { term: 'Exception', definition: 'An object describing an error. Catch only errors you can handle meaningfully, such as FileNotFoundError.' },
      { term: 'JSON', definition: 'A text format for nested objects and arrays. Python’s json module converts between JSON text and Python dictionaries/lists.' }
    ],
    internalsExplanation: 'Calling a function creates a local scope for its parameters and variables. Imports load a module once per interpreter process and bind names in the importing module. A try/except block intercepts matching exceptions; unrelated errors should normally continue upward so failures stay visible.',
    cliExamples: [
      { command: 'python -m json.tool resources.json', explanation: 'Validate and pretty-print a JSON file using Python’s standard library.' },
      { command: 'python -m compileall src', explanation: 'Check Python files for syntax errors without running the application.' }
    ],
    quickRevision: ['Functions should have a focused responsibility and return values explicitly.', 'Keep reusable code in importable modules.', 'Catch specific exceptions and provide useful error messages.', 'Use json.load/json.dump with files and json.loads/json.dumps with strings.'],
    securityNotes: 'Validate data loaded from files or APIs. Avoid logging secret values or raw credentials when reporting errors.',
    costImplications: 'The examples use the Python standard library and run locally.'
  },
  'python-venvs-http-apis-pytest': {
    simpleExplanation: 'A virtual environment gives each project its own installed packages so one project does not unexpectedly change another. An HTTP API lets programs exchange requests and JSON responses. Tests check the behavior you expect and should also cover invalid input and failures.',
    coreConcepts: [
      { term: 'Virtual environment', definition: 'An isolated Python installation for one project, created with python -m venv .venv.' },
      { term: 'Dependency', definition: 'A package an application needs. Record direct dependencies so another machine or CI runner can recreate the environment.' },
      { term: 'HTTP API', definition: 'A contract using methods such as GET and POST, status codes, headers, and request/response bodies.' },
      { term: 'pytest', definition: 'A Python test runner that discovers test_*.py files and reports assertion failures.' },
      { term: 'Mock', definition: 'A controlled substitute for an external system, allowing tests to verify behavior without making a real network call.' }
    ],
    internalsExplanation: 'A test should isolate the behavior under test from AWS, databases, and the public network. Keep input parsing and business rules in functions that can be called directly; mock adapters at the boundary. CI should run the same test command used locally.',
    cliExamples: [
      { command: 'python -m venv .venv && source .venv/bin/activate', explanation: 'Create and activate an isolated environment on Linux or macOS.' },
      { command: 'python -m pip install pytest && python -m pytest -q', explanation: 'Install the test runner and execute the project test suite.' }
    ],
    quickRevision: ['Create a per-project virtual environment.', 'Keep dependency installation reproducible.', 'Test valid input, invalid input, and error paths.', 'Mock network and cloud boundaries in unit tests.'],
    securityNotes: 'Never use real production credentials in tests. Use test doubles and environment-based configuration.',
    costImplications: 'Unit tests and local API examples do not incur AWS charges.'
  },
  'python-aws-boto3-lambda-cicd': {
    simpleExplanation: 'boto3 is the AWS SDK for Python: it lets Python code call AWS services. AWS Lambda runs a function in response to an event without you managing a server. A CI/CD workflow can test and package the code, then deploy it with an AWS role assumed through GitHub OIDC instead of storing a long-lived access key.',
    coreConcepts: [
      { term: 'boto3', definition: 'The AWS SDK for Python. It creates service clients/resources that make signed AWS API requests using the configured credential chain.' },
      { term: 'Lambda handler', definition: 'The function AWS invokes with an event and context. It returns a response in the format expected by its trigger, such as API Gateway.' },
      { term: 'IAM execution role', definition: 'The identity Lambda assumes at runtime. Grant only the actions and resources the function needs.' },
      { term: 'GitHub OIDC', definition: 'A trust relationship that lets a workflow exchange its identity token for short-lived AWS role credentials.' },
      { term: 'Infrastructure as Code', definition: 'A declarative template, such as AWS SAM, describing resources and permissions so deployments are reviewable and repeatable.' }
    ],
    internalsExplanation: 'A deployment pipeline checks out a commit, installs dependencies, runs tests, and packages an artifact. GitHub obtains an OIDC token; AWS STS validates the configured trust conditions and returns temporary credentials. The workflow deploys a versioned template, and Lambda receives a separate execution role for runtime API calls.',
    cliExamples: [
      { command: 'python -m pip install boto3', explanation: 'Install the AWS SDK in the project environment when your application needs it.' },
      { command: 'sam validate && sam build', explanation: 'Validate and package an AWS Serverless Application Model project locally.' },
      { command: 'aws sts get-caller-identity', explanation: 'Confirm which AWS identity the configured credentials represent.' }
    ],
    quickRevision: ['Use boto3 through the standard AWS credential provider chain.', 'Separate the Lambda execution role from the deployment role.', 'Prefer GitHub OIDC temporary credentials over stored access keys.', 'Review AWS costs and delete the CloudFormation stack after a deployment exercise.'],
    securityNotes: 'Never commit AWS keys. Restrict OIDC trust to the expected repository and branch/environment, and scope IAM permissions to required resources.',
    costImplications: 'The local test path is free. AWS deployment can create billable API Gateway, Lambda, DynamoDB, logs, or data-transfer usage; set a budget and delete the stack when finished.'
  }
};

export const PYTHON_LABS = Object.fromEntries(PYTHON_MODULES[0].topics.map((topic, index) => [topic.slug, {
  title: `Python Lab ${index + 1}: ${topic.title}`,
  level: topic.difficulty,
  estimatedMinutes: 25 + index * 5,
  freeTierEligible: true,
  costRiskLevel: 'LOW',
  paidAlternativeWarning: index === 3 ? 'The local simulation is free. An AWS deployment may create billable resources; review the monthly budget and cleanup steps first.' : null,
  prerequisites: index === 0 ? 'Python 3.10+ and a terminal.' : 'Python 3.10+, a terminal, and the previous Python lesson.',
  requiredPermissions: index === 3 ? 'For optional AWS deployment, use a dedicated IAM role scoped to the project resources. Local exercises need no AWS permissions.' : 'None. Local exercise only.',
  cleanupGuide: index === 3 ? 'For optional AWS deployment, delete the project CloudFormation stack and verify that its API, Lambda, DynamoDB table, and log groups are removed. Local files can be deleted with rm -rf .venv .aws-learning-build.' : 'No cloud resources are created. Remove the exercise directory when finished.',
  safeSimulationScript: `echo "Python learning lab ${index + 1}: ${topic.title}"\necho "Run the steps locally; no cloud resources are created by this simulation."`,
  steps: [
    {
      stepNumber: 1,
      title: index === 0 ? 'Create a resource inventory' : index === 1 ? 'Split logic into a function' : index === 2 ? 'Create an isolated test environment' : 'Review the AWS deployment boundary',
      description: index === 0 ? 'Create a small list of dictionaries representing cloud resources, then filter it by environment.' : index === 1 ? 'Write a function that reads JSON and handles a missing file with a clear message.' : index === 2 ? 'Create a virtual environment and add a test that checks both expected and invalid input.' : 'Inspect the sample serverless project and identify the runtime role, deployment role, and resources that may incur cost.',
      consoleInstruction: index === 3 ? 'Review the project files locally first. Configure AWS only for an optional deployment, use a dedicated role, and verify your budget before running deploy.' : 'Open a terminal in a new exercise folder and create the Python file using your editor.',
      cliCommand: index === 0 ? `python - <<'PY'\nresources = [\n    {"name": "api", "environment": "dev"},\n    {"name": "database", "environment": "prod"},\n]\nfor resource in resources:\n    if resource["environment"] == "dev":\n        print(resource["name"])\nPY` : index === 1 ? `python - <<'PY'\nimport json\nfrom pathlib import Path\n\ndef load_resources(path):\n    try:\n        return json.loads(Path(path).read_text())\n    except FileNotFoundError:\n        return []\n\nprint(load_resources("resources.json"))\nPY` : index === 2 ? 'python -m venv .venv && source .venv/bin/activate && python -m pip install pytest && python -m pytest -q' : 'python -m pytest -q && sam validate && sam build',
      expectedOutput: index === 0 ? 'api' : index === 1 ? '[]' : index === 2 ? 'The test run completes and reports the test result.' : 'Tests pass; SAM validates and builds the template without deploying AWS resources.',
      verificationTip: index === 0 ? 'Change one resource environment to prod and confirm it is no longer printed.' : index === 1 ? 'Create a valid JSON file and confirm the function returns its contents.' : index === 2 ? 'Add one failing assertion deliberately, observe the failure, then restore the expected assertion.' : 'The build command packages locally; do not run sam deploy until the account, role, and potential costs are understood.',
      troubleshooting: 'Check the active interpreter with python --version, confirm the exercise directory is correct, and read the complete error message before changing code.'
    }
  ]
}]));

export const PYTHON_PROJECT = {
  id: 'python-aws-devops-project',
  moduleNumber: 25,
  moduleTitle: 'Python for Cloud & DevOps Engineering',
  title: 'Serverless Task API: Python, AWS & Secure CI/CD',
  track: 'Python + AWS + DevOps',
  trackId: 'python',
  level: 'Intermediate',
  estimatedHours: 6,
  summary: 'Build a small Python task API, test it locally with pytest, package it with AWS SAM, and use GitHub Actions with OIDC to deploy an optional Lambda + API Gateway + DynamoDB stack. Start locally; deploy only after reviewing permissions and cost risks.',
  skillsLearned: ['Python functions and type-aware input validation', 'pytest unit testing', 'AWS Lambda and API Gateway', 'DynamoDB access with boto3', 'AWS SAM infrastructure as code', 'GitHub Actions CI/CD', 'OIDC and temporary IAM credentials', 'CloudFormation cleanup'],
  prerequisites: 'Python 3.10+, Git, and Docker optional for local container testing. AWS CLI, AWS SAM CLI, and an AWS account are only required for optional deployment.',
  topicsCovered: PYTHON_MODULES[0].topics.map(topic => ({
    topicNumber: topic.topicNumber,
    topicTitle: topic.title,
    slug: topic.slug,
    handsOnObjective: topic.summary,
    commands: topic.topicNumber === 4 ? 'python -m pytest -q\nsam validate\nsam build' : 'python -m pytest -q',
    practicalExercise: topic.keyTakeaway
  })),
  architectureSteps: [
    '1. Developer pushes Python source and tests to GitHub.',
    '2. GitHub Actions installs dependencies, runs pytest, and builds the SAM template.',
    '3. For an approved deployment, GitHub OIDC exchanges a workflow token for short-lived AWS role credentials.',
    '4. AWS SAM creates API Gateway, Lambda, and a DynamoDB table from the reviewed template.',
    '5. The Lambda handler validates API input and uses boto3 with its separate runtime execution role.',
    '6. The learner deletes the CloudFormation stack and verifies project resources are removed.'
  ],
  codeFiles: [
    {
      filename: 'src/app.py',
      language: 'python',
      description: 'Small Lambda handler with input validation and DynamoDB-backed task creation/listing.',
      content: `import json
import os
import uuid

import boto3


def response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(body),
    }


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    if method == "GET":
      table = boto3.resource("dynamodb").Table(os.environ["TASKS_TABLE"])
        result = table.scan(Limit=100)
        return response(200, {"tasks": result.get("Items", [])})

    if method == "POST":
        try:
            payload = json.loads(event.get("body") or "{}")
        except json.JSONDecodeError:
            return response(400, {"message": "Request body must be valid JSON."})
        title = payload.get("title")
        if not isinstance(title, str) or not title.strip():
            return response(400, {"message": "title must be a non-empty string."})
        task = {"id": str(uuid.uuid4()), "title": title.strip(), "done": False}
        table = boto3.resource("dynamodb").Table(os.environ["TASKS_TABLE"])
        table.put_item(Item=task)
        return response(201, task)

    return response(405, {"message": "Method not allowed."})`
    },
    {
      filename: 'tests/test_handler.py',
      language: 'python',
      description: 'Unit test for invalid JSON that runs without AWS credentials or network access.',
      content: `import json
from unittest.mock import patch

import src.app as app


def test_post_rejects_invalid_json():
    with patch.object(app.boto3, "resource") as resource:
        result = app.handler({
            "requestContext": {"http": {"method": "POST"}},
            "body": "{invalid",
        }, None)

    assert result["statusCode"] == 400
    assert json.loads(result["body"])["message"] == "Request body must be valid JSON."
    resource.assert_not_called()`
    },
    {
      filename: 'requirements.txt',
      language: 'text',
      description: 'Runtime dependency for AWS SDK access.',
      content: 'boto3>=1.34,<2'
    },
    {
      filename: 'requirements-dev.txt',
      language: 'text',
      description: 'Development and test dependencies.',
      content: '-r requirements.txt\npytest>=8,<9'
    },
    {
      filename: 'template.yaml',
      language: 'yaml',
      description: 'AWS SAM template for the API, Lambda role, and on-demand DynamoDB table.',
      content: `Transform: AWS::Serverless-2016-10-31
Resources:
  TasksTable:
    Type: AWS::DynamoDB::Table
    Properties:
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
  TasksFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: .
      Handler: src.app.handler
      Runtime: python3.12
      Environment:
        Variables:
          TASKS_TABLE: !Ref TasksTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref TasksTable
      Events:
        TasksApi:
          Type: HttpApi
          Properties:
            Path: /tasks
            Method: ANY
Outputs:
  ApiUrl:
    Value: !Sub https://\${ServerlessHttpApi}.execute-api.\${AWS::Region}.amazonaws.com/tasks`
    },
    {
      filename: '.github/workflows/deploy.yml',
      language: 'yaml',
      description: 'Test and build on every push; AWS deployment is restricted to main and assumes a short-lived OIDC role.',
      content: `name: Python CI and Deploy
on:
  push:
    branches: [main]
  pull_request:
permissions:
  contents: read
jobs:
  test-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: python -m pip install -r requirements-dev.txt
      - run: python -m pytest -q
      - run: sam validate
      - run: sam build
  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main' && vars.ENABLE_AWS_DEPLOY == 'true'
    needs: test-build
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: \${{ vars.AWS_REGION }}
      - uses: aws-actions/setup-sam@v2
      - run: sam deploy --stack-name python-task-api --resolve-s3 --capabilities CAPABILITY_IAM --no-confirm-changeset`
    }
  ],
  verification: 'Locally run python -m pytest -q, sam validate, and sam build. For an approved AWS deployment, call the returned API URL with GET /tasks and POST /tasks using a JSON title, then inspect the CloudFormation stack before cleanup.',
  freeTierSafety: 'The local test and build path creates no AWS resources. AWS deployment may incur charges for API Gateway, Lambda, DynamoDB, and logs even when usage is low; free-tier eligibility and rates vary by account and date. Set a budget alert first and do not deploy in a production account.',
  cleanupCommands: 'aws cloudformation delete-stack --stack-name python-task-api && aws cloudformation wait stack-delete-complete --stack-name python-task-api',
  cleanupGuide: 'Delete the CloudFormation stack with the provided command, wait for deletion to complete, then verify the stack is gone and inspect API Gateway, Lambda, DynamoDB, and CloudWatch Logs for leftover project resources.'
};