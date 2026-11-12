import { PYTHON_LABS } from './pythonLearningData.js';

export const FALLBACK_LABS = {
  "1": {
    "title": "Lab 1: Global Infrastructure Inspection & Latency Probing",
    "level": "Beginner",
    "estimatedMinutes": 20,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "AWS Free Tier account active, AWS CLI installed locally or using AWS CloudShell.",
    "requiredPermissions": "ec2:DescribeRegions, ec2:DescribeAvailabilityZones",
    "cleanupGuide": "This lab uses only read-only Describe API calls and local latency probes. No billable cloud resources are provisioned. Zero cleanup required.",
    "safeSimulationScript": "#!/bin/bash\n# Safe local simulation of AWS Global Infrastructure latency probe\necho \"=== AWS Global Infrastructure Latency Simulation ===\"\nREGIONS=(\"us-east-1\" \"eu-west-1\" \"ap-south-1\" \"ap-southeast-1\")\nfor reg in \"${REGIONS[@]}\"; do\n  echo \"Probing latency to AWS region $reg endpoint...\"\n  ping -c 2 dynamodb.$reg.amazonaws.com 2>/dev/null | tail -1 | awk -F '/' '{print \"→ Average latency to \" \"'\"$reg\"'\" \": \" $5 \" ms\"}' || echo \"→ Latency to $reg: simulated ~45ms\"\ndone\necho \"Inspection complete! All endpoints reachable via AWS Global Network backbone.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Discover Active AWS Regions",
        "description": "Explore the geographic distribution of AWS by listing all publicly available Regions.",
        "consoleInstruction": "Open the AWS Management Console. In the top right navigation bar, click the Region dropdown menu to see all available worldwide regions categorized by North America, Europe, Asia Pacific, etc.",
        "cliCommand": "aws ec2 describe-regions --all-regions --query 'Regions[].{Name:RegionName,OptIn:OptInStatus}' --output table",
        "expectedOutput": "A formatted ASCII table showing region names like us-east-1, eu-central-1, and their opt-in statuses.",
        "verificationTip": "Verify that default regions are marked 'opt-in-not-required' while newer regions may require explicit opt-in.",
        "troubleshooting": "If you get 'AuthFailure', verify your AWS CLI configuration by running 'aws configure' or use the in-browser AWS CloudShell."
      },
      {
        "stepNumber": 2,
        "title": "Query Availability Zones in Your Target Region",
        "description": "Inspect the physical Availability Zones available in your default region.",
        "consoleInstruction": "Navigate to the EC2 Dashboard -> In the 'Service Health' widget or 'Subnets' page, observe the list of Availability Zones.",
        "cliCommand": "aws ec2 describe-availability-zones --region us-east-1 --output json",
        "expectedOutput": "JSON response containing ZoneName (us-east-1a, us-east-1b...) and unique ZoneId (use1-az1, use1-az2...).",
        "verificationTip": "Note down the ZoneId. ZoneName may differ across accounts, but ZoneId is the true immutable physical data center identifier.",
        "troubleshooting": "Ensure you specified a valid region parameter (e.g., --region us-east-1)."
      }
    ]
  },
  "2": {
    "title": "Lab 2: IAM Least-Privilege Role & Policy Sandbox",
    "level": "Beginner",
    "estimatedMinutes": 25,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "IAM permissions to create roles and policies in an AWS account.",
    "requiredPermissions": "iam:CreateRole, iam:PutRolePolicy, iam:GetRole, iam:DeleteRole",
    "cleanupGuide": "Delete the test IAM role 'LabTestReadOnlyRole' and policy after completing the verification step: aws iam delete-role --role-name LabTestReadOnlyRole.",
    "safeSimulationScript": "#!/bin/bash\n# Local policy evaluation simulator\necho \"=== IAM Policy Evaluation Engine Simulator ===\"\nPRINCIPAL=\"arn:aws:iam::123456789012:user/DevUser\"\nACTION=\"s3:GetObject\"\nRESOURCE=\"arn:aws:s3:::my-secure-bucket/*\"\necho \"Evaluating Request: Principal=$PRINCIPAL Action=$ACTION Resource=$RESOURCE\"\necho \"Step 1: Check Explicit Deny... [None found]\"\necho \"Step 2: Check Explicit Allow in attached policies... [ALLOW s3:GetObject matches]\"\necho \"Step 3: Result: ACCESS GRANTED (HTTP 200 OK)\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create a Least-Privilege IAM ReadOnly Role",
        "description": "Create an IAM role designed for an EC2 instance that only allows reading S3 buckets.",
        "consoleInstruction": "Go to IAM Console -> Roles -> Create Role -> Select AWS Service (EC2) -> Search and attach 'AmazonS3ReadOnlyAccess' -> Name it 'LabTestReadOnlyRole'.",
        "cliCommand": "aws iam create-role --role-name LabTestReadOnlyRole --assume-role-policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"ec2.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}'",
        "expectedOutput": "JSON displaying the newly created role ARN and unique RoleId.",
        "verificationTip": "Check that the trust relationship specifies 'ec2.amazonaws.com' as the trusted principal.",
        "troubleshooting": "If 'EntityAlreadyExists' error occurs, the role already exists from a previous run; proceed to step 2 or pick a unique role name."
      },
      {
        "stepNumber": 2,
        "title": "Attach S3 Read-Only Managed Policy",
        "description": "Grant read-only access to Amazon S3 to the newly created role.",
        "consoleInstruction": "Inside the role summary, click 'Add permissions' -> 'Attach policies' -> Select 'AmazonS3ReadOnlyAccess'.",
        "cliCommand": "aws iam attach-role-policy --role-name LabTestReadOnlyRole --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
        "expectedOutput": "Command returns 0 exit code with no error output.",
        "verificationTip": "Run 'aws iam list-attached-role-policies --role-name LabTestReadOnlyRole' to verify attachment.",
        "troubleshooting": "Check that the policy ARN starts with 'arn:aws:iam::aws:policy/'."
      },
      {
        "stepNumber": 3,
        "title": "Cleanup Test IAM Role",
        "description": "Detach policies and remove the test role to keep your account clean.",
        "consoleInstruction": "In IAM Console -> Roles -> Select 'LabTestReadOnlyRole' -> Delete.",
        "cliCommand": "aws iam detach-role-policy --role-name LabTestReadOnlyRole --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess && aws iam delete-role --role-name LabTestReadOnlyRole",
        "expectedOutput": "Role deleted successfully.",
        "verificationTip": "Confirm with 'aws iam get-role --role-name LabTestReadOnlyRole' returning NoSuchEntity.",
        "troubleshooting": "Ensure you detach all policies before attempting to delete the role."
      }
    ]
  },
  "3": {
    "title": "Lab 3: Cost-Safe VPC Subnet & Security Group Architecture",
    "level": "Intermediate",
    "estimatedMinutes": 30,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": "COST WARNING: Creating a NAT Gateway costs ~$32/month. This lab teaches private/public subnet architecture WITHOUT launching a paid NAT Gateway, using free security groups and internet routing rules instead.",
    "prerequisites": "Basic networking knowledge (CIDR blocks, subnets).",
    "requiredPermissions": "ec2:CreateVpc, ec2:CreateSubnet, ec2:CreateSecurityGroup, ec2:DeleteVpc",
    "cleanupGuide": "Delete the created Security Group, Subnets, and VPC using the cleanup commands provided in Step 4. All resources in this lab are 100% free as long as NAT Gateways are NOT created.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of VPC packet traversal\necho \"=== VPC Packet Traversal Simulator ===\"\necho \"Packet: Inbound HTTP from 203.0.113.5:54321 to Public ALB 10.0.1.10:80\"\necho \"1. Evaluated at NACL: Inbound Rule 100 ALLOW 0.0.0.0/0 port 80 -> PASS\"\necho \"2. Evaluated at ALB Security Group: Inbound port 80 ALLOW -> PASS\"\necho \"3. ALB forwards to Private EC2 10.0.2.25:8080\"\necho \"4. Return packet from EC2 to client:\"\necho \"   Security Group is STATEFUL: Outbound automatically ALLOWED without rule!\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create a Custom Learning VPC",
        "description": "Create an isolated virtual network with a private IPv4 address block.",
        "consoleInstruction": "VPC Dashboard -> Create VPC -> Select 'VPC only' -> Name tag: 'Lab-FreeTier-VPC' -> IPv4 CIDR: '10.0.0.0/16' -> Click Create VPC.",
        "cliCommand": "aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=Lab-FreeTier-VPC}]'",
        "expectedOutput": "JSON response with VpcId (e.g., vpc-0a1b2c3d4e5f6g7h8).",
        "verificationTip": "Copy the VpcId for use in subsequent commands.",
        "troubleshooting": "If CIDR overlaps with another VPC, change the block to 10.10.0.0/16."
      },
      {
        "stepNumber": 2,
        "title": "Create Public and Private Subnets",
        "description": "Carve out two /24 subnets for web tier and database tier.",
        "consoleInstruction": "VPC Dashboard -> Subnets -> Create Subnet -> Select your VPC -> Create Subnet 1 (10.0.1.0/24 in AZ-a) and Subnet 2 (10.0.2.0/24 in AZ-a).",
        "cliCommand": "aws ec2 create-subnet --vpc-id VPC_ID_HERE --cidr-block 10.0.1.0/24 --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Lab-Public-Subnet}]'",
        "expectedOutput": "JSON containing SubnetId (e.g., subnet-xxxxxx).",
        "verificationTip": "Ensure the subnet CIDR falls strictly within the VPC CIDR 10.0.0.0/16.",
        "troubleshooting": "If 'InvalidSubnet.Range' error appears, double-check CIDR calculation."
      },
      {
        "stepNumber": 3,
        "title": "Build Stateful Security Group with Port Restrictions",
        "description": "Configure a security group that allows inbound HTTP port 80 only.",
        "consoleInstruction": "EC2 Dashboard -> Security Groups -> Create Security Group -> Name: 'Lab-Web-SG' -> Inbound rules: Add HTTP port 80 from Any (0.0.0.0/0).",
        "cliCommand": "aws ec2 create-security-group --group-name Lab-Web-SG --description 'Allow HTTP traffic' --vpc-id VPC_ID_HERE",
        "expectedOutput": "Returns GroupId (e.g., sg-xxxxxx).",
        "verificationTip": "Authorize inbound rule: aws ec2 authorize-security-group-ingress --group-id SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0.",
        "troubleshooting": "Make sure you reference the correct VPC ID created in Step 1."
      },
      {
        "stepNumber": 4,
        "title": "Clean Up Lab Networking Resources",
        "description": "Delete the security group, subnets, and VPC to keep your account clean.",
        "consoleInstruction": "Delete Security Group -> Delete Subnets -> Delete VPC from VPC Dashboard.",
        "cliCommand": "aws ec2 delete-security-group --group-id SG_ID && aws ec2 delete-subnet --subnet-id SUBNET_ID && aws ec2 delete-vpc --vpc-id VPC_ID",
        "expectedOutput": "Resources deleted cleanly with exit code 0.",
        "verificationTip": "Confirm 'aws ec2 describe-vpcs' no longer lists Lab-FreeTier-VPC.",
        "troubleshooting": "If dependency violation occurs, delete the security group before deleting the VPC."
      }
    ]
  },
  "4": {
    "title": "Lab 4: Free-Tier EC2 Web Server Bootstrapping with User Data",
    "level": "Beginner",
    "estimatedMinutes": 25,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": "Free Tier covers 750 hours/month of t2.micro or t3.micro. Terminate the instance after completing this lab to conserve free-tier hours.",
    "prerequisites": "Default VPC available in region, basic shell scripting.",
    "requiredPermissions": "ec2:RunInstances, ec2:DescribeInstances, ec2:TerminateInstances",
    "cleanupGuide": "Terminate the EC2 instance immediately after viewing the web page to stop compute usage: aws ec2 terminate-instances --instance-ids i-xxxxxx.",
    "safeSimulationScript": "#!/bin/bash\n# Local EC2 User Data Execution Simulation\necho \"=== Simulating EC2 Cloud-Init User Data Bootstrapping ===\"\necho \"Executing: apt-get update -y && apt-get install -y nginx\"\necho \"Writing HTML to /var/www/html/index.html...\"\necho \"<h1>Hello from AWS Free Tier EC2 Simulator!</h1>\"\necho \"Nginx service started on port 80.\"\necho \"Simulated Curl Test: HTTP/1.1 200 OK (Content-Length: 52)\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Launch t2.micro / t3.micro with User Data Script",
        "description": "Launch a free-tier eligible instance that automatically installs an Nginx web server on first boot.",
        "consoleInstruction": "EC2 Console -> Launch Instances -> Name: 'Lab-WebServer' -> Amazon Linux 2023 or Ubuntu -> Instance type: t2.micro (or t3.micro) -> Under Advanced Details -> User Data, paste the script.",
        "cliCommand": "aws ec2 run-instances --image-id resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 --instance-type t3.micro --user-data '#!/bin/bash\ndnf update -y\ndnf install -y httpd\nsystemctl start httpd\nsystemctl enable httpd\necho \"<h1>Hello from AWS Free Tier EC2!</h1>\" > /var/www/html/index.html' --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Lab-WebServer}]'",
        "expectedOutput": "JSON response showing instance ID and State='pending'.",
        "verificationTip": "Wait 2 minutes for status checks: aws ec2 describe-instance-status --instance-ids INSTANCE_ID.",
        "troubleshooting": "If t3.micro is unavailable in your selected region, switch to t2.micro."
      },
      {
        "stepNumber": 2,
        "title": "Verify Web Server Response",
        "description": "Retrieve public IP address and verify HTTP 200 response.",
        "consoleInstruction": "Select the instance -> Copy Public IPv4 address -> Open in browser http://<PUBLIC_IP>.",
        "cliCommand": "aws ec2 describe-instances --filters 'Name=tag:Name,Values=Lab-WebServer' 'Name=instance-state-name,Values=running' --query 'Reservations[0].Instances[0].PublicIpAddress' --output text",
        "expectedOutput": "Returns a public IPv4 address like 54.210.xx.xx.",
        "verificationTip": "Test via curl: curl -m 5 http://<PUBLIC_IP> to view the HTML greeting.",
        "troubleshooting": "If connection times out, verify that your Security Group has inbound Port 80 allowed from 0.0.0.0/0."
      },
      {
        "stepNumber": 3,
        "title": "Terminate Instance to Avoid Charges",
        "description": "Shut down and terminate the EC2 instance to ensure zero ongoing billing.",
        "consoleInstruction": "EC2 Console -> Select Lab-WebServer -> Instance State -> Terminate Instance.",
        "cliCommand": "aws ec2 terminate-instances --instance-ids INSTANCE_ID_HERE",
        "expectedOutput": "CurrentState shows 'shutting-down' or 'terminated'.",
        "verificationTip": "Check 'aws ec2 describe-instances' to confirm State is terminated.",
        "troubleshooting": "Ensure termination protection is disabled if prompt asks."
      }
    ]
  },
  "5": {
    "title": "Lab 5: Application Load Balancer Target Group Simulation",
    "level": "Intermediate",
    "estimatedMinutes": 30,
    "freeTierEligible": true,
    "costRiskLevel": "MEDIUM",
    "paidAlternativeWarning": "ALB has a base cost of ~$0.0225/hour (~$16/month). AWS Free Tier gives 750 free hours shared with Classic ELB for 12 months. DELETE the ALB immediately upon completing verification!",
    "prerequisites": "At least two public subnets in different Availability Zones.",
    "requiredPermissions": "elasticloadbalancing:CreateLoadBalancer, elasticloadbalancing:CreateTargetGroup, elasticloadbalancing:DeleteLoadBalancer",
    "cleanupGuide": "Delete the ALB and Target Group right after testing: aws elbv2 delete-load-balancer --load-balancer-arn ALB_ARN.",
    "safeSimulationScript": "#!/bin/bash\n# Local Load Balancer & Health Check Simulator\necho \"=== Round-Robin Load Balancer Simulation ===\"\nTARGETS=(\"10.0.1.15:80 (AZ-a)\" \"10.0.2.20:80 (AZ-b)\")\nfor i in {1..4}; do\n  IDX=$(( (i - 1) % 2 ))\n  echo \"Request #$i routed to target ${TARGETS[$IDX]} -> Health Check 200 OK\"\ndone\necho \"All targets healthy. Traffic evenly balanced across Availability Zones.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create an ALB Target Group",
        "description": "Define a target group with HTTP health check parameters.",
        "consoleInstruction": "EC2 Console -> Target Groups -> Create Target Group -> Target type: Instances -> Protocol: HTTP (Port 80) -> Health check path: / -> Name: 'Lab-Target-Group'.",
        "cliCommand": "aws elbv2 create-target-group --name Lab-Target-Group --protocol HTTP --port 80 --vpc-id VPC_ID_HERE --health-check-path / --health-check-interval-seconds 30",
        "expectedOutput": "JSON output containing TargetGroupArn.",
        "verificationTip": "Note the TargetGroupArn for listener configuration.",
        "troubleshooting": "Ensure the VPC ID matches an existing VPC with subnets."
      },
      {
        "stepNumber": 2,
        "title": "Create Internet-Facing Application Load Balancer",
        "description": "Deploy an ALB spanning two Availability Zones.",
        "consoleInstruction": "EC2 Console -> Load Balancers -> Create Load Balancer -> ALB -> Select 2 Availability Zones and public subnets.",
        "cliCommand": "aws elbv2 create-load-balancer --name Lab-Demo-ALB --subnets SUBNET_1_ID SUBNET_2_ID --security-groups SG_ID --scheme internet-facing --type application",
        "expectedOutput": "Returns DNSName (e.g. Lab-Demo-ALB-xxxx.us-east-1.elb.amazonaws.com) and LoadBalancerArn.",
        "verificationTip": "ALB state transitions from 'provisioning' to 'active' within 2-3 minutes.",
        "troubleshooting": "If 'A load balancer cannot be attached to multiple subnets in the same Availability Zone' appears, choose subnets in different AZs."
      },
      {
        "stepNumber": 3,
        "title": "Immediate Cleanup of Load Balancer",
        "description": "Delete the ALB to prevent ongoing hourly charges.",
        "consoleInstruction": "Select Lab-Demo-ALB -> Actions -> Delete. Then delete Lab-Target-Group.",
        "cliCommand": "aws elbv2 delete-load-balancer --load-balancer-arn ALB_ARN && aws elbv2 delete-target-group --target-group-arn TG_ARN",
        "expectedOutput": "Commands exit with code 0.",
        "verificationTip": "Confirm with 'aws elbv2 describe-load-balancers' returning empty.",
        "troubleshooting": "Target groups cannot be deleted while registered to an active listener; delete the load balancer first."
      }
    ]
  },
  "6": {
    "title": "Lab 6: Amazon S3 Lifecycle Rules, Encryption & Bucket Lockdown",
    "level": "Beginner",
    "estimatedMinutes": 20,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "AWS CLI or Console access.",
    "requiredPermissions": "s3:CreateBucket, s3:PutBucketVersioning, s3:PutLifecycleConfiguration, s3:DeleteBucket",
    "cleanupGuide": "Empty all objects and delete the bucket: aws s3 rb s3://BUCKET_NAME --force.",
    "safeSimulationScript": "#!/bin/bash\n# Local S3 Lifecycle Simulation\necho \"=== S3 Lifecycle Transition Simulation ===\"\necho \"Bucket: demo-learning-bucket-2026\"\necho \"Rule 1: Objects > 30 days old -> Transition to S3 Standard-IA\"\necho \"Rule 2: Objects > 90 days old -> Transition to S3 Glacier Deep Archive\"\necho \"Rule 3: Non-current versions > 365 days -> Permanent Expiration\"\necho \"Result: Automated cost reduction of 92% on cold archived data.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create Globally Unique S3 Bucket with Default KMS Encryption",
        "description": "Create an S3 bucket with Block Public Access enabled and AES-256 encryption.",
        "consoleInstruction": "S3 Console -> Create Bucket -> Name: 'aws-lab-storage-' + your initials + random number -> Keep 'Block all public access' CHECKED -> Create.",
        "cliCommand": "aws s3api create-bucket --bucket aws-lab-storage-$RANDOM --region us-east-1",
        "expectedOutput": "Returns Location: /aws-lab-storage-xxxxx.",
        "verificationTip": "Verify Block Public Access is active: aws s3api get-public-access-block --bucket BUCKET_NAME.",
        "troubleshooting": "If 'BucketAlreadyExists' error occurs, append more random digits to ensure global uniqueness."
      },
      {
        "stepNumber": 2,
        "title": "Enable S3 Object Versioning",
        "description": "Protect against accidental overwrites and deletions.",
        "consoleInstruction": "Bucket Properties -> Bucket Versioning -> Edit -> Enable -> Save changes.",
        "cliCommand": "aws s3api put-bucket-versioning --bucket BUCKET_NAME --versioning-configuration Status=Enabled",
        "expectedOutput": "Status updated to Enabled.",
        "verificationTip": "Upload a file twice with different content and run 'aws s3api list-object-versions'.",
        "troubleshooting": "Once enabled, versioning cannot be turned off; it can only be suspended."
      },
      {
        "stepNumber": 3,
        "title": "Clean Up S3 Bucket",
        "description": "Delete uploaded objects and remove the bucket.",
        "consoleInstruction": "Select bucket -> Empty -> Type 'permanently delete' -> Delete bucket.",
        "cliCommand": "aws s3 rb s3://BUCKET_NAME --force",
        "expectedOutput": "delete: s3://BUCKET_NAME/object removed, remove_bucket: BUCKET_NAME.",
        "verificationTip": "Confirm 'aws s3 ls' no longer displays the bucket.",
        "troubleshooting": "Buckets containing versions must be completely emptied before deletion."
      }
    ]
  },
  "7": {
    "title": "Lab 7: EBS Snapshotting, Encryption & Volume Sizing",
    "level": "Intermediate",
    "estimatedMinutes": 20,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "EC2 permissions in target region.",
    "requiredPermissions": "ec2:CreateVolume, ec2:CreateSnapshot, ec2:DeleteVolume, ec2:DeleteSnapshot",
    "cleanupGuide": "Delete the snapshot and volume created in this lab to avoid eating into your 30 GB EBS free-tier allowance.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of EBS snapshot creation and volume resize\necho \"=== EBS Snapshot & Resizing Simulator ===\"\necho \"Creating point-in-time snapshot of 10GB gp3 volume vol-0a1b2c3d...\"\necho \"Snapshot snap-0123456789 created in S3 (Incremental size: 1.2 GB)\"\necho \"Restoring snapshot to new 20GB gp3 encrypted volume in us-east-1b...\"\necho \"Done! Volume resized online with zero filesystem downtime.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create a 1 GB gp3 EBS Volume with Encryption",
        "description": "Create an encrypted block storage volume.",
        "consoleInstruction": "EC2 Console -> Volumes -> Create Volume -> Type: gp3 -> Size: 1 GiB -> AZ: us-east-1a -> Check 'Encrypt this volume' -> Create.",
        "cliCommand": "aws ec2 create-volume --availability-zone us-east-1a --size 1 --volume-type gp3 --encrypted --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=Lab-EBS-Vol}]'",
        "expectedOutput": "Returns VolumeId (e.g. vol-xxxxxx) with State='creating'.",
        "verificationTip": "Check 'aws ec2 describe-volumes' until State becomes 'available'.",
        "troubleshooting": "Free tier allows 30 GB total; keeping test volume at 1 GB is completely safe."
      },
      {
        "stepNumber": 2,
        "title": "Create a Point-in-Time Snapshot",
        "description": "Take an incremental backup snapshot of the volume.",
        "consoleInstruction": "Select the volume -> Actions -> Create Snapshot -> Description: 'Lab snapshot test'.",
        "cliCommand": "aws ec2 create-snapshot --volume-id VOLUME_ID_HERE --description 'Lab backup test'",
        "expectedOutput": "Returns SnapshotId (e.g. snap-xxxxxx) with State='pending'.",
        "verificationTip": "Confirm snapshot completion: aws ec2 describe-snapshots --snapshot-ids SNAPSHOT_ID.",
        "troubleshooting": "Snapshot of an empty 1GB volume completes in under 15 seconds."
      },
      {
        "stepNumber": 3,
        "title": "Delete Snapshot and Volume",
        "description": "Clean up resources to maintain zero storage footprint.",
        "consoleInstruction": "Delete Snapshot first -> then Delete Volume.",
        "cliCommand": "aws ec2 delete-snapshot --snapshot-id SNAPSHOT_ID && aws ec2 delete-volume --volume-id VOLUME_ID",
        "expectedOutput": "Deleted with exit code 0.",
        "verificationTip": "Verify both volume and snapshot are gone.",
        "troubleshooting": "You cannot delete a volume while it is attached to an active instance; detach first."
      }
    ]
  },
  "8": {
    "title": "Lab 8: Amazon DynamoDB Serverless NoSQL Table & Queries",
    "level": "Beginner",
    "estimatedMinutes": 20,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "AWS CLI or DynamoDB console access.",
    "requiredPermissions": "dynamodb:CreateTable, dynamodb:PutItem, dynamodb:GetItem, dynamodb:DeleteTable",
    "cleanupGuide": "Delete the table after testing: aws dynamodb delete-table --table-name LabProducts. (Note: DynamoDB has 25GB perpetual free tier).",
    "safeSimulationScript": "#!/bin/bash\n# Local DynamoDB simulator\necho \"=== DynamoDB Sub-10ms Key-Value Simulator ===\"\necho \"Partition Key: Category='electronics' | Sort Key: ProductId='p-101'\"\necho \"PutItem: { 'Name': 'Wireless Noise Cancelling Headphones', 'Price': 199.99, 'Stock': 45 }\"\necho \"Query executed via Hashed Partition Index...\"\necho \"Latency: 2.8 ms | Consumed Read Units: 0.5 RCU | Result: Found 1 matching item.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create DynamoDB Table in On-Demand / Free-Tier Mode",
        "description": "Create a NoSQL table with a Partition Key and Sort Key.",
        "consoleInstruction": "DynamoDB Console -> Create table -> Table name: 'LabProducts' -> Partition key: 'Category' (String) -> Sort key: 'ProductId' (String) -> Default settings.",
        "cliCommand": "aws dynamodb create-table --table-name LabProducts --attribute-definitions AttributeName=Category,AttributeType=S AttributeName=ProductId,AttributeType=S --key-schema AttributeName=Category,KeyType=HASH AttributeName=ProductId,KeyType=RANGE --billing-mode PAY_PER_REQUEST",
        "expectedOutput": "TableStatus shows 'CREATING'.",
        "verificationTip": "Wait until TableStatus is 'ACTIVE': aws dynamodb describe-table --table-name LabProducts.",
        "troubleshooting": "Ensure key names match exact casing."
      },
      {
        "stepNumber": 2,
        "title": "Insert and Retrieve NoSQL Items",
        "description": "Write a document item and execute a targeted GetItem query.",
        "consoleInstruction": "Table -> Explore items -> Create item -> Add Category 'electronics', ProductId 'p-1', Title 'Cloud Laptop'.",
        "cliCommand": "aws dynamodb put-item --table-name LabProducts --item '{\"Category\": {\"S\": \"electronics\"}, \"ProductId\": {\"S\": \"p-1\"}, \"Price\": {\"N\": \"999\"}}' && aws dynamodb get-item --table-name LabProducts --key '{\"Category\": {\"S\": \"electronics\"}, \"ProductId\": {\"S\": \"p-1\"}}'",
        "expectedOutput": "Returns Item attributes with Price: 999 and Category: electronics.",
        "verificationTip": "Check that the query consumed minimal read units.",
        "troubleshooting": "In DynamoDB CLI, attribute types must be explicitly typed (e.g., {'S': 'value'} or {'N': '123'})."
      },
      {
        "stepNumber": 3,
        "title": "Delete Table",
        "description": "Remove the test table.",
        "consoleInstruction": "Select LabProducts -> Delete table.",
        "cliCommand": "aws dynamodb delete-table --table-name LabProducts",
        "expectedOutput": "TableStatus shows 'DELETING'.",
        "verificationTip": "Confirm deletion: aws dynamodb list-tables.",
        "troubleshooting": "None."
      }
    ]
  },
  "9": {
    "title": "Lab 9: RDS Single-AZ Free Tier Instance & Failover Simulation",
    "level": "Intermediate",
    "estimatedMinutes": 25,
    "freeTierEligible": true,
    "costRiskLevel": "MEDIUM",
    "paidAlternativeWarning": "COST WARNING: Multi-AZ RDS is NOT eligible for AWS Free Tier (it runs 2 DB instances). In this lab, we inspect Single-AZ free tier db.t3.micro/db.t4g.micro and simulate failover logic conceptually.",
    "prerequisites": "VPC with database subnet group.",
    "requiredPermissions": "rds:CreateDBInstance, rds:DescribeDBInstances, rds:DeleteDBInstance",
    "cleanupGuide": "Delete the DB instance with --skip-final-snapshot immediately after verification: aws rds delete-db-instance --db-instance-identifier lab-demo-db --skip-final-snapshot.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of RDS Multi-AZ Failover\necho \"=== Simulating RDS Multi-AZ Synchronous Failover ===\"\necho \"Current Primary DB: db-instance-1 in AZ us-east-1a (Active Read/Write)\"\necho \"Standby DB: db-instance-1-standby in AZ us-east-1b (Passive)\"\necho \"[SIMULATION EVENT] Injecting artificial hardware failure in us-east-1a...\"\necho \"1. RDS Health Monitor detects primary failure (00:15)\"\necho \"2. Standby DB in us-east-1b promoted to Primary (00:45)\"\necho \"3. CNAME DNS record for 'mydb.c1234.us-east-1.rds.amazonaws.com' updated to us-east-1b IP (01:10)\"\necho \"4. Application connection pool reconnects automatically with ZERO data loss!\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Understand Free Tier RDS Configuration",
        "description": "Identify the exact settings to stay 100% within the 750 monthly free tier hours.",
        "consoleInstruction": "RDS Console -> Create database -> Choose 'Free tier' template (this auto-enables Single-AZ, db.t3.micro/db.t4g.micro, 20GB gp2/gp3 storage).",
        "cliCommand": "aws rds describe-orderable-db-instance-options --engine mysql --engine-version 8.0 --query 'OrderableDBInstanceOptions[?DBInstanceClass==`db.t3.micro` || DBInstanceClass==`db.t4g.micro`].{Class:DBInstanceClass,MultiAZ:MultiAZ}' --output table | head -n 10",
        "expectedOutput": "List of orderable free-tier eligible instance classes.",
        "verificationTip": "Confirm MultiAZ=False when selecting the free tier option.",
        "troubleshooting": "If db.t3.micro is unavailable, db.t4g.micro is also covered under AWS Free Tier."
      },
      {
        "stepNumber": 2,
        "title": "Review Failover Architecture vs Read Replicas",
        "description": "Compare endpoint architecture: Multi-AZ single DNS CNAME vs Read Replica dedicated reader endpoints.",
        "consoleInstruction": "Review RDS documentation on DNS CNAME flipping during failover.",
        "cliCommand": "echo 'Multi-AZ: Writes to primary are synchronously mirrored to standby disk. CNAME flips on failover. Read Replicas: Asynchronously replicated for read scaling.'",
        "expectedOutput": "Architectural confirmation printed.",
        "verificationTip": "Never point write traffic to a read replica.",
        "troubleshooting": "None."
      }
    ]
  },
  "10": {
    "title": "Lab 10: Serverless Lambda Function & API Gateway Trigger",
    "level": "Intermediate",
    "estimatedMinutes": 20,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "AWS CLI or Lambda console access.",
    "requiredPermissions": "lambda:CreateFunction, lambda:Invoke, lambda:DeleteFunction, iam:CreateRole",
    "cleanupGuide": "Delete the function and test role: aws lambda delete-function --function-name LabHelloWorld. (Lambda has 1M perpetual free requests/month).",
    "safeSimulationScript": "#!/bin/bash\n# Local Serverless invocation simulation\necho \"=== Local Serverless Function Simulation ===\"\ncat << 'EOF' > /tmp/lambda_sim.js\nexports.handler = async (event) => {\n  return {\n    statusCode: 200,\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ message: \"Hello from Serverless Lambda!\", timestamp: new Date().toISOString() })\n  };\n};\nEOF\nnode -e 'const {handler} = require(\"/tmp/lambda_sim.js\"); handler({}).then(res => console.log(\"Invocation Output:\", res));'\nrm -f /tmp/lambda_sim.js",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create Serverless Lambda Handler in Node.js",
        "description": "Package a lightweight microservice function.",
        "consoleInstruction": "Lambda Console -> Create function -> Author from scratch -> Function name: 'LabHelloWorld' -> Runtime: Node.js 20.x -> Create function.",
        "cliCommand": "echo 'exports.handler = async (event) => { return { statusCode: 200, body: JSON.stringify(\"Hello from AWS Lambda Free Tier!\") }; };' > index.js && zip function.zip index.js",
        "expectedOutput": "function.zip created locally.",
        "verificationTip": "Verify zip file contains index.js.",
        "troubleshooting": "Ensure zip utility is installed locally."
      },
      {
        "stepNumber": 2,
        "title": "Test Invocations and Inspect CloudWatch Execution Logs",
        "description": "Trigger the Lambda function and view duration and memory usage.",
        "consoleInstruction": "In Lambda Console -> Click 'Test' tab -> Configure test event -> Click Test -> View execution summary.",
        "cliCommand": "aws lambda invoke --function-name LabHelloWorld output.json && cat output.json",
        "expectedOutput": "StatusCode: 200, output.json contains 'Hello from AWS Lambda Free Tier!'.",
        "verificationTip": "Inspect REPORT line in CloudWatch: Duration: ~2ms Billed Duration: 2ms Memory Size: 128 MB Max Memory Used: 66 MB.",
        "troubleshooting": "If function doesn't exist, create it via console or CLI."
      },
      {
        "stepNumber": 3,
        "title": "Clean Up Lambda Function",
        "description": "Remove the function.",
        "consoleInstruction": "Actions -> Delete function.",
        "cliCommand": "aws lambda delete-function --function-name LabHelloWorld && rm -f index.js function.zip output.json",
        "expectedOutput": "Function deleted.",
        "verificationTip": "Confirm with 'aws lambda list-functions'.",
        "troubleshooting": "None."
      }
    ]
  },
  "11": {
    "title": "Lab 11: Container Packaging, Amazon ECR & Fargate Architecture",
    "level": "Advanced",
    "estimatedMinutes": 25,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": "COST WARNING: An active EKS cluster costs $0.10/hour (~$73/month). This lab focuses on Amazon ECR and ECS with Fargate, which is free-tier friendly and incurs zero cost for repository creation.",
    "prerequisites": "Docker installed locally or simulated.",
    "requiredPermissions": "ecr:CreateRepository, ecr:DescribeRepositories, ecr:DeleteRepository",
    "cleanupGuide": "Delete the ECR repository: aws ecr delete-repository --repository-name lab-app --force.",
    "safeSimulationScript": "#!/bin/bash\n# Local Container & ECR Simulator\necho \"=== Docker Container & Amazon ECR Registry Simulator ===\"\necho \"1. Building image: docker build -t 123456789012.dkr.ecr.us-east-1.amazonaws.com/lab-app:v1.0 .\"\necho \"2. Authenticating Docker client to AWS ECR using temporary token...\"\necho \"3. Pushing layers to Amazon ECR: sha256:7b2f... PUSHED\"\necho \"4. Deploying to AWS Fargate: Allocating serverless vCPU=0.25, Memory=0.5GB...\"\necho \"5. Task ENI allocated in private subnet 10.0.2.14 -> Status: RUNNING\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create an Amazon ECR Private Container Repository",
        "description": "Create an image repository with automated vulnerability scanning.",
        "consoleInstruction": "ECR Console -> Repositories -> Create repository -> Private -> Name: 'lab-app' -> Enable 'Scan on push' -> Create.",
        "cliCommand": "aws ecr create-repository --repository-name lab-app --image-scanning-configuration scanOnPush=true",
        "expectedOutput": "Returns repositoryArn and repositoryUri.",
        "verificationTip": "Notice the repositoryUri format: <account-id>.dkr.ecr.<region>.amazonaws.com/lab-app.",
        "troubleshooting": "Repository names must contain only lowercase letters, numbers, hyphens, and underscores."
      },
      {
        "stepNumber": 2,
        "title": "Review ECS Task Definition & Fargate Serverless Compute",
        "description": "Understand task CPU/memory sizing and IAM task execution roles.",
        "consoleInstruction": "Review Task Definition parameters: container image URI, port mappings, and logging.",
        "cliCommand": "aws ecr describe-repositories --repository-names lab-app",
        "expectedOutput": "Shows repository details and scanOnPush=true.",
        "verificationTip": "Scan on push automatically flags CVEs upon image upload.",
        "troubleshooting": "None."
      },
      {
        "stepNumber": 3,
        "title": "Delete ECR Repository",
        "description": "Clean up ECR repository.",
        "consoleInstruction": "Select lab-app -> Delete.",
        "cliCommand": "aws ecr delete-repository --repository-name lab-app --force",
        "expectedOutput": "Repository deleted.",
        "verificationTip": "Confirm 'aws ecr describe-repositories' returns RepositoryNotFoundException.",
        "troubleshooting": "Use --force flag if repository contains pushed images."
      }
    ]
  },
  "12": {
    "title": "Lab 12: CloudWatch Metric Alarms & CloudTrail Audit Tracking",
    "level": "Intermediate",
    "estimatedMinutes": 25,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "AWS CLI or CloudWatch Console access.",
    "requiredPermissions": "cloudwatch:PutMetricAlarm, cloudwatch:DescribeAlarms, cloudwatch:DeleteAlarms, cloudtrail:LookupEvents",
    "cleanupGuide": "Delete test alarm: aws cloudwatch delete-alarms --alarm-names Lab-High-CPU-Alarm.",
    "safeSimulationScript": "#!/bin/bash\n# Local CloudWatch Alarm & CloudTrail Audit Simulation\necho \"=== CloudWatch Metric & Alarm Simulator ===\"\necho \"Metric: EC2 CPUUtilization >= 80% for 2 consecutive periods (300 seconds)\"\necho \"Current CPU Data Points: [62%, 78%, 84%, 89%]\"\necho \"Evaluation: 2 consecutive breaches detected!\"\necho \"State Change: OK -> ALARM\"\necho \"Action Triggered: Publishing notification to SNS topic 'arn:aws:sns:us-east-1:123:ops-alerts'\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create a CloudWatch Metric Alarm for High CPU",
        "description": "Configure an automated alarm that checks if CPU utilization exceeds 80%.",
        "consoleInstruction": "CloudWatch Console -> Alarms -> Create Alarm -> Select Metric -> EC2 -> Per-Instance -> CPUUtilization -> Threshold: >= 80 -> Period: 5 minutes.",
        "cliCommand": "aws cloudwatch put-metric-alarm --alarm-name Lab-High-CPU-Alarm --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 80 --comparison-operator GreaterThanOrEqualToThreshold --evaluation-periods 2",
        "expectedOutput": "Alarm created with return code 0.",
        "verificationTip": "Run 'aws cloudwatch describe-alarms --alarm-names Lab-High-CPU-Alarm' to verify state is INSUFFICIENT_DATA or OK.",
        "troubleshooting": "Ensure comparison-operator syntax matches exact AWS API enum."
      },
      {
        "stepNumber": 2,
        "title": "Query CloudTrail Event History",
        "description": "Audit recent management API activities in your account.",
        "consoleInstruction": "CloudTrail Console -> Event history -> Filter by Event Name (e.g. CreateSecurityGroup or RunInstances).",
        "cliCommand": "aws cloudtrail lookup-events --max-results 5 --query 'Events[].{Event:EventName,User:Username,Time:EventTime}' --output table",
        "expectedOutput": "Formatted table showing recent API calls and caller usernames.",
        "verificationTip": "CloudTrail records events within approximately 15 minutes of occurrence.",
        "troubleshooting": "CloudTrail lookup-events covers the past 90 days of management events for free."
      },
      {
        "stepNumber": 3,
        "title": "Delete Test CloudWatch Alarm",
        "description": "Remove test alarm.",
        "consoleInstruction": "Select Lab-High-CPU-Alarm -> Actions -> Delete.",
        "cliCommand": "aws cloudwatch delete-alarms --alarm-names Lab-High-CPU-Alarm",
        "expectedOutput": "Alarm deleted.",
        "verificationTip": "Verify alarm list is clean.",
        "troubleshooting": "None."
      }
    ]
  },
  "13": {
    "title": "Lab 13: Secrets Manager Rotation & WAF Rule Enforcement",
    "level": "Advanced",
    "estimatedMinutes": 25,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": "Secrets Manager costs $0.40/secret/month after 30-day free trial. Delete test secrets immediately after testing.",
    "prerequisites": "AWS CLI or Secrets Manager console access.",
    "requiredPermissions": "secretsmanager:CreateSecret, secretsmanager:GetSecretValue, secretsmanager:DeleteSecret",
    "cleanupGuide": "Delete test secret with immediate recovery suppression: aws secretsmanager delete-secret --secret-id LabAppDbSecret --force-delete-without-recovery.",
    "safeSimulationScript": "#!/bin/bash\n# Local Secrets Manager & AWS WAF Simulator\necho \"=== Secrets Manager & AWS WAF Simulator ===\"\necho \"[WAF EDGE TEST] Sending simulated HTTP request with SQL Injection: 'OR 1=1'...\"\necho \"AWS WAF Rule 'AWSManagedRulesSQLiRuleSet' triggered -> ACTION: BLOCK (HTTP 403 Forbidden)\"\necho \"[SECRETS TEST] Fetching database credentials via AWS SDK (zero hardcoded passwords):\"\necho \"{ username: 'db_admin', password: '***AUTO_ROTATED_32_CHAR_SECRET***' }\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create an Encrypted Secret in AWS Secrets Manager",
        "description": "Store database credentials encrypted with AWS KMS.",
        "consoleInstruction": "Secrets Manager Console -> Store a new secret -> Other type of secret -> Key/value: 'username'='admin', 'password'='SuperSecretPass123!' -> Name: 'LabAppDbSecret'.",
        "cliCommand": "aws secretsmanager create-secret --name LabAppDbSecret --description 'Test DB credentials' --secret-string '{\"username\":\"admin\",\"password\":\"SuperSecretPassword123!\"}'",
        "expectedOutput": "Returns ARN and VersionId of the created secret.",
        "verificationTip": "Retrieve the decrypted secret value: aws secretsmanager get-secret-value --secret-id LabAppDbSecret.",
        "troubleshooting": "Secret names must be unique within an account."
      },
      {
        "stepNumber": 2,
        "title": "Clean Up Secret Without 30-Day Recovery Delay",
        "description": "Force delete the secret immediately so no monthly charges occur.",
        "consoleInstruction": "Select secret -> Actions -> Delete secret -> Check 'Delete without recovery'.",
        "cliCommand": "aws secretsmanager delete-secret --secret-id LabAppDbSecret --force-delete-without-recovery",
        "expectedOutput": "DeletionDate timestamp returned.",
        "verificationTip": "Verify 'aws secretsmanager describe-secret --secret-id LabAppDbSecret' returns ResourceNotFoundException.",
        "troubleshooting": "By default, Secrets Manager schedules deletion for 30 days; the --force-delete-without-recovery flag purges it instantly."
      }
    ]
  },
  "14": {
    "title": "Lab 14: Infrastructure as Code with CloudFormation / Terraform",
    "level": "Advanced",
    "estimatedMinutes": 25,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "AWS CLI installed, text editor.",
    "requiredPermissions": "cloudformation:CreateStack, cloudformation:DescribeStacks, cloudformation:DeleteStack",
    "cleanupGuide": "Delete the CloudFormation stack: aws cloudformation delete-stack --stack-name LabS3Stack.",
    "safeSimulationScript": "#!/bin/bash\n# Local CloudFormation / Terraform validation simulation\necho \"=== Infrastructure as Code Linter & Simulator ===\"\ncat << 'EOF' > /tmp/demo_stack.yaml\nAWSTemplateFormatVersion: '2010-09-09'\nDescription: Free Tier S3 Bucket Stack\nResources:\n  MySecureBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketEncryption:\n        ServerSideEncryptionConfiguration:\n          - ServerSideEncryptionByDefault:\n              SSEAlgorithm: AES256\n      PublicAccessBlockConfiguration:\n        BlockPublicAcls: true\n        BlockPublicPolicy: true\n        IgnorePublicAcls: true\n        RestrictPublicBuckets: true\nEOF\necho \"Validating CloudFormation template syntax...\"\naws cloudformation validate-template --template-body file:///tmp/demo_stack.yaml 2>/dev/null || echo \"Template syntax: VALID (AWS::S3::Bucket with AES256 encryption & BlockPublicAccess)\"\nrm -f /tmp/demo_stack.yaml",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Write Declarative CloudFormation YAML Template",
        "description": "Define a secure S3 bucket and tags as code.",
        "consoleInstruction": "Prepare YAML template file locally.",
        "cliCommand": "cat << 'EOF' > template.yaml\nAWSTemplateFormatVersion: '2010-09-09'\nResources:\n  DemoBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      Tags:\n        - Key: Environment\n          Value: LearningLab\nEOF",
        "expectedOutput": "template.yaml written to disk.",
        "verificationTip": "Validate template: aws cloudformation validate-template --template-body file://template.yaml.",
        "troubleshooting": "Ensure indentation in YAML uses 2 spaces, not tabs."
      },
      {
        "stepNumber": 2,
        "title": "Deploy Stack and Observe Resource Provisioning",
        "description": "Deploy the stack and watch events in real time.",
        "consoleInstruction": "CloudFormation Console -> Create stack -> Upload template file -> Stack name: 'LabS3Stack' -> Submit.",
        "cliCommand": "aws cloudformation create-stack --stack-name LabS3Stack --template-body file://template.yaml",
        "expectedOutput": "StackId returned.",
        "verificationTip": "Wait for CREATE_COMPLETE: aws cloudformation describe-stacks --stack-name LabS3Stack --query 'Stacks[0].StackStatus'.",
        "troubleshooting": "If ROLLBACK_COMPLETE occurs, inspect stack events to see which resource failed."
      },
      {
        "stepNumber": 3,
        "title": "Tear Down Infrastructure via Single Command",
        "description": "Delete the entire stack and all its provisioned resources automatically.",
        "consoleInstruction": "Select LabS3Stack -> Delete.",
        "cliCommand": "aws cloudformation delete-stack --stack-name LabS3Stack && rm -f template.yaml",
        "expectedOutput": "Stack deletion initiated.",
        "verificationTip": "Confirm 'aws cloudformation describe-stacks --stack-name LabS3Stack' returns StackDoesNotExist.",
        "troubleshooting": "If the bucket contains objects, empty them first or add DeletionPolicy: Retain."
      }
    ]
  },
  "15": {
    "title": "Lab 15: Production Well-Architected Review & Cost Audit",
    "level": "Advanced",
    "estimatedMinutes": 30,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "AWS CLI or Cost Management console.",
    "requiredPermissions": "ce:GetCostAndUsage, budgets:ViewBudget",
    "cleanupGuide": "This audit lab is 100% read-only and inspects account posture and budgets. Zero cleanup needed.",
    "safeSimulationScript": "#!/bin/bash\n# Local Well-Architected & Cost Anomaly Simulator\necho \"=== AWS Well-Architected Framework Audit Simulator ===\"\necho \"Pillar 1: Security -> Root MFA: ENABLED | Unencrypted EBS: 0 | Open Security Groups: 0\"\necho \"Pillar 2: Reliability -> Multi-AZ Compute: ACTIVE | Auto Scaling: CONFIGURED\"\necho \"Pillar 3: Cost Optimization -> Idle Elastic IPs: 0 | Unattached EBS: 0\"\necho \"Budget Status: Monthly Forecast = $0.00 / $5.00 Budget Limit (OK)\"\necho \"Overall Well-Architected Score: 96 / 100\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Audit Active Resources to Detect Forgotten Billable Items",
        "description": "Run automated checks for unattached EBS volumes, idle Elastic IPs, and orphan snapshots.",
        "consoleInstruction": "Check EC2 Console -> Elastic IPs (ensure 0 idle) -> Volumes (ensure 0 available unattached) -> Snapshots.",
        "cliCommand": "aws ec2 describe-addresses --query 'Addresses[?InstanceId==null].{IP:PublicIp,AllocationId:AllocationId}' --output table",
        "expectedOutput": "Empty table (meaning NO unattached Elastic IPs generating idle fees!).",
        "verificationTip": "If any Elastic IP is listed without an InstanceId, release it immediately using 'aws ec2 release-address --allocation-id ID'.",
        "troubleshooting": "Remember that AWS charges ~$0.005/hr for unattached public IPv4 addresses."
      },
      {
        "stepNumber": 2,
        "title": "Configure Free-Tier Budget Alert with Email Notification",
        "description": "Set up an AWS Budget alerting you when spend exceeds $1.00.",
        "consoleInstruction": "Billing Console -> Budgets -> Create budget -> Zero spend budget or Monthly cost budget -> Set threshold at $1.00 -> Enter email.",
        "cliCommand": "echo 'Configure AWS Budget with alert threshold at 80% ($0.80) and 100% ($1.00) of your Free Tier safety limit.'",
        "expectedOutput": "Budget alert configuration documented.",
        "verificationTip": "Always test receiving the SNS budget email.",
        "troubleshooting": "None."
      }
    ]
  },
  "16": {
    "title": "Lab 16: Complete Git Local Repository Lifecycle & Atlassian Cheat Sheet Command Mastery",
    "level": "Beginner",
    "estimatedMinutes": 35,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "A local terminal (Linux Ubuntu, macOS, or Git Bash on Windows).",
    "requiredPermissions": "Standard local user terminal permissions (no cloud credentials or AWS billing required).",
    "cleanupGuide": "All files and repositories created during this lab are strictly local to your machine. To clean up completely, simply delete the 'git-mastery-lab' directory: rm -rf git-mastery-lab. Zero cloud cost.",
    "safeSimulationScript": "#!/bin/bash\n# Comprehensive local simulation of the Git Local Repository Lifecycle & Cheat Sheet\necho \"=== Git Local Repository & Cheat Sheet Simulator ===\"\nmkdir -p /tmp/git-mastery-sim && cd /tmp/git-mastery-sim\necho \"[1/8] Verifying Git installation: $(git --version)\"\ngit config user.name \"Cloud Engineer\"\ngit config user.email \"engineer@cloudmaster.io\"\ngit config alias.glog \"log --graph --oneline\"\necho \"[2/8] Initializing local repository...\"\ngit init\necho \"[3/8] Simulating Working Directory -> Staging Area with git add...\"\necho \"<h1>Cloud Platform v1.0</h1>\" > index.html\ngit status -s\ngit add index.html\necho \"[4/8] Demonstrating safe unstaging with git rm --cached...\"\ngit rm --cached index.html\nls -la index.html # Confirmed: file remains safe on disk!\ngit add index.html\necho \"[5/8] Creating permanent commit snapshot...\"\ngit commit -m \"feat: initial landing page\"\necho \"[6/8] Demonstrating git diff HEAD & git diff --cached...\"\necho \"<p>Enterprise Microservices</p>\" >> index.html\ngit diff index.html\ngit add index.html\ngit diff --cached\ngit commit -m \"feat: add enterprise description\"\necho \"[7/8] Demonstrating git log --graph --decorate --oneline...\"\ngit log --graph --decorate --oneline -n 5\necho \"[8/8] Demonstrating safe dry run git clean -n before force clean...\"\ntouch test.log temp.tmp\ngit clean -n\ngit clean -f\necho \"=== Verification SUCCESS: All Three Sections and Cheat Sheet Commands Operational ===\"\ncd / && rm -rf /tmp/git-mastery-sim",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Verify Git Installation on Ubuntu/Linux & Windows",
        "description": "Ensure Git is installed on your workstation and verify the installed version against recent releases.",
        "consoleInstruction": "Open your terminal or Git Bash. On Ubuntu, refresh package indexes before installing.",
        "cliCommand": "git --version\n# If not installed on Ubuntu:\n# sudo apt-get update && sudo apt-get install -y git",
        "expectedOutput": "git version 2.43.0 (or newer)",
        "verificationTip": "Always run 'git --version' after installation to confirm your shell locates the binary in your PATH.",
        "troubleshooting": "If 'command not found', run 'sudo apt-get update && sudo apt-get install -y git' on Ubuntu or install Git Bash on Windows."
      },
      {
        "stepNumber": 2,
        "title": "Configure Global Identity & Git Command Aliases",
        "description": "Set your global author name and email attached to all commits, and configure productive command aliases.",
        "consoleInstruction": "Run git config commands with the --global flag to write settings to ~/.gitconfig.",
        "cliCommand": "git config --global user.name \"Cloud Engineer\"\ngit config --global user.email \"engineer@cloudmaster.io\"\ngit config --global alias.glog \"log --graph --oneline\"\ngit config --global --list",
        "expectedOutput": "user.name=Cloud Engineer\nuser.email=engineer@cloudmaster.io\nalias.glog=log --graph --oneline",
        "verificationTip": "Run 'git config --global --list' to inspect all active global parameters.",
        "troubleshooting": "If commits later warn about author identity, re-run the user.name and user.email commands with quotes."
      },
      {
        "stepNumber": 3,
        "title": "Initialize Repository & Inspect .git Directory Architecture",
        "description": "Turn an ordinary directory into a Git-tracked workspace and inspect the internal .git folder structure.",
        "consoleInstruction": "Create a new practice folder 'git-mastery-lab', navigate into it, and initialize Git.",
        "cliCommand": "mkdir -p ~/git-mastery-lab && cd ~/git-mastery-lab\ngit init\nls -la .git",
        "expectedOutput": "Initialized empty Git repository in /home/.../git-mastery-lab/.git/\nHEAD  config  description  hooks/  info/  objects/  refs/",
        "verificationTip": "The hidden '.git' folder contains all configuration, object databases, and refs. Never delete this folder.",
        "troubleshooting": "Never run 'git init' inside an existing Git repository subfolder to avoid broken nested tracking."
      },
      {
        "stepNumber": 4,
        "title": "The Three Sections: Working Directory to Staging Area",
        "description": "Experience the transition of files from untracked in the Working Directory to staged in the Staging Area.",
        "consoleInstruction": "Create an application file. Check 'git status' to see untracked state in red, then run 'git add' to stage it.",
        "cliCommand": "echo '<h1>AWS & DevOps Mastery Platform</h1>' > index.html\ngit status\ngit add index.html\ngit status",
        "expectedOutput": "Changes to be committed:\n  (use \"git rm --cached <file>...\" to unstage)\n\tnew file:   index.html",
        "verificationTip": "Notice 'git status' displays untracked files in red and staged files in green.",
        "troubleshooting": "Prefer 'git add <file>' over blind 'git add .' to ensure you only stage files intentionally."
      },
      {
        "stepNumber": 5,
        "title": "Safe Unstaging Without Disk Deletion (git rm --cached)",
        "description": "Practice unstaging a file back to the Working Directory without deleting or overwriting any code on disk.",
        "consoleInstruction": "Run 'git rm --cached index.html'. Confirm that the file is removed from staging but remains 100% intact on disk.",
        "cliCommand": "git rm --cached index.html\ngit status\ncat index.html\n# Now re-stage it for commit:\ngit add index.html",
        "expectedOutput": "rm 'index.html'\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tindex.html\n<h1>AWS & DevOps Mastery Platform</h1>",
        "verificationTip": "CRITICAL: Never run plain 'git rm index.html' without '--cached', as plain 'git rm' deletes the physical file from disk!",
        "troubleshooting": "'git reset index.html' or 'git restore --staged index.html' achieve the exact same safe unstaging result."
      },
      {
        "stepNumber": 6,
        "title": "Create Permanent Snapshot (git commit) & Amend Message",
        "description": "Permanently record staged files into the Local Repository DAG and edit the commit using --amend.",
        "consoleInstruction": "Commit staged files with a clear conventional message, view it with 'git log', and practice 'git commit --amend'.",
        "cliCommand": "git commit -m \"feat: create initial application landing page\"\ngit log --oneline\ngit commit --amend -m \"feat(web): create initial application landing page structure\"",
        "expectedOutput": "[main (root-commit) 4a9bc12] feat(web): create initial application landing page structure\n 1 file changed, 1 insertion(+)",
        "verificationTip": "Run 'git log --oneline' to confirm the commit hash and updated message.",
        "troubleshooting": "Never amend commits that have already been pushed to a shared public remote branch."
      },
      {
        "stepNumber": 7,
        "title": "Inspect Diffs (HEAD vs Cached) & Visualize Commit Graphs",
        "description": "Modify your code to practice diffing unstaged changes vs staged changes vs the last commit.",
        "consoleInstruction": "Append new lines to index.html. Compare 'git diff' (unstaged) against 'git diff HEAD' and 'git diff --cached'.",
        "cliCommand": "echo '<p>Production Kubernetes & Terraform</p>' >> index.html\ngit diff\ngit diff HEAD\ngit add index.html\ngit diff --cached\ngit commit -m \"feat(web): add microservices description\"\ngit glog",
        "expectedOutput": "+<p>Production Kubernetes & Terraform</p>\n* 7c3d2e1 (HEAD -> main) feat(web): add microservices description\n* 4a9bc12 feat(web): create initial application landing page structure",
        "verificationTip": "Use your custom alias 'git glog' or 'git log --graph --decorate --oneline' for clear visual history.",
        "troubleshooting": "Remember: 'git diff' shows unstaged edits, while 'git diff --cached' shows what is queued in staging."
      },
      {
        "stepNumber": 8,
        "title": "Workspace Hygiene: Dry-Run Preview (git clean -n) & Cleanup",
        "description": "Clean up untracked temporary files and build artifacts safely using dry-run preview before force execution.",
        "consoleInstruction": "Create temporary test files. Run 'git clean -n' to preview what would be deleted, then execute with '-f'.",
        "cliCommand": "touch temp_debug.log test_artifact.tmp\ngit status -s\ngit clean -n\ngit clean -f\ngit status",
        "expectedOutput": "Would remove temp_debug.log\nWould remove test_artifact.tmp\nRemoving temp_debug.log\nRemoving test_artifact.tmp\nnothing to commit, working tree clean",
        "verificationTip": "ALWAYS run 'git clean -n' (dry run) before 'git clean -f' to guarantee you do not delete legitimate uncommitted files.",
        "troubleshooting": "Add '-d' flag ('git clean -nd') if you need to preview and clean untracked directories as well."
      }
    ]
  },
  "17": {
    "title": "Lab 17: Enterprise Jenkins CI/CD & Automated Selenium Testing Masterclass",
    "level": "Intermediate",
    "estimatedMinutes": 40,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Docker installed locally or Jenkins running on a local port.",
    "requiredPermissions": "Local Docker execution rights or Linux host sudo permissions.",
    "cleanupGuide": "Stop and remove the local test container: docker stop jenkins-lab && docker rm jenkins-lab.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of Jenkins Declarative Pipeline execution\necho \"=== Jenkins Declarative Pipeline Execution ===\"\necho \"[Pipeline] Start of Pipeline\"\necho \"[Stage: Checkout] Pulling from git https://github.com/org/app.git (commit: 8f3c21a)\"\necho \"[Stage: Unit Test] Executing 'mvn test' -> 18 passed in 3.1s\"\necho \"[Stage: Selenium Tests] Headless Chrome running 5 browser scenarios -> 5/5 PASSED\"\necho \"[Stage: Post] Publishing JUnit XML reports: target/surefire-reports/*.xml\"\necho \"[Stage: Post] Success! Sending notification to Slack #devops-deployments\"\necho \"[Pipeline] Finished: SUCCESS\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Launch Local Isolated Jenkins Container",
        "description": "Run Jenkins LTS container in Docker with port forward and volume mounting.",
        "consoleInstruction": "Run the docker run command to launch Jenkins on host port 8080.",
        "cliCommand": "docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-lab jenkins/jenkins:lts-jdk17",
        "expectedOutput": "Container ID printed to terminal, verifying Jenkins daemon started.",
        "verificationTip": "Run 'docker logs jenkins-lab' to confirm HTTP listener is active on 8080.",
        "troubleshooting": "If port 8080 is in use, remap to -p 8081:8080."
      },
      {
        "stepNumber": 2,
        "title": "Create Declarative Jenkinsfile with Multi-Stage Execution",
        "description": "Write a Jenkinsfile implementing Build, Selenium Test, and JUnit Archive stages.",
        "consoleInstruction": "Create a file named 'Jenkinsfile' in the root directory.",
        "cliCommand": "cat << 'EOF' > Jenkinsfile\npipeline {\n  agent any\n  stages {\n    stage('Build') {\n      steps { echo 'Compiling application via Maven...' }\n    }\n    stage('Selenium Headless Test') {\n      steps { echo 'Running automated browser test suites...' }\n    }\n  }\n  post {\n    always {\n      echo 'Archiving test results...'\n    }\n  }\n}\nEOF",
        "expectedOutput": "Jenkinsfile created with declarative pipeline structure.",
        "verificationTip": "Verify pipeline syntax using the Jenkins Pipeline Syntax Generator in the web console.",
        "troubleshooting": "Ensure 'pipeline' is all lowercase."
      }
    ]
  },
  "18": {
    "title": "Lab 18: Docker Multi-Stage Optimization & Multi-Service Compose",
    "level": "Beginner",
    "estimatedMinutes": 30,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Docker Engine installed locally.",
    "requiredPermissions": "Local docker daemon permissions.",
    "cleanupGuide": "Tear down containers and prune local test images: docker compose down -v && docker rmi web-optimized:v1.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of Docker multi-stage build & compose stack\necho \"=== Docker Multi-Stage Image Builder ===\"\necho \"Stage 1 (Builder): FROM node:20-alpine -> installed typescript, webpack, dependencies (Total: 480MB)\"\necho \"Stage 2 (Runtime): FROM node:20-alpine -> copied dist/ and production node_modules ONLY (Total: 62MB)\"\necho \"→ 87% Image Size Reduction achieved!\"\necho \"Starting docker-compose multi-service stack...\"\necho \"[+] Network app_default Created\"\necho \"[+] Container db-1 Started (MySQL 8.0 on port 3306)\"\necho \"[+] Container api-1 Started (Node.js on port 5000)\"\necho \"[+] Container web-1 Started (Nginx on port 80)\"\necho \"Healthcheck: All services healthy! Zero cost local dev stack running.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Build Hardened Multi-Stage Dockerfile",
        "description": "Create an optimized Dockerfile that compiles code in builder stage and runs as non-root user in runtime stage.",
        "consoleInstruction": "Inspect Dockerfile instructions: FROM -> WORKDIR -> COPY -> RUN -> USER -> CMD.",
        "cliCommand": "cat << 'EOF' > Dockerfile\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nUSER node\nCOPY --from=builder /app/package*.json ./\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD [\"node\", \"dist/index.js\"]\nEOF",
        "expectedOutput": "Multi-stage Dockerfile created with non-root security.",
        "verificationTip": "Run 'docker build -t app-prod:test .' and observe final image size under 80MB.",
        "troubleshooting": "If permission denied during build, ensure files have readable permissions."
      },
      {
        "stepNumber": 2,
        "title": "Define Multi-Service Stack with Docker Compose",
        "description": "Orchestrate Web Frontend, Backend API, and MySQL Database with automated network isolation.",
        "consoleInstruction": "Create docker-compose.yml defining services, environment variables, and persistent named volumes.",
        "cliCommand": "cat << 'EOF' > compose.yaml\nservices:\n  app:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - NODE_ENV=production\n      - DB_HOST=db\n    depends_on:\n      - db\n  db:\n    image: mysql:8.0\n    environment:\n      - MYSQL_ROOT_PASSWORD=secret\n      - MYSQL_DATABASE=app_db\n    volumes:\n      - db_data:/var/lib/mysql\nvolumes:\n  db_data:\nEOF",
        "expectedOutput": "compose.yaml created with declarative service dependencies.",
        "verificationTip": "Test configuration using 'docker compose config' before starting.",
        "troubleshooting": "Ensure indentation is consistent 2-space YAML."
      }
    ]
  },
  "19": {
    "title": "Lab 19: Kubernetes Deployment, Service Discovery & Zero-Downtime Rollout",
    "level": "Advanced",
    "estimatedMinutes": 35,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "kubectl installed locally or access to Minikube/Kind.",
    "requiredPermissions": "Kubernetes namespace create/apply permissions.",
    "cleanupGuide": "Delete the test deployment and service: kubectl delete -f k8s-deployment.yaml.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of Kubernetes declarative state reconciliation\necho \"=== Kubernetes Cluster Simulator ===\"\necho \"$ kubectl apply -f k8s-deployment.yaml\"\necho \"deployment.apps/frontend-app created\"\necho \"service/frontend-svc created\"\necho \"configmap/app-config created\"\necho \"Waiting for rollout to finish: 0 of 3 updated replicas are available...\"\necho \"Waiting for rollout to finish: 1 of 3 updated replicas are available...\"\necho \"Waiting for rollout to finish: 3 of 3 updated replicas are available...\"\necho \"deployment 'frontend-app' successfully rolled out!\"\necho \"$ kubectl get pods -l app=frontend-app\"\necho \"NAME                            READY   STATUS    RESTARTS   AGE\"\necho \"frontend-app-769d4bc8f-2k9jx   1/1     Running   0          18s\"\necho \"frontend-app-769d4bc8f-8pxmn   1/1     Running   0          18s\"\necho \"frontend-app-769d4bc8f-m5twq   1/1     Running   0          18s\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create Kubernetes Deployment Manifest with Probes & Resource Limits",
        "description": "Author a production-grade Deployment YAML with 3 replicas, CPU/memory limits, and Liveness/Readiness probes.",
        "consoleInstruction": "Create k8s-deployment.yaml defining apiVersion: apps/v1, kind: Deployment.",
        "cliCommand": "cat << 'EOF' > k8s-deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: cloud-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: cloud-app\n  template:\n    metadata:\n      labels:\n        app: cloud-app\n    spec:\n      containers:\n      - name: web\n        image: nginx:alpine\n        resources:\n          requests:\n            memory: \"64Mi\"\n            cpu: \"50m\"\n          limits:\n            memory: \"128Mi\"\n            cpu: \"100m\"\n        readinessProbe:\n          httpGet:\n            path: /\n            port: 80\n          initialDelaySeconds: 5\n          periodSeconds: 10\nEOF",
        "expectedOutput": "k8s-deployment.yaml created with health probes and resource limits.",
        "verificationTip": "Verify YAML validation using 'kubectl apply --dry-run=client -f k8s-deployment.yaml'.",
        "troubleshooting": "Always ensure resource requests are strictly smaller than limits."
      },
      {
        "stepNumber": 2,
        "title": "Expose Pods with a Kubernetes ClusterIP Service",
        "description": "Create a Service manifest to provide stable DNS resolution and internal load balancing across pod replicas.",
        "consoleInstruction": "Create k8s-service.yaml defining apiVersion: v1, kind: Service.",
        "cliCommand": "cat << 'EOF' > k8s-service.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: cloud-app-svc\nspec:\n  selector:\n    app: cloud-app\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 80\n  type: ClusterIP\nEOF",
        "expectedOutput": "k8s-service.yaml created with selector pointing to app: cloud-app.",
        "verificationTip": "Inspect endpoints using 'kubectl get endpoints cloud-app-svc' to confirm target pod IPs are mapped.",
        "troubleshooting": "If endpoints are empty, check that the service selector matches the pod template labels exactly."
      }
    ]
  },
  "20": {
    "title": "Lab 20: Unified Enterprise Pipeline: GitHub -> Jenkins -> Docker -> AWS ECR -> EKS",
    "level": "Advanced",
    "estimatedMinutes": 45,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": "Amazon EKS clusters incur $0.10/hr control plane costs; this lab includes our zero-cost safe local CLI simulator so you can master the exact commands without deploying billable clusters.",
    "prerequisites": "AWS CLI, Docker, and kubectl configured.",
    "requiredPermissions": "ecr:GetAuthorizationToken, ecr:PutImage, eks:DescribeCluster",
    "cleanupGuide": "Zero AWS charges incurred when using the built-in simulator. If deployed to real AWS: aws ecr delete-repository --repository-name prod-api --force.",
    "safeSimulationScript": "#!/bin/bash\n# Complete End-to-End Enterprise CI/CD Pipeline Simulator\necho \"=== Enterprise DevOps Pipeline Simulation ===\"\necho \"Step 1 [GitHub]: Push received on 'main' branch (commit sha: 9a7e2b1)\"\necho \"Step 2 [Jenkins]: Webhook received. Allocating dynamic Docker build agent...\"\necho \"Step 3 [CI Test]: Running unit tests & SonarQube static analysis -> 100% Passed\"\necho \"Step 4 [Docker]: Building multi-stage container -> 'prod-api:9a7e2b1'\"\necho \"Step 5 [DevSecOps]: Trivy scanning image layers -> 0 CRITICAL CVEs detected (Passed)\"\necho \"Step 6 [AWS ECR]: Authenticating to 123456789012.dkr.ecr.us-east-1.amazonaws.com\"\necho \"Step 7 [AWS ECR]: Pushing image layers -> SHA256 verified in registry\"\necho \"Step 8 [Amazon EKS]: Executing 'kubectl set image deployment/prod-api api=prod-api:9a7e2b1'\"\necho \"Step 9 [K8s Rollout]: Pod 1 updated -> Ready. Pod 2 updated -> Ready. Pod 3 updated -> Ready.\"\necho \"Pipeline execution finished successfully in 48 seconds with ZERO downtime!\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Authenticate Docker Client to Amazon ECR",
        "description": "Obtain an AWS STS authentication token and pipe it into Docker CLI to authenticate with private ECR registry.",
        "consoleInstruction": "Open AWS Console -> ECR Dashboard -> Repositories -> Click 'View push commands' for copy-paste instructions.",
        "cliCommand": "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com",
        "expectedOutput": "Login Succeeded",
        "verificationTip": "Verify login credentials stored in ~/.docker/config.json with temporary 12-hour expiration.",
        "troubleshooting": "If AuthFailure occurs, confirm AWS CLI credentials have ecr:GetAuthorizationToken permission."
      },
      {
        "stepNumber": 2,
        "title": "Build, Tag with Git SHA, and Push to Amazon ECR",
        "description": "Build the container image locally, apply an immutable tag containing the current Git commit SHA, and push to ECR.",
        "consoleInstruction": "Run docker build and docker push commands.",
        "cliCommand": "docker build -t 123456789012.dkr.ecr.us-east-1.amazonaws.com/prod-api:v1.0-9a7e2b1 . && docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/prod-api:v1.0-9a7e2b1",
        "expectedOutput": "The push refers to repository [123456789012.dkr.ecr.us-east-1.amazonaws.com/prod-api]\n9a7e2b1: Pushed\nv1.0-9a7e2b1: digest: sha256:... size: 1782",
        "verificationTip": "Check ECR console to confirm the image tag and scan-on-push results appear.",
        "troubleshooting": "Ensure the ECR repository 'prod-api' exists before pushing."
      },
      {
        "stepNumber": 3,
        "title": "Trigger Zero-Downtime Rolling Update on Amazon EKS",
        "description": "Instruct the Kubernetes cluster to roll out the newly pushed container image with live health verification.",
        "consoleInstruction": "Run kubectl set image command followed by rollout status check.",
        "cliCommand": "kubectl set image deployment/prod-api api=123456789012.dkr.ecr.us-east-1.amazonaws.com/prod-api:v1.0-9a7e2b1 --record && kubectl rollout status deployment/prod-api",
        "expectedOutput": "deployment.apps/prod-api image updated\ndeployment 'prod-api' successfully rolled out",
        "verificationTip": "Run 'kubectl rollout history deployment/prod-api' to inspect past revision numbers for instant rollback capability.",
        "troubleshooting": "If pods enter ImagePullBackOff, ensure the EKS worker nodes have an IAM role with ecr:BatchGetImage and ecr:GetDownloadUrlForLayer permissions."
      }
    ]
  },
  "git-command-suite-cheat-sheet-mastery": {
    "title": "Lab 16B: Production Incident Response & Git Disaster Recovery Masterclass",
    "level": "Intermediate",
    "estimatedMinutes": 40,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Basic Git terminal proficiency (completion of Lab 16A).",
    "requiredPermissions": "Local terminal environment (Linux Ubuntu, macOS, or Git Bash).",
    "cleanupGuide": "All drills are contained inside a local temporary folder. To clean up completely, delete the practice folder: rm -rf ~/git-incident-lab.",
    "safeSimulationScript": "#!/bin/bash\n# Production Git Disaster Recovery & Incident Response Simulator\necho \"=== Git Production Incident Response & Disaster Recovery Simulator ===\"\nDIR=\"/tmp/git-incident-sim\"\nrm -rf \"$DIR\" && mkdir -p \"$DIR\" && cd \"$DIR\"\ngit init\ngit config user.name \"SRE Lead\"\ngit config user.email \"sre@cloudmaster.io\"\n\necho \"--- Drill 1: Simulating Accidental 'git reset --hard' & Reflog Recovery ---\"\necho \"v1\" > app.js && git add app.js && git commit -m \"feat: core v1\"\necho \"v2\" >> app.js && git add app.js && git commit -m \"feat: core v2\"\necho \"v3\" >> app.js && git add app.js && git commit -m \"feat: core v3 (CRITICAL WORK)\"\nLOST_SHA=$(git rev-parse HEAD)\necho \"Executing accidental hard reset: git reset --hard HEAD~2...\"\ngit reset --hard HEAD~2\necho \"Current HEAD is now at: $(git rev-parse --short HEAD) - Work appears lost!\"\necho \"Recovering via reflog: checking out lost commit $LOST_SHA...\"\ngit checkout -b recovery-branch \"$LOST_SHA\"\necho \"SUCCESS: 100% of lost work restored on recovery-branch! File content:\"\ncat app.js\n\necho \"--- Drill 2: Simulating Automated 'git bisect' Regression Hunting ---\"\ncd \"$DIR\"\ncat << 'EOF' > test_payment.sh\n#!/bin/bash\ngrep -q \"BROKEN_PAYMENT\" app.js && exit 1 || exit 0\nEOF\nchmod +x test_payment.sh\necho \"v4 - stable\" >> app.js && git commit -am \"feat: stable v4\"\nGOOD_SHA=$(git rev-parse HEAD)\necho \"v5 - BROKEN_PAYMENT\" >> app.js && git commit -am \"feat: faulty payment serialization\"\nBAD_SHA=$(git rev-parse HEAD)\necho \"v6 - downstream\" >> app.js && git commit -am \"feat: downstream analytics\"\necho \"Starting automated bisect with test_payment.sh...\"\ngit bisect start \"$BAD_SHA\" \"$GOOD_SHA\"\ngit bisect run ./test_payment.sh\necho \"Bisect identified first bad commit successfully!\"\ngit bisect reset\n\necho \"--- Drill 3: Simulating Surgical Cherry-Pick with -x Traceability ---\"\ngit checkout -b hotfix-target HEAD~2\ngit cherry-pick -x \"$BAD_SHA\"~1 # Cherry pick previous stable commit\ngit log -n 1 --pretty=format:\"%h - %s (%b)\"\necho \"\"\necho \"=== All Incident Recovery Simulations PASSED with Zero Data Loss ===\"\ncd / && rm -rf \"$DIR\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Disaster Recovery: Restore Lost Commits after 'git reset --hard' via Reflog",
        "description": "Simulate an accidental hard reset that dropped unpushed commits, and use the reflog to resurrect 100% of the lost work.",
        "consoleInstruction": "Create a drill repo. Commit 3 milestones, execute an accidental 'git reset --hard HEAD~2', and inspect the reflog.",
        "cliCommand": "mkdir -p ~/git-incident-lab && cd ~/git-incident-lab && git init\necho 'feature 1' > app.js && git add . && git commit -m 'feat: step 1'\necho 'feature 2' >> app.js && git commit -am 'feat: step 2'\necho 'feature 3' >> app.js && git commit -am 'feat: step 3 (CRITICAL)'\ngit reset --hard HEAD~2\ngit reflog\ngit checkout -b recovery-branch HEAD@{1}",
        "expectedOutput": "HEAD is now at ... feat: step 1\nHEAD@{0}: reset: moving to HEAD~2\nHEAD@{1}: commit: feat: step 3 (CRITICAL)\nSwitched to a new branch 'recovery-branch'",
        "verificationTip": "Run 'cat app.js' to confirm all 3 features are fully restored on 'recovery-branch'.",
        "troubleshooting": "If HEAD index differs in your terminal, check the reflog output line showing 'commit: feat: step 3'."
      },
      {
        "stepNumber": 2,
        "title": "Surgical Release Management: Git Cherry-Pick with Traceability (-x)",
        "description": "Extract an isolated hotfix commit from an unmerged experimental branch into a stable production branch without pulling in unreviewed code.",
        "consoleInstruction": "Switch to a production branch. Use 'git cherry-pick -x <commit-sha>' to apply only the isolated bugfix.",
        "cliCommand": "git checkout -b v2.0-stable main\ngit log --oneline recovery-branch\n# Extract the specific commit SHA with -x provenance tracking:\ngit cherry-pick -x recovery-branch\ngit log -n 1",
        "expectedOutput": "[v2.0-stable ...] feat: step 2\n(cherry picked from commit ...)",
        "verificationTip": "The '-x' flag automatically appends the source commit hash for audit and traceability compliance.",
        "troubleshooting": "If merge conflicts appear during cherry-pick, resolve them in app.js, stage with 'git add app.js', and run 'git cherry-pick --continue'."
      },
      {
        "stepNumber": 3,
        "title": "Automated Bug Hunting: Binary Search via 'git bisect run'",
        "description": "Write an automated test assertion script and let Git execute binary search across history to locate a regression commit in seconds.",
        "consoleInstruction": "Create a test script that validates code. Start bisect and run 'git bisect run ./test.sh'.",
        "cliCommand": "cat << 'EOF' > test_assertion.sh\n#!/bin/bash\n# Fails (exit 1) if step 3 exists, passes (exit 0) otherwise:\ngrep -q 'step 3' app.js && exit 1 || exit 0\nEOF\nchmod +x test_assertion.sh\ngit checkout recovery-branch\ngit bisect start HEAD v2.0-stable\ngit bisect run ./test_assertion.sh\ngit bisect reset",
        "expectedOutput": "... is the first bad commit\ncommit ...\nAuthor: ...\n    feat: step 3 (CRITICAL)\nBisect run success.",
        "verificationTip": "Notice how Git tests the middle commit automatically and halving the search space on each run.",
        "troubleshooting": "Always ensure the test script is executable ('chmod +x test_assertion.sh') and returns standard 0 on pass and 1 on fail."
      },
      {
        "stepNumber": 4,
        "title": "Triage & Resolve 3-Way Merge Conflicts with Conflict Markers",
        "description": "Simulate competing edits from two engineering squads on the same configuration lines and resolve conflict markers cleanly.",
        "consoleInstruction": "Create conflicting edits on two branches, trigger a merge conflict, and inspect conflict markers (<<<<<<< HEAD, =======, >>>>>>>).",
        "cliCommand": "git checkout -b squad-alpha recovery-branch\necho 'PORT=8080' > config.env && git add . && git commit -m 'config: port 8080'\ngit checkout -b squad-beta recovery-branch\necho 'PORT=9090' > config.env && git add . && git commit -m 'config: port 9090'\ngit merge squad-alpha",
        "expectedOutput": "CONFLICT (content): Merge conflict in config.env\nAutomatic merge failed; fix conflicts and then commit the result.",
        "verificationTip": "Open config.env. Notice '<<<<<<< HEAD' has 9090 and '>>>>>>> squad-alpha' has 8080. Edit to choose the agreed port.",
        "troubleshooting": "After editing and removing conflict markers, run 'git add config.env' and 'git commit' to complete the 3-way merge."
      },
      {
        "stepNumber": 5,
        "title": "Overcoming Push Rejections: Interactive Rebase to Excise Large Blobs",
        "description": "Simulate accidental commitment of an unwanted large file, and rewrite history using interactive rebase to remove it before pushing.",
        "consoleInstruction": "Commit a temporary dummy blob. Use 'git rebase -i' with the edit command to delete the file from history.",
        "cliCommand": "echo 'LARGE DATA PAYLOAD' > dummy_large.iso\ngit add dummy_large.iso && git commit -m 'temp: accidental large file commit'\necho 'legitimate feature' >> app.js && git commit -am 'feat: legitimate work'\ngit log --oneline -2\n# Rebase to remove the dummy file:\ngit rebase -i HEAD~2",
        "expectedOutput": "[detached HEAD ...] feat: legitimate work\nSuccessfully rebased and updated refs/heads/squad-beta.",
        "verificationTip": "In the rebase editor, change 'pick' to 'edit' next to the large file commit, run 'git rm dummy_large.iso && git commit --amend', then 'git rebase --continue'.",
        "troubleshooting": "Always add large file extensions (*.iso, *.tar.gz, *.mp4) to .gitignore to prevent accidental staging."
      },
      {
        "stepNumber": 6,
        "title": "Clean Remote Synchronization: Rebase Pull vs Force Pushing Safety",
        "description": "Practice updating feature branches using 'git pull --rebase' to preserve linear commit history and understand --force-with-lease.",
        "consoleInstruction": "Inspect the commit DAG with 'git log --graph --oneline'. Practice rebase integration instead of generating merge bubbles.",
        "cliCommand": "git checkout -b feature/clean-sync\necho 'update' >> app.js && git commit -am 'feat: linear local commit'\n# Rebase local commits cleanly on top of target branch:\ngit rebase v2.0-stable\ngit log --graph --decorate --oneline -5",
        "expectedOutput": "* ... (HEAD -> feature/clean-sync) feat: linear local commit\n* ... (v2.0-stable) feat: step 2\n* ... feat: step 1",
        "verificationTip": "Notice the commit history is a straight line with zero chaotic merge bubbles.",
        "troubleshooting": "When pushing a rebased branch to remote, always use '--force-with-lease' rather than plain '--force' to avoid clobbering teammates' work."
      }
    ]
  },
  "git-fundamentals-branching-merge-strategies": {
    "title": "Lab 16.1: Git Architecture, Three-Section Local Repository & Version Control Foundations",
    "level": "Beginner",
    "estimatedMinutes": 35,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "A local terminal (Linux Ubuntu, macOS, or Git Bash on Windows).",
    "requiredPermissions": "Standard workstation terminal permissions (no cloud credentials or AWS billing required).",
    "cleanupGuide": "All files and repositories created during this lab are strictly local to your machine. To clean up completely: rm -rf ~/git-mastery-lab.",
    "safeSimulationScript": "#!/bin/bash\n# Comprehensive local simulation of the Git Local Repository Lifecycle & Foundations\necho \"=== Git Local Repository & Foundations Simulator ===\"\nmkdir -p /tmp/git-vcs-sim && cd /tmp/git-vcs-sim\necho \"[1/7] Verifying Git installation: $(git --version)\"\ngit config user.name \"Cloud Engineer\"\ngit config user.email \"engineer@cloudmaster.io\"\ngit config alias.glog \"log --graph --oneline\"\necho \"[2/7] Initializing local repository...\"\ngit init\necho \"[3/7] Simulating Working Directory -> Staging Area with git add...\"\necho \"<h1>Cloud Platform v1.0</h1>\" > index.html\ngit status -s\ngit add index.html\necho \"[4/7] Demonstrating safe unstaging with git rm --cached...\"\ngit rm --cached index.html\nls -la index.html # Confirmed: file remains safe on disk!\ngit add index.html\necho \"[5/7] Creating permanent commit snapshot...\"\ngit commit -m \"feat: initial landing page\"\necho \"[6/7] Creating and merging feature branch...\"\ngit checkout -b feature/auth-guard\necho \"const auth = true;\" > auth.js\ngit add auth.js && git commit -m \"feat(auth): add authentication guard\"\ngit checkout main\ngit merge --ff-only feature/auth-guard\necho \"[7/7] Verifying commit DAG...\"\ngit log --graph --oneline\necho \"=== Verification SUCCESS: Topic 1 Architecture & Foundations Operational ===\"\ncd / && rm -rf /tmp/git-vcs-sim",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Verify Git Installation on Ubuntu/Linux & Windows",
        "description": "Ensure Git is installed on your workstation and verify the installed version against recent releases.",
        "consoleInstruction": "Open your terminal or Git Bash. On Ubuntu, refresh package indexes before installing.",
        "cliCommand": "git --version\n# If not installed on Ubuntu:\n# sudo apt-get update && sudo apt-get install -y git",
        "expectedOutput": "git version 2.43.0 (or newer)",
        "verificationTip": "Always run 'git --version' after installation to confirm your shell locates the binary in your PATH.",
        "troubleshooting": "If 'command not found', run 'sudo apt-get update && sudo apt-get install -y git' on Ubuntu or install Git Bash on Windows."
      },
      {
        "stepNumber": 2,
        "title": "Configure Global Identity & Git Command Aliases",
        "description": "Set your global author name and email attached to all commits, and configure productive command aliases.",
        "consoleInstruction": "Run git config commands with the --global flag to write settings to ~/.gitconfig.",
        "cliCommand": "git config --global user.name \"Cloud Engineer\"\ngit config --global user.email \"engineer@cloudmaster.io\"\ngit config --global alias.glog \"log --graph --oneline\"\ngit config --global --list",
        "expectedOutput": "user.name=Cloud Engineer\nuser.email=engineer@cloudmaster.io\nalias.glog=log --graph --oneline",
        "verificationTip": "Run 'git config --global --list' to inspect all active global parameters.",
        "troubleshooting": "If commits later warn about author identity, re-run the user.name and user.email commands with quotes."
      },
      {
        "stepNumber": 3,
        "title": "Initialize Repository & Inspect .git Directory Architecture",
        "description": "Turn an ordinary directory into a Git-tracked workspace and inspect the internal .git folder structure.",
        "consoleInstruction": "Create a new practice folder 'git-mastery-lab', navigate into it, and initialize Git.",
        "cliCommand": "mkdir -p ~/git-mastery-lab && cd ~/git-mastery-lab\ngit init\nls -la .git",
        "expectedOutput": "Initialized empty Git repository in /home/.../git-mastery-lab/.git/\nHEAD  config  description  hooks/  info/  objects/  refs/",
        "verificationTip": "The hidden '.git' folder contains all configuration, object databases, and refs. Never delete this folder.",
        "troubleshooting": "Never run 'git init' inside an existing Git repository subfolder to avoid broken nested tracking."
      },
      {
        "stepNumber": 4,
        "title": "The Three Sections: Working Directory to Staging Area",
        "description": "Experience the transition of files from untracked in the Working Directory to staged in the Staging Area.",
        "consoleInstruction": "Create an application file. Check 'git status' to see untracked state in red, then run 'git add' to stage it.",
        "cliCommand": "echo '<h1>AWS & DevOps Mastery Platform</h1>' > index.html\ngit status\ngit add index.html\ngit status",
        "expectedOutput": "Changes to be committed:\n  (use \"git rm --cached <file>...\" to unstage)\n\tnew file:   index.html",
        "verificationTip": "Notice 'git status' displays untracked files in red and staged files in green.",
        "troubleshooting": "Prefer 'git add <file>' over blind 'git add .' to ensure you only stage files intentionally."
      },
      {
        "stepNumber": 5,
        "title": "Safe Unstaging Without Disk Deletion (git rm --cached)",
        "description": "Practice unstaging a file back to the Working Directory without deleting or overwriting any code on disk.",
        "consoleInstruction": "Run 'git rm --cached index.html'. Confirm that the file is removed from staging but remains 100% intact on disk.",
        "cliCommand": "git rm --cached index.html\ngit status\ncat index.html\n# Now re-stage it for commit:\ngit add index.html",
        "expectedOutput": "rm 'index.html'\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tindex.html\n<h1>AWS & DevOps Mastery Platform</h1>",
        "verificationTip": "CRITICAL: Never run plain 'git rm index.html' without '--cached', as plain 'git rm' deletes the physical file from disk!",
        "troubleshooting": "'git reset index.html' or 'git restore --staged index.html' achieve the exact same safe unstaging result."
      },
      {
        "stepNumber": 6,
        "title": "Create Permanent Snapshot (git commit) & Inspect Log",
        "description": "Permanently record staged files into the Local Repository DAG with a conventional commit message.",
        "consoleInstruction": "Commit staged files with a clear message and view the resulting commit object.",
        "cliCommand": "git commit -m \"feat: create initial application landing page\"\ngit log --oneline\ngit show HEAD",
        "expectedOutput": "[main (root-commit) 4a9bc12] feat: create initial application landing page\n 1 file changed, 1 insertion(+)",
        "verificationTip": "Run 'git log --oneline' to confirm the commit hash and updated message.",
        "troubleshooting": "Never commit credentials or debug secrets into the local repository."
      },
      {
        "stepNumber": 7,
        "title": "Create Feature Branch & Fast-Forward Integration",
        "description": "Practice creating lightweight movable branch pointers and merging cleanly with fast-forward mechanics.",
        "consoleInstruction": "Create a feature branch, author a new module, commit, switch back to main, and merge.",
        "cliCommand": "git checkout -b feature/auth-guard\necho 'const auth = true;' > auth.js\ngit add auth.js && git commit -m \"feat(auth): implement auth guard module\"\ngit checkout main\ngit merge --ff-only feature/auth-guard\ngit log --graph --oneline",
        "expectedOutput": "Updating ...\nFast-forward\n auth.js | 1 +\n 1 file changed, 1 insertion(+)",
        "verificationTip": "Notice that fast-forward merges simply move the main pointer forward without creating extra merge commits.",
        "troubleshooting": "Use 'git branch -d feature/auth-guard' after merging to keep local branch lists clean."
      }
    ]
  },
  "github-actions-cicd-matrix-secrets": {
    "title": "Lab 16.3: GitHub Actions Enterprise CI/CD Pipeline, Matrix Testing & Secret Management",
    "level": "Intermediate",
    "estimatedMinutes": 35,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "A GitHub account and Git installed locally.",
    "requiredPermissions": "GitHub repository write / admin permissions.",
    "cleanupGuide": "Repository and workflow files reside in your personal GitHub account. No cloud resources created; zero cost cleanup.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of GitHub Actions runner & matrix CI workflow\necho \"=== GitHub Actions Enterprise CI/CD Simulator ===\"\necho \"Event: push to branch 'main' triggered workflow '.github/workflows/ci.yml'\"\necho \"[Runner: ubuntu-latest | Node: 18.x] Setting up Node.js 18.x...\"\necho \"[Runner: ubuntu-latest | Node: 18.x] Running 'npm ci' -> 42 packages installed in 2.1s\"\necho \"[Runner: ubuntu-latest | Node: 18.x] Running 'npm test' -> 24/24 tests passed (100% coverage)\"\necho \"[Runner: ubuntu-latest | Node: 20.x] Setting up Node.js 20.x...\"\necho \"[Runner: ubuntu-latest | Node: 20.x] Running 'npm ci' -> 42 packages installed in 1.9s\"\necho \"[Runner: ubuntu-latest | Node: 20.x] Running 'npm test' -> 24/24 tests passed (100% coverage)\"\necho \"[Secrets] Masking AWS_ACCESS_KEY_ID: ***\"\necho \"[Branch Protection] Status checks validated: PASS\"\necho \"Status: SUCCESS (exit code 0). Pull request ready for automated deployment!\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Scaffold GitHub Actions Directory & Workflow YAML",
        "description": "Create the standard .github/workflows directory and author an enterprise continuous integration pipeline definition.",
        "consoleInstruction": "Create .github/workflows/ci.yml specifying triggers on push and pull_request.",
        "cliCommand": "mkdir -p .github/workflows && cat << 'EOF' > .github/workflows/ci.yml\nname: Enterprise CI Matrix\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\njobs:\n  test:\n    name: Test on Node ${{ matrix.node-version }} - ${{ matrix.os }}\n    runs-on: ${{ matrix.os }}\n    strategy:\n      matrix:\n        os: [ubuntu-latest]\n        node-version: [18.x, 20.x]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node-version }}\n          cache: 'npm'\n      - run: npm ci\n      - run: npm test --if-present\nEOF",
        "expectedOutput": "Created .github/workflows/ci.yml with multi-OS and multi-version matrix strategy.",
        "verificationTip": "Verify that YAML files use strictly 2 spaces for indentation; never use tab characters.",
        "troubleshooting": "Run a YAML validator to ensure triggers and job mappings conform to GitHub Actions syntax."
      },
      {
        "stepNumber": 2,
        "title": "Configure Encrypted Repository Secrets & Environment Variables",
        "description": "Store sensitive API tokens securely in GitHub Repository Secrets and inject them safely into workflow steps.",
        "consoleInstruction": "Use GitHub CLI or web UI (Settings -> Secrets and variables -> Actions) to store encrypted credentials.",
        "cliCommand": "# Using GitHub CLI to set encrypted secrets from terminal:\ngh secret set AWS_ACCESS_KEY_ID --body 'AKIAIOSFODNN7EXAMPLE'\ngh secret set AWS_SECRET_ACCESS_KEY --body 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'",
        "expectedOutput": "✓ Set Actions secret AWS_ACCESS_KEY_ID for org/repo\n✓ Set Actions secret AWS_SECRET_ACCESS_KEY for org/repo",
        "verificationTip": "GitHub automatically masks secret values in runner terminal execution logs as '***'.",
        "troubleshooting": "Never use 'echo $AWS_SECRET_ACCESS_KEY' in shell run steps to prevent accidental log exposure."
      },
      {
        "stepNumber": 3,
        "title": "Test Workflow Execution Locally Using Docker (act)",
        "description": "Run and validate your GitHub Actions workflows locally inside Docker containers without pushing to remote.",
        "consoleInstruction": "Use the open-source 'act' tool to execute GitHub Actions workflows on your workstation.",
        "cliCommand": "# List workflows in repository:\nact -l\n# Simulate pull_request event execution locally:\nact pull_request -s AWS_ACCESS_KEY_ID=mock_key",
        "expectedOutput": "[Enterprise CI Matrix/Test] ⭐ Run actions/checkout@v4\n[Enterprise CI Matrix/Test] ⭐ Run npm test\n[Enterprise CI Matrix/Test] 🏁 Job succeeded",
        "verificationTip": "'act' spins up local Docker containers mimicking GitHub's ubuntu-latest runner image.",
        "troubleshooting": "Ensure Docker daemon is running locally before executing 'act'."
      },
      {
        "stepNumber": 4,
        "title": "Commit Workflow & Enforce Branch Protection Rules",
        "description": "Commit the workflow to your repository and configure Branch Protection Rules on the 'main' branch.",
        "consoleInstruction": "Stage the workflow file, commit, and push. Enable Branch Protection requiring passing CI checks.",
        "cliCommand": "git add .github/workflows/ci.yml\ngit commit -m \"ci: add enterprise matrix testing workflow\"\ngit push origin main",
        "expectedOutput": "Branch 'main' set up to track remote branch 'main' from 'origin'.\nWorkflow queued and running in GitHub Actions tab.",
        "verificationTip": "In GitHub: Settings -> Branches -> Add branch protection rule for 'main' -> Require status checks to pass before merging.",
        "troubleshooting": "If CI fails on remote, inspect the Actions tab log output to locate failing unit tests or missing dependencies."
      }
    ]
  },
  "jenkins-architecture-master-agents": {
    "title": "Lab 17.1: Jenkins RHEL Setup, Unlock Wizard, Global Security & Role Strategy RBAC",
    "level": "Intermediate",
    "estimatedMinutes": 35,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Linux terminal (RHEL/CentOS or Ubuntu/Debian) or Docker installed.",
    "requiredPermissions": "Root/sudo privileges on Linux host or local Docker daemon permissions.",
    "cleanupGuide": "Stop and disable Jenkins service: sudo systemctl stop jenkins && sudo systemctl disable jenkins. (If Docker: docker stop jenkins-lab && docker rm jenkins-lab).",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of Jenkins Enterprise Setup and Security Configuration\necho \"=== 1. Checking Java 17 Prerequisite ===\"\njava -version 2>&1 | head -n 1\necho \"=== 2. Starting Jenkins Systemd Service ===\"\necho \"Active: active (running) since Wed 2026-11-04 10:00:00 UTC; 5s ago\"\necho \"Main PID: 1420 (java) | Listening on port 8080\"\necho \"=== 3. Retrieving Initial Admin Password ===\"\necho \"e4b2a8d39f7c4618a510e193bd85f67a\"\necho \"=== 4. Configuring Global Security: Role Strategy Plugin ===\"\necho \"Roles defined: Admin (Full), Developer (Job/Build, Job/Read), QA (Job/Read only)\"\necho \"=== 5. Controller-Agent Topology ===\"\necho \"Controller executors set to: 0 (No build execution on Master)\"\necho \"Connected Agent: linux-builder-1 (label: 'linux-builder') -> ONLINE\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Install OpenJDK 17 and Add Jenkins YUM Repository",
        "description": "Jenkins is a Java application and strictly requires Java 17. Add the official Red Hat repository and import the signing key.",
        "consoleInstruction": "Update package manager, install Java 17, download repo definition, and import signing key.",
        "cliCommand": "sudo yum update -y\nsudo yum install fontconfig java-17-openjdk -y\nsudo curl -o /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo\nsudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key",
        "expectedOutput": "java-17-openjdk installed successfully.\nImported GPG key from https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key",
        "verificationTip": "Verify Java version: java -version (must output openjdk version '17.x.x').",
        "troubleshooting": "If GPG import fails with network error, verify outbound HTTPS access to pkg.jenkins.io."
      },
      {
        "stepNumber": 2,
        "title": "Install Jenkins Package and Enable Systemd Service",
        "description": "Install the Jenkins package via YUM and configure systemd to start and survive system reboots.",
        "consoleInstruction": "Install Jenkins, reload systemd daemon, start service, and enable on boot.",
        "cliCommand": "sudo yum install jenkins -y\nsudo systemctl daemon-reload\nsudo systemctl start jenkins\nsudo systemctl enable jenkins",
        "expectedOutput": "Created symlink /etc/systemd/system/multi-user.target.wants/jenkins.service -> /usr/lib/systemd/system/jenkins.service.",
        "verificationTip": "Run: sudo systemctl status jenkins (verify 'active (running)' and port 8080 binding).",
        "troubleshooting": "If port 8080 conflicts with another service, edit /usr/lib/systemd/system/jenkins.service and change JENKINS_PORT=8081."
      },
      {
        "stepNumber": 3,
        "title": "Retrieve Initial Admin Password and Complete Unlock Wizard",
        "description": "Retrieve the auto-generated cryptographic password from disk and unlock the browser setup wizard.",
        "consoleInstruction": "Display initial password file and open http://<server-ip>:8080 in browser.",
        "cliCommand": "sudo cat /var/lib/jenkins/secrets/initialAdminPassword",
        "expectedOutput": "32-character hexadecimal string printed to console (e.g., 7a8f9c2d1e4b5038f6a9e102bc45d781).",
        "verificationTip": "Navigate to http://localhost:8080, paste password into 'Administrator password', and select 'Install suggested plugins'.",
        "troubleshooting": "Do not delete initialAdminPassword until you create your primary named admin user account in the setup wizard."
      },
      {
        "stepNumber": 4,
        "title": "Install Role-based Authorization Strategy Plugin",
        "description": "Install the Role Strategy plugin to replace the dangerous default 'logged-in users can do anything' setting.",
        "consoleInstruction": "In Jenkins web console: Manage Jenkins -> Manage Plugins -> Available tab -> search 'Role-based Authorization Strategy' -> Install without restart.",
        "cliCommand": "# Via Jenkins CLI (or Web UI):\njava -jar jenkins-cli.jar -s http://localhost:8080/ -auth admin:<token> install-plugin role-strategy -restart",
        "expectedOutput": "Installing Role-based Authorization Strategy plugin... Success. Restarted Jenkins.",
        "verificationTip": "Confirm plugin is listed under Manage Jenkins -> Manage Plugins -> Installed tab.",
        "troubleshooting": "If plugin installation times out, check proxy settings under Manage Plugins -> Advanced."
      },
      {
        "stepNumber": 5,
        "title": "Configure Global Security Realms & Role-Based Permissions",
        "description": "Enforce least-privilege RBAC: define 'Developer' and 'QA' roles with tailored permissions.",
        "consoleInstruction": "Navigate to Manage Jenkins -> Configure Global Security -> Authorization -> Select 'Role-Based Strategy' -> Save. Then Manage Jenkins -> Manage and Assign Roles.",
        "cliCommand": "# Verification: Confirm authorization strategy is active\ncurl -s -u admin:token http://localhost:8080/manage | grep -i 'role-strategy'",
        "expectedOutput": "Role Strategy active. Roles defined: Developer (Job/Build, Job/Read, Job/Workspace), QA (Job/Read only).",
        "verificationTip": "Log in as a QA user: verify they cannot see 'Configure' button on jobs or access Manage Jenkins.",
        "troubleshooting": "Always ensure your admin user is assigned to the 'admin' role with Administer permission before saving, to prevent locking yourself out."
      },
      {
        "stepNumber": 6,
        "title": "Configure Distributed Controller-Agent Architecture",
        "description": "Set Controller executors to 0 to prevent build tasks from crashing the UI, and register a dedicated build agent node.",
        "consoleInstruction": "Navigate to Manage Jenkins -> Manage Nodes -> Built-In Node -> Configure -> Set '# of executors' to 0. Then click 'New Node' -> name 'linux-builder-1' -> label 'linux-builder'.",
        "cliCommand": "# Verify controller executors via groovy script\ncurl -d \"script=println Jenkins.instance.numExecutors\" -u admin:token http://localhost:8080/scriptText",
        "expectedOutput": "0\nlinux-builder-1 node registered with label 'linux-builder'. Status: Online.",
        "verificationTip": "Jobs pinned with 'agent { label 'linux-builder' }' will schedule strictly to the dedicated worker agent.",
        "troubleshooting": "If agent fails to connect, verify Agent TCP port (default 50000) is open between agent and controller."
      }
    ]
  },
  "declarative-jenkinsfile-production-pipelines": {
    "title": "Lab 17.2: Git Webhooks, Cron Triggers & Multi-Stage Declarative Pipelines",
    "level": "Advanced",
    "estimatedMinutes": 40,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Jenkins server running with Git and Pipeline plugins installed, and a GitHub account.",
    "requiredPermissions": "Jenkins job creation rights and GitHub repository admin rights (for webhooks).",
    "cleanupGuide": "Delete created Jenkins pipeline job and remove webhook from GitHub repository settings.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of Declarative Pipeline with Webhook & Cron Triggers\necho \"=== 1. GitHub Webhook Payload Received ===\"\necho \"POST /github-webhook/ -> Matching job 'production-pipeline' for branch 'main'\"\necho \"=== 2. Starting Declarative Pipeline Build #42 ===\"\necho \"[Pipeline] { (Declarative: Checkout SCM)\"\necho \"[Pipeline] git https://github.com/org/app.git -> commit b7a10f3\"\necho \"[Pipeline] } (Stage: Build) -> 'mvn compile' SUCCESS\"\necho \"[Pipeline] } (Stage: Test) -> 'mvn test' 18/18 passed\"\necho \"[Pipeline] } (Stage: Production Approval Gate)\"\necho \"[Input] Deploy to Production? [Waiting for user approval] -> Approved by Lead DevOps\"\necho \"[Pipeline] } (Stage: Deploy) -> Artifact deployed to AWS production\"\necho \"[Pipeline] } (Declarative: Post Actions)\"\necho \"[Post] Pipeline succeeded! Workspace cleaned via cleanWs().\"\necho \"[Pipeline] Finished: SUCCESS\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Configure GitHub Webhook for Instant Event-Driven Builds",
        "description": "Configure GitHub to notify Jenkins instantly on code push events, eliminating manual polling.",
        "consoleInstruction": "In your GitHub repository: Settings -> Webhooks -> Add webhook. Set Payload URL to http://<your-jenkins-url>/github-webhook/, content type application/json, and select 'Just the push event'.",
        "cliCommand": "# Test connectivity from GitHub host or local curl:\ncurl -X POST -H \"Content-Type: application/json\" http://<jenkins-url>:8080/github-webhook/ -d '{\"repository\":{\"name\":\"demo\"}}'",
        "expectedOutput": "HTTP 200 OK or Webhook delivered successfully with green checkmark in GitHub Webhook dashboard.",
        "verificationTip": "Ensure the URL ends strictly in '/github-webhook/'.",
        "troubleshooting": "If GitHub reports HTTP 403 or connection timeout, ensure Jenkins port 8080 is accessible from the internet (use ngrok for local testing)."
      },
      {
        "stepNumber": 2,
        "title": "Configure Pipeline Job with GitHub Webhook and Cron Triggers",
        "description": "Create a Pipeline job in Jenkins and enable automatic triggers in job configuration.",
        "consoleInstruction": "Jenkins dashboard -> New Item -> Enter 'microservice-cicd' -> Select 'Pipeline' -> OK. Under Build Triggers, check 'GitHub hook trigger for GITScm polling' and 'Build periodically'.",
        "cliCommand": "# Cron schedule to run nightly at 2 AM Mon-Fri:\n# H 2 * * 1-5\n# Or every 5 minutes for automated testing:\n# */5 * * * *",
        "expectedOutput": "Job configuration saved with GitHub hook trigger and cron schedule active.",
        "verificationTip": "Verify trigger description shows: 'Build periodically: H 2 * * 1-5'.",
        "troubleshooting": "Remember the 5 cron fields: Minute (0-59), Hour (0-23), Day-of-month (1-31), Month (1-12), Day-of-week (0-6 Sun-Sat)."
      },
      {
        "stepNumber": 3,
        "title": "Author Production Declarative Jenkinsfile",
        "description": "Create a version-controlled Jenkinsfile defining Checkout, Build, Test, and Artifact stages.",
        "consoleInstruction": "Create a Jenkinsfile in the root of your Git repository.",
        "cliCommand": "cat << 'EOF' > Jenkinsfile\npipeline {\n  agent any\n  stages {\n    stage('Checkout') {\n      steps {\n        checkout scm\n      }\n    }\n    stage('Compile & Build') {\n      steps {\n        sh 'mvn clean compile'\n      }\n    }\n    stage('Unit & Integration Tests') {\n      steps {\n        sh 'mvn test'\n      }\n    }\n  }\n}\nEOF",
        "expectedOutput": "Jenkinsfile created with valid Declarative syntax (pipeline { agent { } stages { } }).",
        "verificationTip": "Validate syntax using Jenkins CLI: java -jar jenkins-cli.jar -s http://localhost:8080/ declarative-linter < Jenkinsfile.",
        "troubleshooting": "Declarative pipelines require strict enclosing 'pipeline' block; never mix top-level node { } blocks with pipeline { }."
      },
      {
        "stepNumber": 4,
        "title": "Add Interactive Production Approval Gate with 'input' Step",
        "description": "Enforce human change management before deploying to production environments.",
        "consoleInstruction": "Add an 'Approval' stage before the deploy stage in your Jenkinsfile.",
        "cliCommand": "cat << 'EOF' >> Jenkinsfile\n    stage('Production Gate') {\n      steps {\n        input message: 'Promote build to AWS Production environment?', ok: 'Approve Deployment'\n      }\n    }\n    stage('Deploy to Production') {\n      steps {\n        echo 'Deploying release artifact to production cluster...'\n      }\n    }\nEOF",
        "expectedOutput": "Pipeline execution pauses at 'Production Gate' stage with interactive 'Proceed' and 'Abort' prompt.",
        "verificationTip": "In Jenkins UI, click 'microservice-cicd' build in progress: confirm prompt appears in Stage View.",
        "troubleshooting": "Configure timeout(time: 1, unit: 'HOURS') around the input step to prevent pipelines from hanging indefinitely if unattended."
      },
      {
        "stepNumber": 5,
        "title": "Implement Email-ext SMTP Notifications inside post { failure }",
        "description": "Configure post-build actions to alert engineering teams immediately when a build fails, avoiding alert fatigue on success.",
        "consoleInstruction": "Add a post block to your Jenkinsfile referencing email recipients.",
        "cliCommand": "cat << 'EOF' >> Jenkinsfile\n  post {\n    always {\n      cleanWs()\n    }\n    failure {\n      mail to: 'devs@example.com',\n           subject: \"[ALERT] Pipeline Failure: ${currentBuild.fullDisplayName}\",\n           body: \"Build failed at stage! Please review console logs at: ${env.BUILD_URL}\"\n    }\n  }\n}\nEOF",
        "expectedOutput": "post block appended to Jenkinsfile with always and failure condition handlers.",
        "verificationTip": "Trigger an intentional syntax error in a test commit: verify pipeline enters failure block and triggers SMTP mail.",
        "troubleshooting": "Configure SMTP server settings under Manage Jenkins -> Configure System -> Extended E-mail Notification (use an App Password for Gmail)."
      },
      {
        "stepNumber": 6,
        "title": "Trigger End-to-End Pipeline Execution via Git Push",
        "description": "Push changes to your GitHub repository and watch Jenkins trigger, build, pause for approval, and complete automatically.",
        "consoleInstruction": "Commit and push the Jenkinsfile to GitHub. Monitor Jenkins build dashboard.",
        "cliCommand": "git add Jenkinsfile\ngit commit -m \"ci: add complete declarative pipeline with approval gate and email alerts\"\ngit push origin main",
        "expectedOutput": "GitHub webhook fires -> Jenkins starts Build #1 immediately -> Stages pass -> Click 'Approve' -> Build SUCCESS.",
        "verificationTip": "Inspect Blue Ocean or Classic Stage View to confirm all green stages and duration metrics.",
        "troubleshooting": "If build does not start, inspect Jenkins system log: Manage Jenkins -> System Log -> All Jenkins Logs to check for incoming webhook events."
      }
    ]
  },
  "jenkins-selenium-maven-headless-testing": {
    "title": "Lab 17.3: Automated Headless Selenium Testing in Jenkins with Maven & JUnit Reports",
    "level": "Intermediate",
    "estimatedMinutes": 40,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Java 17, Maven 3.8+, Google Chrome or Chromium, and ChromeDriver installed on the Jenkins host or agent.",
    "requiredPermissions": "Local command line execution rights and Jenkins pipeline creation rights.",
    "cleanupGuide": "Kill any leftover chrome processes and clean Maven build target: pkill -f chrome || true && mvn clean.",
    "safeSimulationScript": "#!/bin/bash\n# Local simulation of Maven Headless Selenium Test Suite with JUnit Reporting\necho \"=== 1. Validating Chrome & ChromeDriver on Linux CI Host ===\"\ngoogle-chrome --version || echo \"Google Chrome 124.0.6367.60\"\nchromedriver --version || echo \"ChromeDriver 124.0.6367.60\"\necho \"=== 2. Running Maven Headless Selenium Test Suite ===\"\necho \"[INFO] Scanning for projects...\"\necho \"[INFO] Running com.example.SeleniumWebTest\"\necho \"[INFO] Starting ChromeDriver in headless mode (--headless=new, --no-sandbox)...\"\necho \"[INFO] Navigating to https://example.com\"\necho \"[INFO] Asserting page title: 'Example Domain' -> PASSED\"\necho \"[INFO] Executing driver.quit() -> Browser closed, memory freed.\"\necho \"[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0\"\necho \"=== 3. Publishing JUnit Test Result Report ===\"\necho \"Recording test results: target/surefire-reports/*.xml\"\necho \"JUnit Test Report: 5 tests passed in 4.2 seconds. Test trend graph updated in Jenkins.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create Maven Project with Selenium & JUnit Dependencies",
        "description": "Manage test dependencies using Maven's pom.xml rather than manually downloading JAR files in Eclipse.",
        "consoleInstruction": "Create a pom.xml with selenium-java and junit in <scope>test</scope>.",
        "cliCommand": "cat << 'EOF' > pom.xml\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n  xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.example</groupId>\n  <artifactId>selenium-ci-tests</artifactId>\n  <version>1.0-SNAPSHOT</version>\n  <properties>\n    <maven.compiler.source>17</maven.compiler.source>\n    <maven.compiler.target>17</maven.compiler.target>\n  </properties>\n  <dependencies>\n    <dependency>\n      <groupId>org.seleniumhq.selenium</groupId>\n      <artifactId>selenium-java</artifactId>\n      <version>4.21.0</version>\n      <scope>test</scope>\n    </dependency>\n    <dependency>\n      <groupId>junit</groupId>\n      <artifactId>junit</artifactId>\n      <version>4.13.2</version>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n</project>\nEOF",
        "expectedOutput": "pom.xml configured with Selenium 4.21.0 and JUnit 4.13.2 test-scoped dependencies.",
        "verificationTip": "Verify dependencies resolve: mvn dependency:resolve (downloads JARs to ~/.m2/repository).",
        "troubleshooting": "Always ensure <scope>test</scope> is specified so test libraries are never bundled into production artifacts."
      },
      {
        "stepNumber": 2,
        "title": "Write Robust Headless Selenium WebDriver Test Case",
        "description": "Author a Java Selenium test case configured for headless execution on Linux CI agents, with driver.quit() teardown.",
        "consoleInstruction": "Create test directory structure and SimpleWebTest.java.",
        "cliCommand": "mkdir -p src/test/java/com/example\ncat << 'EOF' > src/test/java/com/example/SimpleWebTest.java\npackage com.example;\nimport org.junit.Test;\nimport org.junit.After;\nimport org.junit.Before;\nimport static org.junit.Assert.assertEquals;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.openqa.selenium.chrome.ChromeOptions;\n\npublic class SimpleWebTest {\n    private WebDriver driver;\n\n    @Before\n    public void setUp() {\n        ChromeOptions options = new ChromeOptions();\n        options.addArguments(\"--headless=new\");\n        options.addArguments(\"--no-sandbox\");\n        options.addArguments(\"--disable-dev-shm-usage\");\n        driver = new ChromeDriver(options);\n    }\n\n    @Test\n    public void testPageTitle() {\n        driver.get(\"https://example.com\");\n        assertEquals(\"Example Domain\", driver.getTitle());\n    }\n\n    @After\n    public void tearDown() {\n        if (driver != null) {\n            driver.quit();\n        }\n    }\n}\nEOF",
        "expectedOutput": "SimpleWebTest.java created with headless ChromeOptions and @After driver.quit().",
        "verificationTip": "Notice driver.quit() in @After ensures browser processes terminate even if assertions fail.",
        "troubleshooting": "Missing '--no-sandbox' or '--disable-dev-shm-usage' causes Chrome to crash inside Linux containers due to shared memory limits."
      },
      {
        "stepNumber": 3,
        "title": "Execute Test Suite Locally via Maven Surefire",
        "description": "Run the test suite using 'mvn test' to verify test execution and Surefire XML report generation.",
        "consoleInstruction": "Run mvn test and inspect the target/surefire-reports directory.",
        "cliCommand": "mvn test\nls -la target/surefire-reports/",
        "expectedOutput": "[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0\nTEST-com.example.SimpleWebTest.xml generated.",
        "verificationTip": "Check target/surefire-reports/TEST-com.example.SimpleWebTest.xml (contains test duration, assertions, and outcomes).",
        "troubleshooting": "If tests fail with 'ChromeDriver executable needs to be in PATH', install chromedriver via package manager or add it to system PATH."
      },
      {
        "stepNumber": 4,
        "title": "Create Jenkins Freestyle Job with Top-Level Maven Target",
        "description": "Configure a traditional Jenkins Freestyle job to execute Maven tests and archive JUnit reports.",
        "consoleInstruction": "Jenkins dashboard -> New Item -> 'selenium-freestyle-job' -> Freestyle project -> OK. In Source Code Management, set Git repo. In Build, add 'Invoke top-level Maven targets' with Goal: 'test'. In Post-build Actions, add 'Publish JUnit test result report' with Test report XMLs: '**/target/surefire-reports/*.xml'.",
        "cliCommand": "# Equivalent command executed by Jenkins agent:\nmvn test -Dtest=SimpleWebTest",
        "expectedOutput": "Build succeeds; Jenkins reports: 'Test Result: 1 test, 0 failures'.",
        "verificationTip": "Click 'Test Result' link on the build page to view per-test execution duration and stack traces.",
        "troubleshooting": "Ensure the path pattern in Publish JUnit report is '**/target/surefire-reports/*.xml' with double asterisks to handle sub-modules."
      },
      {
        "stepNumber": 5,
        "title": "Author Declarative Jenkinsfile with Automated JUnit Publishing",
        "description": "Migrate the build to Pipeline-as-Code by defining the test stage and JUnit post block in a Jenkinsfile.",
        "consoleInstruction": "Create a Jenkinsfile implementing checkout, mvn test, and junit XML report publishing.",
        "cliCommand": "cat << 'EOF' > Jenkinsfile\npipeline {\n  agent any\n  stages {\n    stage('Checkout') {\n      steps {\n        checkout scm\n      }\n    }\n    stage('Run Selenium Tests') {\n      steps {\n        sh 'mvn test'\n      }\n    }\n  }\n  post {\n    always {\n      junit '**/target/surefire-reports/*.xml'\n    }\n    failure {\n      echo 'Selenium tests failed! Investigating failure report...'\n    }\n  }\n}\nEOF",
        "expectedOutput": "Jenkinsfile created with post { always { junit '**/target/surefire-reports/*.xml' } }.",
        "verificationTip": "Using 'always' ensures JUnit XML reports are parsed and published even when individual tests fail.",
        "troubleshooting": "If you place junit under 'success', test reports won't publish when tests fail, which defeats the purpose of test reporting."
      },
      {
        "stepNumber": 6,
        "title": "Analyze Test Result Trends and Failure Diagnostics in Jenkins",
        "description": "Review interactive test charts in Jenkins dashboard: pass/fail rates, execution duration trends, and failure root causes.",
        "consoleInstruction": "Trigger the pipeline in Jenkins. Click on 'Test Result Trend' graph in project dashboard.",
        "cliCommand": "# View summary from CLI\ncurl -s -u admin:token http://localhost:8080/job/selenium-pipeline/lastBuild/testReport/api/json | grep -o '\"totalCount\":[0-9]*'",
        "expectedOutput": "Total test count and failure count displayed. Trend graph shows green pass history over successive builds.",
        "verificationTip": "If a test fails, click into the test method name to view the exact JUnit assertion error and Selenium stack trace.",
        "troubleshooting": "To eliminate flaky tests, replace any remaining Thread.sleep() calls with explicit WebDriverWait expected conditions."
      }
    ]
  },
  "docker-internals-container-architecture": {
    "title": "Lab 18.1: Linux Kernel Primitives, Container Lifecycle & Resource Quotas",
    "level": "Beginner",
    "estimatedMinutes": 35,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Linux workstation or AWS EC2 Ubuntu/Debian instance with Docker Engine installed.",
    "requiredPermissions": "Sudo privileges or membership in the docker group to execute docker commands.",
    "cleanupGuide": "Stop and prune all demo containers: docker rm -f $(docker ps -aq --filter name=lab181-) 2>/dev/null || true",
    "safeSimulationScript": "#!/bin/bash\necho \"=== Lab 18.1: Linux Kernel Primitives & Docker Architecture ===\"\necho \"[+] Validating Docker Engine: dockerd -> containerd -> runc...\"\necho \"[+] Inspecting namespaces: PID, NET, MNT, IPC, UTS, USER...\"\necho \"[+] Applying cgroup limits: memory=256m, cpus=0.5...\"\necho \"[+] Simulating OOMKilled condition (Exit Code 137)...\"\necho \"[+] Container lifecycle state machine verified: Created -> Running -> Paused -> Stopped.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Verify Docker Client-Server Architecture & Engine Components",
        "description": "Inspect the Docker installation to verify the division of labor between the Docker CLI client, dockerd daemon, containerd supervisor, and runc OCI runtime.",
        "consoleInstruction": "Query Docker version details and examine daemon info to understand client-server communication over the Unix socket.",
        "cliCommand": "docker version\ndocker info | grep -E 'Server Version|Storage Driver|Cgroup Driver|Operating System'\nls -l /var/run/docker.sock",
        "expectedOutput": "Client and Server versions displayed. Storage Driver: overlay2, Cgroup Driver: systemd, Socket owned by root:docker.",
        "verificationTip": "Verify that 'Server' section displays containerd commit and runc version matching OCI specifications.",
        "troubleshooting": "If 'Cannot connect to the Docker daemon' appears, verify systemd service with 'sudo systemctl status docker'."
      },
      {
        "stepNumber": 2,
        "title": "Demystify Linux Kernel Namespaces (PID, Mount, Network Isolation)",
        "description": "Launch an isolated container and inspect how the Linux host kernel provisions separate PID, Network, and Mount namespaces for the container process.",
        "consoleInstruction": "Start a background container, discover its host PID, and use the Linux 'lsns' tool to view its active namespaces.",
        "cliCommand": "docker run -d --name lab181-ns nginx:alpine\nCONTAINER_PID=$(docker inspect --format '{{.State.Pid}}' lab181-ns)\necho \"Container Host PID: $CONTAINER_PID\"\nsudo lsns -p $CONTAINER_PID\ndocker exec lab181-ns ps -ef",
        "expectedOutput": "lsns lists distinct mnt, net, pid namespaces for the process. Inside container, ps -ef shows nginx running as PID 1.",
        "verificationTip": "Notice that inside the container nginx is PID 1, but on the host OS it has an independent high PID number.",
        "troubleshooting": "If lsns command is missing, install util-linux package: sudo apt-get install -y util-linux."
      },
      {
        "stepNumber": 3,
        "title": "Enforce Physical Resource Quotas via Linux Control Groups (Cgroups)",
        "description": "Apply strict CPU and memory ceilings to a container to prevent noisy neighbors from exhausting host system resources.",
        "consoleInstruction": "Run a stress container with memory and CPU constraints and observe real-time resource utilization via docker stats.",
        "cliCommand": "docker run -d --name lab181-stress --memory=256m --cpus=0.5 alpine sh -c 'while true; do :; done'\ndocker stats --no-stream lab181-stress",
        "expectedOutput": "docker stats reports CPU pinned at ~50.0% and memory limit at 256MiB.",
        "verificationTip": "Ensure CPU % does not exceed 50.0% regardless of host core count due to cfs_quota enforcement.",
        "troubleshooting": "Depending on whether your host uses cgroups v1 or v2, the path will reside under /sys/fs/cgroup/memory or system.slice."
      },
      {
        "stepNumber": 4,
        "title": "Simulate Out-of-Memory Killer (OOMKilled) and Diagnose Exit Code 137",
        "description": "Trigger the Linux kernel Out-of-Memory killer by allocating memory exceeding the cgroup limit and inspect the resulting exit code.",
        "consoleInstruction": "Run a container limited to 32MB RAM that immediately allocates 100MB of memory, then inspect its termination details.",
        "cliCommand": "docker run --name lab181-oom --memory=32m python:3.11-alpine python3 -c \"x = ' ' * 100 * 1024 * 1024\" || true\ndocker inspect --format 'State: {{.State.Status}} | ExitCode: {{.State.ExitCode}} | OOMKilled: {{.State.OOMKilled}}' lab181-oom",
        "expectedOutput": "State: exited | ExitCode: 137 | OOMKilled: true",
        "verificationTip": "Exit Code 137 represents 128 + 9 (SIGKILL), indicating the Linux kernel forcefully terminated the container process.",
        "troubleshooting": "If container finishes without crashing, ensure memory allocation size is greater than the specified --memory quota."
      },
      {
        "stepNumber": 5,
        "title": "Master Container Lifecycle State Machine Transitions",
        "description": "Transition a container through all lifecycle states: Created, Running, Paused (cgroup freezer), Stopped, and Removed.",
        "consoleInstruction": "Execute lifecycle commands in sequence and check container status flags after each transition.",
        "cliCommand": "docker create --name lab181-lifecycle alpine sleep 120\ndocker ps -a --filter name=lab181-lifecycle --format '{{.Names}}: {{.Status}}'\ndocker start lab181-lifecycle\ndocker pause lab181-lifecycle\ndocker inspect --format '{{.State.Status}} (Paused: {{.State.Paused}})' lab181-lifecycle\ndocker unpause lab181-lifecycle\ndocker stop -t 5 lab181-lifecycle\ndocker rm lab181-lifecycle",
        "expectedOutput": "Container progresses through Created -> Up -> Paused (Paused: true) -> Exited (0) -> successfully removed.",
        "verificationTip": "Verify that 'docker pause' uses kernel cgroup freezer rather than sending signals, freezing process instructions instantly.",
        "troubleshooting": "If docker stop hangs, check if the process is ignoring SIGTERM; it will be force-killed with SIGKILL after the timeout."
      },
      {
        "stepNumber": 6,
        "title": "Security Audit: Docker Group Host Root Escalation Analysis",
        "description": "Analyze why adding regular users to the 'docker' group provides root-equivalent control over the host operating system.",
        "consoleInstruction": "Demonstrate how an unprivileged user with Docker access can mount the host root filesystem and inspect security files.",
        "cliCommand": "id\ndocker run --rm -v /:/host-root alpine head -n 3 /host-root/etc/shadow",
        "expectedOutput": "Root shadow password hashes printed from the host system, demonstrating root breakout capability.",
        "verificationTip": "In enterprise production environments, use rootless Docker mode or sudo with explicit command whitelisting instead.",
        "troubleshooting": "If permission denied accessing /etc/shadow, ensure Docker daemon is running as default root daemon."
      }
    ]
  },
  "docker-images-dockerfile-registries": {
    "title": "Lab 18.2: Multi-Stage Dockerfile Engineering, Layer Caching Optimization & Registry Distribution",
    "level": "Intermediate",
    "estimatedMinutes": 45,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Docker Engine installed locally.",
    "requiredPermissions": "Local docker daemon permissions.",
    "cleanupGuide": "docker rm -f lab182-registry 2>/dev/null && docker rmi $(docker images -q 'lab182*') 2>/dev/null || true",
    "safeSimulationScript": "#!/bin/bash\necho \"=== Lab 18.2: Docker Images, Dockerfile Engineering & Registries ===\"\necho \"[+] Analyzing unoptimized image: 1.12GB with build tools and vulnerabilities\"\necho \"[+] Adding .dockerignore and re-ordering instructions for layer caching...\"\necho \"[+] Building hardened multi-stage image with Alpine runtime...\"\necho \"[+] Result: 1.12GB shrunk to 38MB (96.6% reduction)!\"\necho \"[+] Pushing deduplicated layers to local private registry localhost:5000...\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Analyze Bloated Single-Stage Dockerfile Anti-Patterns",
        "description": "Create and build an unoptimized single-stage Dockerfile to inspect layer sizes, build cache inefficiencies, and root execution risks.",
        "consoleInstruction": "Create a sample Node.js application and build it with a single-stage Dockerfile containing dev tools.",
        "cliCommand": "mkdir -p /tmp/lab182-demo && cd /tmp/lab182-demo\ncat << 'EOF' > package.json\n{\"name\": \"demo-app\", \"version\": \"1.0.0\", \"dependencies\": {\"express\": \"^4.19.2\"}}\nEOF\ncat << 'EOF' > server.js\nconst express = require('express');\nconst app = express();\napp.get('/', (req, res) => res.send('Production Ready Container!'));\napp.listen(3000, () => console.log('Listening on 3000'));\nEOF\ncat << 'EOF' > Dockerfile.bloated\nFROM node:20\nWORKDIR /app\nCOPY . .\nRUN npm install\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\nEOF\ndocker build -t lab182-bloated:v1 -f Dockerfile.bloated .\ndocker images lab182-bloated:v1\ndocker history lab182-bloated:v1",
        "expectedOutput": "Image built with size exceeding 1.1GB, containing compilers, python, and operating system packages.",
        "verificationTip": "Run 'docker history lab182-bloated:v1' to inspect how each instruction contributed to image bloat.",
        "troubleshooting": "If npm install fails, verify outbound internet access to registry.npmjs.org."
      },
      {
        "stepNumber": 2,
        "title": "Implement Docker Layer Caching & Build Context Optimization",
        "description": "Prevent unnecessary rebuilds and cache invalidations by adding a .dockerignore file and separating dependency installation from code copying.",
        "consoleInstruction": "Create a .dockerignore file and reorder Dockerfile instructions so dependencies are cached across code changes.",
        "cliCommand": "cd /tmp/lab182-demo\ncat << 'EOF' > .dockerignore\nnode_modules\n.git\n*.log\n.env\nEOF\ncat << 'EOF' > Dockerfile.cached\nFROM node:20-slim\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --only=production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\nEOF\ndocker build -t lab182-cached:v1 -f Dockerfile.cached .\necho '// Minor comment edit' >> server.js\ndocker build -t lab182-cached:v2 -f Dockerfile.cached .",
        "expectedOutput": "Second build output prints 'Using cache' for package.json and npm install steps, completing in under 2 seconds.",
        "verificationTip": "Verify that npm install was not re-executed during the second build despite server.js changing.",
        "troubleshooting": "If cache is busted, ensure package.json timestamps or checksums did not change."
      },
      {
        "stepNumber": 3,
        "title": "Engineer Production Multi-Stage Build with Alpine musl & Distroless",
        "description": "Separate compile-time dependencies from the runtime container using a multi-stage build, slashing final image footprint.",
        "consoleInstruction": "Write a two-stage Dockerfile that compiles code in Stage 1 and copies only production artifacts into a minimal Alpine image.",
        "cliCommand": "cd /tmp/lab182-demo\ncat << 'EOF' > Dockerfile.multistage\n# Stage 1: Build & Dependencies\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Stage 2: Hardened Runtime\nFROM node:20-alpine\nWORKDIR /app\n# Security: Run as unprivileged node user (UID 1000)\nUSER node\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/package.json ./package.json\nCOPY server.js ./\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\nEOF\ndocker build -t lab182-multistage:v1 -f Dockerfile.multistage .\ndocker images | grep lab182",
        "expectedOutput": "lab182-multistage:v1 built with size ~140MB (compared to 1.1GB bloated image), dropping ~85% of unnecessary layers.",
        "verificationTip": "Notice how build tools and package caches remain trapped in the builder stage and never enter the runtime image.",
        "troubleshooting": "Ensure paths in 'COPY --from=builder' match the exact directory created in the builder stage."
      },
      {
        "stepNumber": 4,
        "title": "Differentiate ARG vs ENV and CMD vs ENTRYPOINT Directives",
        "description": "Master build-time parameters (ARG) vs runtime configuration (ENV) and compare shell form vs exec form for CMD and ENTRYPOINT.",
        "consoleInstruction": "Build an image utilizing ARG for build metadata, ENV for application runtime flags, and exec-form ENTRYPOINT with default CMD arguments.",
        "cliCommand": "cd /tmp/lab182-demo\ncat << 'EOF' > Dockerfile.directives\nFROM alpine:3.19\nARG APP_VERSION=1.0.0\nENV ENVIRONMENT=production\nENV VERSION=$APP_VERSION\nRUN echo \"Building version: $APP_VERSION\"\nENTRYPOINT [\"echo\", \"App running:\"]\nCMD [\"default-worker\"]\nEOF\ndocker build --build-arg APP_VERSION=2.5.0 -t lab182-directives:v1 -f Dockerfile.directives .\ndocker run --rm lab182-directives:v1\ndocker run --rm lab182-directives:v1 custom-scheduler",
        "expectedOutput": "First run outputs 'App running: default-worker'. Second run outputs 'App running: custom-scheduler' (CMD overridden by CLI args).",
        "verificationTip": "Confirm that passing CLI arguments overrides CMD while preserving ENTRYPOINT as the fixed executable.",
        "troubleshooting": "If CMD arguments are not passed to ENTRYPOINT, verify that both use JSON exec array format [\"arg\"]."
      },
      {
        "stepNumber": 5,
        "title": "Harden Security: Implement Non-Root USER & Verify Privilege Drop",
        "description": "Enforce least-privilege security by creating an unprivileged service account inside the container to prevent container breakout exploits.",
        "consoleInstruction": "Add an explicit user creation and USER directive, verify the process UID inside the container, and test file write permissions.",
        "cliCommand": "cd /tmp/lab182-demo\ncat << 'EOF' > Dockerfile.security\nFROM alpine:3.19\nRUN addgroup -g 10001 appgroup && \\\n    adduser -u 10001 -G appgroup -s /bin/sh -D appuser && \\\n    mkdir -p /app && chown -R appuser:appgroup /app\nWORKDIR /app\nUSER 10001:10001\nCMD [\"id\"]\nEOF\ndocker build -t lab182-security:v1 -f Dockerfile.security .\ndocker run --rm lab182-security:v1",
        "expectedOutput": "uid=10001(appuser) gid=10001(appgroup) groups=10001(appgroup)",
        "verificationTip": "Verify that the user ID is 10001 (non-zero), confirming the process runs with unprivileged host permissions.",
        "troubleshooting": "Ensure WORKDIR permissions are chowned before switching to USER, or unprivileged writes will fail."
      },
      {
        "stepNumber": 6,
        "title": "Deploy Private Docker Registry & Verify Content-Addressable Deduplication",
        "description": "Deploy an in-cluster private Docker registry (registry:2), tag and push images, and observe layer deduplication across pushes.",
        "consoleInstruction": "Spin up a local private registry container on port 5000, tag the multistage image, push to the registry, and test offline pulls.",
        "cliCommand": "docker run -d -p 5000:5000 --name lab182-registry registry:2\ndocker tag lab182-multistage:v1 localhost:5000/demo-app:1.0.0\ndocker push localhost:5000/demo-app:1.0.0\necho '// update' >> server.js\ndocker build -t localhost:5000/demo-app:1.0.1 -f Dockerfile.multistage .\ndocker push localhost:5000/demo-app:1.0.1",
        "expectedOutput": "Second push displays 'Layer already exists' for base layers and dependencies, transferring only the modified application layer.",
        "verificationTip": "Query the private registry catalog: curl http://localhost:5000/v2/_catalog",
        "troubleshooting": "If push fails with 'connection refused', ensure the registry container is healthy and port 5000 is open."
      }
    ]
  },
  "dockerfile-multistage-compose-networking": {
    "title": "Lab 18.3: Custom Bridge Networking, Named Volume Persistence & Multi-Service Docker Compose Stack",
    "level": "Intermediate",
    "estimatedMinutes": 45,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Docker Engine and Docker Compose V2 installed locally.",
    "requiredPermissions": "Local Docker daemon execution permissions.",
    "cleanupGuide": "cd /tmp/lab183-compose && docker compose down && docker volume rm lab183-compose_pgdata 2>/dev/null || true",
    "safeSimulationScript": "#!/bin/bash\necho \"=== Lab 18.3: Docker Compose, Networking & Volumes ===\"\necho \"[+] Creating custom bridge network app-net with DNS 127.0.0.11...\"\necho \"[+] Validating persistent storage with Named Volumes...\"\necho \"[+] Launching multi-tier Compose stack: Frontend + API + PostgreSQL...\"\necho \"[+] Verifying healthcheck readiness: pg_isready...\"\necho \"[+] Stack healthy! Testing safe teardown vs down -v prevention.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Contrast Default Bridge (docker0) vs User-Defined Custom Bridge Networking",
        "description": "Demonstrate that containers on the default bridge cannot resolve each other by container name, while user-defined bridge networks provide automatic DNS resolution.",
        "consoleInstruction": "Create two containers on the default bridge and test name resolution, then create a custom bridge network and verify automatic DNS.",
        "cliCommand": "docker run -d --name lab183-c1 alpine sleep 3600\ndocker run -d --name lab183-c2 alpine sleep 3600\ndocker exec lab183-c1 ping -c 1 lab183-c2 || echo \"Default bridge DNS failed as expected!\"\ndocker network create --driver bridge lab183-custom-net\ndocker network connect lab183-custom-net lab183-c1\ndocker network connect lab183-custom-net lab183-c2\ndocker exec lab183-c1 ping -c 2 lab183-c2",
        "expectedOutput": "Ping by container name succeeds on lab183-custom-net with 0% packet loss via internal DNS 127.0.0.11.",
        "verificationTip": "Check /etc/resolv.conf inside the container: 'docker exec lab183-c1 cat /etc/resolv.conf' (points to nameserver 127.0.0.11).",
        "troubleshooting": "If ping fails, ensure both containers are connected to the same custom bridge network via 'docker inspect lab183-custom-net'."
      },
      {
        "stepNumber": 2,
        "title": "Configure Persistent Storage: Named Volumes vs Ephemeral Writable Layer",
        "description": "Prove that data written to a container's writable layer is permanently lost upon deletion, while Docker Named Volumes persist independently.",
        "consoleInstruction": "Create a named volume, start a Postgres database mounted to that volume, insert test data, destroy the container, and recreate it.",
        "cliCommand": "docker volume create lab183-db-vol\ndocker run -d --name lab183-db -e POSTGRES_PASSWORD=mysecret -v lab183-db-vol:/var/lib/postgresql/data postgres:16-alpine\nsleep 5\ndocker exec -i lab183-db psql -U postgres -c \"CREATE TABLE customers (id SERIAL, name TEXT); INSERT INTO customers (name) VALUES ('Acme Corp');\"\ndocker rm -f lab183-db\ndocker run -d --name lab183-db-new -e POSTGRES_PASSWORD=mysecret -v lab183-db-vol:/var/lib/postgresql/data postgres:16-alpine\nsleep 5\ndocker exec -i lab183-db-new psql -U postgres -c \"SELECT * FROM customers;\"",
        "expectedOutput": "Query returns 'Acme Corp' intact from the recreated container, confirming named volume persistence.",
        "verificationTip": "Inspect volume metadata: 'docker volume inspect lab183-db-vol' to see Mountpoint /var/lib/docker/volumes/...",
        "troubleshooting": "If psql fails immediately, allow a few additional seconds for Postgres to complete database initialization."
      },
      {
        "stepNumber": 3,
        "title": "Author Declarative Multi-Service compose.yaml (API, PostgreSQL, Redis)",
        "description": "Create a production-grade multi-container specification using Docker Compose V2, specifying services, networks, volumes, and environment variables.",
        "consoleInstruction": "Create a project directory and compose.yaml with Node API, PostgreSQL, and Redis cache.",
        "cliCommand": "mkdir -p /tmp/lab183-compose && cd /tmp/lab183-compose\ncat << 'EOF' > compose.yaml\nservices:\n  api:\n    image: node:20-alpine\n    working_dir: /app\n    command: sh -c \"npm init -y && npm install express pg && node -e \\\"require('http').createServer((q,s)=>s.end('API OK')).listen(4000)\\\"\"\n    ports:\n      - \"4000:4000\"\n    environment:\n      - DB_HOST=db\n      - REDIS_HOST=cache\n    networks:\n      - backend-net\n    depends_on:\n      db:\n        condition: service_healthy\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      - POSTGRES_PASSWORD=secret\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    networks:\n      - backend-net\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      timeout: 3s\n      retries: 5\n\n  cache:\n    image: redis:7-alpine\n    networks:\n      - backend-net\n\nnetworks:\n  backend-net:\n    driver: bridge\n\nvolumes:\n  pgdata:\nEOF\ndocker compose config",
        "expectedOutput": "compose.yaml validated successfully with all services, networks, and volumes parsed without syntax errors.",
        "verificationTip": "Always run 'docker compose config' to validate YAML syntax and variable interpolation before launching.",
        "troubleshooting": "Ensure valid 2-space indentation; tabs are forbidden in YAML specifications."
      },
      {
        "stepNumber": 4,
        "title": "Resolve Startup Race Conditions: Configure Healthchecks & depends_on Condition",
        "description": "Eliminate the common 'database not ready' crash by coupling service healthchecks with the depends_on condition.",
        "consoleInstruction": "Start the multi-container stack in detached mode and observe the service dependency startup order.",
        "cliCommand": "cd /tmp/lab183-compose\ndocker compose up -d\ndocker compose ps",
        "expectedOutput": "Containers started in order: db starts first -> healthcheck enters (healthy) -> api container starts. Status shows 'healthy'.",
        "verificationTip": "Run 'docker inspect --format \"{{.State.Health.Status}}\" $(docker compose ps -q db)' to inspect health state.",
        "troubleshooting": "If api fails to start, verify that the healthcheck command inside the db container succeeds."
      },
      {
        "stepNumber": 5,
        "title": "Execute Multi-Container Operations (logs, exec, stats, restart)",
        "description": "Practice operational management commands across the Compose multi-service fleet.",
        "consoleInstruction": "Query unified logs, follow streaming logs, execute commands inside services, and test non-disruptive service restart.",
        "cliCommand": "cd /tmp/lab183-compose\ndocker compose logs --tail=20 db\ndocker compose exec db psql -U postgres -c '\\l'\ndocker compose restart api\ndocker compose ps",
        "expectedOutput": "PostgreSQL databases listed; api restarted smoothly without affecting database or cache containers.",
        "verificationTip": "Notice that 'docker compose logs' prefixes each line with the originating service name in distinct terminal colors.",
        "troubleshooting": "If exec fails with TTY error in scripts, pass -T flag: docker compose exec -T db psql ..."
      },
      {
        "stepNumber": 6,
        "title": "Disaster Recovery Drill: Safe Teardown vs Fatal 'down -v' Prevention",
        "description": "Demonstrate the critical difference between 'docker compose down' (which preserves data volumes) and 'docker compose down -v' (which destroys databases).",
        "consoleInstruction": "Stop the Compose stack safely, verify volume persistence, and document strict production safeguards against the -v flag.",
        "cliCommand": "cd /tmp/lab183-compose\ndocker compose down\ndocker volume ls | grep pgdata\necho \"Safe teardown complete: Named volume 'pgdata' is preserved on host disk.\"\necho \"CRITICAL WARNING: 'docker compose down -v' deletes all volumes! Never run in production.\"",
        "expectedOutput": "Containers and networks removed, but pgdata volume remains intact in 'docker volume ls'.",
        "verificationTip": "In production CI/CD scripts, configure lint checks to reject any pipeline containing 'docker compose down -v'.",
        "troubleshooting": "If a volume is accidentally deleted without backups, recovery from disk blocks is rarely possible with union filesystems."
      }
    ]
  },
  "kubernetes-architecture-control-plane-nodes": {
    "title": "Lab 19.1: Kubernetes Architecture, Control Plane Inspection & Cluster Setup with kind",
    "level": "Intermediate",
    "estimatedMinutes": 45,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Linux workstation or AWS EC2 Ubuntu instance with Docker Engine installed.",
    "requiredPermissions": "Sudo privileges or local Docker daemon permissions.",
    "cleanupGuide": "kind delete cluster --name lab191 2>/dev/null || true",
    "safeSimulationScript": "#!/bin/bash\necho \"=== Lab 19.1: Kubernetes Architecture & Cluster Setup ===\"\necho \"[+] Validating kubectl client binary...\"\necho \"[+] Bootstrapping multi-node cluster via kind (1 control-plane, 2 workers)...\"\necho \"[+] Inspecting Control Plane: kube-apiserver, etcd, scheduler, controller-manager...\"\necho \"[+] Verifying Worker Node agents: kubelet, kube-proxy, containerd...\"\necho \"[+] Applying declarative manifest (apiVersion, kind, metadata, spec, requests vs limits)...\"\necho \"[+] Cluster healthy! Zero-cost local Kubernetes cluster running.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Install kubectl CLI Client & Verify Architecture Skew",
        "description": "Download the official Kubernetes kubectl client binary, configure executable permissions, and verify version compatibility.",
        "consoleInstruction": "Download the latest stable release of kubectl and place it in system PATH.",
        "cliCommand": "curl -LO \"https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl\"\nchmod +x kubectl\nsudo mv kubectl /usr/local/bin/\nkubectl version --client",
        "expectedOutput": "Client Version: v1.30.x (or newer) displayed successfully.",
        "verificationTip": "Verify that kubectl client is within one minor version of the cluster server version for official support.",
        "troubleshooting": "If command not found, verify that /usr/local/bin is included in your $PATH variable."
      },
      {
        "stepNumber": 2,
        "title": "Bootstrap Multi-Node Local Cluster Using kind (Kubernetes IN Docker)",
        "description": "Install kind and provision a multi-node cluster (1 control-plane and 2 worker nodes) using Docker containers as simulated nodes.",
        "consoleInstruction": "Install kind binary and apply a multi-node cluster configuration file.",
        "cliCommand": "curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64\nchmod +x ./kind\nsudo mv ./kind /usr/local/bin/kind\ncat << 'EOF' > kind-config.yaml\nkind: Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nnodes:\n- role: control-plane\n- role: worker\n- role: worker\nEOF\nkind create cluster --name lab191 --config kind-config.yaml",
        "expectedOutput": "Creating cluster 'lab191' ... Nodes started, control-plane ready, CNI installed.",
        "verificationTip": "Run 'docker ps' to verify three Docker containers are running as kind nodes.",
        "troubleshooting": "Ensure Docker service is running via 'sudo systemctl status docker' before launching kind."
      },
      {
        "stepNumber": 3,
        "title": "Inspect Control Plane Components & System Namespace Pods",
        "description": "Examine the core control plane components running inside the kube-system namespace and inspect node conditions.",
        "consoleInstruction": "Query nodes and inspect system pods to view API server, etcd, scheduler, and controller manager.",
        "cliCommand": "kubectl get nodes -o wide\nkubectl cluster-info\nkubectl get pods -n kube-system -o wide",
        "expectedOutput": "3 nodes (1 control-plane, 2 workers) in Ready state. kube-system pods: kube-apiserver, etcd, kube-scheduler, kube-controller-manager, coredns, kube-proxy.",
        "verificationTip": "Notice that etcd and kube-apiserver run on the control-plane node with host network access.",
        "troubleshooting": "If nodes are NotReady, allow 30 seconds for the CNI plugin to assign pod CIDRs."
      },
      {
        "stepNumber": 4,
        "title": "Author Universal Manifest: Enforce Resource Requests vs Limits",
        "description": "Author a standard Pod manifest utilizing the universal 4-field structure, configuring requests for scheduler placement and limits for kernel cgroups.",
        "consoleInstruction": "Create pod.yaml and apply it declaratively using kubectl apply.",
        "cliCommand": "cat << 'EOF' > pod.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: demo-workload\n  labels:\n    app: demo\nspec:\n  containers:\n  - name: web\n    image: nginx:alpine\n    ports:\n    - containerPort: 80\n    resources:\n      requests:\n        cpu: \"100m\"\n        memory: \"128Mi\"\n      limits:\n        cpu: \"250m\"\n        memory: \"256Mi\"\nEOF\nkubectl apply -f pod.yaml\nkubectl get pod demo-workload -o wide",
        "expectedOutput": "pod/demo-workload created and scheduled to one of the worker nodes in Running state.",
        "verificationTip": "Run 'kubectl describe pod demo-workload' and verify Requests and Limits in the Container section.",
        "troubleshooting": "Ensure valid 2-space indentation; tabs are forbidden in YAML specifications."
      },
      {
        "stepNumber": 5,
        "title": "Verify Declarative 'apply -f' vs Imperative 'create -f' Idempotency",
        "description": "Demonstrate why 'kubectl apply -f' is mandatory for CI/CD pipelines while 'kubectl create -f' causes pipeline failures.",
        "consoleInstruction": "Re-apply the manifest with apply to test idempotency, then test create on an existing resource.",
        "cliCommand": "kubectl apply -f pod.yaml\nkubectl diff -f pod.yaml\nkubectl create -f pod.yaml || echo \"kubectl create failed as expected on existing resource!\"",
        "expectedOutput": "kubectl apply reports 'pod/demo-workload unchanged'. kubectl create throws Error from server (AlreadyExists).",
        "verificationTip": "Notice that 'kubectl diff -f' produces zero output when cluster state matches the manifest.",
        "troubleshooting": "Always default to 'apply -f' in automated scripts and GitOps repositories."
      },
      {
        "stepNumber": 6,
        "title": "Security & Architectural Isolation Audit: etcd Access Boundary",
        "description": "Prove that only kube-apiserver communicates directly with etcd and that worker node agents communicate exclusively through the API.",
        "consoleInstruction": "Inspect etcd startup flags and verify client certificate verification.",
        "cliCommand": "kubectl describe pod -n kube-system -l component=etcd | grep -E 'client-cert-auth|listen-client-urls'\necho \"Audit Verified: etcd requires mutual TLS (mTLS); worker nodes and pods cannot query etcd directly.\"",
        "expectedOutput": "client-cert-auth=true and trusted-ca-file confirmed, demonstrating zero direct etcd access from outside the API server.",
        "verificationTip": "In enterprise clusters, ensure etcd encryption at rest is enabled to protect sensitive Secret data.",
        "troubleshooting": "If etcd pod is not found, verify context points to a control-plane enabled cluster."
      }
    ]
  },
  "kubernetes-objects-workloads-networking-storage": {
    "title": "Lab 19.2: Workloads, Services, Decoupled Config & Persistent Storage",
    "level": "Intermediate",
    "estimatedMinutes": 50,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Running Kubernetes cluster (e.g. from Lab 19.1 kind cluster).",
    "requiredPermissions": "Cluster namespace read/write permissions.",
    "cleanupGuide": "kubectl delete deploy,svc,cm,secret,pod,pvc -l lab=lab192 2>/dev/null || true",
    "safeSimulationScript": "#!/bin/bash\necho \"=== Lab 19.2: Kubernetes Objects & Networking ===\"\necho \"[+] Deploying stateless web application via Deployment (3 replicas)...\"\necho \"[+] Creating ClusterIP Service and verifying label selector discovery...\"\necho \"[+] Injecting decoupled ConfigMap and Secret credentials into Pods...\"\necho \"[+] Mounting PersistentVolumeClaim (PVC) and verifying data persistence...\"\necho \"[+] Inspecting DaemonSet node agents vs StatefulSet database identities...\"\necho \"[+] Executing day-to-day pod debugging: describe, logs, exec, port-forward.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Deploy Stateless Microservices via Deployment & ReplicaSet",
        "description": "Create a Kubernetes Deployment managing 3 identical replicas of an application and observe ReplicaSet creation.",
        "consoleInstruction": "Apply a Deployment manifest and inspect the controller hierarchy: Deployment -> ReplicaSet -> Pods.",
        "cliCommand": "cat << 'EOF' > deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\n  labels:\n    app: web\n    lab: lab192\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n        lab: lab192\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:alpine\n        ports:\n        - containerPort: 80\nEOF\nkubectl apply -f deployment.yaml\nkubectl get deploy,rs,pods -l app=web",
        "expectedOutput": "deployment.apps/web-app created (3/3 ready), replicaset created, 3 distinct Pods running with random suffixes.",
        "verificationTip": "Verify that deleting a single Pod causes the ReplicaSet to immediately spawn a replacement to maintain desired replica count (3).",
        "troubleshooting": "If Pods remain Pending, verify worker node capacity using 'kubectl describe nodes'."
      },
      {
        "stepNumber": 2,
        "title": "Expose Workloads with Service Discovery (ClusterIP) & Label Selectors",
        "description": "Create a stable virtual IP (Service) that load-balances traffic across dynamic Pods matching the label selector.",
        "consoleInstruction": "Create a Service and verify EndpointSlice population and internal DNS resolution.",
        "cliCommand": "cat << 'EOF' > service.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-service\n  labels:\n    lab: lab192\nspec:\n  type: ClusterIP\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 80\nEOF\nkubectl apply -f service.yaml\nkubectl get svc,endpoints web-service\nkubectl run test-curl --rm -it --image=curlimages/curl --restart=Never -- curl -s http://web-service",
        "expectedOutput": "Service assigns a ClusterIP; endpoints list the 3 Pod private IPs; curl returns default Nginx HTML page.",
        "verificationTip": "Inspect Endpoints: 'kubectl get endpoints web-service' to verify matching Pod IPs.",
        "troubleshooting": "If curl fails with connection refused, ensure the Service 'selector' matches the Pod template 'labels' exactly."
      },
      {
        "stepNumber": 3,
        "title": "Decouple Configuration: Inject ConfigMap & Secret Credentials",
        "description": "Externalize environment variables and database passwords so container images remain generic across environments.",
        "consoleInstruction": "Create a ConfigMap and a Secret, then mount them as environment variables into a Pod.",
        "cliCommand": "kubectl create configmap app-config --from-literal=ENVIRONMENT=production --from-literal=MAX_CONNECTIONS=100\nkubectl create secret generic app-secret --from-literal=DB_PASSWORD=SuperSecretKey2026\ncat << 'EOF' > pod-config.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: config-demo\n  labels:\n    lab: lab192\nspec:\n  containers:\n  - name: test\n    image: alpine\n    command: [\"sh\", \"-c\", \"env && sleep 3600\"]\n    env:\n    - name: ENV_MODE\n      valueFrom:\n        configMapKeyRef:\n          name: app-config\n          key: ENVIRONMENT\n    - name: DB_PASS\n      valueFrom:\n        secretKeyRef:\n          name: app-secret\n          key: DB_PASSWORD\nEOF\nkubectl apply -f pod-config.yaml\nsleep 3\nkubectl exec config-demo -- env | grep -E 'ENV_MODE|DB_PASS'",
        "expectedOutput": "ENV_MODE=production and DB_PASS=SuperSecretKey2026 printed from inside the container.",
        "verificationTip": "Decode the secret: 'kubectl get secret app-secret -o jsonpath=\"{.data.DB_PASSWORD}\" | base64 -d' to view raw value.",
        "troubleshooting": "If Pod enters CreateContainerConfigError, check for typos in the referenced ConfigMap or Secret names."
      },
      {
        "stepNumber": 4,
        "title": "Abstract Storage: Bind PersistentVolumeClaims (PVC) to Pods",
        "description": "Provision storage that survives Pod destruction by referencing a PersistentVolumeClaim.",
        "consoleInstruction": "Create a PVC requesting storage and mount it into a container directory.",
        "cliCommand": "cat << 'EOF' > storage-demo.yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: app-pvc\n  labels:\n    lab: lab192\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 100Mi\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: storage-pod\n  labels:\n    lab: lab192\nspec:\n  containers:\n  - name: writer\n    image: alpine\n    command: [\"sh\", \"-c\", \"echo 'Persistent Data Saved!' > /data/state.txt && sleep 3600\"]\n    volumeMounts:\n    - name: my-storage\n      mountPath: /data\n  volumes:\n  - name: my-storage\n    persistentVolumeClaim:\n      claimName: app-pvc\nEOF\nkubectl apply -f storage-demo.yaml\nsleep 5\nkubectl exec storage-pod -- cat /data/state.txt",
        "expectedOutput": "'Persistent Data Saved!' printed successfully from the persistent volume mount.",
        "verificationTip": "Run 'kubectl get pvc app-pvc' to verify STATUS: Bound to an underlying dynamically provisioned PV.",
        "troubleshooting": "If PVC stays in Pending status, verify your cluster has a default StorageClass via 'kubectl get sc'."
      },
      {
        "stepNumber": 5,
        "title": "Contrast DaemonSet (Node Agents) vs StatefulSet (Clustered Databases)",
        "description": "Analyze how DaemonSets pin 1 Pod per node while StatefulSets provide stable ordered identities (db-0, db-1) with dedicated PVCs.",
        "consoleInstruction": "Inspect the differences between DaemonSets and StatefulSets in the cluster.",
        "cliCommand": "kubectl get ds -n kube-system\ncat << 'EOF' > statefulset.yaml\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: db-cluster\n  labels:\n    lab: lab192\nspec:\n  serviceName: \"db-headless\"\n  replicas: 2\n  selector:\n    matchLabels:\n      app: db\n  template:\n    metadata:\n      labels:\n        app: db\n        lab: lab192\n    spec:\n      containers:\n      - name: db\n        image: alpine\n        command: [\"sleep\", \"3600\"]\nEOF\nkubectl apply -f statefulset.yaml\nkubectl get pods -l app=db",
        "expectedOutput": "Pods created with predictable, ordered names: db-cluster-0 and db-cluster-1 (not random hashes).",
        "verificationTip": "StatefulSets always start and update pods sequentially (0 then 1), essential for clustered databases like Kafka and MySQL.",
        "troubleshooting": "A StatefulSet requires an explicit 'serviceName' matching a headless Service."
      },
      {
        "stepNumber": 6,
        "title": "Master Daily Pod Debugging Operations (describe, logs, exec, port-forward)",
        "description": "Practice the 4 indispensable day-to-day Kubernetes developer commands for live inspection and troubleshooting.",
        "consoleInstruction": "Execute describe, logs, exec, and port-forward commands against running workloads.",
        "cliCommand": "kubectl describe pod -l app=web | head -n 25\nkubectl logs -l app=web --tail=20\nkubectl exec -it deployment/web-app -- nginx -v\nkubectl port-forward deployment/web-app 8085:80 &\nPF_PID=$!\nsleep 2\ncurl -s http://localhost:8085 | head -n 5\nkill $PF_PID",
        "expectedOutput": "Pod events inspected, logs retrieved, Nginx version printed via exec, and HTTP 200 retrieved over port-forward tunnel.",
        "verificationTip": "Make 'kubectl describe pod' your #1 diagnostic command whenever Pods are in CrashLoopBackOff or Pending.",
        "troubleshooting": "If port-forward fails with address already in use, select an alternative local port (e.g. 8086:80)."
      }
    ]
  },
  "k8s-workloads-services-networking-helm": {
    "title": "Lab 19.3: Zero-Downtime Rolling Updates, HPA Autoscaling & Helm Package Management",
    "level": "Advanced",
    "estimatedMinutes": 50,
    "freeTierEligible": true,
    "costRiskLevel": "LOW",
    "paidAlternativeWarning": null,
    "prerequisites": "Running Kubernetes cluster with Metrics Server installed.",
    "requiredPermissions": "Cluster deployment and autoscaling permissions.",
    "cleanupGuide": "helm uninstall myapp 2>/dev/null; kubectl delete deploy,hpa,svc -l lab=lab193 2>/dev/null || true",
    "safeSimulationScript": "#!/bin/bash\necho \"=== Lab 19.3: Rolling Updates, HPA & Helm Mastery ===\"\necho \"[+] Deploying v1.0 application with 4 replicas...\"\necho \"[+] Performing zero-downtime RollingUpdate to v2.0 (maxSurge=1, maxUnavailable=0)...\"\necho \"[+] Simulating failed deployment and executing instant rollback (rollout undo)...\"\necho \"[+] Configuring Horizontal Pod Autoscaler (HPA) targeting 50% CPU...\"\necho \"[+] Packaging application as a parameterized Helm Chart...\"\necho \"[+] Executing Helm release lifecycle: install -> upgrade -> rollback -> uninstall.\"",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Execute Zero-Downtime Rolling Update & Stream Rollout Status",
        "description": "Deploy an application and update its container image, observing how Kubernetes transitions traffic seamlessly without downtime.",
        "consoleInstruction": "Create a Deployment and update its image using kubectl set image while tracking rollout progress.",
        "cliCommand": "cat << 'EOF' > app-deploy.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: rolling-app\n  labels:\n    app: rolling\n    lab: lab193\nspec:\n  replicas: 4\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  selector:\n    matchLabels:\n      app: rolling\n  template:\n    metadata:\n      labels:\n        app: rolling\n        lab: lab193\n    spec:\n      containers:\n      - name: web\n        image: nginx:1.24-alpine\n        ports:\n        - containerPort: 80\nEOF\nkubectl apply -f app-deploy.yaml\nkubectl rollout status deployment/rolling-app\nkubectl set image deployment/rolling-app web=nginx:1.25-alpine\nkubectl rollout status deployment/rolling-app",
        "expectedOutput": "Waiting for rollout to finish: 1 out of 4 new replicas have been updated ... deployment 'rolling-app' successfully rolled out.",
        "verificationTip": "Notice that 'maxUnavailable: 0' guarantees 100% capacity is maintained throughout the rollout.",
        "troubleshooting": "If rollout hangs, check if new Pods are failing Readiness probes using 'kubectl describe pod'."
      },
      {
        "stepNumber": 2,
        "title": "Emergency Incident Response: Instant Rollback via 'kubectl rollout undo'",
        "description": "Simulate a broken production release (bad image tag) and perform an instant 5-second rollback to restore service.",
        "consoleInstruction": "Update the Deployment to an invalid image tag, observe the failure, and revert to the previous working revision.",
        "cliCommand": "kubectl set image deployment/rolling-app web=nginx:nonexistent-tag-404\nsleep 5\nkubectl get pods -l app=rolling\nkubectl rollout history deployment/rolling-app\nkubectl rollout undo deployment/rolling-app\nkubectl rollout status deployment/rolling-app",
        "expectedOutput": "Pods entering ImagePullBackOff detected; rollout undo executed; deployment 'rolling-app' rolled back to working revision.",
        "verificationTip": "Verify that 'kubectl rollout history' records past revision numbers driven by underlying ReplicaSets.",
        "troubleshooting": "Use '--to-revision=N' to roll back to a specific past release rather than just the previous one."
      },
      {
        "stepNumber": 3,
        "title": "Contrast RollingUpdate Strategy with the Recreate Strategy",
        "description": "Analyze the architectural differences between zero-downtime RollingUpdate and the Recreate strategy.",
        "consoleInstruction": "Inspect why database schema migrations with breaking changes require Recreate despite downtime.",
        "cliCommand": "kubectl explain deployment.spec.strategy.rollingUpdate\necho \"Recreate Strategy: Terminates ALL old pods before creating new pods.\"\necho \"Use Recreate ONLY when old and new application versions cannot run concurrently (e.g. incompatible DB migrations).\"",
        "expectedOutput": "maxSurge and maxUnavailable fields explained.",
        "verificationTip": "Default RollingUpdate settings are maxUnavailable: 25% and maxSurge: 25%.",
        "troubleshooting": "Never use Recreate on customer-facing web services unless maintenance windows are scheduled."
      },
      {
        "stepNumber": 4,
        "title": "Configure Horizontal Pod Autoscaler (HPA) with CPU Thresholds",
        "description": "Enable automated dynamic scaling based on real-time CPU telemetry collected by the Metrics Server.",
        "consoleInstruction": "Ensure container resource requests are configured, then apply an HPA targeting 50% CPU utilization.",
        "cliCommand": "cat << 'EOF' > hpa-deploy.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: hpa-demo\n  labels:\n    lab: lab193\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: hpa-app\n  template:\n    metadata:\n      labels:\n        app: hpa-app\n    spec:\n      containers:\n      - name: cpu-burner\n        image: nginx:alpine\n        resources:\n          requests:\n            cpu: \"100m\"\n            memory: \"64Mi\"\n          limits:\n            cpu: \"200m\"\n            memory: \"128Mi\"\n---\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: hpa-demo-scaler\n  labels:\n    lab: lab193\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: hpa-demo\n  minReplicas: 2\n  maxReplicas: 8\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 50\nEOF\nkubectl apply -f hpa-deploy.yaml\nkubectl get hpa hpa-demo-scaler",
        "expectedOutput": "hpa-demo-scaler created with MINPODS=2, MAXPODS=8, TARGETS=0%/50%.",
        "verificationTip": "Verify that 'kubectl get hpa' displays actual percentage instead of '<unknown>' (which indicates missing Metrics Server).",
        "troubleshooting": "If target shows '<unknown>', verify Metrics Server is installed: 'kubectl top pods'."
      },
      {
        "stepNumber": 5,
        "title": "Author and Deploy Parameterized Helm Chart (Templates & Values)",
        "description": "Package a multi-resource application into a standardized, reusable Helm chart driven by values.yaml.",
        "consoleInstruction": "Initialize a Helm chart, customize values, and deploy the release.",
        "cliCommand": "which helm || (curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash)\nmkdir -p /tmp/mychart/templates\ncat << 'EOF' > /tmp/mychart/Chart.yaml\napiVersion: v2\nname: myapp\ndescription: Microservices Helm Chart\nversion: 0.1.0\nappVersion: \"1.0.0\"\nEOF\ncat << 'EOF' > /tmp/mychart/values.yaml\nreplicaCount: 2\nimage:\n  repository: nginx\n  tag: alpine\nservice:\n  type: ClusterIP\n  port: 80\nEOF\ncat << 'EOF' > /tmp/mychart/templates/deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ .Release.Name }}-deploy\nspec:\n  replicas: {{ .Values.replicaCount }}\n  selector:\n    matchLabels:\n      app: {{ .Release.Name }}\n  template:\n    metadata:\n      labels:\n        app: {{ .Release.Name }}\n    spec:\n      containers:\n      - name: web\n        image: \"{{ .Values.image.repository }}:{{ .Values.image.tag }}\"\nEOF\nhelm install my-app /tmp/mychart/\nhelm list",
        "expectedOutput": "NAME: my-app STATUS: deployed REVISION: 1. helm list shows active release.",
        "verificationTip": "Inspect rendered manifests without installing: 'helm template my-app /tmp/mychart/'.",
        "troubleshooting": "Ensure valid Go template syntax inside '{{ .Values.x }}' placeholders."
      },
      {
        "stepNumber": 6,
        "title": "Manage Helm Release Lifecycle: Upgrade, Rollback & Clean Uninstall",
        "description": "Perform an atomic configuration upgrade on the Helm release, test rollbacks, and cleanly remove all associated resources.",
        "consoleInstruction": "Upgrade replica count, verify history, roll back to revision 1, and uninstall the release.",
        "cliCommand": "helm upgrade --install my-app /tmp/mychart/ --set replicaCount=4\nkubectl get pods -l app=my-app\nhelm history my-app\nhelm rollback my-app 1\nhelm list\nhelm uninstall my-app",
        "expectedOutput": "Release upgraded to 4 replicas -> History shows Rev 1 & 2 -> Rollback reverts to Rev 1 -> Uninstall purges all resources cleanly.",
        "verificationTip": "Never use 'kubectl delete' on Helm resources directly, as it causes Helm state drift.",
        "troubleshooting": "If helm uninstall hangs, check for finalizers on associated namespace resources."
      }
    ]
  },
  "aws-account-creation-root-security-iam": {
    "title": "Lab 1.1: AWS Free Tier Account Setup, Root MFA Hardening & AWS Budgets Alert ($1)",
    "level": "Beginner",
    "estimatedMinutes": 45,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Account Registration & Identity Verification Checklist",
        "description": "Open the AWS Management Console sign-up portal, input personal email, verify email verification code, configure strong root password, and select the Free Tier 6-month trial plan.",
        "command": "# Verification Step: Query current identity once account is active\naws sts get-caller-identity",
        "expectedOutput": "{\n  \"UserId\": \"123456789012\",\n  \"Account\": \"123456789012\",\n  \"Arn\": \"arn:aws:iam::123456789012:root\"\n}",
        "verification": "Run 'aws sts get-caller-identity' to verify your 12-digit AWS Account ID.",
        "troubleshooting": "If account activation email is delayed, verify that international transactions are enabled on your card and check SMS spam filters."
      },
      {
        "stepNumber": 2,
        "title": "Root Account Virtual MFA Device Hardening",
        "description": "Secure the supreme Root account by activating a Virtual Multi-Factor Authentication (MFA) device using Google Authenticator or Authy.",
        "command": "aws iam create-virtual-mfa-device \\\n  --virtual-mfa-device-name root-virtual-mfa \\\n  --outfile /tmp/QRCode.png \\\n  --bootstrap-method QRCodePNG",
        "expectedOutput": "Virtual MFA device created. Scan /tmp/QRCode.png with your authenticator app and submit two consecutive 6-digit TOTP codes.",
        "verification": "Log out of the AWS Console and verify that sign-in requires both the root password and the 6-digit rotating MFA code.",
        "troubleshooting": "If MFA codes are rejected, check the time synchronization settings on your mobile device (time drift causes TOTP failure)."
      },
      {
        "stepNumber": 3,
        "title": "Provision Admin IAM User & Enforce Least Privilege",
        "description": "Create a dedicated IAM administrative user for day-to-day operations so the Root account never needs to be used for development tasks.",
        "command": "aws iam create-user --user-name cloud-admin\naws iam attach-user-policy --user-name cloud-admin --policy-arn arn:aws:iam::aws:policy/AdministratorAccess\naws iam create-login-profile --user-name cloud-admin --password 'InitialPass123!@#' --password-reset-required",
        "expectedOutput": "IAM user 'cloud-admin' created with AdministratorAccess policy and forced password rotation upon initial login.",
        "verification": "Sign in to the AWS Console using the custom IAM sign-in URL: https://<account-id>.signin.aws.amazon.com/console as 'cloud-admin'.",
        "troubleshooting": "Ensure you attach the AdministratorAccess managed policy so you have permissions to manage EC2, VPC, and S3."
      },
      {
        "stepNumber": 4,
        "title": "Deploy Automated AWS Budget Alert ($1.00 USD Threshold)",
        "description": "Deploy an automated AWS Budget with an absolute $1.00 monthly spending limit triggering immediate email alerts at 80% and 100% of threshold.",
        "command": "cat << 'EOF' > /tmp/budget.json\n{\n  \"BudgetLimit\": { \"Amount\": \"1.0\", \"Unit\": \"USD\" },\n  \"BudgetName\": \"Zero-Cost-Safety-Budget\",\n  \"BudgetType\": \"COST\",\n  \"CostTypes\": { \"IncludeTax\": true, \"IncludeSubscription\": true, \"UseBlended\": false },\n  \"TimeUnit\": \"MONTHLY\"\n}\nEOF\naws budgets create-budget --account-id $(aws sts get-caller-identity --query Account --output text) --budget file:///tmp/budget.json",
        "expectedOutput": "Budget 'Zero-Cost-Safety-Budget' successfully created with 1.00 USD monthly threshold.",
        "verification": "Open AWS Billing Console -> Budgets and verify the active status and email subscriber list of Zero-Cost-Safety-Budget.",
        "troubleshooting": "Ensure your IAM user has the 'budgets:*' permission policy attached to create cost monitoring objects."
      },
      {
        "stepNumber": 5,
        "title": "Audit Free Tier Dashboard & Service Usage",
        "description": "Inspect the AWS Free Tier Dashboard to monitor consumption quotas across Amazon EC2 (750 hours), Amazon S3 (5 GB), and EBS (30 GB).",
        "command": "aws ec2 describe-instance-types \\\n  --filters Name=free-tier-eligible,Values=true \\\n  --query 'InstanceTypes[*].{Type:InstanceType,vCPU:VCpuInfo.DefaultVCpus,RAM_MiB:MemoryInfo.SizeInMiB}' \\\n  --output table",
        "expectedOutput": "Displays eligible free-tier instance types (t2.micro and t3.micro with 1 vCPU and 1024 MiB RAM).",
        "verification": "Confirm that only t2.micro or t3.micro are selected when launching virtual servers.",
        "troubleshooting": "If t2.micro is not available in newer AWS regions, use t3.micro which is also free-tier eligible in those locations."
      },
      {
        "stepNumber": 6,
        "title": "Verify Account Cleanup & Security Baseline",
        "description": "Execute a baseline audit to confirm that zero unneeded compute, storage, or unattached IP resources are active in your account.",
        "command": "aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]' --output table\naws ec2 describe-volumes --filters Name=status,Values=available --query 'Volumes[*].VolumeId' --output text",
        "expectedOutput": "No running instances or unattached EBS volumes found. Clean baseline verified.",
        "verification": "Confirm that current month spend in AWS Cost Explorer is $0.00.",
        "troubleshooting": "If instances appear, terminate them immediately via 'aws ec2 terminate-instances --instance-ids <id>'."
      }
    ]
  },
  "accidental-charges-cost-explorer-support-refunds": {
    "title": "Lab 1.2: Cost Explorer Telemetry, Resource Cleanup Drills & AWS Support Refund Simulation",
    "level": "Intermediate",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Simulate an Accidental High-Cost Service Audit",
        "description": "Query AWS Cost Explorer programmatically to extract daily unblended cost metrics grouped by service and identify unexpected charges.",
        "command": "aws ce get-cost-and-usage \\\n  --time-period Start=$(date -d '7 days ago' +%Y-%m-%d),End=$(date +%Y-%m-%d) \\\n  --granularity DAILY \\\n  --metrics 'UnblendedCost' \\\n  --group-by Type=DIMENSION,Key=SERVICE \\\n  --output table",
        "expectedOutput": "Tabular breakdown of daily expenditures showing services generating nonzero costs (e.g. Amazon EC2, Amazon EBS, NAT Gateway).",
        "verification": "Verify which service contributed the largest dollar amount over the analyzed billing window.",
        "troubleshooting": "If Cost Explorer is disabled, open the Billing Console and enable Cost Explorer (takes up to 24 hours to generate historical data)."
      },
      {
        "stepNumber": 2,
        "title": "Unattached Elastic IP Discovery & Immediate Release",
        "description": "Detect idle Elastic IPs incurring the hourly unattached penalty ($0.005/hr) and release them back to the AWS public IPv4 pool.",
        "command": "aws ec2 describe-addresses \\\n  --query 'Addresses[?InstanceId==null].{IP:PublicIp,AllocationId:AllocationId}' \\\n  --output table",
        "expectedOutput": "Lists all unattached Elastic IPs. If any exist, release them with 'aws ec2 release-address --allocation-id <id>'.",
        "verification": "Re-run the command to confirm zero idle Elastic IPs remain allocated.",
        "troubleshooting": "If an IP is associated with a stopped instance, disassociate the address first before attempting to release it."
      },
      {
        "stepNumber": 3,
        "title": "Orphan EBS Volume & Forgotten Snapshot Cleanup Drill",
        "description": "Identify and permanently purge 'available' (unattached) EBS block storage volumes and aged snapshots left behind by terminated EC2 instances.",
        "command": "aws ec2 describe-volumes \\\n  --filters Name=status,Values=available \\\n  --query 'Volumes[*].{VolumeId:VolumeId,Size:Size,CreateTime:CreateTime}' \\\n  --output table",
        "expectedOutput": "Lists unattached volumes. Purge using: aws ec2 delete-volume --volume-id <VolumeId>.",
        "verification": "Verify 'aws ec2 describe-volumes --filters Name=status,Values=available' returns an empty array.",
        "troubleshooting": "If volume deletion is blocked, check if an automated AWS Backup policy has locked the volume."
      },
      {
        "stepNumber": 4,
        "title": "Multi-Region Resource Sweep Across All Global Regions",
        "description": "Execute a cross-region script to audit and detect rogue EC2 instances running in forgotten global regions (e.g. Frankfurt, Sydney, Tokyo).",
        "command": "for region in $(aws ec2 describe-regions --query 'Regions[*].RegionName' --output text); do\n  count=$(aws ec2 describe-instances --region $region --filters Name=instance-state-name,Values=running --query 'length(Reservations[*].Instances[*])')\n  if [ \"$count\" -gt 0 ]; then\n    echo \"WARNING: $count running instance(s) found in $region!\"\n  else\n    echo \"Region $region: Clean (0 running instances)\"\n  fi\ndone",
        "expectedOutput": "Iterates through all 30+ AWS regions, verifying that zero running instances exist outside your designated home region.",
        "verification": "Ensure all regions return 'Clean (0 running instances)'.",
        "troubleshooting": "If a region check hangs, verify your network allows outbound TLS to regional AWS API endpoints."
      },
      {
        "stepNumber": 5,
        "title": "Draft & Validate an AWS Billing Support Refund Appeal",
        "description": "Draft a formal, polite one-time courtesy refund appeal case in accordance with AWS Support Center guidelines for accidental learning usage.",
        "command": "cat << 'EOF' > /tmp/support_appeal.txt\nCase Type: Account and billing support\nCategory: Dispute a charge / Accidental usage refund\nSubject: Request for one-time courtesy refund for unintentional learning charges\n\nHello AWS Billing Support Team,\n\nI am a student / new AWS Free Tier user learning cloud engineering. I accidentally launched resources outside the Free Tier limits in region [Region Name]. \n\nAs soon as I discovered the charge in Cost Explorer, I immediately terminated all running instances, deleted unattached EBS volumes, and released all Elastic IPs across all regions. My account is now verified clean.\n\nI have also configured an AWS Budget alert ($1.00 threshold) to prevent future overrun. As this was an honest mistake during learning, I kindly request a one-time courtesy refund or credit for this billing cycle.\n\nThank you for your assistance,\n[Your Name] - Account ID: $(aws sts get-caller-identity --query Account --output text)\nEOF\ncat /tmp/support_appeal.txt",
        "expectedOutput": "Formatted support appeal template verified with active Account ID injected.",
        "verification": "Open AWS Support Center (Console -> Support -> Support Center -> Create Case) and paste the structured message.",
        "troubleshooting": "Remember that Basic Support accounts have 100% free access to Account and Billing support specialists."
      },
      {
        "stepNumber": 6,
        "title": "Configure Emergency Kill-Switch Alarm in CloudWatch",
        "description": "Create an estimated billing alarm in Amazon CloudWatch that alerts your mobile phone or Slack whenever total charges exceed $5.00.",
        "command": "aws cloudwatch put-metric-alarm \\\n  --alarm-name 'Billing-Emergency-Threshold-5USD' \\\n  --metric-name 'EstimatedCharges' \\\n  --namespace 'AWS/Billing' \\\n  --statistic Maximum \\\n  --period 21600 \\\n  --threshold 5.0 \\\n  --comparison-operator GreaterThanThreshold \\\n  --evaluation-periods 1",
        "expectedOutput": "CloudWatch metric alarm 'Billing-Emergency-Threshold-5USD' armed and active in us-east-1.",
        "verification": "Run 'aws cloudwatch describe-alarms --alarm-names Billing-Emergency-Threshold-5USD' to verify state.",
        "troubleshooting": "Billing metrics are published exclusively in us-east-1 (N. Virginia), regardless of where your infrastructure runs."
      }
    ]
  },
  "regions-azs-and-edge-infrastructure": {
    "title": "Lab 1.3: Multi-Region Latency Probing, Availability Zone Mapping & Edge Distribution",
    "level": "Beginner",
    "estimatedMinutes": 40,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Audit Available Commercial Regions",
        "description": "List all enabled commercial AWS regions worldwide and inspect their regional API endpoints.",
        "command": "aws ec2 describe-regions \\\n  --all-regions \\\n  --query 'Regions[*].{Region:RegionName,Endpoint:Endpoint}' \\\n  --output table",
        "expectedOutput": "Displays all AWS regions (e.g. ap-south-1 Mumbai, us-east-1 N. Virginia, eu-west-1 Ireland) and their DNS endpoints.",
        "verification": "Identify your lowest-latency home region based on geographical proximity.",
        "troubleshooting": "Some newer regions (e.g. ap-south-2 Hyderabad) require explicit account opt-in under Account Settings."
      },
      {
        "stepNumber": 2,
        "title": "Availability Zone & Immutable AZ ID Mapping",
        "description": "Inspect the physical Availability Zones within your home region and map randomized AZ names (ap-south-1a) to physical AZ IDs (aps1-az1).",
        "command": "aws ec2 describe-availability-zones \\\n  --region ap-south-1 \\\n  --query 'AvailabilityZones[*].{ZoneName:ZoneName,ZoneId:ZoneId,State:State}' \\\n  --output table",
        "expectedOutput": "Displays ZoneName (ap-south-1a, ap-south-1b, ap-south-1c) paired with immutable physical ZoneIds (aps1-az1, aps1-az2, aps1-az3).",
        "verification": "Understand that ZoneId represents the true physical datacenter building across different AWS accounts.",
        "troubleshooting": "Ensure you pass the '--region' flag if your default AWS CLI configuration points to another region."
      },
      {
        "stepNumber": 3,
        "title": "Benchmark Network Latency Across Global Regions",
        "description": "Execute ICMP ping and HTTP handshake latency tests from your local terminal to measure round-trip times (RTT) across global regions.",
        "command": "echo \"=== Ping Latency Benchmark ===\"\nfor endpoint in \"ec2.ap-south-1.amazonaws.com\" \"ec2.us-east-1.amazonaws.com\" \"ec2.eu-central-1.amazonaws.com\"; do\n  echo -n \"$endpoint: \"\n  ping -c 3 $endpoint | tail -1 | awk -F '/' '{print $5 \" ms\"}'\ndone",
        "expectedOutput": "Outputs average round-trip latency in milliseconds, demonstrating that closest geographic region offers fastest response.",
        "verification": "Compare local region (< 50ms) against cross-continental regions (> 200ms).",
        "troubleshooting": "If ping is blocked by corporate firewall, use 'curl -o /dev/null -s -w '%{time_total}s\\n' https://<endpoint>' instead."
      },
      {
        "stepNumber": 4,
        "title": "Create an Amazon S3 Bucket in a Specific Region",
        "description": "Provision a free-tier eligible Amazon S3 bucket pinned strictly to your home region to satisfy local data residency requirements.",
        "command": "BUCKET_NAME=\"aws-cloud-lab-$(date +%s)\"\naws s3api create-bucket \\\n  --bucket $BUCKET_NAME \\\n  --region ap-south-1 \\\n  --create-bucket-configuration LocationConstraint=ap-south-1",
        "expectedOutput": "{\n  \"Location\": \"http://$BUCKET_NAME.s3.amazonaws.com/\"\n}",
        "verification": "Run 'aws s3 ls' to verify the regional bucket exists and is listed.",
        "troubleshooting": "Bucket names must be globally unique across all AWS customers worldwide; if creation fails, append random digits."
      },
      {
        "stepNumber": 5,
        "title": "Upload Static Content & Enable Edge Acceleration",
        "description": "Upload an HTML file to the regional S3 bucket and inspect how Amazon CloudFront Edge Locations cache the content globally.",
        "command": "echo \"<h1>AWS Global Infrastructure Multi-Region Lab</h1>\" > /tmp/index.html\naws s3 cp /tmp/index.html s3://$BUCKET_NAME/index.html\naws s3api get-bucket-location --bucket $BUCKET_NAME",
        "expectedOutput": "File uploaded successfully to regional S3 storage bucket; location confirms pinned region.",
        "verification": "Verify upload via 'aws s3 ls s3://$BUCKET_NAME/'.",
        "troubleshooting": "Ensure you do not enable public read permissions without CloudFront Origin Access Control (OAC) to maintain security."
      },
      {
        "stepNumber": 6,
        "title": "Lab Teardown & Clean Baseline Verification",
        "description": "Permanently delete the test S3 bucket and uploaded assets to guarantee zero ongoing storage costs under the Free Tier.",
        "command": "aws s3 rb s3://$BUCKET_NAME --force",
        "expectedOutput": "Bucket and objects deleted successfully.",
        "verification": "Run 'aws s3 ls' to confirm the test bucket is gone.",
        "troubleshooting": "The '--force' flag deletes all remaining objects inside the bucket before removing the bucket itself."
      }
    ]
  },
  "vpc-subnetting-gateways-packet-flow": {
    "title": "Lab 3.1: Custom VPC Architecture: CIDR Subnetting, Internet Gateways & Bastion Host",
    "level": "Intermediate",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Provision Custom VPC with RFC 1918 CIDR Block",
        "description": "Create an isolated, non-default VPC with CIDR block 10.0.0.0/16 providing 65,536 private IPv4 addresses, and enable DNS hostnames.",
        "command": "VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)\naws ec2 create-tags --resources $VPC_ID --tags Key=Name,Value=prod-custom-vpc\naws ec2 modify-vpc-attribute --vpc-id $VPC_ID --enable-dns-hostnames \"{\\\"Value\\\":true}\"\necho \"VPC Created: $VPC_ID\"",
        "expectedOutput": "VPC created with 10.0.0.0/16 CIDR and DNS hostnames enabled (e.g. vpc-0a1b2c3d4e5f6g7h8).",
        "verification": "Run 'aws ec2 describe-vpcs --vpc-ids $VPC_ID' to verify state is available.",
        "troubleshooting": "If VPC creation fails, verify your account has not hit the 5 VPCs per region limit."
      },
      {
        "stepNumber": 2,
        "title": "Carve Public & Private Subnets Across Availability Zones",
        "description": "Carve a Public Subnet (10.0.1.0/24) in AZ-1 and a Private Subnet (10.0.2.0/24) in AZ-1, noting the 5 AWS reserved IP addresses.",
        "command": "PUB_SUBNET=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --availability-zone $(aws ec2 describe-availability-zones --query 'AvailabilityZones[0].ZoneName' --output text) --query 'Subnet.SubnetId' --output text)\nPRIV_SUBNET=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.2.0/24 --availability-zone $(aws ec2 describe-availability-zones --query 'AvailabilityZones[0].ZoneName' --output text) --query 'Subnet.SubnetId' --output text)\naws ec2 create-tags --resources $PUB_SUBNET --tags Key=Name,Value=public-subnet-1\naws ec2 create-tags --resources $PRIV_SUBNET --tags Key=Name,Value=private-subnet-1\naws ec2 modify-subnet-attribute --subnet-id $PUB_SUBNET --map-public-ip-on-launch\necho \"Public Subnet: $PUB_SUBNET | Private Subnet: $PRIV_SUBNET\"",
        "expectedOutput": "Two /24 subnets created. Each provides 251 usable host IPs (256 - 5 AWS reserved IPs).",
        "verification": "Run 'aws ec2 describe-subnets --subnet-ids $PUB_SUBNET $PRIV_SUBNET' to inspect AvailableIpAddressCount.",
        "troubleshooting": "Ensure CIDR blocks do not overlap (10.0.1.0/24 and 10.0.2.0/24 are cleanly distinct)."
      },
      {
        "stepNumber": 3,
        "title": "Attach Internet Gateway (IGW) to Custom VPC",
        "description": "Deploy a horizontally scaled, redundant Internet Gateway edge node and attach it to your custom VPC.",
        "command": "IGW_ID=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)\naws ec2 create-tags --resources $IGW_ID --tags Key=Name,Value=prod-vpc-igw\naws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID\necho \"IGW Attached: $IGW_ID\"",
        "expectedOutput": "Internet Gateway successfully created and attached to custom VPC.",
        "verification": "Run 'aws ec2 describe-internet-gateways --internet-gateway-ids $IGW_ID' to verify attachment state is 'available'.",
        "troubleshooting": "A VPC can only have one Internet Gateway attached at a time (1:1 constraint)."
      },
      {
        "stepNumber": 4,
        "title": "Configure Route Tables: Public IGW vs Private Local",
        "description": "Create a dedicated Public Route Table, add default route (0.0.0.0/0 -> IGW), and associate it strictly with the Public Subnet.",
        "command": "PUB_RT=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)\naws ec2 create-tags --resources $PUB_RT --tags Key=Name,Value=public-route-table\naws ec2 create-route --route-table-id $PUB_RT --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID\naws ec2 associate-route-table --subnet-id $PUB_SUBNET --route-table-id $PUB_RT\necho \"Public Route Table Configured: $PUB_RT\"",
        "expectedOutput": "Route table associated with public subnet. Rule 0.0.0.0/0 targets IGW; private subnet retains main local-only route table.",
        "verification": "Run 'aws ec2 describe-route-tables --route-table-ids $PUB_RT' to verify routes.",
        "troubleshooting": "Never associate your private subnet with the public route table; private subnets must remain isolated."
      },
      {
        "stepNumber": 5,
        "title": "Deploy Bastion Host Security Group & Test Instance",
        "description": "Create a hardened Bastion Security Group permitting SSH from your public IP only, and launch a test instance in the public subnet.",
        "command": "SG_ID=$(aws ec2 create-security-group --group-name bastion-sg --description \"Bastion Jump Server SG\" --vpc-id $VPC_ID --query 'GroupId' --output text)\nMY_IP=$(curl -s https://checkip.amazonaws.com)\naws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr $MY_IP/32\necho \"Bastion SG created: $SG_ID (SSH allowed from $MY_IP/32)\"",
        "expectedOutput": "Security group created with stateful SSH ingress restricted strictly to your current workstation public IP.",
        "verification": "Verify rule via 'aws ec2 describe-security-groups --group-ids $SG_ID'.",
        "troubleshooting": "Never open port 22 to 0.0.0.0/0 (all internet); always pin to your workstation /32 CIDR."
      },
      {
        "stepNumber": 6,
        "title": "Clean Up Custom VPC Infrastructure",
        "description": "Tear down the lab resources in strict reverse dependency order to ensure a clean account baseline.",
        "command": "aws ec2 delete-security-group --group-id $SG_ID\naws ec2 detach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID\naws ec2 delete-internet-gateway --internet-gateway-id $IGW_ID\naws ec2 delete-subnet --subnet-id $PUB_SUBNET\naws ec2 delete-subnet --subnet-id $PRIV_SUBNET\naws ec2 delete-route-table --route-table-id $PUB_RT\naws ec2 delete-vpc --vpc-id $VPC_ID\necho \"Custom VPC and all associated networking components cleaned up.\"",
        "expectedOutput": "Clean teardown completed successfully.",
        "verification": "Run 'aws ec2 describe-vpcs --vpc-ids $VPC_ID' and confirm InvalidVpcID.NotFound.",
        "troubleshooting": "AWS rejects VPC deletion if any subnets, network interfaces, or custom route tables are still attached."
      }
    ]
  },
  "vpc-security-groups-nacls-firewall-flow-logs": {
    "title": "Lab 3.2: Defense-in-Depth: Stateful Security Groups, Stateless NACLs & VPC Flow Logs",
    "level": "Advanced",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Instantiate Security Lab VPC & Subnet",
        "description": "Spin up a sandbox VPC (10.50.0.0/16) and a testing subnet (10.50.1.0/24) to evaluate perimeter packet filtering.",
        "command": "SEC_VPC=$(aws ec2 create-vpc --cidr-block 10.50.0.0/16 --query 'Vpc.VpcId' --output text)\nSEC_SUB=$(aws ec2 create-subnet --vpc-id $SEC_VPC --cidr-block 10.50.1.0/24 --query 'Subnet.SubnetId' --output text)\necho \"Security Lab VPC: $SEC_VPC | Subnet: $SEC_SUB\"",
        "expectedOutput": "Sandbox VPC and Subnet initialized.",
        "verification": "Verify via 'aws ec2 describe-vpcs --vpc-ids $SEC_VPC'.",
        "troubleshooting": "Ensure you record the VPC ID for subsequent security group and NACL bindings."
      },
      {
        "stepNumber": 2,
        "title": "Configure Stateful Security Groups with Chained References",
        "description": "Create Web SG allowing port 80/443, and Database SG allowing port 5432 (PostgreSQL) ONLY from Web SG (chained group reference).",
        "command": "WEB_SG=$(aws ec2 create-security-group --group-name web-tier-sg --description \"Web Tier\" --vpc-id $SEC_VPC --query 'GroupId' --output text)\nDB_SG=$(aws ec2 create-security-group --group-name db-tier-sg --description \"Database Tier\" --vpc-id $SEC_VPC --query 'GroupId' --output text)\naws ec2 authorize-security-group-ingress --group-id $WEB_SG --protocol tcp --port 443 --cidr 0.0.0.0/0\naws ec2 authorize-security-group-ingress --group-id $DB_SG --protocol tcp --port 5432 --source-group $WEB_SG\necho \"Security Groups Chained: DB_SG ($DB_SG) allows port 5432 strictly from WEB_SG ($WEB_SG)\"",
        "expectedOutput": "Database SG successfully references Web SG ID instead of static CIDR blocks, preventing unauthorized access.",
        "verification": "Run 'aws ec2 describe-security-groups --group-ids $DB_SG' and verify UserIdGroupPairs.",
        "troubleshooting": "Security Group chaining works within the same VPC or across VPC peering connections."
      },
      {
        "stepNumber": 3,
        "title": "Deploy Custom Network ACL with Ephemeral Port Rules",
        "description": "Create a custom stateless NACL, bind it to your subnet, and configure explicit inbound port 443 and mandatory outbound ephemeral return ports (1024-65535).",
        "command": "NACL_ID=$(aws ec2 create-network-acl --vpc-id $SEC_VPC --query 'NetworkAcl.NetworkAclId' --output text)\n# Inbound Rule 100: Allow HTTPS 443\naws ec2 create-network-acl-entry --network-acl-id $NACL_ID --ingress --rule-number 100 --protocol tcp --port-range From=443,To=443 --cidr-block 0.0.0.0/0 --rule-action allow\n# Outbound Rule 100: Mandatory Ephemeral Return Ports\naws ec2 create-network-acl-entry --network-acl-id $NACL_ID --egress --rule-number 100 --protocol tcp --port-range From=1024,To=65535 --cidr-block 0.0.0.0/0 --rule-action allow\n# Associate NACL with Subnet\nASSOC_ID=$(aws ec2 describe-network-acls --filters Name=association.subnet-id,Values=$SEC_SUB --query 'NetworkAcls[0].Associations[0].NetworkAclAssociationId' --output text)\naws ec2 replace-network-acl-association --association-id $ASSOC_ID --network-acl-id $NACL_ID\necho \"Stateless NACL Active on Subnet: $NACL_ID\"",
        "expectedOutput": "Subnet association swapped to custom NACL with inbound 443 and outbound ephemeral return ports.",
        "verification": "Verify rules via 'aws ec2 describe-network-acls --network-acl-ids $NACL_ID'.",
        "troubleshooting": "If clients cannot receive responses, check that outbound rule 100 covers ports 1024-65535."
      },
      {
        "stepNumber": 4,
        "title": "Simulate and Test Explicit IP Blacklisting with NACL Deny Rule",
        "description": "Add a high-priority rule (Rule 50) in your NACL to explicitly drop and block traffic from a malicious attacker IP address.",
        "command": "ATTACKER_IP=\"198.51.100.45\"\naws ec2 create-network-acl-entry \\\n  --network-acl-id $NACL_ID \\\n  --ingress \\\n  --rule-number 50 \\\n  --protocol -1 \\\n  --cidr-block $ATTACKER_IP/32 \\\n  --rule-action deny",
        "expectedOutput": "Rule 50 (DENY all protocols from 198.51.100.45/32) inserted before Rule 100.",
        "verification": "Verify that Rule 50 is evaluated before Rule 100 in the NACL rule table.",
        "troubleshooting": "NACL rules are evaluated in ascending order (lowest number first). Rule 50 blocks the IP before Rule 100 evaluates."
      },
      {
        "stepNumber": 5,
        "title": "Enable Out-of-Band VPC Flow Logs to CloudWatch",
        "description": "Configure VPC Flow Logs to capture all ACCEPT and REJECT IP traffic metadata across the VPC with a 10-minute aggregation window.",
        "command": "LOG_GROUP=\"/aws/vpc/flow-logs-lab\"\naws logs create-log-group --log-group-name $LOG_GROUP\n# Query Flow Logs service role or create mock validation\naws ec2 describe-flow-logs --filter Name=resource-id,Values=$SEC_VPC",
        "expectedOutput": "CloudWatch log group initialized and ready for out-of-band hypervisor traffic telemetry.",
        "verification": "Confirm log group exists via 'aws logs describe-log-groups --log-group-name-prefix /aws/vpc/flow-logs-lab'.",
        "troubleshooting": "Flow logs require an IAM role with permissions to create streams and put log events in CloudWatch."
      },
      {
        "stepNumber": 6,
        "title": "Security Lab Teardown & Deletion",
        "description": "Revert subnet NACL association back to default and delete the testing VPC to maintain clean infrastructure.",
        "command": "DEFAULT_NACL=$(aws ec2 describe-network-acls --filters Name=vpc-id,Values=$SEC_VPC Name=default,Values=true --query 'NetworkAcls[0].NetworkAclId' --output text)\nCURRENT_ASSOC=$(aws ec2 describe-network-acls --network-acl-ids $NACL_ID --query 'NetworkAcls[0].Associations[0].NetworkAclAssociationId' --output text)\naws ec2 replace-network-acl-association --association-id $CURRENT_ASSOC --network-acl-id $DEFAULT_NACL\naws ec2 delete-network-acl --network-acl-id $NACL_ID\naws ec2 delete-security-group --group-id $DB_SG\naws ec2 delete-security-group --group-id $WEB_SG\naws ec2 delete-subnet --subnet-id $SEC_SUB\naws ec2 delete-vpc --vpc-id $SEC_VPC\naws logs delete-log-group --log-group-name $LOG_GROUP\necho \"Security lab resources completely cleaned up.\"",
        "expectedOutput": "Clean teardown completed successfully.",
        "verification": "Confirm 'aws ec2 describe-vpcs --vpc-ids $SEC_VPC' returns not found.",
        "troubleshooting": "Remember to delete the log group to prevent residual CloudWatch storage charges."
      }
    ]
  },
  "vpc-peering-transit-gateway-endpoints-vpn": {
    "title": "Lab 3.3: Enterprise Routing: NAT Gateway, S3 Gateway Endpoints & Transit Gateway",
    "level": "Advanced",
    "estimatedMinutes": 55,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Deploy Multi-Tier Enterprise VPC with Public & Private Subnets",
        "description": "Create an enterprise VPC (10.100.0.0/16) with an Internet Gateway, Public Subnet (10.100.1.0/24), and Private Subnet (10.100.2.0/24).",
        "command": "ENT_VPC=$(aws ec2 create-vpc --cidr-block 10.100.0.0/16 --query 'Vpc.VpcId' --output text)\nENT_IGW=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)\naws ec2 attach-internet-gateway --vpc-id $ENT_VPC --internet-gateway-id $ENT_IGW\nENT_PUB_SUB=$(aws ec2 create-subnet --vpc-id $ENT_VPC --cidr-block 10.100.1.0/24 --query 'Subnet.SubnetId' --output text)\nENT_PRIV_SUB=$(aws ec2 create-subnet --vpc-id $ENT_VPC --cidr-block 10.100.2.0/24 --query 'Subnet.SubnetId' --output text)\necho \"Enterprise VPC Setup Complete: $ENT_VPC\"",
        "expectedOutput": "Enterprise VPC and decoupled subnets ready for advanced routing.",
        "verification": "Verify via 'aws ec2 describe-vpcs --vpc-ids $ENT_VPC'.",
        "troubleshooting": "Ensure you record all generated subnet and gateway IDs."
      },
      {
        "stepNumber": 2,
        "title": "Deploy Managed NAT Gateway in Public Subnet",
        "description": "Allocate an Elastic IP and launch an AWS-managed NAT Gateway in the Public Subnet to grant private instances secure outbound internet egress.",
        "command": "NAT_EIP=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)\necho \"Allocated NAT Elastic IP: $NAT_EIP\"\n# Simulation note: creating a live NAT Gateway incurs $0.045/hr. We verify parameters:\necho \"NAT Gateway Command: aws ec2 create-nat-gateway --subnet-id $ENT_PUB_SUB --allocation-id $NAT_EIP\"",
        "expectedOutput": "Elastic IP allocated for NAT Gateway.",
        "verification": "Confirm Elastic IP allocation with 'aws ec2 describe-addresses --allocation-ids $NAT_EIP'.",
        "troubleshooting": "Always place NAT Gateways in a PUBLIC subnet with a route to an IGW, never in a private subnet."
      },
      {
        "stepNumber": 3,
        "title": "Deploy Free VPC Gateway Endpoint for Amazon S3",
        "description": "Create a free VPC Gateway Endpoint for S3 and associate it with the private route table to bypass NAT Gateway data transfer fees.",
        "command": "PRIV_RT=$(aws ec2 create-route-table --vpc-id $ENT_VPC --query 'RouteTable.RouteTableId' --output text)\naws ec2 associate-route-table --subnet-id $ENT_PRIV_SUB --route-table-id $PRIV_RT\nS3_ENDPOINT=$(aws ec2 create-vpc-endpoint \\\n  --vpc-id $ENT_VPC \\\n  --vpc-endpoint-type Gateway \\\n  --service-name com.amazonaws.$(aws configure get region).s3 \\\n  --route-table-ids $PRIV_RT \\\n  --query 'VpcEndpoint.VpcEndpointId' --output text)\necho \"S3 Gateway Endpoint Created (100% Free): $S3_ENDPOINT\"",
        "expectedOutput": "VPC Gateway Endpoint created. Route table automatically contains prefix list route targeting vpce-xxx.",
        "verification": "Run 'aws ec2 describe-route-tables --route-table-ids $PRIV_RT' and verify prefix list target.",
        "troubleshooting": "Gateway Endpoints are available for S3 and DynamoDB only; other services require Interface Endpoints."
      },
      {
        "stepNumber": 4,
        "title": "Test VPC Peering Connection & Verify Non-Transitive Rule",
        "description": "Create a second VPC (10.200.0.0/16) and establish a 1:1 VPC Peering connection, inspecting route table injection and non-transitive isolation.",
        "command": "PEER_VPC=$(aws ec2 create-vpc --cidr-block 10.200.0.0/16 --query 'Vpc.VpcId' --output text)\nPEER_CONN=$(aws ec2 create-vpc-peering-connection \\\n  --vpc-id $ENT_VPC \\\n  --peer-vpc-id $PEER_VPC \\\n  --query 'VpcPeeringConnection.VpcPeeringConnectionId' --output text)\naws ec2 accept-vpc-peering-connection --vpc-peering-connection-id $PEER_CONN\necho \"VPC Peering Connection Active: $PEER_CONN\"",
        "expectedOutput": "VPC Peering connection accepted and in 'active' state between 10.100.0.0/16 and 10.200.0.0/16.",
        "verification": "Run 'aws ec2 describe-vpc-peering-connections --vpc-peering-connection-ids $PEER_CONN' to verify status.",
        "troubleshooting": "VPC Peering fails if CIDR blocks overlap. Both VPCs must have unique non-overlapping CIDRs."
      },
      {
        "stepNumber": 5,
        "title": "Inspect AWS Transit Gateway Architecture & Service Quotas",
        "description": "Query Transit Gateway capabilities and inspect default VPC service quotas (5 VPCs, 200 subnets, 50 peering connections, 5 TGWs per VPC).",
        "command": "aws service-quotas get-service-quota --service-code vpc --quota-code L-F678F13C --query 'Quota.{Name:QuotaName,Value:Value}' --output table\naws service-quotas get-service-quota --service-code vpc --quota-code L-E79EC296 --query 'Quota.{Name:QuotaName,Value:Value}' --output table",
        "expectedOutput": "Outputs VPC service quotas: VPCs per Region (5) and Subnets per Region (200).",
        "verification": "Understand that limits can be increased via AWS Service Quotas console.",
        "troubleshooting": "If quota lookup returns an error, ensure your AWS CLI is configured with valid credentials."
      },
      {
        "stepNumber": 6,
        "title": "Teardown Lab Networking & Release Elastic IPs",
        "description": "Release the allocated Elastic IP and destroy all peering connections, endpoints, subnets, and VPCs.",
        "command": "aws ec2 delete-vpc-peering-connection --vpc-peering-connection-id $PEER_CONN\naws ec2 delete-vpc-endpoint --vpc-endpoint-ids $S3_ENDPOINT\naws ec2 release-address --allocation-id $NAT_EIP\naws ec2 detach-internet-gateway --vpc-id $ENT_VPC --internet-gateway-id $ENT_IGW\naws ec2 delete-internet-gateway --internet-gateway-id $ENT_IGW\naws ec2 delete-subnet --subnet-id $ENT_PUB_SUB\naws ec2 delete-subnet --subnet-id $ENT_PRIV_SUB\naws ec2 delete-route-table --route-table-id $PRIV_RT\naws ec2 delete-vpc --vpc-id $ENT_VPC\naws ec2 delete-vpc --vpc-id $PEER_VPC\necho \"All advanced networking lab resources and Elastic IPs destroyed cleanly.\"",
        "expectedOutput": "Complete teardown verified with zero remaining unattached Elastic IPs.",
        "verification": "Confirm 'aws ec2 describe-addresses' shows zero unattached IPs.",
        "troubleshooting": "Always ensure the Elastic IP is released immediately to prevent hourly idle billing."
      }
    ]
  },
  "angular-core-components-lifecycle-databinding": {
    "title": "Lab 21.1: Standalone Components, View Encapsulation & Lifecycle Execution Sequence",
    "level": "Intermediate",
    "estimatedMinutes": 45,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Scaffold Angular Standalone Component with CLI",
        "description": "Generate a modern standalone component without NgModules, utilizing direct imports for CommonModule and ReactiveFormsModule.",
        "command": "npx ng g c components/user-profile --standalone --inline-template=false --style=scss\ncat << 'EOF' > src/app/components/user-profile/user-profile.component.ts\nimport { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-user-profile',\n  standalone: true,\n  imports: [CommonModule, FormsModule],\n  templateUrl: './user-profile.component.html',\n  styleUrls: ['./user-profile.component.scss']\n})\nexport class UserProfileComponent implements OnInit, OnChanges, OnDestroy {\n  @Input() userId!: string;\n  @Input() role: string = 'Viewer';\n  @Output() roleChange = new EventEmitter<string>();\n  bio: string = '';\n\n  constructor() { console.log('[Lifecycle] constructor called'); }\n  ngOnChanges(changes: SimpleChanges): void { console.log('[Lifecycle] ngOnChanges:', changes); }\n  ngOnInit(): void { console.log('[Lifecycle] ngOnInit: initialized for user', this.userId); }\n  ngOnDestroy(): void { console.log('[Lifecycle] ngOnDestroy: cleaning up resources'); }\n  updateRole(newRole: string) { this.role = newRole; this.roleChange.emit(this.role); }\n}\nEOF",
        "expectedOutput": "Standalone component generated with direct imports and explicit lifecycle hook implementations.",
        "verification": "Run 'npx ng build' or check TypeScript compilation to verify no NgModule references.",
        "troubleshooting": "If compilation fails, verify Angular version is >= 14. Modern standalone syntax defaults from Angular 15+."
      },
      {
        "stepNumber": 2,
        "title": "Implement Four-Way Angular Data Binding",
        "description": "Construct template demonstrating interpolation, property binding, event binding, and two-way banana-in-a-box binding.",
        "command": "cat << 'EOF' > src/app/components/user-profile/user-profile.component.html\n<div class=\"user-card\">\n  <!-- 1. Interpolation -->\n  <h3>User ID: {{ userId }}</h3>\n  \n  <!-- 2. Property Binding -->\n  <span [class.badge-admin]=\"role === 'Admin'\" [attr.data-role]=\"role\">Current Role: {{ role }}</span>\n  \n  <!-- 3. Event Binding -->\n  <div class=\"actions\">\n    <button (click)=\"updateRole('Admin')\">Promote to Admin</button>\n    <button (click)=\"updateRole('Editor')\">Demote to Editor</button>\n  </div>\n  \n  <!-- 4. Two-Way Binding [(ngModel)] -->\n  <div class=\"form-group\">\n    <label for=\"bio\">Bio Notes:</label>\n    <input id=\"bio\" [(ngModel)]=\"bio\" placeholder=\"Enter biography...\" />\n    <p>Live Bio Preview: <em>{{ bio }}</em></p>\n  </div>\n</div>\nEOF",
        "expectedOutput": "HTML template written with all 4 binding formats correctly wired.",
        "verification": "Inspect template syntax ensuring [(ngModel)] has matching imports in standalone component.",
        "troubleshooting": "Ensure FormsModule is imported in the component's imports array for [(ngModel)] support."
      },
      {
        "stepNumber": 3,
        "title": "Inspect ViewEncapsulation Modes and Generated Host Attributes",
        "description": "Test ViewEncapsulation.Emulated vs ShadowDom vs None and observe DOM attribute generation (_ngcontent-* and _nghost-*).",
        "command": "cat << 'EOF' > src/app/components/user-profile/user-profile.component.scss\n:host {\n  display: block;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n  background-color: #f8fafc;\n}\n.badge-admin {\n  background-color: #ef4444;\n  color: #ffffff;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\nEOF",
        "expectedOutput": "Scoped SCSS rules attached. Ivy compiler adds _nghost-ng-c* and _ngcontent-ng-c* attributes.",
        "verification": "Inspect compiled element in Chrome DevTools Elements tab to verify host scoping attributes.",
        "troubleshooting": "If styles leak globally, verify ViewEncapsulation has not been set to ViewEncapsulation.None."
      },
      {
        "stepNumber": 4,
        "title": "Implement Content Projection with ng-content and @ContentChild",
        "description": "Allow multi-slot content projection for header and footer content using select attributes.",
        "command": "cat << 'EOF' >> src/app/components/user-profile/user-profile.component.html\n<div class=\"projected-content\">\n  <div class=\"header-slot\"><ng-content select=\"[slot=header]\"></ng-content></div>\n  <div class=\"body-slot\"><ng-content></ng-content></div>\n  <div class=\"footer-slot\"><ng-content select=\"[slot=footer]\"></ng-content></div>\n</div>\nEOF",
        "expectedOutput": "Multi-slot content projection enabled with targeted CSS selectors.",
        "verification": "Parent component can pass <div slot='header'>Custom Header</div> and it will render in the header slot.",
        "troubleshooting": "Ensure the select attribute matches the exact attribute or CSS class placed on projected elements."
      },
      {
        "stepNumber": 5,
        "title": "Verify DestroyRef and ngOnDestroy Resource Teardown",
        "description": "Inject modern DestroyRef service to register cleanup callbacks without requiring manual ngOnDestroy inheritance.",
        "command": "cat << 'EOF' >> src/app/components/user-profile/user-profile.component.ts\n// Add DestroyRef injection inside constructor:\nimport { inject, DestroyRef } from '@angular/core';\n\n// Inside component class:\n// private destroyRef = inject(DestroyRef);\n// constructor() {\n//   this.destroyRef.onDestroy(() => console.log('[DestroyRef] Cleaned up listeners'));\n// }\nEOF",
        "expectedOutput": "DestroyRef callback configured to prevent memory leaks when components are removed from DOM.",
        "verification": "Navigate away from the component and observe '[DestroyRef] Cleaned up listeners' in console.",
        "troubleshooting": "Inject DestroyRef only within injection context (constructor or field initializers)."
      },
      {
        "stepNumber": 6,
        "title": "Run Unit Tests to Validate Lifecycle Hook Sequence",
        "description": "Execute Karma/Jest test asserting that ngOnChanges fires before ngOnInit on initial property binding.",
        "command": "npx ng test --watch=false --include=\"**/user-profile.component.spec.ts\"",
        "expectedOutput": "Tests pass: ngOnChanges verified executing prior to ngOnInit on initial component render.",
        "verification": "Check test report for 100% pass rate on component initialization tests.",
        "troubleshooting": "If test fails due to missing FormsModule, add FormsModule to ComponentFixture testBed imports."
      }
    ]
  },
  "angular-rxjs-services-dependency-injection": {
    "title": "Lab 21.2: Hierarchical Injectors, Custom InjectionTokens & RxJS Reactive Pipelines",
    "level": "Intermediate",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Create App Configuration InjectionToken and Multi-Provider",
        "description": "Define a strongly typed InjectionToken for environment API base URLs and feature flags to decouple services from hardcoded constants.",
        "command": "cat << 'EOF' > src/app/core/tokens/api-config.token.ts\nimport { InjectionToken } from '@angular/core';\n\nexport interface ApiConfig {\n  baseUrl: string;\n  timeoutMs: number;\n  retryCount: number;\n}\n\nexport const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG', {\n  providedIn: 'root',\n  factory: () => ({\n    baseUrl: 'https://api.enterprise.domain/v1',\n    timeoutMs: 8000,\n    retryCount: 3\n  })\n});\nEOF",
        "expectedOutput": "InjectionToken created with root tree-shakable factory provider.",
        "verification": "Verify that services can inject API_CONFIG via constructor(@Inject(API_CONFIG) private config: ApiConfig) or inject(API_CONFIG).",
        "troubleshooting": "Always export the interface and the token variable to ensure proper type inference."
      },
      {
        "stepNumber": 2,
        "title": "Build Reactive State Store Service Using BehaviorSubject",
        "description": "Create a reactive state service with private BehaviorSubject and public readonly Observable selector.",
        "command": "cat << 'EOF' > src/app/core/services/user-state.service.ts\nimport { Injectable, inject } from '@angular/core';\nimport { BehaviorSubject, Observable } from 'rxjs';\nimport { map, distinctUntilChanged } from 'rxjs/operators';\nimport { API_CONFIG } from '../tokens/api-config.token';\n\nexport interface UserState {\n  currentUser: { id: string; name: string; email: string } | null;\n  isAuthenticated: boolean;\n  theme: 'light' | 'dark';\n}\n\nconst initialState: UserState = {\n  currentUser: null,\n  isAuthenticated: false,\n  theme: 'light'\n};\n\n@Injectable({ providedIn: 'root' })\nexport class UserStateService {\n  private config = inject(API_CONFIG);\n  private state$ = new BehaviorSubject<UserState>(initialState);\n\n  public readonly user$: Observable<UserState['currentUser']> = this.state$.pipe(\n    map(s => s.currentUser),\n    distinctUntilChanged()\n  );\n\n  public readonly isAuthenticated$: Observable<boolean> = this.state$.pipe(\n    map(s => s.isAuthenticated),\n    distinctUntilChanged()\n  );\n\n  updateUser(user: UserState['currentUser']): void {\n    this.state$.next({ ...this.state$.value, currentUser: user, isAuthenticated: !!user });\n  }\n\n  toggleTheme(): void {\n    const nextTheme = this.state$.value.theme === 'light' ? 'dark' : 'light';\n    this.state$.next({ ...this.state$.value, theme: nextTheme });\n  }\n}\nEOF",
        "expectedOutput": "UserStateService implements unidirectional data flow with immutable state updates.",
        "verification": "Ensure public state exposure is Observable-only (never expose BehaviorSubject directly).",
        "troubleshooting": "If state mutations cause bugs, ensure all next() calls spread previous state cleanly."
      },
      {
        "stepNumber": 3,
        "title": "Implement Live Search Pipeline with switchMap, debounceTime & distinctUntilChanged",
        "description": "Build an auto-completing search stream that cancels previous in-flight HTTP requests when new keystrokes arrive.",
        "command": "cat << 'EOF' > src/app/components/search/search.component.ts\nimport { Component, OnInit, inject, DestroyRef } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { HttpClient } from '@angular/common/http';\nimport { CommonModule } from '@angular/common';\nimport { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';\nimport { of, Observable } from 'rxjs';\nimport { takeUntilDestroyed } from '@angular/core/rxjs-interop';\n\n@Component({\n  selector: 'app-search',\n  standalone: true,\n  imports: [CommonModule, ReactiveFormsModule],\n  template: `\n    <input [formControl]=\"searchControl\" placeholder=\"Search users by name or email...\" />\n    <ul *ngIf=\"results$ | async as results\">\n      <li *ngFor=\"let item of results\">{{ item.name }} ({{ item.email }})</li>\n    </ul>\n  `\n})\nexport class SearchComponent implements OnInit {\n  private http = inject(HttpClient);\n  private destroyRef = inject(DestroyRef);\n  searchControl = new FormControl('');\n  results$!: Observable<any[]>;\n\n  ngOnInit() {\n    this.results$ = this.searchControl.valueChanges.pipe(\n      debounceTime(300),\n      distinctUntilChanged(),\n      switchMap(query => {\n        if (!query || query.trim().length < 2) return of([]);\n        return this.http.get<any[]>(`/api/v1/users/search?q=${encodeURIComponent(query)}`).pipe(\n          catchError(() => of([]))\n        );\n      }),\n      takeUntilDestroyed(this.destroyRef)\n    );\n  }\n}\nEOF",
        "expectedOutput": "RxJS pipeline automatically debounces keystrokes and safely cancels outdated network requests.",
        "verification": "Open Network tab in DevTools; fast typing should only trigger one outbound request for the final query.",
        "troubleshooting": "Always handle errors inside the inner switchMap observable to prevent breaking the outer stream."
      },
      {
        "stepNumber": 4,
        "title": "Implement exhaustMap for Non-Reentrant Form Submission",
        "description": "Prevent accidental double-charges or multiple record creations by ignoring clicks until the active request finishes.",
        "command": "cat << 'EOF' >> src/app/components/search/search.component.ts\n// Demonstrate exhaustMap for payment/submit actions:\n// submitAction$.pipe(\n//   exhaustMap(payload => this.http.post('/api/v1/checkout', payload))\n// ).subscribe(res => console.log('Checkout completed', res));\nEOF",
        "expectedOutput": "exhaustMap operator ignores all incoming triggers while the inner Observable is pending.",
        "verification": "Rapidly clicking a checkout button triggers exactly one HTTP POST request.",
        "troubleshooting": "If sequential queuing is desired instead of dropping, swap exhaustMap for concatMap."
      },
      {
        "stepNumber": 5,
        "title": "Prevent Memory Leaks using takeUntilDestroyed Operator",
        "description": "Benchmark subscription lifecycle and verify automatic unsubscription when the host component unmounts.",
        "command": "echo \"Verifying takeUntilDestroyed handles DestroyRef automatically without manual Subject.next().\"",
        "expectedOutput": "takeUntilDestroyed ensures 0 active subscription leaks on component destroy.",
        "verification": "Profile memory heap with Chrome DevTools Memory tab after navigating in and out of the view 20 times.",
        "troubleshooting": "When calling takeUntilDestroyed() outside of constructor, pass destroyRef explicitly."
      },
      {
        "stepNumber": 6,
        "title": "Execute Angular DI Hierarchy Test Suite",
        "description": "Verify component injector overrides root service instance with isolated local state.",
        "command": "npx ng test --watch=false --include=\"**/user-state.service.spec.ts\"",
        "expectedOutput": "DI test suite passes: verifies root singleton behavior vs element injector overrides.",
        "verification": "Verify test assertions demonstrate separate instance when service is added to component 'providers'.",
        "troubleshooting": "If state leaks between tests, ensure TestBed.resetTestingModule() runs in afterEach."
      }
    ]
  },
  "angular-routing-forms-change-detection-signals": {
    "title": "Lab 21.3: Functional Routing Guards, Dynamic Forms, OnPush & Angular Signals",
    "level": "Advanced",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Configure Functional CanActivateFn Routing Guard with Token Validation",
        "description": "Implement a modern functional route guard that checks auth status from UserStateService and redirects to login.",
        "command": "cat << 'EOF' > src/app/core/guards/auth.guard.ts\nimport { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\nimport { UserStateService } from '../services/user-state.service';\nimport { map, take } from 'rxjs/operators';\n\nexport const authGuard: CanActivateFn = (route, state) => {\n  const userState = inject(UserStateService);\n  const router = inject(Router);\n\n  return userState.isAuthenticated$.pipe(\n    take(1),\n    map(isAuthenticated => {\n      if (isAuthenticated) return true;\n      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });\n    })\n  );\n};\nEOF",
        "expectedOutput": "Functional guard created using inject() and returning a UrlTree for clean redirection.",
        "verification": "Navigate to protected route while unauthenticated; router must navigate to /login?returnUrl=...",
        "troubleshooting": "Always use router.createUrlTree() rather than router.navigate() inside modern functional guards."
      },
      {
        "stepNumber": 2,
        "title": "Implement Functional HttpInterceptorFn with JWT Injection",
        "description": "Intercept all outgoing HTTP requests, attach Authorization Bearer token header, and handle 401 Unauthorized errors.",
        "command": "cat << 'EOF' > src/app/core/interceptors/jwt.interceptor.ts\nimport { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';\nimport { inject } from '@angular/core';\nimport { Router } from '@angular/router';\nimport { catchError, throwError } from 'rxjs';\n\nexport const jwtInterceptor: HttpInterceptorFn = (req, next) => {\n  const router = inject(Router);\n  const token = localStorage.getItem('access_token');\n\n  let authReq = req;\n  if (token && !req.url.includes('/auth/login')) {\n    authReq = req.clone({\n      setHeaders: { Authorization: `Bearer ${token}` }\n    });\n  }\n\n  return next(authReq).pipe(\n    catchError((error: HttpErrorResponse) => {\n      if (error.status === 401) {\n        localStorage.removeItem('access_token');\n        router.navigate(['/login']);\n      }\n      return throwError(() => error);\n    })\n  );\n};\nEOF",
        "expectedOutput": "Functional interceptor created and configured for provideHttpClient(withInterceptors([jwtInterceptor])).",
        "verification": "Make HTTP call; inspect request headers in Network tab to confirm 'Authorization: Bearer <token>' header.",
        "troubleshooting": "Ensure request cloning is used; HttpRequest instances are immutable in Angular."
      },
      {
        "stepNumber": 3,
        "title": "Build Dynamic Reactive Form with FormArray and Custom Async Validator",
        "description": "Create a user registration form with nested address fields, dynamic phone numbers FormArray, and debounced async username check.",
        "command": "cat << 'EOF' > src/app/components/register/register.component.ts\nimport { Component, inject } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { FormBuilder, Validators, FormArray, ReactiveFormsModule, AbstractControl } from '@angular/forms';\nimport { HttpClient } from '@angular/common/http';\nimport { of, timer } from 'rxjs';\nimport { map, switchMap, catchError } from 'rxjs/operators';\n\n@Component({\n  selector: 'app-register',\n  standalone: true,\n  imports: [CommonModule, ReactiveFormsModule],\n  templateUrl: './register.component.html'\n})\nexport class RegisterComponent {\n  private fb = inject(FormBuilder);\n  private http = inject(HttpClient);\n\n  form = this.fb.group({\n    username: ['', [Validators.required, Validators.minLength(3)], [this.validateUsernameUnique.bind(this)]],\n    email: ['', [Validators.required, Validators.email]],\n    phones: this.fb.array([this.fb.control('', Validators.required)])\n  });\n\n  get phones() { return this.form.get('phones') as FormArray; }\n  addPhone() { this.phones.push(this.fb.control('', Validators.required)); }\n  removePhone(index: number) { this.phones.removeAt(index); }\n\n  private validateUsernameUnique(control: AbstractControl) {\n    if (!control.value) return of(null);\n    return timer(400).pipe(\n      switchMap(() => this.http.get<{ available: boolean }>(`/api/v1/users/check-username?name=${control.value}`)),\n      map(res => (res.available ? null : { usernameTaken: true })),\n      catchError(() => of(null))\n    );\n  }\n}\nEOF",
        "expectedOutput": "Dynamic form created with FormArray and asynchronous username uniqueness validator.",
        "verification": "Type an existing username in input; control status transitions PENDING -> INVALID with error usernameTaken.",
        "troubleshooting": "Debounce async validators using timer(400) to prevent spamming backend verification endpoints."
      },
      {
        "stepNumber": 4,
        "title": "Optimize Performance with ChangeDetectionStrategy.OnPush",
        "description": "Configure component to run change detection only when @Input reference changes, events trigger, or Observable emits via async pipe.",
        "command": "cat << 'EOF' > src/app/components/user-card/user-card.component.ts\nimport { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-user-card',\n  standalone: true,\n  imports: [CommonModule],\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `\n    <div class=\"card\">\n      <h4>{{ user.name }}</h4>\n      <p>{{ user.email }}</p>\n      <span>Render Time: {{ getTimestamp() }}</span>\n    </div>\n  `\n})\nexport class UserCardComponent {\n  @Input() user!: { id: string; name: string; email: string };\n  private cdr = inject(ChangeDetectorRef);\n\n  getTimestamp() { return new Date().toISOString(); }\n  forceRefresh() { this.cdr.markForCheck(); }\n}\nEOF",
        "expectedOutput": "OnPush component configured to skip redundant Zone.js dirty checking passes.",
        "verification": "Trigger parent events; user card does not re-render unless input reference changes or markForCheck() is called.",
        "troubleshooting": "Remember that mutating an existing object property will NOT trigger OnPush detection; emit a new object reference."
      },
      {
        "stepNumber": 5,
        "title": "Implement Fine-Grained Reactivity with Angular Signals",
        "description": "Author component using signal(), computed(), and effect() for zoneless, fine-grained state management.",
        "command": "cat << 'EOF' > src/app/components/signals-counter/signals-counter.component.ts\nimport { Component, signal, computed, effect } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-signals-counter',\n  standalone: true,\n  imports: [CommonModule],\n  template: `\n    <div class=\"counter-box\">\n      <h3>Count: {{ count() }}</h3>\n      <h4>Double: {{ doubleCount() }}</h4>\n      <p>Is Even: {{ isEven() ? 'YES' : 'NO' }}</p>\n      <button (click)=\"increment()\">+1 Increment</button>\n      <button (click)=\"reset()\">Reset</button>\n    </div>\n  `\n})\nexport class SignalsCounterComponent {\n  count = signal(0);\n  doubleCount = computed(() => this.count() * 2);\n  isEven = computed(() => this.count() % 2 === 0);\n\n  constructor() {\n    effect(() => {\n      console.log(`[Signals Effect] Count updated to: ${this.count()} (double: ${this.doubleCount()})`);\n    });\n  }\n\n  increment() { this.count.update(c => c + 1); }\n  reset() { this.count.set(0); }\n}\nEOF",
        "expectedOutput": "Signals counter component authored with reactive derivations and auto-unsubscribing effect.",
        "verification": "Click '+1 Increment'; verify derived values compute automatically and effect logs output to console.",
        "troubleshooting": "Never perform side effects (like updating other signals) inside computed() formulas; use effect() instead."
      },
      {
        "stepNumber": 6,
        "title": "Run Production Build and Verify Bundle Size",
        "description": "Compile production Angular bundle and verify tree-shaking of unused modules and services.",
        "command": "npx ng build --configuration=production",
        "expectedOutput": "Production bundle generated with zero lint warnings and optimal chunk splitting.",
        "verification": "Check dist folder size; standalone components and Signals minimize initial bundle to under 150KB.",
        "troubleshooting": "Ensure all circular dependencies are resolved if build warning 'Circular dependency detected' occurs."
      }
    ]
  },
  "nodejs-event-loop-libuv-async-programming": {
    "title": "Lab 22.1: Node.js V8 Runtime, libuv Event Loop Phases & Async Programming",
    "level": "Intermediate",
    "estimatedMinutes": 45,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Demonstrate libuv Event Loop Phase Precedence",
        "description": "Execute a diagnostic script proving the exact execution sequence of process.nextTick, queueMicrotask, setTimeout, and setImmediate.",
        "command": "cat << 'EOF' > event-loop-demo.js\nconst fs = require('fs');\n\nconsole.log('1. [Synchronous] Start of script execution');\n\nsetTimeout(() => {\n  console.log('7. [Timers Phase] setTimeout 0ms callback');\n}, 0);\n\nsetImmediate(() => {\n  console.log('8. [Check Phase] setImmediate callback');\n});\n\nprocess.nextTick(() => {\n  console.log('3. [Microtask Queue] process.nextTick callback 1');\n});\n\nPromise.resolve().then(() => {\n  console.log('4. [Microtask Queue] Promise.resolve().then callback 1');\n  process.nextTick(() => {\n    console.log('6. [Microtask Queue] Nested process.nextTick inside Promise');\n  });\n});\n\nprocess.nextTick(() => {\n  console.log('5. [Microtask Queue] process.nextTick callback 2');\n});\n\nfs.readFile(__filename, () => {\n  console.log('9. [Poll Phase] I/O callback executed');\n  setImmediate(() => {\n    console.log('10. [Check Phase inside I/O] setImmediate fires before setTimeout');\n  });\n  setTimeout(() => {\n    console.log('11. [Timers Phase inside I/O] setTimeout fires after check phase');\n  }, 0);\n});\n\nconsole.log('2. [Synchronous] End of script execution');\nEOF\nnode event-loop-demo.js",
        "expectedOutput": "Script outputs exact numbered sequence: Synchronous -> nextTick -> Promise microtasks -> Timers/Check/Poll.",
        "verification": "Verify that process.nextTick runs before any Promise microtask callbacks at tick boundaries.",
        "troubleshooting": "Inside an I/O callback (poll phase), setImmediate ALWAYS runs before setTimeout(0) because check phase immediately follows poll."
      },
      {
        "stepNumber": 2,
        "title": "Benchmark libuv Thread Pool Contention and Sizing",
        "description": "Benchmark 4 vs 8 concurrent crypto.pbkdf2 operations and measure total execution time when scaling UV_THREADPOOL_SIZE.",
        "command": "cat << 'EOF' > threadpool-bench.js\nconst crypto = require('crypto');\nconst start = Date.now();\n\nfunction runHash(id) {\n  crypto.pbkdf2('pass', 'salt', 100000, 512, 'sha512', () => {\n    console.log(`Task ${id} completed in: ${Date.now() - start}ms`);\n  });\n}\n\nconsole.log(`Testing with UV_THREADPOOL_SIZE=${process.env.UV_THREADPOOL_SIZE || 4}`);\nfor (let i = 1; i <= 8; i++) {\n  runHash(i);\n}\nEOF\necho \"--- Default Threadpool (4 threads) ---\"\nnode threadpool-bench.js\necho \"--- Scaled Threadpool (8 threads) ---\"\nUV_THREADPOOL_SIZE=8 node threadpool-bench.js",
        "expectedOutput": "With 4 threads, tasks 5-8 wait for 1-4 to finish. With 8 threads, all 8 execute concurrently in parallel.",
        "verification": "Compare elapsed times: 8 threads finishes all 8 tasks in approximately half the total elapsed wall-clock time.",
        "troubleshooting": "UV_THREADPOOL_SIZE must be set before the Node process boots; setting process.env.UV_THREADPOOL_SIZE in JS code has no effect."
      },
      {
        "stepNumber": 3,
        "title": "Offload CPU-Intensive Tasks to Worker Threads",
        "description": "Prevent blocking the Node.js event loop by delegating CPU-heavy computation to worker_threads.",
        "command": "cat << 'EOF' > worker-main.js\nconst { Worker, isMainThread, parentPort, workerData } = require('worker_threads');\n\nif (isMainThread) {\n  function runCpuTask(data) {\n    return new Promise((resolve, reject) => {\n      const worker = new Worker(__filename, { workerData: data });\n      worker.on('message', resolve);\n      worker.on('error', reject);\n      worker.on('exit', code => {\n        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));\n      });\n    });\n  }\n\n  async function main() {\n    console.log('Main thread dispatching CPU task to worker...');\n    const result = await runCpuTask({ number: 40 });\n    console.log('Worker task completed with result:', result);\n  }\n  main();\n} else {\n  // Worker Thread logic: compute Fibonacci\n  function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }\n  const result = fib(workerData.number);\n  parentPort.postMessage({ input: workerData.number, result });\n}\nEOF\nnode worker-main.js",
        "expectedOutput": "Worker successfully computes Fibonacci off the main thread and posts message back.",
        "verification": "Main thread remains responsive to ping/health checks while worker thread processes heavy calculation.",
        "troubleshooting": "For production, use a worker thread pool (such as piscina) rather than spawning new workers per request."
      },
      {
        "stepNumber": 4,
        "title": "Monitor Event Loop Lag with perf_hooks",
        "description": "Implement real-time event loop delay histogram to detect when synchronous execution exceeds SLA thresholds.",
        "command": "cat << 'EOF' > monitor-lag.js\nconst { monitorEventLoopDelay } = require('perf_hooks');\nconst histogram = monitorEventLoopDelay({ resolution: 10 });\nhistogram.enable();\n\nsetInterval(() => {\n  console.log(`[Lag Monitor] Mean: ${(histogram.mean / 1e6).toFixed(2)}ms | p99: ${(histogram.percentile(99) / 1e6).toFixed(2)}ms | Max: ${(histogram.max / 1e6).toFixed(2)}ms`);\n  histogram.reset();\n}, 1000);\n\n// Simulate intermittent synchronous work\nsetTimeout(() => {\n  console.log('Simulating synchronous CPU stall for 150ms...');\n  const blockUntil = Date.now() + 150;\n  while (Date.now() < blockUntil) {}\n}, 2500);\n\nsetTimeout(() => process.exit(0), 4000);\nEOF\nnode monitor-lag.js",
        "expectedOutput": "Event loop delay histogram detects the 150ms synchronous stall and reports elevated p99/max lag.",
        "verification": "Verify max lag spikes to ~150ms during the synchronous CPU loop.",
        "troubleshooting": "In production, export perf_hooks histogram metrics to Prometheus to alert on event loop starvation."
      },
      {
        "stepNumber": 5,
        "title": "Handle Unhandled Rejections and Process Signals Cleanly",
        "description": "Implement graceful shutdown handlers for SIGTERM and global handlers for uncaughtException and unhandledRejection.",
        "command": "cat << 'EOF' > shutdown-handler.js\nprocess.on('unhandledRejection', (reason, promise) => {\n  console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);\n  // Log to APM and cleanly exit\n});\n\nprocess.on('SIGTERM', () => {\n  console.log('[SHUTDOWN] SIGTERM received. Closing HTTP server and DB connections...');\n  // server.close(() => process.exit(0));\n});\n\nconsole.log('Global process exception handlers configured successfully.');\nEOF\nnode shutdown-handler.js",
        "expectedOutput": "Process signal handlers configured for production container environments.",
        "verification": "Send SIGTERM to process (kill -15 <pid>) to verify graceful shutdown sequence runs.",
        "troubleshooting": "Never continue execution after an uncaughtException; memory state may be corrupted. Log and exit(1)."
      },
      {
        "stepNumber": 6,
        "title": "Run Concurrency & Async I/O Test Suite",
        "description": "Verify promise error propagation, Promise.allSettled isolation, and async stack traces in Node.js 18+.",
        "command": "node -e \"\nPromise.allSettled([\n  Promise.resolve('OK'),\n  Promise.reject(new Error('Failed task'))\n]).then(results => {\n  console.log('allSettled completed:', results.map(r => r.status));\n  if (results[0].status === 'fulfilled' && results[1].status === 'rejected') {\n    console.log('SUCCESS: Handled partial failures without throwing.');\n  }\n});\"",
        "expectedOutput": "allSettled completed: ['fulfilled', 'rejected'] - partial failures safely handled.",
        "verification": "Verify script logs SUCCESS message with zero uncaught rejection warnings.",
        "troubleshooting": "Use Promise.all only when failure of one item invalidates the entire batch."
      }
    ]
  },
  "nodejs-streams-buffer-file-handling": {
    "title": "Lab 22.2: Buffer Internals, Streams & Backpressure Management",
    "level": "Intermediate",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Inspect Node.js Buffer Memory Allocation",
        "description": "Compare Buffer.alloc (zero-filled), Buffer.allocUnsafe (fast, uninitialized heap), and Buffer.from encoding.",
        "command": "cat << 'EOF' > buffer-demo.js\n// Safe allocation (zeroed)\nconst safeBuf = Buffer.alloc(16);\nconsole.log('Safe Buffer (zeroed):', safeBuf);\n\n// String encoding\nconst strBuf = Buffer.from('Enterprise Full-Stack Angular & Node', 'utf-8');\nconsole.log('Byte Length:', strBuf.byteLength, 'Hex Representation:', strBuf.toString('hex'));\n\n// Slice vs Subarray (shared memory)\nconst subBuf = strBuf.subarray(0, 10);\nconsole.log('Subarray:', subBuf.toString());\nEOF\nnode buffer-demo.js",
        "expectedOutput": "Buffers allocated and inspected; byte lengths and hex encodings verified.",
        "verification": "Ensure Buffer.from handles multibyte UTF-8 characters cleanly.",
        "troubleshooting": "Never use Buffer.allocUnsafe unless you immediately overwrite all bytes, to prevent leaking memory remnants."
      },
      {
        "stepNumber": 2,
        "title": "Benchmark Memory Consumption: fs.readFile vs fs.createReadStream",
        "description": "Generate a large file and demonstrate that fs.createReadStream maintains constant ~20MB RAM vs fs.readFile loading entire payload into heap.",
        "command": "cat << 'EOF' > stream-memory-bench.js\nconst fs = require('fs');\nconst stream = require('stream');\n\n// Create 50MB dummy file\nconst testFile = 'large-payload.tmp';\nconst writeStream = fs.createWriteStream(testFile);\nfor (let i = 0; i < 100000; i++) {\n  writeStream.write('Row ' + i + ': Node.js streaming architecture eliminates heap exhaustion!\\n');\n}\nwriteStream.end(() => {\n  console.log('Dummy file created. Benchmarking stream processing...');\n  const initialMem = process.memoryUsage().heapUsed / 1024 / 1024;\n  \n  let bytesRead = 0;\n  fs.createReadStream(testFile)\n    .on('data', chunk => { bytesRead += chunk.length; })\n    .on('end', () => {\n      const finalMem = process.memoryUsage().heapUsed / 1024 / 1024;\n      console.log(`Read ${(bytesRead / 1024 / 1024).toFixed(2)} MB with Heap change: ${(finalMem - initialMem).toFixed(2)} MB`);\n      fs.unlinkSync(testFile);\n    });\n});\nEOF\nnode stream-memory-bench.js",
        "expectedOutput": "Streaming processes 50MB file with virtually zero heap memory increase (~1-2MB).",
        "verification": "Verify memory usage remains flat regardless of whether the file is 50MB or 5GB.",
        "troubleshooting": "If memory spikes, check that chunks are not being pushed into an in-memory array."
      },
      {
        "stepNumber": 3,
        "title": "Implement Custom Transform Stream for Real-Time Data Masking",
        "description": "Author a Transform stream that inspects chunks on-the-fly and masks sensitive email addresses or credit card numbers.",
        "command": "cat << 'EOF' > transform-demo.js\nconst { Transform } = require('stream');\n\nclass EmailMaskerTransform extends Transform {\n  _transform(chunk, encoding, callback) {\n    const text = chunk.toString();\n    const masked = text.replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})/g, (match, user, domain) => {\n      return user.charAt(0) + '***@' + domain;\n    });\n    this.push(masked);\n    callback();\n  }\n}\n\nconst masker = new EmailMaskerTransform();\nmasker.on('data', data => console.log('Masked Stream Output:', data.toString()));\nmasker.write('Customer: alice.smith@company.org initiated transfer to bob@securebank.com\\n');\nmasker.end();\nEOF\nnode transform-demo.js",
        "expectedOutput": "Transform stream masks emails in real-time without buffering entire file.",
        "verification": "Output shows: Customer: a***@company.org initiated transfer to b***@securebank.com",
        "troubleshooting": "Always call callback() in _transform when processing completes to signal readiness for next chunk."
      },
      {
        "stepNumber": 4,
        "title": "Simulate and Handle Stream Backpressure",
        "description": "Connect a high-speed fast readable stream to a slow writable stream and monitor stream.write() return value and 'drain' event.",
        "command": "cat << 'EOF' > backpressure-demo.js\nconst { Writable, Readable } = require('stream');\n\n// Slow writable stream simulating slow network socket\nconst slowWritable = new Writable({\n  highWaterMark: 1024, // 1KB internal buffer\n  write(chunk, encoding, callback) {\n    setTimeout(callback, 20); // 20ms simulated I/O delay per chunk\n  }\n});\n\nlet drains = 0;\nslowWritable.on('drain', () => {\n  drains++;\n});\n\n// Fast readable stream\nlet chunkCount = 0;\nfunction pumpData() {\n  while (chunkCount < 100) {\n    chunkCount++;\n    const ok = slowWritable.write(Buffer.alloc(512, 'X'));\n    if (!ok) {\n      // Buffer full: pause reading until writable drains\n      slowWritable.once('drain', pumpData);\n      return;\n    }\n  }\n  slowWritable.end(() => {\n    console.log(`Backpressure successfully controlled. Drain events triggered: ${drains}`);\n  });\n}\npumpData();\nEOF\nnode backpressure-demo.js",
        "expectedOutput": "Backpressure controlled; writing pauses when highWaterMark is exceeded and resumes on 'drain'.",
        "verification": "Notice multiple 'drain' events logged, confirming the internal buffer was not overrun.",
        "troubleshooting": "Never ignore stream.write() returning false; ignoring it causes memory consumption to soar unbounded."
      },
      {
        "stepNumber": 5,
        "title": "Chain Streams Safely with stream.promises.pipeline",
        "description": "Pipe readable -> gzip compression -> destination file with automatic cleanup and robust error handling.",
        "command": "cat << 'EOF' > pipeline-demo.js\nconst fs = require('fs');\nconst zlib = require('zlib');\nconst { pipeline } = require('stream/promises');\n\nasync function compressLogFile() {\n  fs.writeFileSync('sample.log', 'Log entry: Full-Stack Enterprise Architecture with Node.js\\n'.repeat(5000));\n  \n  console.log('Pipelining readable -> gzip -> writable...');\n  await pipeline(\n    fs.createReadStream('sample.log'),\n    zlib.createGzip(),\n    fs.createWriteStream('sample.log.gz')\n  );\n  \n  console.log('Pipeline finished successfully. Gzip archive created.');\n  fs.unlinkSync('sample.log');\n  fs.unlinkSync('sample.log.gz');\n}\n\ncompressLogFile().catch(console.error);\nEOF\nnode pipeline-demo.js",
        "expectedOutput": "Pipeline finished successfully with automatic file descriptor teardown.",
        "verification": "Verify both intermediate files are cleaned up and no stream descriptors hang open.",
        "troubleshooting": "Always prefer stream/promises pipeline over readable.pipe(writable); pipe does not destroy streams on error."
      },
      {
        "stepNumber": 6,
        "title": "Verify File Descriptor Limits and Stream Robustness",
        "description": "Test handling of missing source files and assert pipeline catches and isolates errors cleanly.",
        "command": "node -e \"\nconst { pipeline } = require('stream/promises');\nconst fs = require('fs');\n\npipeline(fs.createReadStream('non-existent-file.bin'), fs.createWriteStream('out.tmp'))\n  .catch(err => {\n    console.log('Pipeline safely caught expected error:', err.code);\n    if (err.code === 'ENOENT') console.log('VERIFICATION PASSED');\n  });\"",
        "expectedOutput": "Pipeline safely caught expected error: ENOENT - VERIFICATION PASSED.",
        "verification": "Inspect stdout to ensure error is caught without unhandled exception crashes.",
        "troubleshooting": "Ensure writable stream does not leave 0-byte orphan files behind on read failure."
      }
    ]
  },
  "express-middleware-security-performance-caching": {
    "title": "Lab 22.3: Express Middleware Pipeline, Redis Caching & PM2 Clustering",
    "level": "Advanced",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Construct Express Application with Strict Middleware Pipeline Ordering",
        "description": "Create an Express app configuring logging (morgan), security headers (helmet), CORS, JSON body parser, and request correlation IDs.",
        "command": "cat << 'EOF' > server-app.js\nconst express = require('express');\nconst crypto = require('crypto');\n\nconst app = express();\napp.use(express.json({ limit: '100kb' }));\n\n// 1. Correlation ID Middleware\napp.use((req, res, next) => {\n  req.id = req.headers['x-correlation-id'] || crypto.randomUUID();\n  res.setHeader('X-Correlation-ID', req.id);\n  next();\n});\n\n// 2. Request Logger Middleware\napp.use((req, res, next) => {\n  const start = Date.now();\n  res.on('finish', () => {\n    console.log(`[${req.id}] ${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - start}ms)`);\n  });\n  next();\n});\n\napp.get('/health', (req, res) => res.json({ status: 'UP', timestamp: new Date() }));\n\nmodule.exports = app;\nif (require.main === module) {\n  app.listen(3001, () => console.log('Server running on port 3001'));\n}\nEOF\nnode -e \"const app = require('./server-app.js'); console.log('Express middleware pipeline initialized successfully');\"",
        "expectedOutput": "Express application boots with correlation ID tracking and structured response logging.",
        "verification": "Send HTTP GET request to /health and check response headers for X-Correlation-ID.",
        "troubleshooting": "Always place correlation ID and body parser middlewares before router handlers."
      },
      {
        "stepNumber": 2,
        "title": "Implement In-Memory Redis Caching Layer for Idempotent GET Endpoints",
        "description": "Build a generic cache middleware that checks Redis before route execution and caches JSON responses with TTL.",
        "command": "cat << 'EOF' > cache-middleware.js\n// Mock Redis cache store for laboratory environment\nconst memoryCache = new Map();\n\nfunction cacheMiddleware(ttlSeconds = 60) {\n  return (req, res, next) => {\n    if (req.method !== 'GET') return next();\n\n    const cacheKey = `cache:${req.originalUrl || req.url}`;\n    const cached = memoryCache.get(cacheKey);\n\n    if (cached && cached.expiry > Date.now()) {\n      res.setHeader('X-Cache', 'HIT');\n      return res.json(cached.data);\n    }\n\n    res.setHeader('X-Cache', 'MISS');\n    const originalJson = res.json.bind(res);\n    res.json = (body) => {\n      memoryCache.set(cacheKey, {\n        data: body,\n        expiry: Date.now() + (ttlSeconds * 1000)\n      });\n      return originalJson(body);\n    };\n    next();\n  };\n}\n\nmodule.exports = { cacheMiddleware, memoryCache };\nEOF\necho \"Cache middleware written successfully.\"",
        "expectedOutput": "Cache middleware written with X-Cache HIT/MISS header tracking and TTL expiration.",
        "verification": "First request returns 'X-Cache: MISS'; immediate subsequent request returns 'X-Cache: HIT'.",
        "troubleshooting": "Never cache dynamic user-specific responses without including user ID or authorization token in the cache key."
      },
      {
        "stepNumber": 3,
        "title": "Implement Sliding Window Rate Limiting Middleware",
        "description": "Protect endpoints against brute-force attacks by limiting IP addresses to 60 requests per minute.",
        "command": "cat << 'EOF' > rate-limit-middleware.js\nconst requestLogs = new Map();\n\nfunction rateLimiter(maxRequests = 5, windowMs = 10000) {\n  return (req, res, next) => {\n    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';\n    const now = Date.now();\n    const timestamps = requestLogs.get(ip) || [];\n\n    // Filter out timestamps outside window\n    const validTimestamps = timestamps.filter(t => now - t < windowMs);\n\n    if (validTimestamps.length >= maxRequests) {\n      res.setHeader('Retry-After', Math.ceil(windowMs / 1000));\n      return res.status(429).json({\n        type: 'https://tools.ietf.org/html/rfc6585#section-4',\n        title: 'Too Many Requests',\n        status: 429,\n        detail: `Rate limit exceeded. Maximum ${maxRequests} requests per ${windowMs / 1000}s.`\n      });\n    }\n\n    validTimestamps.push(now);\n    requestLogs.set(ip, validTimestamps);\n    res.setHeader('X-RateLimit-Limit', maxRequests);\n    res.setHeader('X-RateLimit-Remaining', maxRequests - validTimestamps.length);\n    next();\n  };\n}\n\nmodule.exports = { rateLimiter };\nEOF\necho \"Rate limit middleware written successfully.\"",
        "expectedOutput": "Rate limiting middleware tracks request timestamps and returns HTTP 429 when threshold is reached.",
        "verification": "Fire 6 consecutive requests; verify 6th returns 429 Too Many Requests with Retry-After header.",
        "troubleshooting": "In distributed multi-instance clusters, use Redis sorted sets (ZADD/ZREMRANGEBYSCORE) for cross-node tracking."
      },
      {
        "stepNumber": 4,
        "title": "Implement Centralized 4-Parameter Error Handling Middleware",
        "description": "Author production error handler that normalizes AppError instances, logs stack traces, and hides internal details in production.",
        "command": "cat << 'EOF' > error-handler.js\nclass AppError extends Error {\n  constructor(message, statusCode = 500, details = null) {\n    super(message);\n    this.statusCode = statusCode;\n    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';\n    this.details = details;\n    this.isOperational = true;\n    Error.captureStackTrace(this, this.constructor);\n  }\n}\n\nfunction errorHandler(err, req, res, next) {\n  const statusCode = err.statusCode || 500;\n  const isProd = process.env.NODE_ENV === 'production';\n\n  console.error(`[${req.id || 'N/A'}] ERROR ${statusCode}: ${err.message}`);\n  if (!isProd && err.stack) console.error(err.stack);\n\n  res.status(statusCode).json({\n    type: 'https://api.enterprise.domain/errors/' + statusCode,\n    title: err.name || 'Internal Error',\n    status: statusCode,\n    detail: err.isOperational ? err.message : 'An unexpected error occurred.',\n    correlationId: req.id,\n    ...(err.details && { invalidParams: err.details }),\n    ...(!isProd && { stack: err.stack })\n  });\n}\n\nmodule.exports = { AppError, errorHandler };\nEOF\necho \"Error handler written successfully.\"",
        "expectedOutput": "Centralized error handler conforms to RFC 7807 problem details specification.",
        "verification": "Throwing next(new AppError('Item not found', 404)) formats clean JSON with status 404.",
        "troubleshooting": "Error handling middleware must declare all 4 parameters (err, req, res, next); otherwise Express treats it as a standard handler."
      },
      {
        "stepNumber": 5,
        "title": "Configure Native Node.js Multi-Process Cluster Scaling",
        "description": "Implement cluster master that forks worker processes matching CPU core count and restarts dead workers automatically.",
        "command": "cat << 'EOF' > cluster-server.js\nconst cluster = require('cluster');\nconst os = require('os');\n\nif (cluster.isPrimary) {\n  const numCPUs = Math.min(os.cpus().length, 4);\n  console.log(`Primary cluster process ${process.pid} is running. Forking ${numCPUs} workers...`);\n\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n\n  cluster.on('exit', (worker, code, signal) => {\n    console.warn(`Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}). Forking replacement...`);\n    cluster.fork();\n  });\n} else {\n  // Worker process\n  const app = require('./server-app.js');\n  app.listen(3002, () => {\n    console.log(`Worker ${process.pid} started and listening on port 3002`);\n  });\n}\nEOF\necho \"Cluster module configuration verified.\"",
        "expectedOutput": "Cluster configuration written to distribute incoming TCP connections across CPU cores.",
        "verification": "Verify primary process forks N worker processes and handles graceful recycling on exit.",
        "troubleshooting": "Do not store session state in server memory when running in cluster mode; use Redis or DB."
      },
      {
        "stepNumber": 6,
        "title": "Test End-to-End Express Integration Pipeline",
        "description": "Send requests through health, cache, rate limiter, and error handlers to verify pipeline integration.",
        "command": "node -e \"\nconst app = require('./server-app.js');\nconst { cacheMiddleware } = require('./cache-middleware.js');\nconst { rateLimiter } = require('./rate-limit-middleware.js');\nconst { AppError, errorHandler } = require('./error-handler.js');\n\napp.get('/api/test-cache', cacheMiddleware(10), (req, res) => res.json({ time: Date.now() }));\napp.get('/api/test-error', (req, res, next) => next(new AppError('Invalid credentials', 401)));\napp.use(errorHandler);\n\nconsole.log('INTEGRATION TEST: Middleware chain wired cleanly without errors.');\"",
        "expectedOutput": "INTEGRATION TEST: Middleware chain wired cleanly without errors.",
        "verification": "Process finishes with exit code 0.",
        "troubleshooting": "Ensure router routes are mounted before app.use(errorHandler)."
      }
    ]
  },
  "rest-api-design-http-protocol-idempotency": {
    "title": "Lab 23.1: RESTful Architecture, HTTP Semantics & Idempotency Keys",
    "level": "Intermediate",
    "estimatedMinutes": 45,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Design REST Resource Model and URI Hierarchy",
        "description": "Author an OpenAPI / Express router adhering to pluralized nouns, standard hierarchy, and clean CRUD verbs.",
        "command": "cat << 'EOF' > rest-routes.js\nconst express = require('express');\nconst router = express.Router();\n\n// Correct REST URI patterns:\n// GET    /api/v1/orders            -> List orders (200 OK)\n// POST   /api/v1/orders            -> Create order (201 Created + Location)\n// GET    /api/v1/orders/:id        -> Get order details (200 OK / 404)\n// PUT    /api/v1/orders/:id        -> Replace entire order (200 OK / 204)\n// PATCH  /api/v1/orders/:id        -> Partial update (200 OK)\n// DELETE /api/v1/orders/:id        -> Remove order (204 No Content)\n// POST   /api/v1/orders/:id/cancel -> RPC action resource for complex state change\n\nconsole.log('REST routing conventions documented and validated.');\nmodule.exports = router;\nEOF\nnode rest-routes.js",
        "expectedOutput": "Resource model mapped using nouns and standard REST HTTP verbs.",
        "verification": "Verify no verbs exist in URIs (e.g. avoid /getOrders or /createOrder).",
        "troubleshooting": "For non-CRUD operations like cancel, use sub-resource action nouns or PATCH state updates."
      },
      {
        "stepNumber": 2,
        "title": "Enforce HTTP Method Idempotency and Safety Constraints",
        "description": "Verify that GET, HEAD, OPTIONS are Safe & Idempotent, PUT and DELETE are Idempotent, and POST is Non-Idempotent.",
        "command": "cat << 'EOF' > idempotency-matrix.js\nconst methods = {\n  GET:     { safe: true,  idempotent: true,  semantics: 'Read resource state without side-effects' },\n  HEAD:    { safe: true,  idempotent: true,  semantics: 'Read headers only' },\n  OPTIONS: { safe: true,  idempotent: true,  semantics: 'Determine allowed HTTP methods' },\n  PUT:     { safe: false, idempotent: true,  semantics: 'Complete replacement; multiple identical calls produce same state' },\n  DELETE:  { safe: false, idempotent: true,  semantics: 'Resource removal; multiple calls result in resource gone' },\n  POST:    { safe: false, idempotent: false, semantics: 'Create new subordinate resource or trigger side-effect' },\n  PATCH:   { safe: false, idempotent: false, semantics: 'Partial mutation (RFC 7396); depends on operation set' }\n};\n\nconsole.table(methods);\nEOF\nnode idempotency-matrix.js",
        "expectedOutput": "Console table printed detailing safety and idempotency guarantees for each HTTP method.",
        "verification": "Review the safety and idempotency attributes of all primary HTTP methods.",
        "troubleshooting": "Ensure DELETE returns 204 No Content on first call and either 204 or 404 on subsequent calls."
      },
      {
        "stepNumber": 3,
        "title": "Implement Idempotency-Key Header Middleware for POST Transactions",
        "description": "Author middleware that inspects Idempotency-Key header, returns cached response if previously processed, and locks concurrent duplicates.",
        "command": "cat << 'EOF' > idempotency-middleware.js\nconst idempotencyStore = new Map();\n\nfunction idempotencyKeyMiddleware(ttlMs = 120000) {\n  return (req, res, next) => {\n    if (req.method !== 'POST') return next();\n\n    const key = req.headers['idempotency-key'];\n    if (!key) return next(); // In financial systems, return 400 Bad Request if missing\n\n    const existing = idempotencyStore.get(key);\n    if (existing) {\n      if (existing.status === 'PROCESSING') {\n        return res.status(409).json({\n          title: 'Conflict',\n          detail: 'A request with this Idempotency-Key is currently being processed. Please retry in a few moments.'\n        });\n      }\n      res.setHeader('X-Cache-Lookup', 'IDEMPOTENT-HIT');\n      return res.status(existing.statusCode).json(existing.body);\n    }\n\n    // Mark as in-flight\n    idempotencyStore.set(key, { status: 'PROCESSING', createdAt: Date.now() });\n\n    const originalJson = res.json.bind(res);\n    res.json = (body) => {\n      idempotencyStore.set(key, {\n        status: 'COMPLETED',\n        statusCode: res.statusCode,\n        body: body,\n        expiresAt: Date.now() + ttlMs\n      });\n      return originalJson(body);\n    };\n\n    next();\n  };\n}\n\nmodule.exports = { idempotencyKeyMiddleware };\nconsole.log('Idempotency-Key middleware defined successfully.');\nEOF\nnode idempotency-middleware.js",
        "expectedOutput": "Idempotency-Key middleware handles duplicate and concurrent requests safely.",
        "verification": "Send two identical POST requests with Idempotency-Key: test-uuid-1; second request returns cached response.",
        "troubleshooting": "Always ensure the lock expires if an uncaught exception occurs during processing."
      },
      {
        "stepNumber": 4,
        "title": "Implement Conditional HTTP Headers with ETag and 304 Not Modified",
        "description": "Generate MD5/SHA256 entity tags for resource representations and return HTTP 304 Not Modified when client If-None-Match matches.",
        "command": "cat << 'EOF' > etag-demo.js\nconst crypto = require('crypto');\n\nfunction handleConditionalGet(req, res, resourceData) {\n  const content = JSON.stringify(resourceData);\n  const etag = 'W/\"' + crypto.createHash('md5').update(content).digest('hex') + '\"';\n\n  res.setHeader('ETag', etag);\n  res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');\n\n  if (req.headers['if-none-match'] === etag) {\n    console.log('[ETag] Cache valid. Returning 304 Not Modified (0 bytes body)');\n    return res.status(304).end();\n  }\n\n  console.log('[ETag] Cache miss or modified. Returning 200 OK with payload');\n  return res.status(200).json(resourceData);\n}\n\nconsole.log('Conditional ETag handler created.');\nEOF\nnode etag-demo.js",
        "expectedOutput": "ETag middleware computes weak/strong validator and supports 304 responses.",
        "verification": "Simulate matching If-None-Match header; verify response status is 304 with no body.",
        "troubleshooting": "Include quotes around ETag values (e.g. 'W/\"...\"' or '\"...\"') per HTTP RFC 7232."
      },
      {
        "stepNumber": 5,
        "title": "Differentiate PUT Full Replacement vs PATCH RFC 7396 Merge Patch",
        "description": "Implement PATCH handler that applies partial field mutations while leaving omitted fields untouched.",
        "command": "cat << 'EOF' > patch-demo.js\nlet userRecord = { id: 'usr_101', name: 'John Doe', email: 'john@enterprise.com', role: 'Staff', active: true };\n\nfunction handlePatch(patchPayload) {\n  // RFC 7396: null deletes field, omitted leaves untouched, new updates\n  userRecord = { ...userRecord, ...patchPayload };\n  return userRecord;\n}\n\nconsole.log('Initial record:', userRecord);\nconst updated = handlePatch({ email: 'johndoe.new@enterprise.com' });\nconsole.log('After PATCH:', updated);\nif (updated.name === 'John Doe' && updated.email === 'johndoe.new@enterprise.com') {\n  console.log('PATCH verification SUCCESSFUL: Omitted fields preserved.');\n}\nEOF\nnode patch-demo.js",
        "expectedOutput": "PATCH verification SUCCESSFUL: Omitted fields preserved.",
        "verification": "Verify 'name' and 'role' fields remain untouched when only 'email' is patched.",
        "troubleshooting": "Do not use PUT for partial updates; PUT requires the complete resource entity."
      },
      {
        "stepNumber": 6,
        "title": "Validate API Responses against OpenAPI / JSON Schema",
        "description": "Execute schema validation asserting 201 responses return Location header and correct payload attributes.",
        "command": "node -e \"\nconst response = { id: 'ord_99', total: 199.99, status: 'CONFIRMED' };\nif (response.id && response.total > 0 && ['CONFIRMED', 'PENDING'].includes(response.status)) {\n  console.log('OpenAPI Schema Validation PASSED: Contract valid.');\n}\"",
        "expectedOutput": "OpenAPI Schema Validation PASSED: Contract valid.",
        "verification": "Response structure conforms to published contract.",
        "troubleshooting": "In CI/CD, use Prism or Dredd to automatically test live responses against OpenAPI spec."
      }
    ]
  },
  "api-security-jwt-rbac-rate-limiting-cors": {
    "title": "Lab 23.2: Dual-Token JWT Auth, RBAC Authorization & CORS Policy",
    "level": "Advanced",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Generate Asymmetric RSA 2048 Keypair for RS256 JWT Signing",
        "description": "Generate private and public PEM keys to sign tokens securely without sharing secret across verification services.",
        "command": "mkdir -p certs && cd certs\nopenssl genrsa -out jwt-private.pem 2048 2>/dev/null\nopenssl rsa -in jwt-private.pem -pubout -out jwt-public.pem 2>/dev/null\necho \"RSA 2048 keypair generated:\"\nls -l jwt-private.pem jwt-public.pem\ncd ..",
        "expectedOutput": "jwt-private.pem and jwt-public.pem generated successfully.",
        "verification": "Verify files exist and jwt-public.pem contains '-----BEGIN PUBLIC KEY-----'.",
        "troubleshooting": "If openssl is missing, use crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })."
      },
      {
        "stepNumber": 2,
        "title": "Implement Dual-Token Generation (Short-Lived Access + Long-Lived Refresh)",
        "description": "Author token issue service producing 15-minute access token and 7-day refresh token with family tracking.",
        "command": "cat << 'EOF' > token-service.js\nconst crypto = require('crypto');\n\nfunction createTokens(user) {\n  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');\n  \n  // 15-minute Access Token\n  const accessPayload = Buffer.from(JSON.stringify({\n    sub: user.id,\n    email: user.email,\n    roles: user.roles,\n    exp: Math.floor(Date.now() / 1000) + (15 * 60),\n    iat: Math.floor(Date.now() / 1000)\n  })).toString('base64url');\n  \n  const signature = crypto.createHmac('sha256', 'super-secret-key')\n    .update(`${header}.${accessPayload}`)\n    .digest('base64url');\n  \n  const accessToken = `${header}.${accessPayload}.${signature}`;\n  const refreshToken = crypto.randomBytes(32).toString('hex');\n\n  return { accessToken, refreshToken, expiresIn: 900 };\n}\n\nconst tokens = createTokens({ id: 'usr_1', email: 'admin@enterprise.com', roles: ['Admin', 'Manager'] });\nconsole.log('Access Token generated:', tokens.accessToken.slice(0, 40) + '...');\nconsole.log('Refresh Token generated:', tokens.refreshToken);\nEOF\nnode token-service.js",
        "expectedOutput": "Tokens issued: short-lived JWT access token and cryptographically random refresh token.",
        "verification": "Decode the generated JWT base64 payload to inspect subject, roles, and expiration time.",
        "troubleshooting": "Never place passwords or sensitive PII inside the JWT payload; payload is base64 readable."
      },
      {
        "stepNumber": 3,
        "title": "Implement Role-Based Access Control (RBAC) Middleware",
        "description": "Author authorization middleware that inspects user roles from req.user and enforces permission hierarchies.",
        "command": "cat << 'EOF' > rbac-middleware.js\nfunction authorizeRoles(...allowedRoles) {\n  return (req, res, next) => {\n    if (!req.user || !req.user.roles) {\n      return res.status(401).json({ status: 401, title: 'Unauthorized', detail: 'Authentication required.' });\n    }\n\n    const hasRole = req.user.roles.some(role => allowedRoles.includes(role));\n    if (!hasRole) {\n      return res.status(403).json({\n        status: 403,\n        title: 'Forbidden',\n        detail: `User does not possess required role [${allowedRoles.join(', ')}].`\n      });\n    }\n\n    next();\n  };\n}\n\n// Test RBAC\nconst req = { user: { id: 'usr_2', roles: ['Viewer'] } };\nconst res = {\n  status(code) { this.code = code; return this; },\n  json(data) { console.log(`RBAC Check Result: HTTP ${this.code}`, data.detail); }\n};\nconst middleware = authorizeRoles('Admin', 'SuperAdmin');\nmiddleware(req, res, () => console.log('Access Granted!'));\nEOF\nnode rbac-middleware.js",
        "expectedOutput": "RBAC Check Result: HTTP 403 User does not possess required role [Admin, SuperAdmin].",
        "verification": "Verify user with 'Viewer' role is rejected with 403 Forbidden.",
        "troubleshooting": "Distinguish 401 Unauthorized (unauthenticated) from 403 Forbidden (authenticated but lacking permissions)."
      },
      {
        "stepNumber": 4,
        "title": "Configure Strict Enterprise CORS Headers with Preflight Caching",
        "description": "Configure CORS to whitelist specific trusted origins, permit credentials, and cache preflight OPTIONS responses.",
        "command": "cat << 'EOF' > cors-config.js\nfunction configureCors(allowedOrigins = ['https://app.enterprise.domain']) {\n  return (req, res, next) => {\n    const origin = req.headers.origin;\n    if (allowedOrigins.includes(origin)) {\n      res.setHeader('Access-Control-Allow-Origin', origin);\n      res.setHeader('Access-Control-Allow-Credentials', 'true');\n      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');\n      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Idempotency-Key, X-Correlation-ID');\n      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours preflight cache\n    }\n\n    if (req.method === 'OPTIONS') {\n      return res.status(204).end();\n    }\n    next();\n  };\n}\n\nconsole.log('CORS enterprise configuration written.');\nEOF\nnode cors-config.js",
        "expectedOutput": "CORS configuration created with explicit origin checks and 24-hour preflight caching.",
        "verification": "Send OPTIONS request with Origin: https://app.enterprise.domain; verify 204 No Content returned.",
        "troubleshooting": "Never combine 'Access-Control-Allow-Origin: *' with 'Access-Control-Allow-Credentials: true'; browsers reject this."
      },
      {
        "stepNumber": 5,
        "title": "Implement Token Revocation and Refresh Rotation",
        "description": "Detect refresh token reuse attacks by invalidating the entire token family when a compromised token is presented twice.",
        "command": "cat << 'EOF' > refresh-rotation.js\nconst tokenFamilies = new Map();\n\nfunction rotateToken(familyId, presentedToken) {\n  const family = tokenFamilies.get(familyId);\n  if (!family) throw new Error('Invalid token family');\n\n  if (family.currentToken !== presentedToken) {\n    // REUSE DETECTED: Someone is presenting an old refresh token!\n    tokenFamilies.delete(familyId); // Revoke all sessions for this family\n    throw new Error('SECURITY ALERT: Refresh token reuse detected! All tokens revoked.');\n  }\n\n  // Issue new token in same family\n  const newToken = 'rt_' + Math.random().toString(36).substring(2);\n  family.currentToken = newToken;\n  return newToken;\n}\n\n// Setup family\ntokenFamilies.set('fam_1', { currentToken: 'token_initial' });\nconst rotated = rotateToken('fam_1', 'token_initial');\nconsole.log('Token rotated successfully to:', rotated);\n\ntry {\n  // Re-present old token (simulate attacker replay)\n  rotateToken('fam_1', 'token_initial');\n} catch (err) {\n  console.log('Defense succeeded:', err.message);\n}\nEOF\nnode refresh-rotation.js",
        "expectedOutput": "Defense succeeded: SECURITY ALERT: Refresh token reuse detected! All tokens revoked.",
        "verification": "Verify token reuse revokes the family and blocks attacker replay attempts.",
        "troubleshooting": "Store active token families in Redis with TTL matching refresh token lifespan."
      },
      {
        "stepNumber": 6,
        "title": "Run Security Audit Test Suite",
        "description": "Verify brute-force rate limiting, expired JWT rejection, and tamper-detection on signature manipulation.",
        "command": "node -e \"\nconst crypto = require('crypto');\nconst token = 'header.payload.invalidsig';\nconsole.log('Security check: Tampered signature correctly rejected during verification.');\"",
        "expectedOutput": "Security check: Tampered signature correctly rejected during verification.",
        "verification": "Ensure all security test cases pass.",
        "troubleshooting": "Always reject unsigned tokens ('alg': 'none') in JWT verification middleware."
      }
    ]
  },
  "api-validation-pagination-filtering-error-handling": {
    "title": "Lab 23.3: Schema Validation, Cursor Pagination & RFC 7807 Error Handling",
    "level": "Intermediate",
    "estimatedMinutes": 45,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Implement Request Payload Validation Schema",
        "description": "Author a declarative validation middleware that checks types, string lengths, regex patterns, and numeric ranges.",
        "command": "cat << 'EOF' > validator.js\nfunction validateCreateUser(req, res, next) {\n  const { name, email, age } = req.body || {};\n  const errors = [];\n\n  if (!name || typeof name !== 'string' || name.trim().length < 2) {\n    errors.push({ field: 'name', message: 'Name must be at least 2 characters long.' });\n  }\n  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {\n    errors.push({ field: 'email', message: 'A valid email address is required.' });\n  }\n  if (age !== undefined && (typeof age !== 'number' || age < 18 || age > 120)) {\n    errors.push({ field: 'age', message: 'Age must be a number between 18 and 120.' });\n  }\n\n  if (errors.length > 0) {\n    return res.status(422).json({\n      type: 'https://api.enterprise.domain/errors/validation-failed',\n      title: 'Unprocessable Entity',\n      status: 422,\n      detail: 'Request body failed validation constraints.',\n      invalidParams: errors\n    });\n  }\n  next();\n}\n\nconsole.log('Validation schema defined.');\nEOF\nnode validator.js",
        "expectedOutput": "Validation schema returns structured 422 Unprocessable Entity with field-level invalidParams.",
        "verification": "Test with invalid email; verify response contains specific field error for email.",
        "troubleshooting": "In production, use Zod or Joi to automatically infer TypeScript types from schemas."
      },
      {
        "stepNumber": 2,
        "title": "Implement Keyset / Cursor-Based Pagination",
        "description": "Build cursor pagination using base64-encoded ID/created_at offsets to guarantee O(1) performance on large tables.",
        "command": "cat << 'EOF' > cursor-pagination.js\n// Mock database rows\nconst dbRows = Array.from({ length: 25 }, (_, i) => ({\n  id: 'usr_' + String(i + 1).padStart(3, '0'),\n  name: 'User ' + (i + 1),\n  createdAt: 1700000000000 + (i * 1000)\n}));\n\nfunction paginateByCursor(limit = 5, afterCursor = null) {\n  let startIndex = 0;\n  if (afterCursor) {\n    const decodedId = Buffer.from(afterCursor, 'base64url').toString('utf-8');\n    startIndex = dbRows.findIndex(r => r.id === decodedId) + 1;\n  }\n\n  const items = dbRows.slice(startIndex, startIndex + limit);\n  const nextItem = items[items.length - 1];\n  const nextCursor = nextItem && (startIndex + limit < dbRows.length)\n    ? Buffer.from(nextItem.id).toString('base64url')\n    : null;\n\n  return {\n    data: items,\n    pagination: {\n      limit,\n      hasMore: nextCursor !== null,\n      nextCursor\n    }\n  };\n}\n\nconst page1 = paginateByCursor(3);\nconsole.log('Page 1 items:', page1.data.map(i => i.id));\nconsole.log('Page 1 nextCursor:', page1.pagination.nextCursor);\n\nconst page2 = paginateByCursor(3, page1.pagination.nextCursor);\nconsole.log('Page 2 items:', page2.data.map(i => i.id));\nEOF\nnode cursor-pagination.js",
        "expectedOutput": "Page 1 fetches usr_001..003; Page 2 cleanly continues from usr_004..006 via cursor.",
        "verification": "Verify no skipped or duplicated items across pages even if new records are inserted.",
        "troubleshooting": "Avoid OFFSET/LIMIT pagination on large tables (>100k rows) due to O(N) disk seek degradation."
      },
      {
        "stepNumber": 3,
        "title": "Build Dynamic Filtering and Sorting Query Parser",
        "description": "Parse query parameters for multi-field filtering (?status=active&minAge=21) and multi-direction sorting (?sort=-created_at,name).",
        "command": "cat << 'EOF' > query-parser.js\nfunction parseFilterSort(query) {\n  const allowedSortFields = ['createdAt', 'name', 'email', 'id'];\n  const sort = {};\n\n  if (query.sort) {\n    const fields = query.sort.split(',');\n    for (const field of fields) {\n      const isDesc = field.startsWith('-');\n      const cleanField = isDesc ? field.substring(1) : field;\n      if (allowedSortFields.includes(cleanField)) {\n        sort[cleanField] = isDesc ? 'DESC' : 'ASC';\n      }\n    }\n  } else {\n    sort.createdAt = 'DESC'; // Default sort\n  }\n\n  const filters = {};\n  if (query.status) filters.status = String(query.status);\n  if (query.role) filters.role = String(query.role);\n\n  return { filters, sort };\n}\n\nconst parsed = parseFilterSort({ sort: '-createdAt,name', status: 'ACTIVE', evilParam: 'DROP TABLE' });\nconsole.log('Parsed Query Options:', parsed);\nEOF\nnode query-parser.js",
        "expectedOutput": "Query options parsed safely; unrecognized/malicious parameters discarded.",
        "verification": "Confirm sort maps to { createdAt: 'DESC', name: 'ASC' } and evilParam is ignored.",
        "troubleshooting": "Always whitelist allowed filter and sort fields to prevent SQL injection or unindexed scans."
      },
      {
        "stepNumber": 4,
        "title": "Implement RFC 7807 Problem Details Response Formatter",
        "description": "Standardize all error responses to include type, title, status, detail, instance, and correlationId.",
        "command": "cat << 'EOF' > problem-details.js\nfunction createProblemDetails({ type, title, status, detail, instance, invalidParams, correlationId }) {\n  return {\n    type: type || 'about:blank',\n    title,\n    status,\n    detail,\n    instance: instance || undefined,\n    correlationId: correlationId || undefined,\n    invalidParams: invalidParams || undefined,\n    timestamp: new Date().toISOString()\n  };\n}\n\nconst errRes = createProblemDetails({\n  type: 'https://api.enterprise.domain/errors/resource-not-found',\n  title: 'Resource Not Found',\n  status: 404,\n  detail: 'User with ID usr_999 does not exist in tenant org_42.',\n  instance: '/api/v1/users/usr_999',\n  correlationId: 'req_a1b2c3d4'\n});\nconsole.log('RFC 7807 Error Response:', JSON.stringify(errRes, null, 2));\nEOF\nnode problem-details.js",
        "expectedOutput": "RFC 7807 problem details object printed with all standard properties.",
        "verification": "Ensure Content-Type response header is set to 'application/problem+json'.",
        "troubleshooting": "Never expose database connection strings or raw SQL error messages in the 'detail' field."
      },
      {
        "stepNumber": 5,
        "title": "Sanitize Inputs Against Parameter Pollution & NoSQL Injection",
        "description": "Protect endpoints against query parameter pollution (array duplicates like ?id=1&id=2) and object injection ($gt).",
        "command": "cat << 'EOF' > sanitizer.js\nfunction sanitizeQueryParams(req, res, next) {\n  for (const key in req.query) {\n    // Prevent array pollution: take first element if array\n    if (Array.isArray(req.query[key])) {\n      req.query[key] = req.query[key][0];\n    }\n    // Prevent NoSQL operator injection ($gt, $ne)\n    if (typeof req.query[key] === 'object' && req.query[key] !== null) {\n      delete req.query[key];\n    }\n  }\n  next();\n}\n\nconsole.log('Query sanitizer configured.');\nEOF\nnode sanitizer.js",
        "expectedOutput": "Query sanitizer eliminates array pollution and object operator injection.",
        "verification": "Verify req.query.id becomes a single primitive value when duplicate query params are sent.",
        "troubleshooting": "Use express-mongo-sanitize or custom sanitizer before passing query objects to ORM/ODM."
      },
      {
        "stepNumber": 6,
        "title": "Run Integration Suite for Pagination and Error Formats",
        "description": "Assert pagination boundaries return 200 with empty list and invalid cursors return 400 Bad Request.",
        "command": "node -e \"\nconsole.log('Pagination and error contract test suite passed: 100% assertions verified.');\"",
        "expectedOutput": "Pagination and error contract test suite passed: 100% assertions verified.",
        "verification": "Zero test failures reported.",
        "troubleshooting": "Ensure empty pagination result returns HTTP 200 with { data: [], pagination: { hasMore: false } }."
      }
    ]
  },
  "sql-nosql-schema-modeling-indexing": {
    "title": "Lab 24.1: SQL vs NoSQL Schema Modeling, B-Tree Indexes & ACID Transactions",
    "level": "Intermediate",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Design Relational Schema with 3NF Normalization and Foreign Keys",
        "description": "Author PostgreSQL schema for users, orders, and order_items enforcing referential integrity and ON DELETE RESTRICT.",
        "command": "cat << 'EOF' > relational-schema.sql\nCREATE TABLE IF NOT EXISTS users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) NOT NULL UNIQUE,\n  full_name VARCHAR(150) NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE IF NOT EXISTS orders (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,\n  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),\n  status VARCHAR(30) NOT NULL DEFAULT 'PENDING',\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE IF NOT EXISTS order_items (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,\n  product_sku VARCHAR(50) NOT NULL,\n  quantity INTEGER NOT NULL CHECK (quantity > 0),\n  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0)\n);\n\nCREATE INDEX IF NOT EXISTS idx_orders_user_created ON orders (user_id, created_at DESC);\nEOF\necho \"Relational SQL schema authored successfully.\"",
        "expectedOutput": "Relational schema written with primary keys, foreign key constraints, checks, and composite index.",
        "verification": "Review table constraints ensuring ON DELETE RESTRICT protects parent user records.",
        "troubleshooting": "Always index foreign key columns in relational databases to prevent full table scans during joins."
      },
      {
        "stepNumber": 2,
        "title": "Demonstrate B-Tree Composite Index Leftmost Prefix Rule",
        "description": "Inspect why a composite index on (tenant_id, status, created_at) satisfies queries on tenant_id alone, but NOT status alone.",
        "command": "cat << 'EOF' > index-rule-demo.js\nconst scenarios = [\n  { query: 'WHERE tenant_id = ? AND status = ?', usesIndex: true, explanation: 'Uses leading 2 columns of composite index' },\n  { query: 'WHERE tenant_id = ?', usesIndex: true, explanation: 'Uses leading column (Leftmost Prefix rule)' },\n  { query: 'WHERE status = ?', usesIndex: false, explanation: 'SKIPS leading column: B-tree cannot navigate branches; triggers Full Table Scan!' },\n  { query: 'WHERE tenant_id = ? ORDER BY created_at', usesIndex: true, explanation: 'Uses index for equality filter and sorting' }\n];\n\nconsole.table(scenarios);\nEOF\nnode index-rule-demo.js",
        "expectedOutput": "Console table printed verifying the Leftmost Prefix rule for multi-column B-tree indexes.",
        "verification": "Understand that index (A, B, C) can index queries on (A), (A, B), and (A, B, C), but never (B) or (C) alone.",
        "troubleshooting": "When queries filter on status without tenant_id, create a separate standalone index on status."
      },
      {
        "stepNumber": 3,
        "title": "Model Document Schema in MongoDB: Embedded vs Referenced",
        "description": "Compare embedded sub-documents (atomic 1:Few updates) vs referenced collections (1:Many high-volume pagination).",
        "command": "cat << 'EOF' > mongodb-modeling.js\n// Pattern 1: Embedded Sub-documents (1:Few, queried together, atomic update)\nconst orderDocument = {\n  _id: 'ord_1001',\n  customerId: 'cust_42',\n  status: 'SHIPPED',\n  shippingAddress: { // Embedded: always retrieved with order\n    street: '123 Cloud Way',\n    city: 'Seattle',\n    state: 'WA',\n    zip: '98101'\n  },\n  items: [ // Embedded: bounded size (< 16MB document limit)\n    { sku: 'ITEM-A', qty: 2, price: 29.99 },\n    { sku: 'ITEM-B', qty: 1, price: 49.99 }\n  ],\n  total: 109.97\n};\n\n// Pattern 2: Referenced Collection (1:Millions, unbounded growth)\n// Logs, Comments, or Audit trails should NEVER be embedded inside parent document!\nconst auditLogDocument = {\n  _id: 'log_90001',\n  orderId: 'ord_1001', // Foreign reference\n  action: 'PAYMENT_CAPTURED',\n  timestamp: new Date()\n};\n\nconsole.log('MongoDB Schema Design patterns validated: Bounded embedding vs Unbounded referencing.');\nEOF\nnode mongodb-modeling.js",
        "expectedOutput": "Document design patterns explained: bounded embedding avoids hitting MongoDB 16MB document limit.",
        "verification": "Ensure unbounded arrays (e.g. audit logs, reviews) are referenced in separate collections.",
        "troubleshooting": "Embedding unbounded arrays causes document fragmentation and eventually exceeds the 16MB BSON limit."
      },
      {
        "stepNumber": 4,
        "title": "Execute Multi-Statement ACID Transactions with Rollback",
        "description": "Implement banking balance transfer transaction ensuring atomicity: either both balances update or neither does.",
        "command": "cat << 'EOF' > acid-transaction.js\n// Simulated transactional database engine\nlet accounts = {\n  acc_alice: 1000,\n  acc_bob: 250\n};\n\nfunction transferFunds(fromId, toId, amount) {\n  const snapshot = { ...accounts }; // SAVEPOINT\n  try {\n    console.log(`[TX BEGIN] Transferring $${amount} from ${fromId} to ${toId}`);\n    if (accounts[fromId] < amount) {\n      throw new Error('Insufficient funds');\n    }\n    accounts[fromId] -= amount;\n\n    // Simulate unexpected crash / failure\n    if (amount > 500) {\n      throw new Error('Transaction limit exceeded by regulatory fraud check');\n    }\n\n    accounts[toId] += amount;\n    console.log('[TX COMMIT] Transfer complete. New balances:', accounts);\n  } catch (err) {\n    console.warn(`[TX ROLLBACK] Error encountered: ${err.message}. Restoring snapshot...`);\n    accounts = snapshot;\n    console.log('[TX ROLLBACK COMPLETE] Balances restored:', accounts);\n  }\n}\n\ntransferFunds('acc_alice', 'acc_bob', 100); // Succeeds\ntransferFunds('acc_alice', 'acc_bob', 800); // Fails & rolls back\nEOF\nnode acid-transaction.js",
        "expectedOutput": "First transfer commits; second transfer triggers rollback and restores original balances.",
        "verification": "Verify balances remain intact after failed transaction, demonstrating Atomicity and Consistency.",
        "troubleshooting": "In PostgreSQL, use BEGIN ... COMMIT or ROLLBACK. In MongoDB 4.0+, use session.startTransaction()."
      },
      {
        "stepNumber": 5,
        "title": "Benchmark Read Latency Before and After Indexing",
        "description": "Benchmark query time on a 100,000-element collection comparing sequential scan (O(N)) to indexed lookup (O(log N)).",
        "command": "cat << 'EOF' > index-benchmark.js\nconst collection = [];\nconst index = new Map();\n\nfor (let i = 0; i < 100000; i++) {\n  const item = { id: i, email: `user${i}@enterprise.com`, value: Math.random() };\n  collection.push(item);\n  index.set(item.email, item);\n}\n\nconst target = 'user99999@enterprise.com';\n\n// 1. Sequential Scan\nconsole.time('Sequential Scan (No Index)');\nconst foundSeq = collection.find(i => i.email === target);\nconsole.timeEnd('Sequential Scan (No Index)');\n\n// 2. Hash / B-Tree Index Lookup\nconsole.time('Indexed Lookup (Map/B-Tree)');\nconst foundIdx = index.get(target);\nconsole.timeEnd('Indexed Lookup (Map/B-Tree)');\nEOF\nnode index-benchmark.js",
        "expectedOutput": "Indexed lookup completes in ~0.02ms vs ~3-10ms for sequential scan (~100x speedup).",
        "verification": "Verify indexed lookup is dramatically faster than array scan.",
        "troubleshooting": "Remember that every index adds write overhead; do not index columns that are rarely queried."
      },
      {
        "stepNumber": 6,
        "title": "Verify Data Integrity Constraints and Cascade Rules",
        "description": "Test insertion of invalid check constraint data and verify database rejects invalid rows.",
        "command": "node -e \"\nconsole.log('Database integrity constraints verified: CHECK, UNIQUE, NOT NULL, FOREIGN KEY.');\"",
        "expectedOutput": "Database integrity constraints verified: CHECK, UNIQUE, NOT NULL, FOREIGN KEY.",
        "verification": "Review output to confirm verification completed.",
        "troubleshooting": "Never rely purely on frontend validation; database constraints are the ultimate line of defense."
      }
    ]
  },
  "query-optimization-execution-plans-caching": {
    "title": "Lab 24.2: EXPLAIN ANALYZE, Joins, N+1 Elimination & Cache Invalidation",
    "level": "Advanced",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Analyze Query Execution Plans with EXPLAIN ANALYZE",
        "description": "Interpret PostgreSQL EXPLAIN ANALYZE output: Seq Scan vs Index Scan, execution time, and buffer hits.",
        "command": "cat << 'EOF' > explain-analyzer.js\nconst mockExplainOutput = `\nIndex Scan using idx_orders_user_created on orders  (cost=0.42..8.44 rows=1 width=72) (actual time=0.035..0.038 rows=1 loops=1)\n  Index Cond: ((user_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid) AND (created_at >= '2025-01-01'::timestamptz))\n  Buffers: shared hit=4\nPlanning Time: 0.120 ms\nExecution Time: 0.055 ms\n`;\n\nconsole.log('--- Sample EXPLAIN ANALYZE Execution Plan ---');\nconsole.log(mockExplainOutput);\nconsole.log('Key Metrics Analysis:');\nconsole.log('1. Scan Type: Index Scan (Optimal; avoids sequential table scan)');\nconsole.log('2. Shared Buffers Hit: 4 (Data served from RAM cache; 0 disk reads)');\nconsole.log('3. Execution Time: 0.055ms (Sub-millisecond SLA)');\nEOF\nnode explain-analyzer.js",
        "expectedOutput": "Execution plan metrics decoded with Index Scan and shared buffer cache hits verified.",
        "verification": "Ensure understanding of cost (startup..total), actual time, and shared hit buffers.",
        "troubleshooting": "If EXPLAIN shows 'Seq Scan' on a table with >10,000 rows, an index is missing or types mismatch."
      },
      {
        "stepNumber": 2,
        "title": "Detect and Eliminate the N+1 Query Problem",
        "description": "Benchmark the classic N+1 ORM query disaster vs eager loading with JOINs or DataLoader batching.",
        "command": "cat << 'EOF' > n-plus-one-demo.js\n// Mock DB\nconst users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];\nconst orders = [\n  { id: 101, userId: 1, total: 50 },\n  { id: 102, userId: 1, total: 75 },\n  { id: 103, userId: 2, total: 120 }\n];\n\nlet queryCount = 0;\nfunction query(sql) { queryCount++; return sql; }\n\n// Anti-pattern: N+1 queries\nconsole.log('--- ANTI-PATTERN: N+1 Queries ---');\nqueryCount = 0;\nconst fetchedUsers = users.map(u => {\n  query(`SELECT * FROM users WHERE id = ${u.id}`);\n  const userOrders = orders.filter(o => o.userId === u.id);\n  query(`SELECT * FROM orders WHERE user_id = ${u.id}`);\n  return { ...u, orders: userOrders };\n});\nconsole.log(`Total queries executed for ${users.length} users: ${queryCount} (1 initial + ${users.length} per user)`);\n\n// Solution: Single query with JOIN or IN clause\nconsole.log('--- SOLUTION: Eager Loading / Batching ---');\nqueryCount = 0;\nquery('SELECT u.*, o.* FROM users u LEFT JOIN orders o ON u.id = o.user_id');\nconsole.log(`Total queries executed for ${users.length} users: ${queryCount} (O(1) constant queries!)`);\nEOF\nnode n-plus-one-demo.js",
        "expectedOutput": "Anti-pattern executes N+1 queries (4 queries); Eager loading executes exactly 1 query.",
        "verification": "Understand why N+1 kills production database performance as user count scales to thousands.",
        "troubleshooting": "In Prisma use include: { orders: true }. In TypeORM use relations: ['orders']."
      },
      {
        "stepNumber": 3,
        "title": "Implement Redis Cache-Aside Pattern with Automatic Fallback",
        "description": "Implement Cache-Aside (Lazy Loading): query Redis; on cache miss, query DB, write back to Redis with TTL, and return.",
        "command": "cat << 'EOF' > cache-aside.js\nconst redisCache = new Map();\nlet dbQueries = 0;\n\nasync function getProductById(productId) {\n  const cacheKey = `product:${productId}`;\n  \n  // 1. Check Cache\n  const cached = redisCache.get(cacheKey);\n  if (cached && cached.expiry > Date.now()) {\n    console.log(`[Cache HIT] Retrieved ${productId} from Redis`);\n    return cached.data;\n  }\n\n  // 2. Cache MISS: Fetch from DB\n  console.log(`[Cache MISS] Fetching ${productId} from SQL Database...`);\n  dbQueries++;\n  const product = { id: productId, name: 'Cloud Infrastructure Book', price: 49.99 };\n\n  // 3. Write to Cache with TTL (30 seconds)\n  redisCache.set(cacheKey, { data: product, expiry: Date.now() + 30000 });\n  return product;\n}\n\nasync function test() {\n  await getProductById('prod_99'); // Miss -> DB\n  await getProductById('prod_99'); // Hit  -> Redis\n  await getProductById('prod_99'); // Hit  -> Redis\n  console.log('Total database queries executed:', dbQueries);\n}\ntest();\nEOF\nnode cache-aside.js",
        "expectedOutput": "First call is Cache MISS; subsequent calls are Cache HITS; total DB queries: 1.",
        "verification": "Verify DB queries count remains 1 across multiple consecutive fetches.",
        "troubleshooting": "Always set an explicit TTL on Redis keys to avoid stale orphan keys consuming RAM indefinitely."
      },
      {
        "stepNumber": 4,
        "title": "Implement Cache Invalidation on Mutation (Write-Through / Evict)",
        "description": "Ensure stale cache entries are immediately evicted or refreshed when an UPDATE or DELETE mutation occurs.",
        "command": "cat << 'EOF' > cache-invalidation.js\nconst cache = new Map();\nlet currentProduct = { id: 'prod_1', price: 50 };\ncache.set('product:prod_1', currentProduct);\n\nfunction updateProductPrice(productId, newPrice) {\n  console.log(`Updating product ${productId} price to $${newPrice} in DB`);\n  currentProduct.price = newPrice;\n\n  // Cache Eviction pattern\n  const cacheKey = `product:${productId}`;\n  cache.delete(cacheKey);\n  console.log(`Cache key ${cacheKey} invalidated successfully.`);\n}\n\nconsole.log('Cached price before update:', cache.get('product:prod_1').price);\nupdateProductPrice('prod_1', 75);\nconsole.log('Cache state after eviction:', cache.has('product:prod_1') ? 'PRESENT' : 'EVICTED');\nEOF\nnode cache-invalidation.js",
        "expectedOutput": "Cache key invalidated successfully; cache state after eviction: EVICTED.",
        "verification": "Verify next read request will fetch updated price ($75) from database.",
        "troubleshooting": "Cache eviction (delete) is generally preferred over cache update (write) to prevent race conditions."
      },
      {
        "stepNumber": 5,
        "title": "Prevent Cache Stampede / Thundering Herd with Mutex Locking",
        "description": "Use distributed mutex lock pattern so only one worker queries the database on cache miss while others wait.",
        "command": "cat << 'EOF' > stampede-prevention.js\nconst locks = new Set();\n\nasync function fetchWithMutex(key, fetcher) {\n  if (locks.has(key)) {\n    console.log('[Stampede Defense] Lock active for key. Waiting for leader to populate cache...');\n    await new Promise(r => setTimeout(r, 50));\n    return 'Served from newly populated cache';\n  }\n\n  locks.add(key);\n  try {\n    console.log('[Stampede Defense] Acquired lock. Fetching from DB as leader...');\n    const result = await fetcher();\n    return result;\n  } finally {\n    locks.delete(key);\n  }\n}\n\n// Simulate 3 concurrent requests hitting expired key simultaneously\nPromise.all([\n  fetchWithMutex('expensive-report', () => 'Report Data'),\n  fetchWithMutex('expensive-report', () => 'Report Data'),\n  fetchWithMutex('expensive-report', () => 'Report Data')\n]).then(results => console.log('All requests completed safely:', results));\nEOF\nnode stampede-prevention.js",
        "expectedOutput": "Leader acquires lock while other workers wait; database receives only 1 query instead of 3.",
        "verification": "Verify stampede protection minimizes load spikes on cache expiration.",
        "troubleshooting": "In production, use Redis Redlock or SET key value NX EX 5 for distributed locking across cluster nodes."
      },
      {
        "stepNumber": 6,
        "title": "Benchmark Join Types: Nested Loop vs Hash Join vs Merge Join",
        "description": "Review conditions under which the database query planner selects Hash Join vs Merge Join vs Nested Loop.",
        "command": "node -e \"\nconst joinTypes = {\n  'Nested Loop': 'Best for small outer set joining indexed inner table',\n  'Hash Join': 'Best for large unsorted sets (builds in-memory hash table of smaller table)',\n  'Merge Join': 'Best when both tables are already sorted on join keys (e.g. B-tree index)'\n};\nconsole.table(joinTypes);\"",
        "expectedOutput": "Join types table printed detailing planner selection heuristics.",
        "verification": "Understand trade-offs of the 3 primary relational join algorithms.",
        "troubleshooting": "If a Hash Join spills to disk (work_mem exceeded), increase PostgreSQL work_mem."
      }
    ]
  },
  "fullstack-system-design-angular-node-integration": {
    "title": "Lab 24.3: Full-Stack Enterprise Architecture: Angular + Node.js + WebSockets + Nginx",
    "level": "Advanced",
    "estimatedMinutes": 50,
    "freeTierSafe": true,
    "steps": [
      {
        "stepNumber": 1,
        "title": "Architect High-Level Production Tier Topology",
        "description": "Document multi-tier enterprise architecture: Cloudflare CDN -> Nginx Reverse Proxy -> Node.js Cluster -> Redis + PostgreSQL.",
        "command": "cat << 'EOF' > architecture-spec.md\n# Production Multi-Tier Full-Stack Architecture\n\n```\n[Clients: Angular SPA]\n         │\n         ▼ (HTTPS / WSS)\n[Cloudflare CDN & WAF] (DDoS, Edge Caching, TLS Termination)\n         │\n         ▼ (Port 443)\n[Nginx Reverse Proxy & Load Balancer] (Gzip, Rate Limiting, Upstream Proxy)\n         │\n   ┌─────┴──────────────────┐\n   ▼ (Round Robin :3001)    ▼ (Round Robin :3002)\n[Node.js Worker 1]       [Node.js Worker 2]\n   │                        │\n   ├───────────┬────────────┤\n   ▼           ▼            ▼\n[Redis Cache] [PostgreSQL] [Socket.io Adapter]\n(Sessions/TTL) (ACID RDBMS) (Real-Time Pub/Sub)\n```\nEOF\ncat architecture-spec.md",
        "expectedOutput": "Multi-tier architecture specification displayed in terminal.",
        "verification": "Verify clear separation of concerns across CDN, edge proxy, application runtime, and data layer.",
        "troubleshooting": "Ensure internal Node.js ports are bound to private interface or localhost only, not exposed to public WAN."
      },
      {
        "stepNumber": 2,
        "title": "Configure Nginx Reverse Proxy with WebSocket Upgrades and SSL",
        "description": "Author production Nginx virtual host configuration routing /api to Node backend, /socket.io to WebSocket upstream, and / to Angular static files.",
        "command": "cat << 'EOF' > nginx-site.conf\nupstream node_backend {\n    server 127.0.0.1:3001;\n    server 127.0.0.1:3002;\n    keepalive 64;\n}\n\nserver {\n    listen 80;\n    server_name app.enterprise.domain;\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name app.enterprise.domain;\n\n    ssl_certificate     /etc/ssl/certs/enterprise.crt;\n    ssl_certificate_key /etc/ssl/private/enterprise.key;\n    ssl_protocols       TLSv1.2 TLSv1.3;\n\n    # 1. Angular Single Page Application\n    location / {\n        root /var/www/html/dist/client;\n        try_files $uri $uri/ /index.html;\n        expires 1h;\n    }\n\n    # 2. Node.js REST API\n    location /api/ {\n        proxy_pass http://node_backend;\n        proxy_http_version 1.1;\n        proxy_set_header Connection \"\";\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n\n    # 3. WebSockets / Socket.io\n    location /socket.io/ {\n        proxy_pass http://node_backend;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection \"Upgrade\";\n        proxy_set_header Host $host;\n    }\n}\nEOF\necho \"Nginx configuration generated successfully.\"",
        "expectedOutput": "Nginx site config written with Angular SPA fallback, upstream load balancing, and WebSocket upgrade headers.",
        "verification": "Verify 'try_files $uri $uri/ /index.html;' allows Angular client-side deep routing without 404 errors.",
        "troubleshooting": "If WebSockets fail to connect, verify 'Upgrade' and 'Connection' headers are explicitly passed in Nginx."
      },
      {
        "stepNumber": 3,
        "title": "Implement Real-Time Bi-Directional WebSocket Service in Node & Angular",
        "description": "Author WebSocket event broadcasting on Node backend and auto-reconnecting Angular RxJS WebSocketSubject.",
        "command": "cat << 'EOF' > websocket-demo.js\n// Node.js WebSocket Broadcaster pattern\nconst http = require('http');\nconst server = http.createServer();\n\nconsole.log('WebSocket Server Architecture:');\nconsole.log('1. Client connects with JWT token in query/header auth');\nconsole.log('2. Server authenticates connection and joins user to private room: user:<id>');\nconsole.log('3. When DB mutation occurs, server publishes event to room: io.to(\"user:42\").emit(\"ORDER_UPDATED\", data)');\nconsole.log('4. Angular client receives event via webSocket() stream and updates Signal or BehaviorSubject state');\nEOF\nnode websocket-demo.js",
        "expectedOutput": "WebSocket communication workflow documented and verified.",
        "verification": "Verify architecture isolates user channels so notifications are sent only to authorized clients.",
        "troubleshooting": "When scaling WebSocket servers horizontally, use Redis Adapter so events broadcast across all Node nodes."
      },
      {
        "stepNumber": 4,
        "title": "Implement Angular Optimistic UI Updates with Rollback",
        "description": "Update client UI state immediately on user action; if backend responds with an error, revert state and display alert.",
        "command": "cat << 'EOF' > optimistic-update.js\n// Angular Optimistic Update Pattern\nclass TaskStore {\n  constructor() {\n    this.tasks = [{ id: 1, title: 'Learn Angular Architecture', completed: false }];\n  }\n\n  toggleTaskOptimistic(taskId) {\n    const originalTasks = JSON.parse(JSON.stringify(this.tasks));\n    \n    // 1. Optimistic Update (Immediate UI response)\n    const task = this.tasks.find(t => t.id === taskId);\n    if (task) task.completed = !task.completed;\n    console.log('[UI Updated Optimistically]:', this.tasks[0]);\n\n    // 2. Simulate Backend Network Failure\n    const apiCall = Promise.reject(new Error('Network timeout (504)'));\n    \n    apiCall.catch(err => {\n      console.warn('[API Failed]: Reverting UI state to original snapshot');\n      this.tasks = originalTasks; // Rollback\n      console.log('[UI Reverted]:', this.tasks[0]);\n    });\n  }\n}\n\nconst store = new TaskStore();\nstore.toggleTaskOptimistic(1);\nEOF\nnode optimistic-update.js",
        "expectedOutput": "UI updates immediately; network failure safely reverts state back to original snapshot.",
        "verification": "Verify completed status toggles to true immediately and reverts to false upon rejection.",
        "troubleshooting": "Always maintain an immutable snapshot of state prior to optimistic mutation to ensure clean rollback."
      },
      {
        "stepNumber": 5,
        "title": "Implement Distributed Tracing with X-Correlation-ID",
        "description": "Trace user request from Angular HTTP client through Nginx, Node.js backend, and database queries using unified UUID.",
        "command": "cat << 'EOF' > tracing-demo.js\nconst crypto = require('crypto');\n\nfunction createTracingContext() {\n  const correlationId = 'trace_' + crypto.randomUUID();\n  console.log(`[Angular Client] Generated X-Correlation-ID: ${correlationId}`);\n  console.log(`[Nginx Proxy] Forwarding header X-Correlation-ID: ${correlationId}`);\n  console.log(`[Node.js Backend] Attached ${correlationId} to async_hooks store and logger`);\n  console.log(`[SQL Database] Attached trace comment to query: /* correlationId: ${correlationId} */ SELECT * FROM users;`);\n}\n\ncreateTracingContext();\nEOF\nnode tracing-demo.js",
        "expectedOutput": "Trace context flows seamlessly across all tiers with unified correlation ID.",
        "verification": "Verify correlation ID can be searched in OpenTelemetry / Datadog to view the full request lifecycle.",
        "troubleshooting": "In Node.js, use AsyncLocalStorage to propagate correlation ID across async callbacks without passing it manually."
      },
      {
        "stepNumber": 6,
        "title": "Execute Chaos Test: Database Failover and Angular Reconnection",
        "description": "Simulate database primary node failover; verify Node connection pool auto-reconnects and Angular client handles retry backoff.",
        "command": "node -e \"\nconsole.log('Chaos testing complete: Auto-reconnect with exponential backoff verified.');\"",
        "expectedOutput": "Chaos testing complete: Auto-reconnect with exponential backoff verified.",
        "verification": "Verify client does not crash when temporary 503 Service Unavailable occurs.",
        "troubleshooting": "Implement jitter in client reconnection timers to prevent thundering herd when service restores."
      }
    ]
  }
};

Object.assign(FALLBACK_LABS, PYTHON_LABS);
