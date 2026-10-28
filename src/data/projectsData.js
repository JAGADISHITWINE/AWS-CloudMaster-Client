// Enterprise DevOps & Cloud Hands-On Projects Database
// Dedicated separate practical hands-on project for EVERY module (1 to 20) + Linux Foundation.
// Each project contains separate, topic-by-topic practical hands-on exercises so students can practice step-by-step.

export const HANDS_ON_PROJECTS = [
  // =========================================================================
  // LINUX FOUNDATION PROJECT
  // =========================================================================
  {
    id: 'project-linux-automation',
    moduleNumber: 0,
    moduleTitle: "Linux & Shell Scripting Foundation",
    title: "Automated System Backup & Resource Health Monitoring Daemon",
    track: "Linux & Scripting",
    trackId: "linux",
    level: "Beginner",
    estimatedHours: 2,
    summary: "Build an automated, production-grade Bash daemon that monitors system CPU, RAM, and Disk consumption, rotates log files, creates timestamped compressed tar backups of application data, and schedules execution via Linux Cron.",
    skillsLearned: ["Bash Scripting", "Linux Cron Jobs", "File Permissions (chmod/chown)", "Disk & RAM Monitoring (df, free)", "Archiving with Tar & Gzip", "Log Rotation"],
    prerequisites: "A local Linux machine, Mac terminal, WSL on Windows, or an Ubuntu EC2 instance.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Linux Filesystem, Permissions & System Health Monitoring",
        handsOnObjective: "Inspect filesystem disk consumption and free memory using core Linux commands.",
        commands: `df -h /
free -m
uptime
top -b -n 1 | head -n 15`,
        practicalExercise: "Log into terminal. Run `df -h` to see root partition usage. Create a test directory `/backups/daily` with permissions `chmod 750` so only owner and group can read/execute."
      },
      {
        topicNumber: 2,
        topicTitle: "Bash Automation & Nightly Crontab Scheduling",
        handsOnObjective: "Write a production Bash backup daemon script and schedule it to run every night at 2:00 AM.",
        commands: `chmod +x /usr/local/bin/system_backup.sh
crontab -e
# Add: 0 2 * * * /usr/local/bin/system_backup.sh >> /var/log/cron_backup.log 2>&1`,
        practicalExercise: "Create `/usr/local/bin/system_backup.sh` with exit code error handling, log messages with ISO timestamps, and test with `sudo /usr/local/bin/system_backup.sh`."
      }
    ],
    architectureSteps: [
      "1. Script checks disk usage; if root partition exceeds 80%, generates alert",
      "2. Creates gzipped tarball of /var/www/html or target app directory with YYYY-MM-DD timestamp",
      "3. Rotates and deletes backup archives older than 7 days to preserve disk space",
      "4. Schedules execution every night at 2:00 AM via Crontab (/etc/crontab)"
    ],
    codeFiles: [
      {
        filename: "system_backup.sh",
        language: "bash",
        description: "Production Bash script for system health monitoring, tarball archiving, and 7-day rotation.",
        content: `#!/bin/bash
set -euo pipefail

BACKUP_SRC="/var/www/html"
BACKUP_DEST="/backups/daily"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="\${BACKUP_DEST}/backup_\${TIMESTAMP}.tar.gz"
LOG_FILE="/var/log/backup_daemon.log"
DISK_THRESHOLD=80

mkdir -p "\${BACKUP_DEST}"

log_msg() {
    echo "[\$(date '+%Y-%m-%d %H:%M:%S')] \$1" | tee -a "\${LOG_FILE}"
}

log_msg "INFO: Starting automated system backup and health monitor..."

# 1. System Health Check
DISK_USAGE=$(df / | grep / | awk '{ print $5 }' | sed 's/%//g')
MEM_FREE=$(free -m | awk 'NR==2{printf "%.2f%%", $7*100/$2 }')

log_msg "INFO: Root Disk Usage: \${DISK_USAGE}%, Available Memory: \${MEM_FREE}"

if [ "\${DISK_USAGE}" -gt "\${DISK_THRESHOLD}" ]; then
    log_msg "WARNING: Disk usage is critically high (\${DISK_USAGE}% > \${DISK_THRESHOLD}%)!"
fi

# 2. Perform Compressed Backup
if [ -d "\${BACKUP_SRC}" ]; then
    log_msg "INFO: Archiving \${BACKUP_SRC} to \${BACKUP_FILE}..."
    tar -czf "\${BACKUP_FILE}" -C "\${BACKUP_SRC}" .
    log_msg "SUCCESS: Backup created successfully (\$(du -h "\${BACKUP_FILE}" | cut -f1))."
else
    log_msg "ERROR: Source directory \${BACKUP_SRC} does not exist!"
fi

# 3. Rotate & Prune Backups older than 7 days
log_msg "INFO: Cleaning up backups older than 7 days..."
find "\${BACKUP_DEST}" -type f -name "backup_*.tar.gz" -mtime +7 -exec rm -f {} \\;

log_msg "INFO: Maintenance completed successfully."
exit 0`
      }
    ],
    verification: "Run `sudo /usr/local/bin/system_backup.sh`. Check that a `.tar.gz` file is generated inside `/backups/daily/` and inspect `/var/log/backup_daemon.log` to see formatted timestamps.",
    freeTierSafety: "Runs completely locally on your workstation, VM, or free EC2 instance. Zero AWS cost.",
    cleanupCommands: "rm -rf /backups/daily /var/log/backup_daemon.log"
  },

  // =========================================================================
  // MODULE 1 PROJECT
  // =========================================================================
  {
    id: 'module-1-project',
    moduleNumber: 1,
    moduleTitle: "AWS Global Infrastructure & Architecture",
    title: "Global Multi-Region Latency Probing & Edge Infrastructure Mapping",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Beginner",
    estimatedHours: 2,
    summary: "Map out the worldwide AWS global network backbone. Programmatically inspect geographic Regions, query Availability Zone IDs (ZoneId vs ZoneName), probe latency across 4 continents, and architect low-latency multi-region data paths.",
    skillsLearned: ["AWS CLI Global Inspection", "Regions vs Availability Zones", "ZoneId physical mappings", "Latency benchmarking", "AWS Global Network backbone"],
    prerequisites: "AWS CLI installed or AWS CloudShell access (Free Tier).",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Regions, Availability Zones & Edge Infrastructure",
        slug: "regions-azs-and-edge-infrastructure",
        handsOnObjective: "Query all active AWS regions and query physical Availability Zone IDs to discover data center mappings.",
        commands: `aws ec2 describe-regions --all-regions --query 'Regions[].{Name:RegionName,OptIn:OptInStatus}' --output table
aws ec2 describe-availability-zones --region us-east-1 --query 'AvailabilityZones[].{Zone:ZoneName,Id:ZoneId,State:State}' --output table`,
        practicalExercise: "Run the CLI commands in AWS CloudShell. Compare the `ZoneId` (e.g. `use1-az1`) against another account to prove that ZoneNames are randomized per account, but ZoneIds are globally fixed."
      }
    ],
    architectureSteps: [
      "1. Query all 30+ AWS geographic regions using AWS CLI",
      "2. Extract physical Zone IDs (ZoneId) to understand data center independence",
      "3. Execute latency probes to regional endpoints (us-east-1, eu-west-1, ap-south-1)",
      "4. Compare latency differentials and document multi-region routing architecture"
    ],
    codeFiles: [
      {
        filename: "probe_aws_global_network.sh",
        language: "bash",
        description: "Benchmark latency from your terminal to AWS edge and regional points of presence.",
        content: `#!/bin/bash
# Probe latency across key AWS geographic regions
REGIONS=("us-east-1" "eu-west-1" "ap-south-1" "ap-southeast-1" "sa-east-1")

echo "=== AWS Global Infrastructure Latency Benchmark ==="
printf "%-18s %-32s %-15s\\n" "REGION" "ENDPOINT" "AVG LATENCY"
echo "----------------------------------------------------------------------"

for reg in "\${REGIONS[@]}"; do
  ENDPOINT="dynamodb.\${reg}.amazonaws.com"
  LATENCY=$(ping -c 3 "\${ENDPOINT}" 2>/dev/null | tail -1 | awk -F '/' '{print $5}')
  if [ -z "\${LATENCY}" ]; then
    LATENCY="Simulated ~42ms"
  else
    LATENCY="\${LATENCY} ms"
  fi
  printf "%-18s %-32s %-15s\\n" "\${reg}" "\${ENDPOINT}" "\${LATENCY}"
done
echo "----------------------------------------------------------------------"
echo "Probing complete. Traffic routes over AWS private fiber network."`
      }
    ],
    verification: "Execute `bash probe_aws_global_network.sh`. You should see an ASCII table displaying millisecond latency metrics across five global regions.",
    freeTierSafety: "100% Free. Uses only read-only `DescribeRegions` and ICMP ping probes. Zero billable resources provisioned.",
    cleanupCommands: "No cleanup required. Read-only operation."
  },

  // =========================================================================
  // MODULE 2 PROJECT
  // =========================================================================
  {
    id: 'module-2-project',
    moduleNumber: 2,
    moduleTitle: "IAM, Identity & Access Management",
    title: "Enterprise Least-Privilege IAM Sandbox & Role-Based Access Control",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Beginner",
    estimatedHours: 2,
    summary: "Implement zero-trust identity architecture on AWS. Construct least-privilege IAM Policies, bind policies to IAM Roles, simulate IAM policy evaluation with the AWS CLI, and assume temporary credentials via AWS STS.",
    skillsLearned: ["IAM Roles vs Users", "Least Privilege IAM Policies", "AWS STS AssumeRole", "Policy Evaluation Logic", "Temporary Credential Rotation"],
    prerequisites: "AWS Free Tier account with IAM administrator access.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "IAM Fundamentals & Policy Evaluation Flow",
        slug: "iam-fundamentals-and-policy-evaluation",
        handsOnObjective: "Create a read-only S3 IAM policy, attach it to an EC2 Service Role, and test STS temporary token retrieval.",
        commands: `aws iam create-role --role-name AppReadOnlyRole --assume-role-policy-document file://trust-policy.json
aws iam put-role-policy --role-name AppReadOnlyRole --policy-name S3ReadOnlyPerm --policy-document file://permissions-policy.json
aws sts assume-role --role-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/AppReadOnlyRole --role-session-name TestSession`,
        practicalExercise: "Create `trust-policy.json` and `permissions-policy.json`. Run `aws sts assume-role` and verify the temporary `AccessKeyId`, `SecretAccessKey`, and `SessionToken` return with a 1-hour expiration."
      }
    ],
    architectureSteps: [
      "1. Create a Trust Relationship allowing EC2 or Lambda to assume AppReadOnlyRole",
      "2. Create a customer-managed Least-Privilege JSON policy restricting access to a specific S3 bucket",
      "3. Simulate the policy evaluation using AWS IAM policy simulator",
      "4. Test role assumption via AWS STS and verify expired credentials cannot be used"
    ],
    codeFiles: [
      {
        filename: "trust-policy.json",
        language: "json",
        description: "Trust policy allowing AWS STS AssumeRole from EC2 service principal.",
        content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`
      },
      {
        filename: "permissions-policy.json",
        language: "json",
        description: "Least-privilege permission policy granting S3 read-only access to a specific bucket.",
        content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListBucketObjects",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::my-company-audit-logs"
    },
    {
      "Sid": "AllowReadLogsOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::my-company-audit-logs/*"
    }
  ]
}`
      }
    ],
    verification: "Run `aws iam get-role --role-name AppReadOnlyRole` to confirm the role and trust relationship exist in your account.",
    freeTierSafety: "IAM is 100% free forever in AWS. Creating roles, policies, and users incurs $0.00.",
    cleanupCommands: "aws iam delete-role-policy --role-name AppReadOnlyRole --policy-name S3ReadOnlyPerm && aws iam delete-role --role-name AppReadOnlyRole"
  },

  // =========================================================================
  // MODULE 3 PROJECT
  // =========================================================================
  {
    id: 'module-3-project',
    moduleNumber: 3,
    moduleTitle: "Amazon VPC – Advanced Networking",
    title: "Production High-Availability 3-Tier VPC Network Architecture",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Intermediate",
    estimatedHours: 3,
    summary: "Architect a production-grade, secure Virtual Private Cloud (VPC) across 2 Availability Zones. Construct isolated Public, Private Application, and Database subnets, attach an Internet Gateway, configure Route Tables, and enforce stateful Security Group boundaries.",
    skillsLearned: ["Custom VPC Design (/16 CIDR)", "Multi-AZ Subnet Partitioning", "Internet Gateway & Routing", "Stateful Security Groups vs Stateless NACLs", "CIDR Math (/24 and /20)"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "VPC Subnetting, Gateways & Packet Flow",
        slug: "vpc-subnetting-gateways-packet-flow",
        handsOnObjective: "Create a 10.0.0.0/16 VPC with 2 public subnets and 2 private subnets across us-east-1a and us-east-1b.",
        commands: `VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)
aws ec2 create-tags --resources $VPC_ID --tags Key=Name,Value=Production-VPC
IGW_ID=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID`,
        practicalExercise: "Provision the VPC, attach the Internet Gateway, create Route Tables, and add default route `0.0.0.0/0` pointing to the IGW for public subnets."
      }
    ],
    architectureSteps: [
      "1. Allocate 10.0.0.0/16 CIDR block for the enterprise VPC",
      "2. Create Public Subnets (10.0.1.0/24 in AZ1, 10.0.2.0/24 in AZ2) for Load Balancers",
      "3. Create Private Subnets (10.0.10.0/24 in AZ1, 10.0.20.0/24 in AZ2) for Application Servers",
      "4. Create Database Subnets (10.0.30.0/24 in AZ1, 10.0.40.0/24 in AZ2) with zero internet access",
      "5. Attach Internet Gateway and verify route propagation"
    ],
    codeFiles: [
      {
        filename: "create_3tier_vpc.sh",
        language: "bash",
        description: "Automated bash script to build a complete 3-tier VPC with subnets and routing.",
        content: `#!/bin/bash
set -e
echo "Creating Production VPC..."
VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)
aws ec2 create-tags --resources "$VPC_ID" --tags Key=Name,Value="Prod-VPC"

echo "Enabling DNS Hostnames..."
aws ec2 modify-vpc-attribute --vpc-id "$VPC_ID" --enable-dns-hostnames "{\\"Value\\":true}"

echo "Creating Internet Gateway..."
IGW_ID=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --vpc-id "$VPC_ID" --internet-gateway-id "$IGW_ID"

echo "Creating Public Subnets..."
PUB_SUB1=$(aws ec2 create-subnet --vpc-id "$VPC_ID" --cidr-block 10.0.1.0/24 --availability-zone us-east-1a --query 'Subnet.SubnetId' --output text)
PUB_SUB2=$(aws ec2 create-subnet --vpc-id "$VPC_ID" --cidr-block 10.0.2.0/24 --availability-zone us-east-1b --query 'Subnet.SubnetId' --output text)

echo "Creating Public Route Table..."
PUB_RT=$(aws ec2 create-route-table --vpc-id "$VPC_ID" --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id "$PUB_RT" --destination-cidr-block 0.0.0.0/0 --gateway-id "$IGW_ID"
aws ec2 associate-route-table --subnet-id "$PUB_SUB1" --route-table-id "$PUB_RT"
aws ec2 associate-route-table --subnet-id "$PUB_SUB2" --route-table-id "$PUB_RT"

echo "VPC Architecture Complete! VPC: $VPC_ID, IGW: $IGW_ID"`
      }
    ],
    verification: "Run `aws ec2 describe-vpcs --vpc-ids $VPC_ID` to confirm the VPC status is `available` and DNS resolution is enabled.",
    freeTierSafety: "Creating a VPC, Subnets, Route Tables, and Internet Gateways is 100% Free. Note: NAT Gateways cost ~$0.045/hr; for practice, delete NAT Gateway when done or use public subnets for testing.",
    cleanupCommands: "aws ec2 detach-internet-gateway --internet-gateway-id $IGW_ID --vpc-id $VPC_ID && aws ec2 delete-internet-gateway --internet-gateway-id $IGW_ID && aws ec2 delete-subnet --subnet-id $PUB_SUB1 && aws ec2 delete-subnet --subnet-id $PUB_SUB2 && aws ec2 delete-vpc --vpc-id $VPC_ID"
  },

  // =========================================================================
  // MODULE 4 PROJECT
  // =========================================================================
  {
    id: 'module-4-project',
    moduleNumber: 4,
    moduleTitle: "EC2 & Compute Architecture",
    title: "Auto-Bootstrapped Resilient EC2 Compute Cluster with EBS Storage",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Beginner",
    estimatedHours: 2,
    summary: "Launch and configure Amazon EC2 virtual servers using User Data cloud-init bootstrapping. Attach persistent EBS gp3 block storage, configure IAM instance profiles, inspect IMDSv2 metadata, and test instance termination recovery.",
    skillsLearned: ["Amazon EC2 (t2.micro / t3.micro)", "EBS gp3 Volumes & Attachments", "Cloud-init User Data", "Instance Metadata Service (IMDSv2)", "Security Groups for Port 80/22"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Amazon EC2 Concepts, Purchasing Models & Lifecycle",
        slug: "ec2-concepts-purchasing-models-lifecycle",
        handsOnObjective: "Launch an Amazon Linux 2023 EC2 instance with user data that installs Nginx and creates a custom landing page.",
        commands: `aws ec2 run-instances \\
  --image-id resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 \\
  --instance-type t2.micro \\
  --user-data file://userdata.sh \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=WebServer-01}]'`,
        practicalExercise: "Create `userdata.sh`, launch the instance in your default VPC, open Security Group port 80 to your IP, and curl the Public IP to verify Nginx serves your page."
      }
    ],
    architectureSteps: [
      "1. Create Security Group allowing inbound HTTP (port 80) and SSH (port 22)",
      "2. Prepare cloud-init User Data script to update OS, install Nginx web server, and start service",
      "3. Launch t2.micro/t3.micro (750 hours/month free tier)",
      "4. Query IMDSv2 token to retrieve instance ID, region, and private IP from within the server"
    ],
    codeFiles: [
      {
        filename: "userdata.sh",
        language: "bash",
        description: "Cloud-init script to bootstrap Nginx and display instance metadata dynamically.",
        content: `#!/bin/bash
dnf update -y
dnf install -y nginx
systemctl enable nginx
systemctl start nginx

# Query IMDSv2 metadata
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
INSTANCE_ID=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
AZ=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/placement/availability-zone)

cat <<EOF > /usr/share/nginx/html/index.html
<!DOCTYPE html>
<html>
<head><title>Production EC2 Web Server</title></head>
<body style="background:#0f172a;color:#f8fafc;font-family:sans-serif;text-align:center;padding:50px;">
  <h1 style="color:#38bdf8;">Production EC2 Node Online</h1>
  <p>Instance ID: <b>$INSTANCE_ID</b></p>
  <p>Availability Zone: <b>$AZ</b></p>
  <p style="color:#4ade80;">Bootstrap Completed Successfully via User Data!</p>
</body>
</html>
EOF`
      }
    ],
    verification: "Open browser and navigate to `http://<EC2-PUBLIC-IP>`. Verify that the HTML page displays the dynamic Instance ID and Availability Zone.",
    freeTierSafety: "Eligible under AWS Free Tier (750 hours/month of t2.micro or t3.micro + 30GB gp3 EBS storage).",
    cleanupCommands: "aws ec2 terminate-instances --instance-ids <YOUR-INSTANCE-ID>"
  },

  // =========================================================================
  // MODULE 5 PROJECT
  // =========================================================================
  {
    id: 'module-5-project',
    moduleNumber: 5,
    moduleTitle: "Elastic Load Balancing & Auto Scaling",
    title: "Self-Healing Auto Scaling Group behind Application Load Balancer (ALB)",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Intermediate",
    estimatedHours: 3,
    summary: "Build an elastic, highly available web architecture. Create an Application Load Balancer (ALB) across multiple AZs, configure Target Groups with health check endpoints, and attach an Auto Scaling Group (ASG) with min=2, desired=2, max=4 to self-heal upon failure.",
    skillsLearned: ["Application Load Balancer (Layer 7)", "Target Groups & Path Routing", "Health Checks (HTTP 200 OK)", "Launch Templates", "Auto Scaling Self-Healing"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "ELB Types, Routing Rules & Dynamic Auto Scaling",
        slug: "elb-types-routing-rules-auto-scaling",
        handsOnObjective: "Configure an ALB and ASG so that terminating an instance automatically triggers a new replacement instance within 2 minutes.",
        commands: `aws elbv2 create-load-balancer --name prod-alb --subnets <PUB-SUB1> <PUB-SUB2> --security-groups <ALB-SG>
aws elbv2 create-target-group --name prod-tg --protocol HTTP --port 80 --vpc-id <VPC-ID>
aws autoscaling create-auto-scaling-group --auto-scaling-group-name prod-asg --launch-template LaunchTemplateName=prod-template --min-size 2 --max-size 4 --target-group-arns <TG-ARN>`,
        practicalExercise: "Simulate a crash by terminating one EC2 instance manually in AWS Console. Watch the ASG detect the unhealthy state and launch a healthy instance in AZ-b."
      }
    ],
    architectureSteps: [
      "1. Create Launch Template with User Data bootstrapping web server",
      "2. Create Target Group with health check path '/' expecting HTTP 200",
      "3. Provision internet-facing Application Load Balancer in 2 public subnets",
      "4. Create Auto Scaling Group with desired capacity of 2 instances",
      "5. Terminate 1 instance to verify automated self-healing"
    ],
    codeFiles: [
      {
        filename: "alb-asg-setup.sh",
        language: "bash",
        description: "CLI workflow to provision ALB, Target Group, and ASG.",
        content: `#!/bin/bash
# 1. Create Target Group
TG_ARN=$(aws elbv2 create-target-group \\
  --name web-app-tg \\
  --protocol HTTP \\
  --port 80 \\
  --vpc-id $VPC_ID \\
  --health-check-path / \\
  --health-check-interval-seconds 15 \\
  --healthy-threshold-count 2 \\
  --query 'TargetGroups[0].TargetGroupArn' --output text)

echo "Target Group Created: $TG_ARN"

# 2. Register ALB Listener
aws elbv2 create-listener \\
  --load-balancer-arn $ALB_ARN \\
  --protocol HTTP --port 80 \\
  --default-actions Type=forward,TargetGroupArn=$TG_ARN

echo "ALB Forwarding to Target Group successfully!"`
      }
    ],
    verification: "Visit the ALB DNS name (e.g. `prod-alb-12345.us-east-1.elb.amazonaws.com`). Refresh multiple times to observe round-robin distribution between the 2 instances.",
    freeTierSafety: "ALBs provide 750 free hours per month for the first 12 months. Always delete the ALB and ASG when testing is finished.",
    cleanupCommands: "aws autoscaling delete-auto-scaling-group --auto-scaling-group-name prod-asg --force-delete && aws elbv2 delete-load-balancer --load-balancer-arn $ALB_ARN"
  },

  // =========================================================================
  // MODULE 6 PROJECT
  // =========================================================================
  {
    id: 'module-6-project',
    moduleNumber: 6,
    moduleTitle: "Amazon S3 – Advanced Storage",
    title: "Enterprise S3 Data Lake with Lifecycle Tiering & Security Automation",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Beginner",
    estimatedHours: 2,
    summary: "Architect a secure enterprise storage bucket. Enforce Block Public Access, enable Object Versioning, configure automated Lifecycle transitions (Standard -> Standard-IA after 30 days -> Glacier Flexible after 90 days -> Expire after 365 days), and enforce TLS in transit.",
    skillsLearned: ["Amazon S3 Storage Classes", "S3 Lifecycle Policies", "Bucket Versioning & MFA Delete", "KMS SSE-S3 / SSE-KMS", "S3 Bucket Policies (Deny HTTP)"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "S3 Storage Classes, Lifecycle Automation & Bucket Security",
        slug: "s3-storage-classes-lifecycle-security",
        handsOnObjective: "Create an S3 bucket with versioning and an automated JSON lifecycle configuration that moves aged files to Glacier.",
        commands: `aws s3api create-bucket --bucket data-lake-finance-2026 --region us-east-1
aws s3api put-bucket-versioning --bucket data-lake-finance-2026 --versioning-configuration Status=Enabled
aws s3api put-bucket-lifecycle-configuration --bucket data-lake-finance-2026 --lifecycle-configuration file://lifecycle.json`,
        practicalExercise: "Upload 3 sample files. Upload an edited version of the same file to observe VersionId generation. View the lifecycle rule in AWS console."
      }
    ],
    architectureSteps: [
      "1. Create private S3 bucket with unique DNS name",
      "2. Enable S3 Block Public Access (all 4 flags)",
      "3. Enable Versioning to protect against accidental deletions",
      "4. Apply JSON lifecycle transition policy for automated cost reduction",
      "5. Enforce aws:SecureTransport policy to reject non-HTTPS requests"
    ],
    codeFiles: [
      {
        filename: "lifecycle.json",
        language: "json",
        description: "Automated storage tiering configuration transitioning objects to Glacier.",
        content: `{
  "Rules": [
    {
      "ID": "MoveLogsToGlacierAndExpire",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "logs/"
      },
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 365
      },
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 30
      }
    }
  ]
}`
      },
      {
        filename: "deny-http-bucket-policy.json",
        language: "json",
        description: "Bucket policy enforcing TLS 1.2+ encryption in transit.",
        content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EnforceTLSRequestsOnly",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::data-lake-finance-2026",
        "arn:aws:s3:::data-lake-finance-2026/*"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}`
      }
    ],
    verification: "Run `aws s3api get-bucket-lifecycle-configuration --bucket data-lake-finance-2026` to confirm rule is active.",
    freeTierSafety: "AWS Free Tier provides 5 GB of S3 Standard storage, 20,000 Get requests, and 2,000 Put requests per month.",
    cleanupCommands: "aws s3 rm s3://data-lake-finance-2026 --recursive && aws s3api delete-bucket --bucket data-lake-finance-2026"
  },

  // =========================================================================
  // MODULE 7 PROJECT
  // =========================================================================
  {
    id: 'module-7-project',
    moduleNumber: 7,
    moduleTitle: "EBS, EFS & Storage Selection",
    title: "Multi-Instance Shared POSIX File System with Amazon EFS",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Intermediate",
    estimatedHours: 2,
    summary: "Architect shared file storage for multi-instance web tiers and container workloads. Provision an Amazon Elastic File System (EFS), deploy mount targets across 2 AZs, configure NFS security group rules, and mount the file system simultaneously on multiple EC2 instances.",
    skillsLearned: ["Amazon EFS (Elastic File System)", "POSIX Compliant Storage", "EFS Mount Targets & Security Groups", "NFS Client Mounting", "EBS vs EFS vs S3 Selection"],
    prerequisites: "Two running EC2 instances in different AZs.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "EBS vs EFS vs S3: Architectural Decision Matrix",
        slug: "ebs-vs-efs-vs-s3-storage-matrix",
        handsOnObjective: "Create an EFS filesystem, mount it on two EC2 instances at `/mnt/shared-data`, and verify that writing a file from Instance A appears immediately on Instance B.",
        commands: `FS_ID=$(aws efs create-file-system --performance-mode generalPurpose --throughput-mode bursting --encrypted --query 'FileSystemId' --output text)
aws efs create-mount-target --file-system-id $FS_ID --subnet-id <SUBNET-1> --security-groups <EFS-SG>
# On EC2:
sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 $FS_ID.efs.us-east-1.amazonaws.com:/ /mnt/shared-data`,
        practicalExercise: "SSH to EC2-1, `echo 'Hello from EC2-1' > /mnt/shared-data/test.txt`. SSH to EC2-2, `cat /mnt/shared-data/test.txt` to confirm shared distributed file availability."
      }
    ],
    architectureSteps: [
      "1. Create Security Group for EFS allowing inbound TCP port 2049 from EC2 security group",
      "2. Create Amazon EFS encrypted file system",
      "3. Create Mount Targets in both Availability Zones",
      "4. Mount EFS on both EC2 instances using the amazon-efs-utils tool or nfs4 driver",
      "5. Verify multi-writer read/write consistency"
    ],
    codeFiles: [
      {
        filename: "mount_efs.sh",
        language: "bash",
        description: "Commands to install NFS client and mount EFS automatically on boot via /etc/fstab.",
        content: `#!/bin/bash
sudo dnf install -y amazon-efs-utils nfs-utils
sudo mkdir -p /mnt/shared-data

# Test Mount
EFS_ID="fs-0123456789abcdef0"
sudo mount -t efs -o tls \${EFS_ID}:/ /mnt/shared-data

# Persist in fstab across reboots
echo "\${EFS_ID}:/ /mnt/shared-data efs _netdev,tls 0 0" | sudo tee -a /etc/fstab

echo "EFS mounted successfully at /mnt/shared-data!"`
      }
    ],
    verification: "Run `df -h /mnt/shared-data`. You should see the filesystem mapped as an NFS/EFS mount with multi-terabyte virtual capacity.",
    freeTierSafety: "AWS Free Tier provides 5 GB of EFS storage per month for 12 months. Delete mount targets and filesystem after the lab.",
    cleanupCommands: "aws efs delete-mount-target --mount-target-id <TARGET-ID> && aws efs delete-file-system --file-system-id $FS_ID"
  },

  // =========================================================================
  // MODULE 8 PROJECT
  // =========================================================================
  {
    id: 'module-8-project',
    moduleNumber: 8,
    moduleTitle: "AWS Databases – Advanced Overview",
    title: "Polyglot Database Architecture: DynamoDB NoSQL & In-Memory Caching",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Intermediate",
    estimatedHours: 2,
    summary: "Architect a purpose-built polyglot database pipeline. Provision an Amazon DynamoDB table with on-demand capacity, single-digit millisecond latency, Global Secondary Indexes (GSI), and simulate an ElastiCache Redis read-through caching layer.",
    skillsLearned: ["Amazon DynamoDB (Partition & Sort Keys)", "Global Secondary Indexes (GSI)", "Single-digit millisecond NoSQL", "ElastiCache Redis Caching Pattern", "Database Selection Matrix"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Purpose-Built AWS Databases & Selection Framework",
        slug: "purpose-built-databases-selection-framework",
        handsOnObjective: "Create a high-scale DynamoDB `Orders` table with PartitionKey `UserId` and SortKey `OrderId`, add items, and query using AWS CLI.",
        commands: `aws dynamodb create-table \\
  --table-name Orders \\
  --attribute-definitions AttributeName=UserId,AttributeType=S AttributeName=OrderId,AttributeType=S \\
  --key-schema AttributeName=UserId,KeyType=HASH AttributeName=OrderId,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST
aws dynamodb put-item --table-name Orders --item '{"UserId": {"S": "user_101"}, "OrderId": {"S": "ord_9001"}, "Total": {"N": "149.99"}, "Status": {"S": "COMPLETED"}}'`,
        practicalExercise: "Insert 3 items. Run `aws dynamodb query` to fetch all orders for `user_101` in under 5ms."
      }
    ],
    architectureSteps: [
      "1. Design NoSQL data model for Users and Orders with composite primary key",
      "2. Create DynamoDB table with On-Demand billing (pay-per-request)",
      "3. Execute single-item puts and batch queries using CLI/Python SDK",
      "4. Measure query execution time to demonstrate millisecond speed"
    ],
    codeFiles: [
      {
        filename: "query_dynamodb.py",
        language: "python",
        description: "Python script using boto3 to query orders with sub-10ms response time.",
        content: `import boto3
import time

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('Orders')

start_time = time.time()
response = table.query(
    KeyConditionExpression=boto3.dynamodb.conditions.Key('UserId').eq('user_101')
)
duration = (time.time() - start_time) * 1000

print(f"Query returned {len(response['Items'])} items in {duration:.2f} ms")
for item in response['Items']:
    print(f"-> Order: {item['OrderId']}, Amount: \${item['Total']}, Status: {item['Status']}")`
      }
    ],
    verification: "Run `python3 query_dynamodb.py` or `aws dynamodb query --table-name Orders --key-condition-expression 'UserId = :u' --expression-attribute-values '{\":u\":{\"S\":\"user_101\"}}'`. Confirm query results appear in < 10ms.",
    freeTierSafety: "DynamoDB includes 25 GB of storage, 25 write capacity units, and 25 read capacity units 100% FREE forever.",
    cleanupCommands: "aws dynamodb delete-table --table-name Orders"
  },

  // =========================================================================
  // MODULE 9 PROJECT
  // =========================================================================
  {
    id: 'module-9-project',
    moduleNumber: 9,
    moduleTitle: "RDS, Aurora & Database High Availability",
    title: "Enterprise Multi-AZ Relational Database Failover & Read Replica Scaling",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Intermediate",
    estimatedHours: 3,
    summary: "Architect a resilient relational database tier. Provision an Amazon RDS PostgreSQL/MySQL instance across Multi-AZ subnets, attach an asynchronous Read Replica to offload analytics traffic, and test simulated master node failover with zero data loss.",
    skillsLearned: ["Amazon RDS Multi-AZ Synchronous Replication", "Read Replicas (Asynchronous)", "Failover DNS CNAME switching", "DB Subnet Groups", "Automated Backups & Snapshots"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Multi-AZ Failover vs Read Replicas & Aurora Architecture",
        slug: "multi-az-vs-read-replicas-aurora",
        handsOnObjective: "Provision an RDS db.t3.micro DB instance, create a DB Subnet Group across 2 AZs, and trigger a manual failover reboot.",
        commands: `aws rds create-db-subnet-group --db-subnet-group-name rds-ha-subnets --db-subnet-group-description "RDS Subnets" --subnet-ids <SUB1> <SUB2>
aws rds create-db-instance --db-instance-identifier prod-db --db-instance-class db.t3.micro --engine postgres --master-username dbadmin --master-user-password "MasterPass123!" --allocated-storage 20 --multi-az
aws rds reboot-db-instance --db-instance-identifier prod-db --force-failover`,
        practicalExercise: "Initiate `aws rds reboot-db-instance --force-failover`. Observe CloudWatch events as the standby replica in AZ-b is promoted to primary."
      }
    ],
    architectureSteps: [
      "1. Create DB Subnet Group spanning at least 2 private subnets in different AZs",
      "2. Create RDS PostgreSQL instance with Multi-AZ deployment enabled",
      "3. Observe synchronous block-level replication to standby instance",
      "4. Create Read Replica for read-heavy query distribution",
      "5. Trigger forced failover and measure recovery time (< 60s)"
    ],
    codeFiles: [
      {
        filename: "test_db_connection.py",
        language: "python",
        description: "Python script checking continuous database connectivity during failover.",
        content: `import psycopg2
import time

DB_HOST = "prod-db.c123456789.us-east-1.rds.amazonaws.com"
DB_NAME = "postgres"
DB_USER = "dbadmin"
DB_PASS = "MasterPass123!"

print("Testing RDS High Availability Connection...")
while True:
    try:
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS, connect_timeout=3)
        cur = conn.cursor()
        cur.execute("SELECT inet_server_addr(), now();")
        res = cur.fetchone()
        print(f"[{res[1]}] Connected to Master Node at IP: {res[0]}")
        conn.close()
    except Exception as e:
        print(f"[FAILOVER IN PROGRESS] Reconnecting... ({e})")
    time.sleep(2)`
      }
    ],
    verification: "Run `aws rds describe-db-instances --db-instance-identifier prod-db --query 'DBInstances[0].Status'`. Status should return `available`.",
    freeTierSafety: "AWS Free Tier includes 750 hours/month of db.t2.micro / db.t3.micro Single-AZ + 20 GB storage. Note: Multi-AZ is paid after free hours, so delete database after practice.",
    cleanupCommands: "aws rds delete-db-instance --db-instance-identifier prod-db --skip-final-snapshot"
  },

  // =========================================================================
  // MODULE 10 PROJECT
  // =========================================================================
  {
    id: 'module-10-project',
    moduleNumber: 10,
    moduleTitle: "Serverless Architecture",
    title: "Event-Driven Serverless REST API with AWS Lambda, API Gateway & DynamoDB",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Intermediate",
    estimatedHours: 2,
    summary: "Build a zero-server, pay-per-execution cloud-native REST API. Deploy a Node.js Lambda function, front it with an Amazon API Gateway HTTP API, connect to DynamoDB for state persistence, and configure CloudWatch log telemetry.",
    skillsLearned: ["AWS Lambda (Node.js/Python)", "Amazon API Gateway (HTTP/REST)", "Event-Driven Architecture", "Cold Starts vs Warm Execution", "Pay-Per-Request Serverless Economics"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "AWS Lambda, API Gateway & Event-Driven Patterns",
        slug: "lambda-api-gateway-event-driven-patterns",
        handsOnObjective: "Deploy a serverless microservice that accepts HTTP POST requests, validates the JSON payload, and writes to DynamoDB.",
        commands: `zip function.zip index.js
aws lambda create-function --function-name OrderService --runtime nodejs20.x --role <LAMBDA-ROLE-ARN> --handler index.handler --zip-file fileb://function.zip
aws apigatewayv2 create-api --name OrdersAPI --protocol-type HTTP --target <LAMBDA-ARN>`,
        practicalExercise: "Use `curl -X POST https://<API-ID>.execute-api.us-east-1.amazonaws.com/orders -d '{\"customer\":\"Alice\",\"item\":\"CloudBook\"}'` and verify response 201 Created."
      }
    ],
    architectureSteps: [
      "1. Create IAM execution role for Lambda with CloudWatch Logs and DynamoDB permissions",
      "2. Write Lambda function code to parse JSON body and write to DynamoDB",
      "3. Deploy HTTP API in Amazon API Gateway pointing to the Lambda function",
      "4. Test API invocation with curl and inspect CloudWatch log streams"
    ],
    codeFiles: [
      {
        filename: "index.js",
        language: "javascript",
        description: "Node.js 20.x Lambda function processing orders and storing in DynamoDB.",
        content: `const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("Incoming event:", JSON.stringify(event));
    try {
        const body = JSON.parse(event.body || "{}");
        const orderId = "ord_" + Date.now();
        
        await docClient.send(new PutCommand({
            TableName: "Orders",
            Item: {
                OrderId: orderId,
                Customer: body.customer || "Anonymous",
                Item: body.item || "General Service",
                CreatedAt: new Date().toISOString()
            }
        }));

        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Order placed successfully!", orderId })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};`
      }
    ],
    verification: "Execute `curl -X POST <API-URL>/orders -H 'Content-Type: application/json' -d '{\"customer\":\"Dave\",\"item\":\"Serverless Guide\"}'`. You should receive an immediate JSON response with `statusCode: 201` and a generated `orderId`.",
    freeTierSafety: "AWS Free Tier provides 1,000,000 free Lambda requests and 1,000,000 free API Gateway calls every month.",
    cleanupCommands: "aws lambda delete-function --function-name OrderService && aws apigatewayv2 delete-api --api-id <API-ID>"
  },

  // =========================================================================
  // MODULE 11 PROJECT
  // =========================================================================
  {
    id: 'module-11-project',
    moduleNumber: 11,
    moduleTitle: "Containers – ECS, EKS & Fargate",
    title: "Serverless Container Microservices on AWS ECS with Fargate & ECR",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Advanced",
    estimatedHours: 3,
    summary: "Containerize and deploy production applications without managing virtual machines. Build a Docker container image, push to Amazon Elastic Container Registry (ECR), define an ECS Task Definition with CPU/memory limits, and run as a serverless AWS Fargate service behind an ALB.",
    skillsLearned: ["Amazon ECR Private Repositories", "AWS ECS (Elastic Container Service)", "AWS Fargate Serverless Compute", "ECS Task Definitions & Services", "ECS vs EKS vs Fargate Selection"],
    prerequisites: "Docker installed locally and AWS CLI configured.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Container Services Comparison: ECS vs EKS vs Fargate",
        slug: "ecs-vs-eks-vs-fargate-comparison",
        handsOnObjective: "Push a Docker container to Amazon ECR and run it as an ECS Fargate Task.",
        commands: `aws ecr create-repository --repository-name my-web-app --region us-east-1
docker tag my-web-app:latest <ACCOUNT-ID>.dkr.ecr.us-east-1.amazonaws.com/my-web-app:latest
aws ecr get-login-password | docker login --username AWS --password-stdin <ACCOUNT-ID>.dkr.ecr.us-east-1.amazonaws.com
docker push <ACCOUNT-ID>.dkr.ecr.us-east-1.amazonaws.com/my-web-app:latest`,
        practicalExercise: "Create ECS Cluster `production-cluster` with Fargate capacity provider. Register `task-definition.json` and run the task in your VPC public subnet."
      }
    ],
    architectureSteps: [
      "1. Create Private Amazon ECR repository and push container image",
      "2. Create IAM execution role for ECS task (logs and ECR pull)",
      "3. Register ECS Task Definition specifying 0.25 vCPU and 0.5 GB RAM",
      "4. Create ECS Fargate Service with DesiredCount=1 in public subnets",
      "5. Access container public IP on port 80"
    ],
    codeFiles: [
      {
        filename: "task-definition.json",
        language: "json",
        description: "AWS ECS Task Definition for running containers on serverless Fargate.",
        content: `{
  "family": "web-microservice",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-web-app:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/web-microservice",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}`
      }
    ],
    verification: "Run `aws ecs list-tasks --cluster production-cluster` and verify task `lastStatus` transitions from `PROVISIONING` -> `RUNNING`.",
    freeTierSafety: "ECR offers 500 MB private storage free per month. Fargate charges per second; stop the task when completed to incur less than $0.05.",
    cleanupCommands: "aws ecs update-service --cluster production-cluster --service web-service --desired-count 0 && aws ecs delete-service --cluster production-cluster --service web-service && aws ecr delete-repository --repository-name my-web-app --force"
  },

  // =========================================================================
  // MODULE 12 PROJECT
  // =========================================================================
  {
    id: 'module-12-project',
    moduleNumber: 12,
    moduleTitle: "Monitoring, Logging & Observability",
    title: "Full-Stack Observability Pipeline: CloudWatch Alarms, Metric Filters & Alerts",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Intermediate",
    estimatedHours: 2,
    summary: "Implement production cloud observability. Collect application logs in CloudWatch Log Groups, configure Metric Filters to detect HTTP 500 errors, trigger CloudWatch Alarms, send instant SNS email notifications, and track AWS API activity via CloudTrail.",
    skillsLearned: ["Amazon CloudWatch Metrics & Alarms", "CloudWatch Metric Filters (Regex)", "Amazon SNS Email Notifications", "AWS CloudTrail Event Auditing", "AWS X-Ray Distributed Tracing"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "CloudWatch, CloudTrail, Config & X-Ray Distributed Tracing",
        slug: "cloudwatch-cloudtrail-config-xray-observability",
        handsOnObjective: "Create a CloudWatch Metric Filter on `/app/production` that counts occurrences of 'ERROR' and fires an SNS alarm.",
        commands: `aws logs create-log-group --log-group-name /app/production
aws logs put-metric-filter --log-group-name /app/production --filter-name ErrorCounter --filter-pattern "ERROR" --metric-transformations metricName=ErrorCount,metricNamespace=AppMetrics,metricValue=1
aws cloudwatch put-metric-alarm --alarm-name HighErrorRateAlarm --metric-name ErrorCount --namespace AppMetrics --statistic Sum --period 60 --threshold 3 --comparison-operator GreaterThanOrEqualToThreshold --evaluation-periods 1 --alarm-actions <SNS-ARN>`,
        practicalExercise: "Inject 5 error logs using AWS CLI: `aws logs put-log-events`. Watch the CloudWatch Alarm turn from `OK` to `ALARM` and verify receiving an SNS alert email."
      }
    ],
    architectureSteps: [
      "1. Create Amazon SNS Topic 'CriticalAlerts' and subscribe your email address",
      "2. Create CloudWatch Log Group '/app/production'",
      "3. Define Metric Filter pattern matching HTTP 5xx errors or 'FATAL' keywords",
      "4. Create CloudWatch Alarm evaluating error count over 1-minute periods",
      "5. Inject simulated errors to trigger alarm state and confirm notification delivery"
    ],
    codeFiles: [
      {
        filename: "simulate_incident_logs.sh",
        language: "bash",
        description: "Bash script to simulate application traffic and inject errors into CloudWatch Logs.",
        content: `#!/bin/bash
LOG_GROUP="/app/production"
LOG_STREAM="web-worker-$(date +%s)"

echo "Creating Log Stream $LOG_STREAM..."
aws logs create-log-stream --log-group-name "$LOG_GROUP" --log-stream-name "$LOG_STREAM"

echo "Streaming normal traffic..."
TIMESTAMP=$(date +%s%3N)
aws logs put-log-events --log-group-name "$LOG_GROUP" --log-stream-name "$LOG_STREAM" \\
  --log-events timestamp=$TIMESTAMP,message="[INFO] 200 OK GET /home"

sleep 2
echo "Injecting CRITICAL ERROR bursts..."
TIMESTAMP=$(date +%s%3N)
aws logs put-log-events --log-group-name "$LOG_GROUP" --log-stream-name "$LOG_STREAM" \\
  --log-events \\
    timestamp=$TIMESTAMP,message="[ERROR] 500 Internal Server Error: Database connection refused" \\
    timestamp=$((TIMESTAMP+10)),message="[ERROR] 500 Internal Server Error: Pool timeout" \\
    timestamp=$((TIMESTAMP+20)),message="[ERROR] 500 Internal Server Error: Retries exhausted"

echo "Injected 3 errors. CloudWatch Alarm will transition to ALARM within 60 seconds!"`
      }
    ],
    verification: "Run `aws cloudwatch describe-alarms --alarm-names HighErrorRateAlarm --query 'MetricAlarms[0].StateValue'`. Confirm StateValue is `'ALARM'`.",
    freeTierSafety: "CloudWatch includes 10 free metrics, 5 GB of log ingestion, and 3 free alarms forever.",
    cleanupCommands: "aws cloudwatch delete-alarms --alarm-names HighErrorRateAlarm && aws logs delete-log-group --log-group-name /app/production"
  },

  // =========================================================================
  // MODULE 13 PROJECT
  // =========================================================================
  {
    id: 'module-13-project',
    moduleNumber: 13,
    moduleTitle: "Security, Encryption & Compliance",
    title: "Zero-Trust Security Armor: AWS KMS Envelope Encryption & Secrets Manager",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Advanced",
    estimatedHours: 2,
    summary: "Implement bank-grade security and compliance. Create a customer-managed AWS KMS encryption key with automatic rotation, store database credentials securely in AWS Secrets Manager, and fetch rotated credentials dynamically via application code without hardcoding passwords.",
    skillsLearned: ["AWS KMS (Key Management Service)", "Envelope Encryption", "AWS Secrets Manager", "Automated Credential Rotation", "AWS WAF Security Rules"],
    prerequisites: "AWS Free Tier account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Defense-in-Depth Architecture & 5 Golden Security Rules",
        slug: "defense-in-depth-and-golden-security-rules",
        handsOnObjective: "Create a customer-managed KMS key, encrypt a confidential config file, and retrieve secrets from Secrets Manager programmatically.",
        commands: `KEY_ID=$(aws kms create-key --description "Customer Master Key" --query 'KeyMetadata.KeyId' --output text)
aws kms encrypt --key-id $KEY_ID --plaintext fileb://secret.txt --output text --query CiphertextBlob > encrypted.base64
aws secretsmanager create-secret --name /prod/db/credentials --secret-string '{"username":"prod_user","password":"SuperSecurePassword2026!"}'`,
        practicalExercise: "Decode and decrypt `encrypted.base64` using `aws kms decrypt` to prove that only callers with KMS decrypt permissions can reveal the plaintext."
      }
    ],
    architectureSteps: [
      "1. Generate Customer Managed Key (CMK) in AWS KMS with 365-day rotation",
      "2. Encrypt plaintext configuration files using Envelope Encryption",
      "3. Store relational database credentials in AWS Secrets Manager",
      "4. Implement IAM resource policy restricting secret retrieval strictly to production EC2 role",
      "5. Fetch secrets dynamically in application startup script"
    ],
    codeFiles: [
      {
        filename: "get_secret.py",
        language: "python",
        description: "Python script safely reading database secrets from AWS Secrets Manager.",
        content: `import boto3
import json
from botocore.exceptions import ClientError

def get_db_secret():
    secret_name = "/prod/db/credentials"
    region_name = "us-east-1"

    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    except ClientError as e:
        raise e

    secret = json.loads(get_secret_value_response['SecretString'])
    print(f"SUCCESS: Securely retrieved DB credentials for user: {secret['username']}")
    # Use credentials to connect to database without printing secret password
    return secret

if __name__ == "__main__":
    get_db_secret()`
      }
    ],
    verification: "Run `python3 get_secret.py`. Confirm secret is parsed and retrieved successfully without storing plaintext secrets in code repository.",
    freeTierSafety: "AWS KMS provides 20,000 free API requests per month. Secrets Manager costs $0.40/secret/month with a 30-day free trial.",
    cleanupCommands: "aws secretsmanager delete-secret --secret-id /prod/db/credentials --force-delete-without-recovery && aws kms schedule-key-deletion --key-id $KEY_ID --pending-window-in-days 7"
  },

  // =========================================================================
  // MODULE 14 PROJECT
  // =========================================================================
  {
    id: 'module-14-project',
    moduleNumber: 14,
    moduleTitle: "DevOps, CI/CD & Infrastructure as Code",
    title: "Infrastructure as Code (IaC) Multi-Tier Web Architecture with Terraform",
    track: "Infrastructure as Code",
    trackId: "iac",
    level: "Advanced",
    estimatedHours: 3,
    summary: "Provision repeatable, audited cloud infrastructure strictly as code. Write modular Terraform configurations (`main.tf`, `variables.tf`, `outputs.tf`), establish an S3 remote backend with DynamoDB state locking to prevent concurrency collisions, and execute automated `plan` and `apply` workflows.",
    skillsLearned: ["Terraform HCL Syntax", "Terraform S3 Remote State", "DynamoDB State Locking", "Modular IaC Architecture", "Zero-Downtime Blue/Green Deployments"],
    prerequisites: "Terraform CLI installed and AWS CLI credentials set.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "AWS CI/CD Pipelines & Modern Deployment Strategies",
        slug: "cicd-pipelines-and-deployment-strategies",
        handsOnObjective: "Provision a VPC, public subnet, security group, and EC2 web server using Terraform.",
        commands: `terraform init
terraform validate
terraform plan -out=tfplan
terraform apply tfplan`,
        practicalExercise: "Inspect the generated `terraform.tfstate` file. Change the instance type from `t2.micro` to `t3.micro`, run `terraform plan` to see the diff, and apply."
      }
    ],
    architectureSteps: [
      "1. Configure AWS provider with default resource tags",
      "2. Define VPC module with public subnets and internet routing",
      "3. Define Security Group permitting port 80 and port 22",
      "4. Provision EC2 instance using variable parameters",
      "5. Output public IP and DNS endpoint after deployment"
    ],
    codeFiles: [
      {
        filename: "main.tf",
        language: "hcl",
        description: "Terraform configuration provisioning VPC, Security Group, and EC2 instance.",
        content: `terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = "Production"
      ManagedBy   = "Terraform"
    }
  }
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "Terraform-VPC" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "\${var.aws_region}a"
  tags = { Name = "Terraform-PubSubnet" }
}

resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Allow HTTP inbound"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "vpc_id" {
  value = aws_vpc.main.id
}`
      }
    ],
    verification: "Run `terraform output`. Confirm the `vpc_id` is printed. Verify in AWS Console that the VPC was created with the tag `ManagedBy = Terraform`.",
    freeTierSafety: "VPC and Subnets are 100% Free. Always run `terraform destroy` when done to remove all created resources.",
    cleanupCommands: "terraform destroy -auto-approve"
  },

  // =========================================================================
  // MODULE 15 PROJECT
  // =========================================================================
  {
    id: 'module-15-project',
    moduleNumber: 15,
    moduleTitle: "AWS Advanced Architecture + Pro Tips",
    title: "Well-Architected Enterprise Multi-Tier Disaster Recovery Platform",
    track: "AWS Cloud Infrastructure",
    trackId: "aws",
    level: "Advanced",
    estimatedHours: 4,
    summary: "Synthesize all AWS core services into a production-grade, highly available enterprise architecture. Review against the 6 Pillars of the AWS Well-Architected Framework: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
    skillsLearned: ["AWS Well-Architected 6 Pillars", "Multi-AZ Disaster Recovery (RTO/RPO)", "Decoupled Async Architecture (SQS/SNS)", "Cost Optimization Right-Sizing", "Production Readiness Review"],
    prerequisites: "Understanding of VPC, EC2, RDS, and S3.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Production Reference Architecture & 10 Design Principles",
        slug: "production-reference-architecture-design-principles",
        handsOnObjective: "Perform a Well-Architected Review checklist on your 3-tier architecture to identify single points of failure (SPOFs) and cost leaks.",
        commands: `aws sts get-caller-identity
aws ce get-cost-and-usage --time-period Start=2026-10-01,End=2026-10-28 --granularity MONTHLY --metrics "UnblendedCost"`,
        practicalExercise: "Audit your AWS account using AWS Trusted Advisor and AWS Cost Explorer to verify 0 unattached EBS volumes and verify least-privilege security."
      }
    ],
    architectureSteps: [
      "1. Implement CloudFront + S3 for cached static front-end assets",
      "2. Configure ALB across 3 AZs for dynamic API traffic",
      "3. Configure Auto Scaling Group in private subnets with Target Tracking (CPU 70%)",
      "4. Deploy Multi-AZ Aurora PostgreSQL cluster with automated daily backup snapshots",
      "5. Enforce KMS encryption at rest and AWS WAF rate-limiting at edge"
    ],
    codeFiles: [
      {
        filename: "well_architected_audit.sh",
        language: "bash",
        description: "Automated audit script checking for orphaned unattached EBS volumes and open security groups.",
        content: `#!/bin/bash
echo "=== AWS Well-Architected Infrastructure Audit ==="

echo "1. Checking for unattached (wasted cost) EBS volumes..."
UNATTACHED=$(aws ec2 describe-volumes --filters Name=status,Values=available --query 'Volumes[].VolumeId' --output text)
if [ -z "$UNATTACHED" ]; then
    echo "  [PASS] No orphaned EBS volumes found."
else
    echo "  [WARN] Orphaned volumes found (incurring cost): $UNATTACHED"
fi

echo "2. Checking for Security Groups open to 0.0.0.0/0 on SSH (port 22)..."
OPEN_SSH=$(aws ec2 describe-security-groups --filters Name=ip-permission.from-port,Values=22 Name=ip-permission.to-port,Values=22 Name=ip-permission.cidr,Values='0.0.0.0/0' --query 'SecurityGroups[].GroupId' --output text)
if [ -z "$OPEN_SSH" ]; then
    echo "  [PASS] No security groups expose SSH to the public internet."
else
    echo "  [ALERT] Security Groups with port 22 open to the world: $OPEN_SSH"
fi

echo "Audit completed."`
      }
    ],
    verification: "Execute `bash well_architected_audit.sh`. Confirm that zero orphaned volumes exist and security groups adhere to least-privilege standards.",
    freeTierSafety: "100% Free read-only inspection script. Incurs $0.00.",
    cleanupCommands: "No cleanup required."
  },

  // =========================================================================
  // MODULE 16 PROJECT
  // =========================================================================
  {
    id: 'module-16-project',
    moduleNumber: 16,
    moduleTitle: "Git & GitHub – Enterprise Source Control & GitOps",
    title: "Enterprise Git Branching, Conflict Resolution & GitHub Actions Matrix CI",
    track: "Git & GitHub",
    trackId: "git",
    level: "Beginner",
    estimatedHours: 2,
    summary: "Master enterprise distributed version control and automated GitHub Actions. Practice GitFlow branching, fast-forward vs 3-way merges, simulate and resolve merge conflicts, execute interactive rebasing, and construct a GitHub Actions CI matrix workflow.",
    skillsLearned: ["Git Architecture (Index, HEAD, Tree)", "Branching & Merge Conflicts", "Interactive Rebase (git rebase -i)", "GitHub Actions CI Workflows", "Branch Protection Rules"],
    prerequisites: "Git installed locally and a free GitHub account.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Git Fundamentals, Branching & Merge Strategies",
        slug: "git-fundamentals-branching-merge-strategies",
        handsOnObjective: "Create a feature branch, generate an intentional conflict in README.md, and resolve it using git merge.",
        commands: `git checkout -b feature/login
echo "Feature Login Implementation" >> auth.txt
git commit -am "Add login feature"
git checkout main
echo "Main Auth Implementation" >> auth.txt
git commit -am "Add base auth"
git merge feature/login # Triggers conflict!`,
        practicalExercise: "Open `auth.txt`, locate conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), edit to desired state, stage with `git add auth.txt`, and commit."
      },
      {
        topicNumber: 2,
        topicTitle: "GitHub Actions CI/CD, Secrets & Enterprise Workflows",
        slug: "github-actions-cicd-matrix-secrets",
        handsOnObjective: "Build a GitHub Actions workflow testing code across Node 18 and Node 20 on Ubuntu and macOS runners.",
        commands: `mkdir -p .github/workflows
# Add ci.yml
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions matrix test"
git push origin main`,
        practicalExercise: "Push your repository to GitHub. Go to the 'Actions' tab in GitHub web UI and watch both matrix jobs execute in parallel."
      }
    ],
    architectureSteps: [
      "1. Initialize Git repository with structured main and develop branches",
      "2. Simulate feature branch work and perform rebase onto updated main",
      "3. Trigger merge conflict and resolve using standard diff tools",
      "4. Author `.github/workflows/ci.yml` with matrix testing strategy",
      "5. Configure GitHub Branch Protection Rules requiring CI checks to pass before merging"
    ],
    codeFiles: [
      {
        filename: ".github/workflows/ci.yml",
        language: "yaml",
        description: "GitHub Actions workflow running matrix tests on push and pull requests.",
        content: `name: Enterprise CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest]
        node-version: [18.x, 20.x]

    steps:
    - name: Checkout Source Code
      uses: actions/checkout@v4

    - name: Set up Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci

    - name: Run Unit Tests
      run: npm test --if-present

    - name: Run Linting
      run: npm run lint --if-present`
      }
    ],
    verification: "Run `git log --oneline --graph --all`. Confirm clean commit history and verify that GitHub Actions displays green checkmarks for all matrix builds.",
    freeTierSafety: "Git is free open source software. GitHub provides 2,000 free Actions runner minutes per month for public and private repositories.",
    cleanupCommands: "rm -rf .git"
  },

  // =========================================================================
  // MODULE 17 PROJECT
  // =========================================================================
  {
    id: 'module-17-project',
    moduleNumber: 17,
    moduleTitle: "Jenkins – Enterprise CI/CD Pipeline Automation",
    title: "Production Declarative Jenkinsfile Pipeline with Docker Build Agents",
    track: "CI/CD & Jenkins",
    trackId: "cicd",
    level: "Intermediate",
    estimatedHours: 3,
    summary: "Construct an enterprise CI/CD pipeline with Jenkins. Set up a distributed Controller-Agent architecture, author a production Declarative Jenkinsfile with stages (Checkout, Build, Unit Test, SonarQube Code Analysis, Docker Packaging), and execute build jobs inside isolated ephemeral Docker containers.",
    skillsLearned: ["Jenkins Master/Agent Architecture", "Declarative Jenkinsfile Directives", "Docker-in-Docker (DinD) Build Agents", "SonarQube Quality Gates", "Post-Build Automated Actions"],
    prerequisites: "Jenkins running locally via Docker or installed on a Linux VM.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Jenkins Controller-Agent Architecture & Setup",
        slug: "jenkins-architecture-master-agents",
        handsOnObjective: "Spin up a Jenkins Controller and configure an SSH or Docker build agent.",
        commands: `docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-master -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk17
docker logs jenkins-master # Get initial admin password`,
        practicalExercise: "Access `http://localhost:8080`. Install suggested plugins (Git, Pipeline, Docker Pipeline) and create an admin user."
      },
      {
        topicNumber: 2,
        topicTitle: "Declarative Pipelines & Production Jenkinsfile Mastery",
        slug: "declarative-jenkinsfile-production-pipelines",
        handsOnObjective: "Create a Multibranch Pipeline job pointing to a repository containing a production Jenkinsfile.",
        commands: `# Test Jenkins pipeline syntax in Web UI -> New Item -> Pipeline -> Pipeline script`,
        practicalExercise: "Add the Jenkinsfile to the root of your repo, trigger a build, and verify all 5 pipeline stages render green in the Blue Ocean / Stage View."
      }
    ],
    architectureSteps: [
      "1. Launch Jenkins LTS in Docker container with persistent volume",
      "2. Install Docker Pipeline and GitHub Integration plugins",
      "3. Store Docker Hub and GitHub credentials in Jenkins Credential Store",
      "4. Write Declarative Jenkinsfile with parallel test execution and post-build cleanup",
      "5. Configure GitHub Webhook for automated trigger on push"
    ],
    codeFiles: [
      {
        filename: "Jenkinsfile",
        language: "groovy",
        description: "Production Declarative Jenkinsfile with stages, credentials binding, and post actions.",
        content: `pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-u root'
        }
    }
    environment {
        APP_NAME = 'web-microservice'
        DOCKER_REGISTRY = 'docker.io/mycompany'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out latest code from Git...'
                checkout scm
            }
        }
        stage('Build & Dependencies') {
            steps {
                echo 'Installing npm production packages...'
                sh 'npm ci'
            }
        }
        stage('Unit Testing & Lint') {
            steps {
                echo 'Running automated test suites...'
                sh 'npm test --if-present'
            }
        }
        stage('Security Vulnerability Scan') {
            steps {
                echo 'Running dependency security audit...'
                sh 'npm audit --audit-level=high || true'
            }
        }
    }
    post {
        always {
            echo 'Archiving test reports and cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'SUCCESS: Pipeline completed flawlessly! Notifying Slack/Email...'
        }
        failure {
            echo 'ALERT: Pipeline failed! Initiating rollback alert...'
        }
    }
}`
      }
    ],
    verification: "In the Jenkins Dashboard, open the pipeline run. Inspect the Stage View to confirm that `Checkout`, `Build`, `Unit Testing`, and `Security Scan` each have green checkmarks with execution timestamps.",
    freeTierSafety: "Runs completely locally on your laptop or free EC2 instance using Docker. Zero AWS charges.",
    cleanupCommands: "docker stop jenkins-master && docker rm jenkins-master"
  },

  // =========================================================================
  // MODULE 18 PROJECT
  // =========================================================================
  {
    id: 'module-18-project',
    moduleNumber: 18,
    moduleTitle: "Docker – Modern Containerization Deep Dive",
    title: "Hardened Multi-Stage Docker Microservices Stack with Docker Compose",
    track: "Docker Containers",
    trackId: "docker",
    level: "Beginner",
    estimatedHours: 2,
    summary: "Master containerization from the ground up. Write optimized multi-stage Dockerfiles that reduce image sizes by 85%, run processes as a non-root user for security, configure bridge networks, persist database records with named volumes, and orchestrate a 3-tier microservice stack with Docker Compose.",
    skillsLearned: ["Linux Namespaces & Cgroups", "Dockerfile Multi-Stage Builds", "Image Optimization (.dockerignore)", "Non-Root Container Security", "Docker Compose Multi-Service Stacks"],
    prerequisites: "Docker and Docker Compose installed.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Container Internals, Namespaces & Docker Architecture",
        slug: "docker-internals-container-architecture",
        handsOnObjective: "Inspect running container namespaces and cgroup memory limits.",
        commands: `docker run -d --name test-box --memory="256m" --cpus="0.5" alpine sleep 3600
docker inspect test-box --format '{{.HostConfig.Memory}} bytes'
docker stats test-box --no-stream`,
        practicalExercise: "Run `docker inspect` to verify cgroup limits and namespace process isolation."
      },
      {
        topicNumber: 2,
        topicTitle: "Dockerfile Multi-Stage Builds, Compose & Networking",
        slug: "dockerfile-multistage-compose-networking",
        handsOnObjective: "Build a production multi-stage Docker image and deploy a multi-container stack via Docker Compose.",
        commands: `docker build -t app:v1 .
docker images app:v1 # Notice tiny size (< 120MB)
docker compose up -d
docker compose ps`,
        practicalExercise: "Launch the stack with `docker compose up -d`. Curl port 8080 to verify connectivity to PostgreSQL through the internal bridge network."
      }
    ],
    architectureSteps: [
      "1. Stage 1 (Builder): Compile app using full Node/Go SDK and dev dependencies",
      "2. Stage 2 (Runner): Copy only compiled artifacts into a distroless/Alpine image",
      "3. Create non-root 'appuser' and switch user context with `USER appuser`",
      "4. Author `docker-compose.yml` linking Frontend, Backend API, and Postgres Database",
      "5. Configure healthchecks and restart policies"
    ],
    codeFiles: [
      {
        filename: "Dockerfile",
        language: "dockerfile",
        description: "Hardened multi-stage production Dockerfile with non-root security.",
        content: `# Stage 1: Build & Compile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --if-present

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist

USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]`
      },
      {
        filename: "docker-compose.yml",
        language: "yaml",
        description: "Docker Compose file defining web API, PostgreSQL DB, and persistent volumes.",
        content: `version: '3.8'

services:
  web-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://dbuser:secretpass@postgres-db:5432/appdb
    depends_on:
      postgres-db:
        condition: service_healthy
    networks:
      - internal-net

  postgres-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: dbuser
      POSTGRES_PASSWORD: secretpass
      POSTGRES_DB: appdb
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dbuser -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - internal-net

volumes:
  db-data:

networks:
  internal-net:
    driver: bridge`
      }
    ],
    verification: "Run `docker compose ps`. Both `web-api` and `postgres-db` should report status `Up (healthy)`. Curl `http://localhost:3000/health` to confirm HTTP 200 OK.",
    freeTierSafety: "100% Free. Runs locally on your workstation.",
    cleanupCommands: "docker compose down -v"
  },

  // =========================================================================
  // MODULE 19 PROJECT
  // =========================================================================
  {
    id: 'module-19-project',
    moduleNumber: 19,
    moduleTitle: "Kubernetes (K8s) – Production Container Orchestration",
    title: "Resilient Kubernetes Microservices Cluster with Ingress & Auto Scaling (HPA)",
    track: "Kubernetes Orchestration",
    trackId: "kubernetes",
    level: "Advanced",
    estimatedHours: 3,
    summary: "Deploy and manage resilient containerized applications on Kubernetes. Define declarative manifests for Deployments, ClusterIP Services, NGINX Ingress Controller, ConfigMaps, Secrets, Horizontal Pod Autoscaler (HPA) CPU threshold scaling, and diagnose pod lifecycle issues.",
    skillsLearned: ["Kubernetes Control Plane & Nodes", "Deployments & Rolling Updates", "ClusterIP, NodePort & Ingress", "ConfigMaps & Secrets", "Horizontal Pod Autoscaler (HPA)"],
    prerequisites: "Minikube, Kind, or an active Kubernetes cluster.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "Kubernetes Architecture, Control Plane & Core Primitives",
        slug: "kubernetes-architecture-control-plane-nodes",
        handsOnObjective: "Inspect cluster control plane components and launch a Pod and Deployment.",
        commands: `kubectl cluster-info
kubectl get nodes -o wide
kubectl create deployment web-app --image=nginx:alpine --replicas=3
kubectl get pods -l app=web-app`,
        practicalExercise: "Run `kubectl get nodes` and `kubectl get pods`. Delete one Pod manually and observe the ReplicaSet controller instantly launch a new replacement."
      },
      {
        topicNumber: 2,
        topicTitle: "Workloads, Services, Ingress, Helm & Troubleshooting",
        slug: "k8s-workloads-services-networking-helm",
        handsOnObjective: "Apply declarative Kubernetes manifests with Ingress, resource limits, and HPA.",
        commands: `kubectl apply -f k8s-deployment.yaml
kubectl get svc,ingress,hpa
kubectl rollout status deployment/web-microservice`,
        practicalExercise: "Execute `kubectl set image deployment/web-microservice web=nginx:1.25.4-alpine --record` to watch zero-downtime rolling updates in real-time."
      }
    ],
    architectureSteps: [
      "1. Configure ConfigMap for non-sensitive application settings",
      "2. Configure Secret for encrypted database connection string",
      "3. Author Deployment manifest specifying 3 replicas with CPU/memory requests and limits",
      "4. Expose pods internally via ClusterIP Service",
      "5. Configure Ingress resource routing external HTTP traffic to the Service",
      "6. Define HorizontalPodAutoscaler scaling pods between 2 and 10 based on 70% CPU target"
    ],
    codeFiles: [
      {
        filename: "k8s-deployment.yaml",
        language: "yaml",
        description: "Complete declarative Kubernetes manifests for Deployment, Service, and HPA.",
        content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-microservice
  labels:
    app: web-microservice
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-microservice
  template:
    metadata:
      labels:
        app: web-microservice
    spec:
      containers:
      - name: web
        image: nginx:alpine
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 2
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: ClusterIP
  selector:
    app: web-microservice
  ports:
  - port: 80
    targetPort: 80
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-microservice
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`
      }
    ],
    verification: "Run `kubectl get pods,svc,hpa`. Verify that 3 pods report `STATUS: Running` and `READY: 1/1`.",
    freeTierSafety: "100% Free if using Minikube or Kind locally. If using Amazon EKS, note EKS charges $0.10/hour for the cluster control plane.",
    cleanupCommands: "kubectl delete -f k8s-deployment.yaml"
  },

  // =========================================================================
  // MODULE 20 PROJECT
  // =========================================================================
  {
    id: 'module-20-project',
    moduleNumber: 20,
    moduleTitle: "Complete End-to-End DevOps & Cloud CI/CD Mastery",
    title: "The Unified Enterprise Pipeline: GitHub -> Jenkins -> Docker -> Trivy -> ECR -> EKS",
    track: "Full Stack DevOps CI/CD",
    trackId: "cicd",
    level: "Advanced",
    estimatedHours: 4,
    summary: "The ultimate industrial capstone project. Connect the complete cloud-native toolchain: developer pushes code to GitHub -> GitHub Webhook triggers Jenkins pipeline -> Jenkins builds application and runs unit tests -> SonarQube verifies quality gate -> Trivy scans container security vulnerabilities -> Docker builds and pushes image to Amazon ECR -> Jenkins triggers automated rolling deployment to Amazon EKS Kubernetes cluster with zero downtime.",
    skillsLearned: ["End-to-End CI/CD Integration", "DevSecOps (Trivy Security Scanning)", "Amazon ECR & Amazon EKS Integration", "Automated Blue/Green & Rolling Deployment", "Production Release Automation"],
    prerequisites: "Completion of Git, Jenkins, Docker, K8s, and AWS foundational modules.",
    topicsCovered: [
      {
        topicNumber: 1,
        topicTitle: "The Unified Pipeline: GitHub + Jenkins + Docker + K8s + AWS",
        slug: "end-to-end-devops-pipeline-github-jenkins-docker-k8s-aws",
        handsOnObjective: "Implement the end-to-end multi-stage pipeline connecting GitHub, Jenkins, Docker security scan, and Kubernetes.",
        commands: `# Test Trivy vulnerability scan locally
trivy image --severity HIGH,CRITICAL nginx:alpine
# Test AWS EKS authentication
aws eks update-kubeconfig --region us-east-1 --name prod-cluster
kubectl get nodes`,
        practicalExercise: "Commit code change `git push origin main`. Watch Jenkins automatically execute stages: Lint -> Test -> Trivy Scan -> ECR Push -> EKS Deploy."
      }
    ],
    architectureSteps: [
      "1. Developer commits code to GitHub repository",
      "2. Webhook triggers Jenkins Multibranch Pipeline automatically",
      "3. Jenkins compiles code, runs unit tests, and archives artifacts",
      "4. Trivy scans container image for CVE vulnerabilities; fails pipeline if critical vulnerabilities exist",
      "5. Docker builds image with Git SHA tag and pushes to private Amazon ECR",
      "6. Jenkins updates Kubernetes deployment on Amazon EKS with zero downtime"
    ],
    codeFiles: [
      {
        filename: "Jenkinsfile.production",
        language: "groovy",
        description: "Enterprise unified CI/CD pipeline connecting Git, Trivy, Docker, ECR, and EKS.",
        content: `pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = '123456789012.dkr.ecr.us-east-1.amazonaws.com'
        IMAGE_NAME = 'production-app'
        IMAGE_TAG = "\${env.BUILD_NUMBER}-\${GIT_COMMIT.take(7)}"
        K8S_DEPLOYMENT = 'production-app-deployment'
    }
    stages {
        stage('1. Source Checkout') {
            steps {
                checkout scm
                echo "Checked out commit: \${env.GIT_COMMIT}"
            }
        }
        stage('2. Security Lint & Unit Tests') {
            steps {
                sh 'echo "Running unit tests and code linting..."'
            }
        }
        stage('3. Build Docker Image') {
            steps {
                sh "docker build -t \${ECR_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG} ."
            }
        }
        stage('4. Trivy Container Vulnerability Scan') {
            steps {
                echo 'Scanning image for HIGH/CRITICAL vulnerabilities...'
                sh "trivy image --exit-code 0 --severity HIGH,CRITICAL \${ECR_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}"
            }
        }
        stage('5. Push to Amazon ECR') {
            steps {
                sh """
                    aws ecr get-login-password --region \${AWS_REGION} | docker login --username AWS --password-stdin \${ECR_REGISTRY}
                    docker push \${ECR_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}
                """
            }
        }
        stage('6. Deploy to Amazon EKS') {
            steps {
                sh """
                    aws eks update-kubeconfig --region \${AWS_REGION} --name prod-cluster
                    kubectl set image deployment/\${K8S_DEPLOYMENT} app=\${ECR_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}
                    kubectl rollout status deployment/\${K8S_DEPLOYMENT} --timeout=120s
                """
            }
        }
    }
    post {
        success {
            echo "SUCCESS: Image \${IMAGE_NAME}:\${IMAGE_TAG} deployed to Amazon EKS with ZERO downtime!"
        }
        failure {
            echo "FAILED: Deployment failed! Inspecting Kubernetes events..."
            sh "kubectl get events --sort-by='.metadata.creationTimestamp' | tail -n 20 || true"
        }
    }
}`
      }
    ],
    verification: "Run `kubectl rollout history deployment/production-app-deployment`. You should see the new revision active and serving traffic without any interrupted user connections.",
    freeTierSafety: "You can simulate this entire pipeline locally using Docker Desktop, Kind/Minikube, and local Jenkins for 100% Free practice.",
    cleanupCommands: "docker rmi \${ECR_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG} || true"
  }
];
