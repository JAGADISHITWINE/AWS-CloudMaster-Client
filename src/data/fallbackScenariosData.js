export const FALLBACK_SCENARIOS = [
  {
    "id": "scen-0",
    "moduleNumber": 4,
    "title": "Scenario: EC2 Instance Running but Web Application Inaccessible",
    "difficulty": "Beginner",
    "prompt": "You launched an EC2 instance running Nginx in your VPC. The AWS Management Console shows the instance state as 'Running' with 2/2 status checks passed. However, when users navigate to http://<Public-IP> in their web browser, the connection times out after 30 seconds. How would you systematically troubleshoot and resolve this issue?",
    "explanation": "A running EC2 instance with 2/2 status checks passed verifies that the underlying AWS physical host and virtual OS are healthy. A connection timeout indicates that network packets are being dropped before reaching the application layer or being discarded by a firewall.",
    "hintsJson": "[\"Hint 1: Check the OSI layers starting from the network perimeter. Does the client request actually reach the instance's network interface?\",\"Hint 2: Inspect the EC2 Security Group inbound rules. What port and protocol does HTTP use, and what is the allowed source CIDR?\",\"Hint 3: Check the Subnet Route Table and Network ACLs. Is there an Internet Gateway attached, and does the subnet route 0.0.0.0/0 to it?\",\"Hint 4: Verify whether the Nginx service inside the OS is actually listening on 0.0.0.0:80 using netstat or ss.\"]",
    "recommendedSolution": "### Step-by-Step Troubleshooting Methodology:\n\n1. **Check Security Group Inbound Rules (Most Common Cause):**\n   - Verify that the EC2 Security Group contains an inbound rule allowing **TCP Port 80 (HTTP)** from source `0.0.0.0/0` (or your specific client IP).\n   - If missing, add an inbound rule: Type: HTTP, Protocol: TCP, Port: 80, Source: `0.0.0.0/0`.\n\n2. **Verify Subnet Route Table & Internet Gateway:**\n   - Ensure the EC2 instance resides in a **Public Subnet**.\n   - Check the subnet's Route Table: It must have a route for destination `0.0.0.0/0` with target set to an attached **Internet Gateway (igw-xxxxxx)**.\n   - If the route points to a NAT Gateway or has no default route, external internet traffic cannot reach the instance directly.\n\n3. **Inspect Network Access Control Lists (NACLs):**\n   - Check the subnet's NACL. Because NACLs are **stateless**, verify:\n     - **Inbound Rule:** Port 80 ALLOW from `0.0.0.0/0`.\n     - **Outbound Rule:** Ephemeral ports (1024-65535) ALLOW to `0.0.0.0/0` so return packets can leave the subnet.\n\n4. **Verify Public IPv4 Address & Elastic IP:**\n   - Ensure the instance has an assigned Public IPv4 address or an associated Elastic IP. Private IPs (10.x.x.x, 172.16.x.x, 192.168.x.x) are non-routable over the public internet.\n\n5. **Verify Host OS Service & Local Firewall (via EC2 Serial Console or Session Manager):**\n   - Connect via AWS Systems Manager Session Manager or SSH.\n   - Run: `sudo systemctl status nginx` to confirm the web server process is active.\n   - Run: `sudo ss -tulpn | grep :80` to confirm Nginx is bound to `0.0.0.0:80` and not restricted to `127.0.0.1:80`.\n   - Check OS firewalls (e.g. `iptables` or `ufw status`) to ensure local host firewalls aren't dropping incoming port 80 traffic.",
    "tagsJson": "[\"EC2\",\"VPC\",\"Security Groups\",\"Troubleshooting\",\"Networking\"]",
    "hints": [
      "Hint 1: Check the OSI layers starting from the network perimeter. Does the client request actually reach the instance's network interface?",
      "Hint 2: Inspect the EC2 Security Group inbound rules. What port and protocol does HTTP use, and what is the allowed source CIDR?",
      "Hint 3: Check the Subnet Route Table and Network ACLs. Is there an Internet Gateway attached, and does the subnet route 0.0.0.0/0 to it?",
      "Hint 4: Verify whether the Nginx service inside the OS is actually listening on 0.0.0.0:80 using netstat or ss."
    ],
    "tags": [
      "EC2",
      "VPC",
      "Security Groups",
      "Troubleshooting",
      "Networking"
    ]
  },
  {
    "id": "scen-1",
    "moduleNumber": 6,
    "title": "Scenario: Securing Sensitive Financial Records in Amazon S3",
    "difficulty": "Intermediate",
    "prompt": "A fintech startup stores sensitive customer PDF bank statements and tax filings in an Amazon S3 bucket. Compliance auditors require that: (1) All data is encrypted at rest using keys rotated annually, (2) No objects can be made public under any circumstance, (3) Files cannot be deleted or overwritten for 7 years even by administrators, and (4) Access must be restricted strictly to a backend microservice running on EC2. How would you architect this solution?",
    "explanation": "This scenario tests multi-layered S3 defense: KMS encryption, S3 Object Lock for regulatory compliance, Block Public Access guardrails, and IAM least-privilege bucket policies.",
    "hintsJson": "[\"Hint 1: Which AWS encryption service supports automated annual key rotation?\",\"Hint 2: How do you prevent accidental or malicious deletion even if someone has root or admin credentials?\",\"Hint 3: Which S3 feature provides a centralized safety switch to permanently prevent public exposures?\",\"Hint 4: How can a Bucket Policy restrict access strictly to a specific IAM role ARN?\"]",
    "recommendedSolution": "### Architectural Solution:\n\n1. **Encryption at Rest with Automated Key Rotation:**\n   - Create a **Customer Managed Key (CMK)** in **AWS Key Management Service (KMS)**.\n   - Enable **Automatic Key Rotation** on the KMS key (AWS automatically rotates the backing key every year while keeping the same ARN).\n   - Configure the S3 bucket's default encryption to use this KMS key (SSE-KMS).\n\n2. **Compliance Retention via S3 Object Lock (WORM):**\n   - Enable **S3 Versioning** and **S3 Object Lock** in **Compliance Mode** with a retention period of 7 years.\n   - In Compliance Mode, NO user (including the AWS root user or administrator) can delete or overwrite an object version until the 7-year retention period expires.\n\n3. **Prevent Public Access:**\n   - Enable **S3 Block Public Access (BPA)** at both the Account level and Bucket level with all 4 checkboxes enabled:\n     - BlockPublicAcls\n     - IgnorePublicAcls\n     - BlockPublicPolicy\n     - RestrictPublicBuckets\n\n4. **Strict Least-Privilege Access Restriction:**\n   - Attach an **IAM Role** to the backend EC2 instance with an IAM policy granting only `s3:GetObject` and `s3:PutObject` on `arn:aws:s3:::fintech-records/*`.\n   - Implement an **S3 Bucket Policy** that explicitly denies any principal EXCEPT the designated backend IAM Role ARN:\n```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"DenyNonAppAccess\",\n      \"Effect\": \"Deny\",\n      \"Principal\": \"*\",\n      \"Action\": \"s3:*\",\n      \"Resource\": [\n        \"arn:aws:s3:::fintech-records\",\n        \"arn:aws:s3:::fintech-records/*\"\n      ],\n      \"Condition\": {\n        \"StringNotLike\": {\n          \"aws:userId\": [\"AROAEXAMPLEID:*\"]\n        }\n      }\n    }\n  ]\n}\n```\n\n5. **Auditing & Monitoring:**\n   - Enable S3 Server Access Logging and CloudTrail Data Events to log every single read/write attempt with source IP and identity.",
    "tagsJson": "[\"S3\",\"Security\",\"KMS\",\"Compliance\",\"Object Lock\"]",
    "hints": [
      "Hint 1: Which AWS encryption service supports automated annual key rotation?",
      "Hint 2: How do you prevent accidental or malicious deletion even if someone has root or admin credentials?",
      "Hint 3: Which S3 feature provides a centralized safety switch to permanently prevent public exposures?",
      "Hint 4: How can a Bucket Policy restrict access strictly to a specific IAM role ARN?"
    ],
    "tags": [
      "S3",
      "Security",
      "KMS",
      "Compliance",
      "Object Lock"
    ]
  },
  {
    "id": "scen-2",
    "moduleNumber": 15,
    "title": "Scenario: Designing Multi-AZ Resiliency for Availability Zone Outage",
    "difficulty": "Advanced",
    "prompt": "You are designing the architecture for an online banking portal. The application must experience ZERO service disruption even if an entire AWS Availability Zone completely loses power or network connectivity due to a natural disaster. The database must maintain strict ACID consistency without data loss (RPO = 0, RTO < 60 seconds). How would you design this architecture?",
    "explanation": "This scenario validates high-availability production architecture, stateless compute tiering, dynamic auto scaling across zones, and synchronous database failover.",
    "hintsJson": "[\"Hint 1: Where should the application load balancer be deployed, and across how many Availability Zones?\",\"Hint 2: How should EC2/ECS instances be distributed, and what happens when 1 AZ disappears?\",\"Hint 3: Which database architecture guarantees synchronous replication across AZs with zero data loss?\",\"Hint 4: How do you prevent over-utilization when remaining instances suddenly take on 100% of traffic?\"]",
    "recommendedSolution": "### Production Architecture Design:\n\n1. **DNS & Edge Caching:**\n   - Route traffic through **Amazon Route 53** with latency/health-check routing to **Amazon CloudFront** edge locations with **AWS WAF**.\n\n2. **Load Balancing Tier:**\n   - Deploy an **Application Load Balancer (ALB)** across **3 Availability Zones** (Public Subnets). The ALB continuously checks the health of downstream targets.\n\n3. **Compute Tier (Stateless Elastic Cluster):**\n   - Deploy an **Auto Scaling Group (ASG)** spanning all 3 Availability Zones (Private Subnets).\n   - **Capacity Sizing Rule:** Provision baseline capacity so that remaining AZs can handle peak traffic. If total desired capacity is N instances across 3 AZs (e.g. 6 instances, 2 per AZ), losing 1 AZ leaves 4 instances. The ASG Target Tracking policy immediately triggers dynamic scale-out to launch replacement instances in the surviving 2 AZs.\n   - Store all user sessions in **Amazon ElastiCache (Redis Multi-AZ with Auto-Failover)** or client-side signed JWTs, ensuring instances are 100% stateless.\n\n4. **Database Tier (Zero Data Loss RPO = 0):**\n   - Deploy **Amazon Aurora PostgreSQL/MySQL Multi-AZ Cluster**:\n     - Aurora replicates data synchronously across **3 Availability Zones (6 copies of data)** at the storage layer.\n     - A write is acknowledged when 4 out of 6 nodes confirm (write quorum), surviving the total loss of an AZ plus one additional node without data loss (RPO = 0).\n     - Deploy 1 Primary Writer DB in AZ-1 and 1 Aurora Read Replica with Priority Tier 0 in AZ-2.\n     - If AZ-1 fails, Aurora automatically promotes the Replica to Primary Writer in under 30 seconds (RTO < 30s) by flipping the Cluster Endpoint DNS CNAME.\n\n5. **Static Assets & Backups:**\n   - Static web assets stored in **Amazon S3** (which replicates across 3+ AZs by default with 11 9s durability).",
    "tagsJson": "[\"Architecture\",\"Multi-AZ\",\"High Availability\",\"Aurora\",\"ALB\",\"ASG\"]",
    "hints": [
      "Hint 1: Where should the application load balancer be deployed, and across how many Availability Zones?",
      "Hint 2: How should EC2/ECS instances be distributed, and what happens when 1 AZ disappears?",
      "Hint 3: Which database architecture guarantees synchronous replication across AZs with zero data loss?",
      "Hint 4: How do you prevent over-utilization when remaining instances suddenly take on 100% of traffic?"
    ],
    "tags": [
      "Architecture",
      "Multi-AZ",
      "High Availability",
      "Aurora",
      "ALB",
      "ASG"
    ]
  },
  {
    "id": "scen-3",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "title": "Scenario: Secure EC2-to-RDS Private Communication",
    "difficulty": "Intermediate",
    "prompt": "Your backend API runs on EC2 instances inside a custom VPC. It must communicate with an Amazon RDS MySQL database. You must ensure that: (1) The database is NEVER reachable from the public internet, (2) Only the backend EC2 instances can connect to MySQL port 3306, and (3) No hardcoded database IP addresses or CIDR blocks are used in firewall rules. How would you configure the subnets, routing, and security groups?",
    "explanation": "This scenario tests the classic cloud security pattern of Security Group Chaining (referencing security groups by ID) and multi-tier subnet isolation.",
    "hintsJson": "[\"Hint 1: In which subnet type should the RDS database be deployed?\",\"Hint 2: Can a Security Group rule accept another Security Group ID instead of an IP CIDR block?\",\"Hint 3: Does the database subnet route table need a default route to an Internet Gateway or NAT Gateway?\",\"Hint 4: What is an RDS DB Subnet Group and why does it require at least 2 Availability Zones?\"]",
    "recommendedSolution": "### Step-by-Step Security Architecture:\n\n1. **Subnet & DB Subnet Group Design:**\n   - Place the backend EC2 instances in a **Private App Subnet**.\n   - Place the RDS database in a **Dedicated Private Database Subnet** across at least two Availability Zones (required to create an RDS DB Subnet Group).\n   - The Database Subnet Route Table should have **NO route to 0.0.0.0/0** (no IGW, no NAT Gateway). The database is completely isolated.\n   - Set RDS parameter **Publicly Accessible: No**.\n\n2. **Security Group Chaining (Zero Hardcoded IPs):**\n   - Create **SG-App** for the EC2 backend:\n     - Inbound: Port 80/443 from ALB Security Group only.\n     - Outbound: Allow outbound TCP port 3306 to destination **SG-DB**.\n   - Create **SG-DB** for the RDS Database:\n     - Inbound: Type **MySQL/Aurora (Port 3306)** -> Source: **SG-App** (select the security group ID `sg-app-xxxxxx`).\n     - Outbound: All traffic or none (Security Groups are stateful; return packets flow automatically).\n\n3. **Advantages of SG Chaining:**\n   - When the Auto Scaling Group launches new EC2 instances, they automatically receive `SG-App` and can immediately talk to the database without updating any IP whitelist.\n   - Any other instance or rogue developer machine in the VPC without `SG-App` is blocked by the database firewall.\n\n4. **Connection Configuration:**\n   - The application connects using the **RDS DNS Endpoint** (e.g. `mydb.c12345.us-east-1.rds.amazonaws.com:3306`), resolved privately via VPC DNS.\n   - Database credentials are retrieved at startup from **AWS Secrets Manager** using the EC2 instance's IAM Role.",
    "tagsJson": "[\"VPC\",\"RDS\",\"Security Groups\",\"Private Subnet\",\"Security\"]",
    "hints": [
      "Hint 1: In which subnet type should the RDS database be deployed?",
      "Hint 2: Can a Security Group rule accept another Security Group ID instead of an IP CIDR block?",
      "Hint 3: Does the database subnet route table need a default route to an Internet Gateway or NAT Gateway?",
      "Hint 4: What is an RDS DB Subnet Group and why does it require at least 2 Availability Zones?"
    ],
    "tags": [
      "VPC",
      "RDS",
      "Security Groups",
      "Private Subnet",
      "Security"
    ]
  },
  {
    "id": "scen-4",
    "moduleNumber": 15,
    "title": "Scenario: Investigating an Unexpected Surge in AWS Monthly Bill",
    "difficulty": "Intermediate",
    "prompt": "Your company's AWS monthly bill jumped from an expected $150 to $850. The engineering manager asks you to urgently investigate the root causes, identify the exact offending resources, stop ongoing cost bleed, and implement preventive guardrails so this never happens again. How would you proceed?",
    "explanation": "This scenario evaluates real-world FinOps troubleshooting skills using AWS Cost Explorer, Cost Allocation Tags, Budgets, and common cost leak patterns.",
    "hintsJson": "[\"Hint 1: Which AWS tool provides daily cost breakdowns filtered by service, usage type, and region?\",\"Hint 2: What common resources silently accumulate charges (e.g. NAT Gateways, idle Elastic IPs, untruncated CloudWatch logs, unattached EBS)?\",\"Hint 3: How can you find the exact IAM user or pipeline that launched the expensive resources?\",\"Hint 4: What tools automate cost alerts and spending thresholds before the bill arrives?\"]",
    "recommendedSolution": "### Step-by-Step FinOps Investigation & Remediation:\n\n1. **Identify the Offending Service in AWS Cost Explorer:**\n   - Open **AWS Cost Explorer** -> Group by **Service** -> Granularity: **Daily** -> Timeframe: Last 30 Days.\n   - Look for the sharp spike and identify the top spending service (e.g., EC2-Other, NAT Gateway, CloudWatch, or RDS).\n   - Change Group by to **Usage Type** to find the specific driver (e.g., `NatGateway-Hours`, `PublicIPv4:InUse`, `TimedStorage-ByteHrs`, or `CW:GigaBytes-Delivered`).\n\n2. **Locate the Specific Resource IDs:**\n   - Filter by **Region** to identify where the resources were provisioned.\n   - Common culprits to inspect immediately:\n     - **VPC NAT Gateways:** Idle NAT Gateways bill ~$32/month each plus $0.045/GB processed.\n     - **EC2-Other:** Unattached EBS volumes left over from terminated instances, unneeded EBS snapshots, or unassociated Elastic IPs.\n     - **CloudWatch Logs:** Verbose debug logging with 'Never Expire' retention policy.\n     - **RDS:** Multi-AZ or Provisioned IOPS enabled accidentally during testing.\n\n3. **Trace the Originating Principal in AWS CloudTrail:**\n   - Open **AWS CloudTrail** -> Event History.\n   - Filter by Event Name (e.g., `CreateNatGateway` or `CreateVolume`) and locate the IAM User, Access Key, or CI/CD role responsible and the exact timestamp.\n\n4. **Stop the Bleed:**\n   - Immediately terminate or delete the orphaned/over-provisioned resources.\n   - Set retention limits on CloudWatch Log Groups (e.g., 14 or 30 days).\n\n5. **Implement Preventive Guardrails:**\n   - **AWS Budgets:** Configure a Monthly Cost Budget with notifications at 50%, 80%, and 100% of the target threshold sent to the DevOps team Slack/Email.\n   - **AWS Cost Anomaly Detection:** Turn on ML-powered anomaly detection to receive instant alerts when unusual spend occurs.\n   - **AWS Organizations SCPs / Permission Boundaries:** Restrict developers from provisioning expensive instance classes (e.g., deny `*.32xlarge`).",
    "tagsJson": "[\"Cost Optimization\",\"FinOps\",\"Cost Explorer\",\"CloudTrail\",\"Budgets\"]",
    "hints": [
      "Hint 1: Which AWS tool provides daily cost breakdowns filtered by service, usage type, and region?",
      "Hint 2: What common resources silently accumulate charges (e.g. NAT Gateways, idle Elastic IPs, untruncated CloudWatch logs, unattached EBS)?",
      "Hint 3: How can you find the exact IAM user or pipeline that launched the expensive resources?",
      "Hint 4: What tools automate cost alerts and spending thresholds before the bill arrives?"
    ],
    "tags": [
      "Cost Optimization",
      "FinOps",
      "Cost Explorer",
      "CloudTrail",
      "Budgets"
    ]
  },
  {
    "id": "scen-5",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "title": "Scenario: Accidental Staging of Sensitive Production Credentials — Safe Unstaging with git rm --cached",
    "difficulty": "Beginner",
    "prompt": "A developer working on a backend service runs 'git add .' in the project root. Upon checking 'git status', they realize they inadvertently staged '.env.production' and an AWS private key 'deploy_key.pem' containing secret credentials. The developer has not run 'git commit' yet. They need to remove both sensitive files from the staging index immediately, ensure the physical files remain intact on disk for their local testing, and permanently safeguard the repository from future accidental staging. How do you resolve this?",
    "explanation": "Accidentally committing credentials to Git history is an enterprise severity-1 incident. Even if deleted in a later commit, secrets persist in Git DAG object blobs and reflog history unless purged with BFG or git-filter-repo. Safe unstaging before commit prevents the incident entirely.",
    "hintsJson": "[\"Hint 1: Do NOT run plain 'git rm .env.production' — that permanently deletes the file from disk!\",\"Hint 2: Use the '--cached' flag with 'git rm' or use 'git reset <file>' to unstage without deleting disk files.\",\"Hint 3: Verify the file transition from staged (green) back to untracked (red) using 'git status'.\",\"Hint 4: Immediately add the sensitive files to '.gitignore' before making any commit.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Verify the Staged State:**\n   - Run: `git status`\n   - Observe that `.env.production` and `deploy_key.pem` appear in green under *\"Changes to be committed\"*.\n\n2. **Safely Unstage Without Deleting Files from Disk:**\n   - Run:\n     ```bash\n     git rm --cached .env.production deploy_key.pem\n     # Alternatively:\n     git reset .env.production deploy_key.pem\n     ```\n   - **Why '--cached' is critical:** It removes the files from the Staging Area (index) while leaving the physical files on disk completely untouched.\n   - **WARNING:** Never run `git rm .env.production` without `--cached`, as plain `git rm` destroys your local disk copy.\n\n3. **Verify Files are Back in Untracked State:**\n   - Run: `git status`\n   - Confirm both files now appear in red under *\"Untracked files\"*.\n\n4. **Permanently Prevent Future Accidental Staging via .gitignore:**\n   - Append to `.gitignore`:\n     ```bash\n     echo \".env*\" >> .gitignore\n     echo \"*.pem\" >> .gitignore\n     ```\n   - Stage and commit the updated `.gitignore`:\n     ```bash\n     git add .gitignore\n     git commit -m \"chore: ignore local environment files and certificates\"\n     ```\n\n5. **Confirm Clean Repository Status:**\n   - Run `git status` to verify that `.env.production` and `deploy_key.pem` are now completely ignored by Git.",
    "tagsJson": "[\"Git\",\"Security\",\"Unstaging\",\"git rm --cached\",\"gitignore\"]",
    "hints": [
      "Hint 1: Do NOT run plain 'git rm .env.production' — that permanently deletes the file from disk!",
      "Hint 2: Use the '--cached' flag with 'git rm' or use 'git reset <file>' to unstage without deleting disk files.",
      "Hint 3: Verify the file transition from staged (green) back to untracked (red) using 'git status'.",
      "Hint 4: Immediately add the sensitive files to '.gitignore' before making any commit."
    ],
    "tags": [
      "Git",
      "Security",
      "Unstaging",
      "git rm --cached",
      "gitignore"
    ]
  },
  {
    "id": "scen-6",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "title": "Scenario: Workspace Hygiene & Untracked Build Artifact Cleanup (Safe Dry-Run vs Force Clean)",
    "difficulty": "Beginner",
    "prompt": "After a failed local build and integration test run, a developer's working directory is polluted with 50+ untracked temporary files, core dumps, and compiled output folders (.tmp, coverage/, debug.log). Running 'git status' produces a massive screen of red untracked clutter. The developer wants to completely clean their working directory back to a pristine state, but they also created a brand new, uncommitted source file 'authHelper.js' that they cannot afford to lose. How do you safely preview and clean the untracked workspace using Git without losing legitimate new code?",
    "explanation": "Untracked files reside outside Git's version control. 'git clean' removes untracked files, but running 'git clean -f' without a dry run will permanently destroy any newly authored, uncommitted files.",
    "hintsJson": "[\"Hint 1: Always protect newly authored files before cleaning by staging them ('git add authHelper.js').\",\"Hint 2: Never run 'git clean -f' blindly. Always run a dry run first with 'git clean -n'.\",\"Hint 3: Use the '-d' flag to include untracked directories alongside individual files.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Protect Legitimate Work First:**\n   - Stage your newly authored code so Git tracks it:\n     ```bash\n     git add authHelper.js\n     ```\n   - Because 'git clean' only deletes untracked files, staging 'authHelper.js' makes it 100% immune to 'git clean'.\n\n2. **Execute a Safe Dry-Run Preview:**\n   - Run:\n     ```bash\n     git clean -nd\n     ```\n   - **Flags breakdown:**\n     - `-n`: Dry run (preview only; deletes nothing).\n     - `-d`: Inspect untracked directories as well as files.\n   - Carefully review the printed output to ensure no desired code or assets are listed.\n\n3. **Execute the Force Cleanup:**\n   - Once verified, run:\n     ```bash\n     git clean -fd\n     ```\n   - **Flags breakdown:**\n     - `-f`: Force execution of the clean.\n     - `-d`: Recursively removes untracked directories (e.g. `coverage/`, `.tmp/`).\n\n4. **Verify Clean Workspace:**\n   - Run `git status`.\n   - The output will now be clean: only `authHelper.js` staged in green ready for commit, with zero leftover build debris.",
    "tagsJson": "[\"Git\",\"Workspace Hygiene\",\"git clean\",\"Dry Run\",\"Best Practices\"]",
    "hints": [
      "Hint 1: Always protect newly authored files before cleaning by staging them ('git add authHelper.js').",
      "Hint 2: Never run 'git clean -f' blindly. Always run a dry run first with 'git clean -n'.",
      "Hint 3: Use the '-d' flag to include untracked directories alongside individual files."
    ],
    "tags": [
      "Git",
      "Workspace Hygiene",
      "git clean",
      "Dry Run",
      "Best Practices"
    ]
  },
  {
    "id": "scen-7",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "title": "Scenario: Accidental Subfolder 'git init' & Broken Nested Repository Recovery",
    "difficulty": "Beginner",
    "prompt": "A developer working on a React frontend accidentally opened their terminal in 'src/components/' and executed 'git init'. Now, whenever they edit components inside that directory, the root project's 'git status' ignores all changes or displays 'src/components (modified content, untracked content)'. The team's CI/CD pipeline fails because component files are not being tracked. How do you explain why this happened and safely restore standard repository tracking?",
    "explanation": "Running 'git init' in a subdirectory creates a nested '.git' directory. Git detects the child repository and treats it as a submodule or embedded repository without tracking individual internal files.",
    "hintsJson": "[\"Hint 1: Look for the hidden '.git' directory inside 'src/components/'.\",\"Hint 2: Delete ONLY the child repository's '.git' directory ('rm -rf src/components/.git').\",\"Hint 3: In the root directory, unstage the gitlink pointer and re-add all components.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Diagnose the Nested Repository:**\n   - Run from root: `ls -la src/components/.git`\n   - Confirm that a rogue `.git` folder exists inside the subfolder.\n\n2. **Safely Remove the Subfolder .git Directory:**\n   - Delete only the child repository's tracking folder (this leaves all actual React component code files on disk completely intact):\n     ```bash\n     rm -rf src/components/.git\n     ```\n\n3. **Clear the Git Index Cache in the Root Repository:**\n   - Clear any submodule or gitlink references cached by the root Git index:\n     ```bash\n     git rm --cached src/components\n     ```\n\n4. **Re-stage the Child Components Properly:**\n   - Run:\n     ```bash\n     git add src/components/\n     git status\n     ```\n   - Confirm that all individual files (e.g. `Button.jsx`, `Navbar.jsx`) now appear cleanly in green under *\"Changes to be committed\"*.\n\n5. **Commit the Fix:**\n   ```bash\n   git commit -m \"fix(repo): remove accidental nested .git folder and restore component tracking\"\n   ``",
    "tagsJson": "[\"Git\",\"Nested Repo\",\"git init\",\"Submodules\",\"Troubleshooting\"]",
    "hints": [
      "Hint 1: Look for the hidden '.git' directory inside 'src/components/'.",
      "Hint 2: Delete ONLY the child repository's '.git' directory ('rm -rf src/components/.git').",
      "Hint 3: In the root directory, unstage the gitlink pointer and re-add all components."
    ],
    "tags": [
      "Git",
      "Nested Repo",
      "git init",
      "Submodules",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-8",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "title": "Scenario: Git Merge Conflict & Detached HEAD During Release Hotfix",
    "difficulty": "Intermediate",
    "prompt": "During an urgent production hotfix, a developer checked out a past commit SHA, made changes, and committed them, entering 'detached HEAD' state. When attempting to merge the hotfix into the 'main' branch, Git reported severe merge conflicts across 14 configuration files and aborted. The team is blocked from deploying the hotfix. How do you recover the unreferenced commits from detached HEAD, resolve conflicts cleanly, and safely update the main branch without losing work?",
    "explanation": "Detached HEAD occurs when HEAD points directly to a commit hash instead of a named branch pointer. Commits made in this state are orphaned and will eventually be garbage collected unless anchored to a new branch.",
    "hintsJson": "[\"Hint 1: Do not panic or delete the folder. Git reflog records every movement of HEAD.\",\"Hint 2: Anchor the orphaned commits by creating a temporary branch from the current HEAD pointer.\",\"Hint 3: Instead of a messy merge, consider rebasing the hotfix commits on top of origin/main.\",\"Hint 4: Use 'git status' and 'git diff' to inspect conflict markers (<<<<<<< HEAD, =======, >>>>>>>).\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Anchor the Detached HEAD Commits Immediately:**\n   - Run: `git branch hotfix-recovery` while still on the detached commit.\n   - This creates a named pointer so your hotfix commits are safe from garbage collection.\n\n2. **Verify Commit History with Git Reflog:**\n   - If you accidentally switched away already, run: `git reflog`\n   - Find the commit SHA where your work was done (e.g., `HEAD@{1}`) and run: `git checkout -b hotfix-recovery HEAD@{1}`.\n\n3. **Rebase or Merge onto Fresh Upstream Main:**\n   - Fetch the latest remote changes: `git fetch origin main`\n   - Rebase cleanly on top of main: `git rebase origin/main`\n   - Git will pause at conflicting files.\n\n4. **Resolve Conflict Markers:**\n   - Run `git status` to identify 'both modified' files.\n   - Open conflicting files and resolve:\n     - `<<<<<<< HEAD`: Contains the upstream main code.\n     - `=======`: Divider line.\n     - `>>>>>>> hotfix-recovery`: Contains your hotfix code.\n   - Edit the code to preserve the necessary fixes and remove conflict markers.\n   - Stage resolved files: `git add <file>`\n\n5. **Finalize and Verify:**\n   - Run: `git rebase --continue`\n   - Run the test suite: `npm test`\n   - Push to your feature branch and open a verified PR: `git push origin hotfix-recovery`.",
    "tagsJson": "[\"Git\",\"GitHub\",\"Merge Conflict\",\"Detached HEAD\",\"Reflog\"]",
    "hints": [
      "Hint 1: Do not panic or delete the folder. Git reflog records every movement of HEAD.",
      "Hint 2: Anchor the orphaned commits by creating a temporary branch from the current HEAD pointer.",
      "Hint 3: Instead of a messy merge, consider rebasing the hotfix commits on top of origin/main.",
      "Hint 4: Use 'git status' and 'git diff' to inspect conflict markers (<<<<<<< HEAD, =======, >>>>>>>)."
    ],
    "tags": [
      "Git",
      "GitHub",
      "Merge Conflict",
      "Detached HEAD",
      "Reflog"
    ]
  },
  {
    "id": "scen-9",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "title": "Scenario: Overcoming GitHub's 100MB Large File Rejection (GH001) in Local Commit History",
    "difficulty": "Intermediate",
    "prompt": "A developer working on an ecommerce platform accidentally committed a 450 MB MySQL seed dump ('database/seed_dump.sql') 4 commits ago. When running 'git push origin feature/search', GitHub's pre-receive hook abruptly aborts the push with: 'remote: error: GH001: Large files detected. File database/seed_dump.sql is 450.00 MB; this exceeds GitHub\\'s file size limit of 100.00 MB'. The developer tried to fix it by running 'rm database/seed_dump.sql' and making a new commit, but 'git push' continues to fail with the exact same error! The release sprint is blocked. How do you explain why deleting the file in a new commit failed, and how do you excise the large blob from historical commit trees to allow pushing without losing the 4 subsequent commits?",
    "explanation": "GitHub blocks pushes containing blobs >100MB anywhere in the commit packfile payload. Deleting the file in a newer commit only creates a new tree that stops tracking it; the 450MB blob object remains permanently referenced in the earlier commit object. To push, the commit containing the blob must be rewritten or amended.",
    "hintsJson": "[\"Hint 1: Recognize that the blob is baked into commit history 4 commits ago; a forward 'rm' commit does not delete historical objects.\",\"Hint 2: Use interactive rebase ('git rebase -i HEAD~5') to stop at the offending commit, remove the file, and amend it.\",\"Hint 3: Alternatively, use 'git filter-repo --path database/seed_dump.sql --invert-paths' to strip the blob across all commits.\",\"Hint 4: Add the large file pattern to '.gitignore' to prevent future recurrences.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n### 1. Root Cause Analysis: Why Deleting the File Failed\n- Git commit snapshots are immutable cryptographic Directed Acyclic Graphs (DAGs).\n- Running `rm database/seed_dump.sql && git commit -m \"remove dump\"` created Commit #5.\n- However, Commit #1 still contains a tree pointing to the 450 MB blob. When you run `git push`, Git packages **all commits in the branch** into a packfile. GitHub inspects every blob in the packfile, encounters the 450 MB blob in Commit #1, and rejects the push.\n\n---\n\n### 2. Method A: Interactive Rebase (Best for recent local commits)\nIf the bad commit was made locally 4 commits ago:\n\n1. **Start Interactive Rebase:**\n   ```bash\n   git rebase -i HEAD~5\n   ```\n2. **Mark the Offending Commit for Editing:**\n   - In the text editor that opens, change `pick` to `edit` (or `e`) next to the commit where `seed_dump.sql` was introduced:\n     ```\n     edit 7a8b9c0 feat(db): add database seed file and test data\n     pick 3f1e2d3 feat(search): implement elasticsearch query builder\n     pick 5b4a3c2 fix(search): handle empty search queries\n     pick 9e8d7c6 refactor(api): clean up endpoint routing\n     ```\n   - Save and close the editor. Git pauses at commit `7a8b9c0`.\n\n3. **Remove the Large File from the Index and Amend:**\n   ```bash\n   # Remove from index AND disk:\n   git rm -f database/seed_dump.sql\n\n   # Amend the commit so the snapshot never recorded the large blob:\n   git commit --amend --no-edit\n   ```\n\n4. **Add to .gitignore so it never happens again:**\n   ```bash\n   echo \"*.sql\" >> .gitignore\n   git add .gitignore\n   git commit -m \"chore: ignore database dumps\"\n   ```\n\n5. **Continue and Finalize Rebase:**\n   ```bash\n   git rebase --continue\n   ```\n   Git replays the remaining 3 commits cleanly on top of the amended commit.\n\n6. **Verify and Push to Remote:**\n   ```bash\n   git status\n   git push origin feature/search\n   ```\n   The push succeeds instantly because the 450 MB blob no longer exists anywhere in the branch DAG!\n\n---\n\n### 3. Method B: Using git-filter-repo (Best for multiple historical commits)\nIf the large file was committed multiple times across several branches:\n```bash\n# Strip the file from all commits across the entire repository:\ngit filter-repo --path database/seed_dump.sql --invert-paths\n\n# Expire reflog and prune packfiles:\ngit reflog expire --expire=now --all\ngit gc --prune=now --aggressive\n\n# Push cleanly:\ngit push origin feature/search --force-with-lease\n```",
    "tagsJson": "[\"Git\",\"GitHub Limit\",\"GH001\",\"Large Files\",\"Interactive Rebase\",\"Troubleshooting\"]",
    "hints": [
      "Hint 1: Recognize that the blob is baked into commit history 4 commits ago; a forward 'rm' commit does not delete historical objects.",
      "Hint 2: Use interactive rebase ('git rebase -i HEAD~5') to stop at the offending commit, remove the file, and amend it.",
      "Hint 3: Alternatively, use 'git filter-repo --path database/seed_dump.sql --invert-paths' to strip the blob across all commits.",
      "Hint 4: Add the large file pattern to '.gitignore' to prevent future recurrences."
    ],
    "tags": [
      "Git",
      "GitHub Limit",
      "GH001",
      "Large Files",
      "Interactive Rebase",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-10",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "title": "Scenario: Disaster Recovery: Accidental 'git reset --hard HEAD~5' & Reflog Reconstruction",
    "difficulty": "Intermediate",
    "prompt": "At 11:30 PM after a marathon sprint, a tired senior engineer meant to run 'git reset --soft HEAD~1' to amend a commit message. By mistake, they ran 'git reset --hard HEAD~5', and immediately afterward executed 'git checkout -f main'. Five days of intense local feature development—containing 5 atomic commits with 2,400 lines of complex microservice code that were never pushed to remote—vanished from 'git log' and the working directory. The engineer believes their entire week's work is permanently deleted. How do you calm the engineer, use 'git reflog' to track HEAD movements, recover the orphaned commit SHA, and restore 100% of the lost work in under 3 minutes?",
    "explanation": "Git rarely deletes committed data immediately. Even when a hard reset abandons commits, the objects remain in '.git/objects/' as dangling commits, and their historical positions are permanently chronicled in the reflog ('.git/logs/HEAD') for at least 30-90 days before garbage collection.",
    "hintsJson": "[\"Hint 1: Do NOT run 'git gc' or delete any folders.\",\"Hint 2: Run 'git reflog' to view the historical trajectory of HEAD.\",\"Hint 3: Identify the commit SHA where HEAD was located immediately before the 'reset: moving to HEAD~5' command.\",\"Hint 4: Run 'git checkout -b recovery-branch <commit-sha>' to anchor the orphaned commits to a new named branch.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n### 1. The Core Reassurance\n- **The Golden Rule of Git Safety:** *If work was committed at least once, it is virtually impossible to lose in Git within 30 days unless you manually delete the .git folder or run aggressive garbage collection.*\n- `git reset --hard` merely moved the branch pointer backwards; it did **NOT** erase the commit objects from disk.\n\n---\n\n### 2. Step-by-Step Emergency Reflog Recovery Procedure\n\n**Step 1: Open the Reflog Safety Ledger:**\n```bash\ngit reflog\n```\n\n**Step 2: Trace the HEAD Movement History:**\nInspect the chronological output (from top to bottom):\n```\n7c2a1b0 (HEAD -> main) HEAD@{0}: checkout: moving from feature/payments to main\n1a9f8e2 HEAD@{1}: reset: moving to HEAD~5\n9f4e2d1 HEAD@{2}: commit: feat(stripe): add webhook signature validation\n5c8b7a3 HEAD@{3}: commit: feat(stripe): implement idempotent payment processing\n4e1d9c2 HEAD@{4}: commit: feat(checkout): add currency conversion rate caching\n2b7a6f1 HEAD@{5}: commit: feat(checkout): calculate dynamic sales tax\n8d3c5e0 HEAD@{6}: commit: feat(checkout): scaffold checkout controller\n```\n\n**Step 3: Pinpoint the Lost Commit:**\n- Notice entry `HEAD@{1}: reset: moving to HEAD~5`.\n- Immediately before that destructive reset, HEAD was at `HEAD@{2}` (commit hash: **`9f4e2d1`**), which was the final completed feature commit!\n\n**Step 4: Anchor the Orphaned Commit to a New Branch:**\nExecute a checkout into a recovery branch targeting that exact commit hash:\n```bash\ngit checkout -b feature/payments-recovered 9f4e2d1\n```\n\n**Step 5: Verify 100% Work Restoration:**\n```bash\n# 1. Inspect the commit history:\ngit log --oneline -n 6\n# Output shows all 5 'lost' commits intact in perfect chronological order!\n\n# 2. Check the working tree:\ngit status\n# Confirms working directory is clean and all 2,400 lines of code are fully restored!\n```\n\n**Step 6: Push to Remote to Prevent Future Local Panic:**\n```bash\ngit push -u origin feature/payments-recovered\n```\n\n---\n\n### 3. Summary Takeaway\n`git reflog` records every movement of HEAD—including resets, checkouts, rebase steps, and amends. As long as you don't run `git gc --prune=now`, you can recover from almost any local disaster in seconds.",
    "tagsJson": "[\"Git\",\"Disaster Recovery\",\"Reflog\",\"git reset --hard\",\"Orphaned Commits\",\"Incident\"]",
    "hints": [
      "Hint 1: Do NOT run 'git gc' or delete any folders.",
      "Hint 2: Run 'git reflog' to view the historical trajectory of HEAD.",
      "Hint 3: Identify the commit SHA where HEAD was located immediately before the 'reset: moving to HEAD~5' command.",
      "Hint 4: Run 'git checkout -b recovery-branch <commit-sha>' to anchor the orphaned commits to a new named branch."
    ],
    "tags": [
      "Git",
      "Disaster Recovery",
      "Reflog",
      "git reset --hard",
      "Orphaned Commits",
      "Incident"
    ]
  },
  {
    "id": "scen-11",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "title": "Scenario: Multi-Developer Merge Conflict Across Kubernetes Ingress & Deployment Manifests",
    "difficulty": "Intermediate",
    "prompt": "During a major release deployment, Squad Alpha (working on 'feature/auth-v2') and Squad Beta (working on 'feature/billing-v2') both modified 'k8s/ingress.yaml' and 'k8s/deployment.yaml' to register new service routes and increase replica counts. Squad Alpha merged into 'main' 2 hours ago. When Squad Beta attempts to merge their branch into 'main', Git halts with: 'CONFLICT (content): Merge conflict in k8s/ingress.yaml. Automatic merge failed; fix conflicts and then commit the result.' Both services are required for the production release in 30 minutes. How do you triage the conflict markers, resolve both routes without breaking YAML indentation, and verify Kubernetes syntax before completing the merge?",
    "explanation": "Merge conflicts occur when two branches modify the same lines of code concurrently. In Kubernetes manifests, indentation errors (e.g. 2 spaces vs 4 spaces or tabs) cause kubectl apply to fail in production.",
    "hintsJson": "[\"Hint 1: Use 'git status' to identify all files in 'both modified' state.\",\"Hint 2: Understand conflict markers: '<<<<<<< HEAD' (Squad Alpha's already-merged code) vs '>>>>>>> feature/billing-v2' (Squad Beta's incoming code).\",\"Hint 3: Merge both route paths under the 'rules.http.paths' array; do not discard either team's routing.\",\"Hint 4: Validate the resolved YAML with 'kubectl --dry-run=client' or a YAML validator before committing.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n### 1. Identify Conflicted Files\nRun `git status` to view the exact conflict footprint:\n```bash\ngit status\n# Output:\n# Unmerged paths:\n#   both modified:   k8s/deployment.yaml\n#   both modified:   k8s/ingress.yaml\n```\n\n---\n\n### 2. Inspect and Resolve k8s/ingress.yaml\nOpen `k8s/ingress.yaml` in your editor. Locate the conflict markers:\n```yaml\nspec:\n  rules:\n  - host: api.cloudmaster.io\n    http:\n      paths:\n<<<<<<< HEAD\n      # Squad Alpha's changes (already on main):\n      - path: /api/v2/auth\n        pathType: Prefix\n        backend:\n          service:\n            name: auth-service\n            port:\n              number: 8080\n=======\n      # Squad Beta's incoming changes:\n      - path: /api/v2/billing\n        pathType: Prefix\n        backend:\n          service:\n            name: billing-service\n            port:\n              number: 9090\n>>>>>>> feature/billing-v2\n```\n\n**Resolution:**\nBoth routes are required in production! Combine both path objects, remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), and ensure strict 2-space indentation:\n```yaml\nspec:\n  rules:\n  - host: api.cloudmaster.io\n    http:\n      paths:\n      - path: /api/v2/auth\n        pathType: Prefix\n        backend:\n          service:\n            name: auth-service\n            port:\n              number: 8080\n      - path: /api/v2/billing\n        pathType: Prefix\n        backend:\n          service:\n            name: billing-service\n            port:\n              number: 9090\n```\n\n---\n\n### 3. Inspect and Resolve k8s/deployment.yaml\nIn `k8s/deployment.yaml`, Squad Alpha set `replicas: 3` and Squad Beta set `replicas: 5`.\n- Consult with the Lead Architect: Given the billing service launch load, approve `replicas: 5`.\n- Remove conflict markers and set `replicas: 5`.\n\n---\n\n### 4. Syntax Validation Before Staging\nNever commit resolved Kubernetes manifests without client-side dry-run validation:\n```bash\nkubectl apply -f k8s/ingress.yaml --dry-run=client\nkubectl apply -f k8s/deployment.yaml --dry-run=client\n# Output: ingress.networking.k8s.io/api-ingress validated (dry run)\n```\n\n---\n\n### 5. Finalize the Merge\n```bash\n# Stage the resolved files:\ngit add k8s/ingress.yaml k8s/deployment.yaml\n\n# Check status:\ngit status\n# Output: All conflicts fixed, changes to be committed\n\n# Finalize the 3-way merge commit:\ngit commit -m \"merge: resolve routing conflicts between auth-v2 and billing-v2 in ingress and deployment\"\n\n# Push to origin:\ngit push origin main\n```",
    "tagsJson": "[\"Git\",\"Merge Conflict\",\"Kubernetes\",\"Ingress\",\"Production Incident\",\"DevOps\"]",
    "hints": [
      "Hint 1: Use 'git status' to identify all files in 'both modified' state.",
      "Hint 2: Understand conflict markers: '<<<<<<< HEAD' (Squad Alpha's already-merged code) vs '>>>>>>> feature/billing-v2' (Squad Beta's incoming code).",
      "Hint 3: Merge both route paths under the 'rules.http.paths' array; do not discard either team's routing.",
      "Hint 4: Validate the resolved YAML with 'kubectl --dry-run=client' or a YAML validator before committing."
    ],
    "tags": [
      "Git",
      "Merge Conflict",
      "Kubernetes",
      "Ingress",
      "Production Incident",
      "DevOps"
    ]
  },
  {
    "id": "scen-12",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "title": "Scenario: Automated Regression Root-Cause Analysis via 'git bisect run' During Outage",
    "difficulty": "Advanced",
    "prompt": "At 02:00 UTC, the monitoring dashboard triggers a P1 alert: the payment gateway service is rejecting 40% of checkout API requests with 'HTTP 502 Bad Gateway'. The night's release contains 380 merged commits from 18 engineers. The deployment cannot be completely rolled back because critical database migrations have already executed. An engineer quickly writes a shell script 'test_gateway.sh' that curls the local endpoint and returns exit code 0 when valid and exit code 1 when returning 502. You are tasked with leading the emergency triage: Walk through how you initialize and run 'git bisect run ./test_gateway.sh' to pinpoint the culprit commit in under 2 minutes, verify the code diff, and revert the broken commit safely in production.",
    "explanation": "During production outages where rollbacks are blocked by database migrations, isolating the exact broken commit and executing 'git revert <commit>' is the fastest, safest route to recovery.",
    "hintsJson": "[\"Hint 1: Verify the automated test script returns exit code 0 on good commit and non-zero on bad commit.\",\"Hint 2: Mark current HEAD as bad, and mark previous stable release tag (e.g. v3.1.0) as good.\",\"Hint 3: Run 'git bisect run ./test_gateway.sh'. Git will binary search and output the exact commit hash.\",\"Hint 4: Once identified, run 'git bisect reset', create a hotfix branch, and execute 'git revert <bad-sha> --no-edit'.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n### 1. Verify the Automated Test Assertion Script\nMake sure the test script is executable and returns proper standard POSIX exit codes:\n```bash\nchmod +x test_gateway.sh\n# Test against current broken state:\n./test_gateway.sh\necho $? # Returns: 1 (FAIL)\n```\n\n---\n\n### 2. Launch Automated Git Bisect\n```bash\n# 1. Initialize bisect engine:\ngit bisect start\n\n# 2. Mark current broken release as bad:\ngit bisect bad HEAD\n\n# 3. Mark last known working release as good:\ngit bisect good v3.1.0\n# Output: Bisecting: 190 revisions left to test after this (roughly 8 steps)\n\n# 4. Hand over control to automated test runner:\ngit bisect run ./test_gateway.sh\n```\n\n---\n\n### 3. Real-Time Bisect Execution Output\nGit runs binary search automatically in seconds:\n```\nrunning ./test_gateway.sh\nBisecting: 95 revisions left to test after this (roughly 7 steps)\n...\nrunning ./test_gateway.sh\nBisecting: 0 revisions left to test after this (roughly 0 steps)\n[3d2e1a9c8b7f6a5b] fix(gateway): reduce keep-alive socket timeout to 200ms\n3d2e1a9c8b7f6a5b is the first bad commit\ncommit 3d2e1a9c8b7f6a5b\nAuthor: backend-dev@company.com\nDate:   Wed Nov 4 01:15:22 2026\n    fix(gateway): reduce keep-alive socket timeout to 200ms\n```\n\n---\n\n### 4. Root-Cause Verification & Safe Production Revert\n1. **Reset Bisect Session:**\n   ```bash\n   git bisect reset\n   ```\n\n2. **Inspect the Offending Commit Diff:**\n   ```bash\n   git show 3d2e1a9c8b7f6a5b\n   ```\n   *Root Cause:* The socket keep-alive timeout was set too low (200ms), causing upstream ALB connections to prematurely sever!\n\n3. **Execute Safe Non-Destructive Revert:**\n   ```bash\n   # Create emergency hotfix branch from main:\n   git checkout -b hotfix/revert-gateway-timeout main\n\n   # Create an inverse commit that rolls back only the offending change:\n   git revert 3d2e1a9c8b7f6a5b -m 1 --no-edit\n\n   # Run test suite to verify fix:\n   ./test_gateway.sh\n   echo $? # Returns: 0 (PASS!)\n\n   # Push hotfix and fast-track PR merge:\n   git push origin hotfix/revert-gateway-timeout\n   ```\n4. **Deploy and Confirm Alert Resolution:**\n   The automated CI/CD pipeline deploys the revert commit. HTTP 502 errors drop to 0%, resolving the P1 outage.",
    "tagsJson": "[\"Git\",\"git bisect\",\"Outage\",\"Incident Response\",\"Automation\",\"git revert\"]",
    "hints": [
      "Hint 1: Verify the automated test script returns exit code 0 on good commit and non-zero on bad commit.",
      "Hint 2: Mark current HEAD as bad, and mark previous stable release tag (e.g. v3.1.0) as good.",
      "Hint 3: Run 'git bisect run ./test_gateway.sh'. Git will binary search and output the exact commit hash.",
      "Hint 4: Once identified, run 'git bisect reset', create a hotfix branch, and execute 'git revert <bad-sha> --no-edit'."
    ],
    "tags": [
      "Git",
      "git bisect",
      "Outage",
      "Incident Response",
      "Automation",
      "git revert"
    ]
  },
  {
    "id": "scen-13",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "title": "Scenario: GitHub Actions Matrix CI Failure — Debugging OS-Specific Environment Drift",
    "difficulty": "Intermediate",
    "prompt": "An automated GitHub Actions workflow runs a matrix test across [ubuntu-latest, macos-latest, windows-latest] on Node 20.x. On PR #184, the Ubuntu and macOS runner jobs pass with 100% green checkmarks, but the Windows runner consistently crashes with 'Error: ENOENT: no such file or directory, open C:\\Users\\runneradmin\\app\\tmp/logs/build.log'. A junior developer claims 'it works on my Mac' and requests bypassing CI to merge directly into main. As the DevOps Lead, how do you diagnose the OS path separator drift, fix the workflow, and enforce branch protection policies?",
    "explanation": "Cross-platform matrix testing surfaces OS environment drift such as hardcoded forward slashes ('/') vs backslashes ('\\\\') and case-sensitive vs case-insensitive filesystems.",
    "hintsJson": "[\"Hint 1: Notice the mixed path separator 'tmp/logs/build.log' on Windows.\",\"Hint 2: Refactor file path resolution in Node.js using 'path.join()' or 'path.resolve()' rather than string concatenation.\",\"Hint 3: Never disable branch protection status checks for cross-platform applications.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Root-Cause Analysis:**\n   - On Linux/macOS, paths use forward slashes (`/`).\n   - On Windows, the OS expects backslashes (`\\`) or normalized path objects.\n   - Hardcoding `tmp/logs/build.log` caused Windows system calls to fail with `ENOENT`.\n\n2. **Code Resolution (Node.js Path Normalization):**\n   - Refactor the logger utility to use Node.js standard `path` module:\n     ```javascript\n     const path = require('path');\n     // BAD: const logPath = `${tmpDir}/logs/build.log`;\n     // GOOD: Cross-platform normalized path:\n     const logPath = path.join(tmpDir, 'logs', 'build.log');\n     ```\n\n3. **Verify Matrix Run in GitHub Actions:**\n   - Commit and push to PR branch:\n     ```bash\n     git add src/utils/logger.js\n     git commit -m \"fix(logger): use path.join for cross-platform OS matrix compatibility\"\n     git push origin feature/logger-upgrade\n     ```\n   - All 3 runner matrix jobs (Ubuntu, macOS, Windows) now pass with exit code 0.\n\n4. **Enforce Branch Protection Governance:**\n   - Under GitHub Settings -> Branches -> `main` protection rule:\n     - Check: *Require status checks to pass before merging*\n     - Select: `Test on Node 20.x - windows-latest`, `ubuntu-latest`, `macos-latest`\n     - Check: *Require branches to be up to date before merging*\n   - This permanently prevents developers from merging code that breaks on customer Windows servers.",
    "tagsJson": "[\"GitHub Actions\",\"CI/CD\",\"Matrix Testing\",\"Windows\",\"Branch Protection\",\"DevOps\"]",
    "hints": [
      "Hint 1: Notice the mixed path separator 'tmp/logs/build.log' on Windows.",
      "Hint 2: Refactor file path resolution in Node.js using 'path.join()' or 'path.resolve()' rather than string concatenation.",
      "Hint 3: Never disable branch protection status checks for cross-platform applications."
    ],
    "tags": [
      "GitHub Actions",
      "CI/CD",
      "Matrix Testing",
      "Windows",
      "Branch Protection",
      "DevOps"
    ]
  },
  {
    "id": "scen-14",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "title": "Scenario: Leaked Cloud API Key in GitHub Actions Runner Logs — Masking & Secret Rotation",
    "difficulty": "Advanced",
    "prompt": "During a routine CI/CD pipeline run on PR #92, an engineer added a debugging step 'run: env' in their workflow YAML to inspect environment variables. The raw runner execution log printed 'AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY' in plain text. The repository is accessible to 60 organization members. How do you respond to this active secret leakage in CI/CD runner logs, purge the build logs, rotate the AWS credential, and configure secret masking?",
    "explanation": "Printing environment variables in CI/CD runner logs exposes production secrets to anyone with repository read access. GitHub automatically masks secrets defined in Repository Secrets, but raw unmasked environment variables bypass filters unless properly injected.",
    "hintsJson": "[\"Hint 1: Treat the exposed AWS credential as fully compromised immediately and rotate it in AWS IAM.\",\"Hint 2: Delete the GitHub Actions workflow run log immediately using GitHub API or web UI.\",\"Hint 3: Configure '::add-mask::' in runner steps or use GitHub Repository Secrets which are masked automatically.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Immediate Credential Invalidation (AWS Level - T+0 to T+5 mins):**\n   ```bash\n   # Deactivate the exposed IAM key:\n   aws iam update-access-key --access-key-id AKIAIOSFODNN7EXAMPLE --status Inactive --user-name deploy-bot\n   # Generate fresh rotated credential:\n   aws iam create-access-key --user-name deploy-bot\n   ```\n\n2. **Purge Compromised Workflow Run Logs (GitHub Level):**\n   - In GitHub web UI: Actions -> Select the compromised workflow run -> Click the three dots (...) -> **Delete run logs**.\n   - Or using GitHub CLI:\n     ```bash\n     gh run delete <run-id>\n     ```\n\n3. **Store New Secret in Encrypted Repository Secrets:**\n   ```bash\n   gh secret set AWS_SECRET_ACCESS_KEY --body \"new_generated_secret_key\"\n   ```\n   - When configured in Repository Secrets, GitHub's runner automatically replaces any occurrence of the secret in logs with `***`.\n\n4. **Sanitize Workflow YAML:**\n   - Remove the unsafe debugging command (`env` or `echo $SECRET`).\n   - If dynamic masking is ever required in bash scripts, use GitHub Actions workflow commands:\n     ```bash\n     echo \"::add-mask::$DYNAMIC_API_TOKEN\"\n     ```\n\n5. **Audit CloudTrail for Unauthorized API Usage:**\n   - Run an Athena or CloudTrail Lake query to confirm no unauthorized IAM or compute actions were invoked during the window of exposure.",
    "tagsJson": "[\"GitHub Actions\",\"Security\",\"Secrets Masking\",\"AWS IAM\",\"Incident Response\",\"Auditing\"]",
    "hints": [
      "Hint 1: Treat the exposed AWS credential as fully compromised immediately and rotate it in AWS IAM.",
      "Hint 2: Delete the GitHub Actions workflow run log immediately using GitHub API or web UI.",
      "Hint 3: Configure '::add-mask::' in runner steps or use GitHub Repository Secrets which are masked automatically."
    ],
    "tags": [
      "GitHub Actions",
      "Security",
      "Secrets Masking",
      "AWS IAM",
      "Incident Response",
      "Auditing"
    ]
  },
  {
    "id": "scen-15",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "title": "Scenario: Jenkins Pipeline Build Failure – Agent Workspace Disk 100% Full",
    "difficulty": "Intermediate",
    "prompt": "Your Jenkins CI/CD server suddenly stops completing builds. All queued pipeline jobs stay in 'Pending – Waiting for next available executor on docker-agent-01', and active jobs fail with 'java.io.IOException: No space left on device'. Developers cannot deploy code. How do you triage this disk pressure, identify what consumed the disk, recover the build agents, and automate long-term cleanup guardrails?",
    "explanation": "CI/CD build nodes execute repeated container builds, downloading node_modules, Docker base images, and compilation caches. Without automated pruning, disk utilization reaches 100%, causing the JVM to halt.",
    "hintsJson": "[\"Hint 1: Check filesystem space using 'df -h' and 'du -sh *' on the agent node.\",\"Hint 2: Check Docker dangling images and stopped containers using 'docker system df'.\",\"Hint 3: Inspect the Jenkins workspace directory (/var/jenkins_home/workspace).\",\"Hint 4: Add a post-build workspace cleanup step in your Jenkinsfile.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **SSH into the Affected Jenkins Agent Node:**\n   - Check available disk space: `df -h`\n   - Confirm which partition is at 100% (typically `/var/lib/docker` or `/var/jenkins_home`).\n\n2. **Prune Stale Docker Assets:**\n   - Inspect Docker storage consumption: `docker system df`\n   - Safely remove unused containers, networks, dangling images, and build caches:\n     `docker system prune -af --volumes`\n   - This typically frees 30GB to 80GB of orphaned build cache in seconds.\n\n3. **Purge Old Jenkins Workspaces:**\n   - Navigate to workspace directory: `cd /var/jenkins_home/workspace`\n   - Find orphaned workspaces of deleted jobs: `du -sh * | sort -hr | head -n 10`\n   - Remove stale workspaces safely.\n\n4. **Restart the Jenkins Agent Service:**\n   - Verify that disk usage is now below 40%.\n   - In Jenkins UI: Nodes -> 'docker-agent-01' -> Click 'Launch Agent' or 'Bring online'.\n\n5. **Implement Permanent Automated Guardrails:**\n   - **Pipeline Post Step:** Add `cleanWs()` in the `post { always { cleanWs() } }` block of every Jenkinsfile so workspaces are deleted immediately upon job completion.\n   - **Cron Prune Job:** Configure a recurring Jenkins cron maintenance job running nightly:\n     `docker system prune -af --filter \"until=48h\"`\n   - **CloudWatch / Prometheus Disk Alert:** Set up an alert when root disk exceeds 80% capacity.",
    "tagsJson": "[\"Jenkins\",\"CI/CD\",\"Docker Prune\",\"Disk Space\",\"Troubleshooting\"]",
    "hints": [
      "Hint 1: Check filesystem space using 'df -h' and 'du -sh *' on the agent node.",
      "Hint 2: Check Docker dangling images and stopped containers using 'docker system df'.",
      "Hint 3: Inspect the Jenkins workspace directory (/var/jenkins_home/workspace).",
      "Hint 4: Add a post-build workspace cleanup step in your Jenkinsfile."
    ],
    "tags": [
      "Jenkins",
      "CI/CD",
      "Docker Prune",
      "Disk Space",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-16",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "title": "Scenario: Docker Container Crashes with Exit Code 137 (OOMKilled)",
    "difficulty": "Intermediate",
    "prompt": "A microservice deployed inside a Docker container runs smoothly during low-traffic hours. However, when user traffic increases during lunch hours, the container suddenly crashes, and 'docker ps -a' displays 'Exited (137) 2 minutes ago'. The application logs end abruptly without a stack trace or exception. What does exit code 137 mean, and how do you diagnose and resolve this issue?",
    "explanation": "Exit code 137 = 128 + 9 (SIGKILL). This indicates that the Linux kernel Out-Of-Memory (OOM) Killer terminated the container's main process because it exceeded its allocated cgroup memory limit.",
    "hintsJson": "[\"Hint 1: Calculate exit code 137: 128 + Signal 9 (SIGKILL). The OS sent a non-catchable kill signal.\",\"Hint 2: Inspect container events with 'docker inspect <container>' and look for 'OOMKilled: true'.\",\"Hint 3: Review kernel ring buffer logs with 'dmesg -T' to see the exact kernel OOM invocation.\",\"Hint 4: Review container memory limit configurations (--memory or compose mem_limit) vs application heap limits.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Confirm the Kernel OOM-Killer Trigger:**\n   - Run: `docker inspect <container-name> --format '{{json .State}}'`\n   - Check the JSON output: look for `\"OOMKilled\": true` and `\"ExitCode\": 137`.\n   - Run `dmesg -T | grep -i oom` on the host machine to see the kernel log: `Memory cgroup out of memory: Killed process 4182 (node)`.\n\n2. **Analyze Application Memory Consumption:**\n   - Run container with live stats: `docker stats <container-name>`\n   - Observe whether memory ramps up continuously (memory leak) or spikes during large payload parsing (e.g. processing large JSON arrays or file uploads in memory).\n\n3. **Tune Docker Memory Limits:**\n   - If the container had an artificially low limit (e.g., `--memory=\"256m\"` for a Node.js or Java service), increase the threshold:\n     `--memory=\"1024m\" --memory-swap=\"2048m\"`\n   - In docker-compose.yml:\n     ```yaml\n     deploy:\n       resources:\n         limits:\n           memory: 1G\n     ```\n\n4. **Tune Runtime Heap Configuration:**\n   - For Node.js applications, configure V8 maximum old space:\n     `NODE_OPTIONS=\"--max-old-space-size=768\" npm start`\n   - For Java applications, set explicit JVM flags:\n     `-XX:MaxRAMPercentage=75.0 -Xmx768m`\n   - Ensuring the runtime heap is bounded below the container's cgroup memory limit allows the runtime garbage collector to trigger before the Linux kernel kills the container.\n\n5. **Profile and Fix Code Memory Leaks:**\n   - Check for unclosed database connection pools, un-evicted global cache maps, or missing stream piping during file uploads.",
    "tagsJson": "[\"Docker\",\"OOMKilled\",\"Exit Code 137\",\"Cgroups\",\"Memory Tuning\"]",
    "hints": [
      "Hint 1: Calculate exit code 137: 128 + Signal 9 (SIGKILL). The OS sent a non-catchable kill signal.",
      "Hint 2: Inspect container events with 'docker inspect <container>' and look for 'OOMKilled: true'.",
      "Hint 3: Review kernel ring buffer logs with 'dmesg -T' to see the exact kernel OOM invocation.",
      "Hint 4: Review container memory limit configurations (--memory or compose mem_limit) vs application heap limits."
    ],
    "tags": [
      "Docker",
      "OOMKilled",
      "Exit Code 137",
      "Cgroups",
      "Memory Tuning"
    ]
  },
  {
    "id": "scen-17",
    "moduleNumber": 19,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "topicNumber": 2,
    "title": "Scenario: Kubernetes Pod in CrashLoopBackOff & Missing ConfigMap",
    "difficulty": "Advanced",
    "prompt": "You applied an updated Kubernetes Deployment for your order-processing service. When checking pod status with 'kubectl get pods', you notice the pods have STATUS 'CrashLoopBackOff' with RESTARTS count rapidly increasing (4, 5, 6...). The application is down in production. How do you systematically inspect the pod, identify the root cause, and restore the service?",
    "explanation": "CrashLoopBackOff means the container started, crashed or terminated with a non-zero exit code, and Kubernetes is waiting exponentially longer (10s, 20s, 40s... up to 5m) before attempting to restart it.",
    "hintsJson": "[\"Hint 1: Use 'kubectl describe pod <name>' to inspect the Events table at the bottom.\",\"Hint 2: Use 'kubectl logs <name> --previous' to inspect why the previous crashed container exited.\",\"Hint 3: Check for missing environment variables, missing ConfigMaps, or invalid DB connection strings.\",\"Hint 4: If needed, perform an instant rollback using 'kubectl rollout undo deployment/<name>'.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Immediate Emergency Action (Roll Back First If Production Outage):**\n   - If user-facing production is down:\n     `kubectl rollout undo deployment/order-service`\n   - This immediately restores the previous healthy replica set while you debug the failure in staging.\n\n2. **Inspect the Crash Events:**\n   - Run: `kubectl describe pod order-service-7945d8b8-x2qp`\n   - Inspect the 'Events' section: Look for warnings like:\n     - `Warning FailedMount: configmap \"order-service-config\" not found`\n     - `Warning BackOff: Back-off restarting failed container`\n\n3. **Check Container Logs (Including Previous Crashed Instance):**\n   - Run: `kubectl logs order-service-7945d8b8-x2qp --previous`\n   - Notice the fatal error: `Error: Cannot find module or missing ENV DB_PASSWORD. Exiting with code 1`.\n\n4. **Verify ConfigMaps and Secrets:**\n   - Run: `kubectl get configmap,secret`\n   - Check if the deployment manifest references a ConfigMap or Secret name that was misspelled (e.g. `order-config` instead of `order-service-config`) or exists in a different namespace.\n\n5. **Apply the Missing Config and Redeploy:**\n   - Create or update the required ConfigMap:\n     `kubectl apply -f order-configmap.yaml`\n   - Reapply the corrected Deployment manifest:\n     `kubectl apply -f order-deployment.yaml`\n   - Monitor rollout until all 3 replicas report 1/1 Running:\n     `kubectl rollout status deployment/order-service`.",
    "tagsJson": "[\"Kubernetes\",\"CrashLoopBackOff\",\"Troubleshooting\",\"ConfigMap\",\"kubectl\"]",
    "hints": [
      "Hint 1: Use 'kubectl describe pod <name>' to inspect the Events table at the bottom.",
      "Hint 2: Use 'kubectl logs <name> --previous' to inspect why the previous crashed container exited.",
      "Hint 3: Check for missing environment variables, missing ConfigMaps, or invalid DB connection strings.",
      "Hint 4: If needed, perform an instant rollback using 'kubectl rollout undo deployment/<name>'."
    ],
    "tags": [
      "Kubernetes",
      "CrashLoopBackOff",
      "Troubleshooting",
      "ConfigMap",
      "kubectl"
    ]
  },
  {
    "id": "scen-18",
    "moduleNumber": 20,
    "title": "Scenario: CI/CD Pipeline Fails with '403 Forbidden: Denied ECR Push'",
    "difficulty": "Advanced",
    "prompt": "Your automated Jenkins/GitHub Actions pipeline successfully compiles and tests your application, builds a Docker image, and passes Trivy vulnerability scans. However, on the final push step: 'docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/api:v2.1.0', the command fails with 'denied: Your authorization token has expired or request is forbidden (HTTP 403)'. Deployments are stalled. How do you resolve this authentication and permission issue?",
    "explanation": "Amazon ECR authentication tokens generated by 'aws ecr get-login-password' are valid for exactly 12 hours. Furthermore, the calling IAM principal must possess the necessary ECR write and layer upload permissions.",
    "hintsJson": "[\"Hint 1: Check token expiration. AWS ECR STS login tokens expire after 12 hours.\",\"Hint 2: Verify the calling IAM Role/User permissions on the ECR repository.\",\"Hint 3: Required actions: ecr:GetAuthorizationToken, ecr:BatchCheckLayerAvailability, ecr:PutImage, ecr:InitiateLayerUpload, ecr:UploadLayerPart, ecr:CompleteLayerUpload.\",\"Hint 4: Verify whether the ECR repository 'api' actually exists in that AWS Region.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Authenticate in the CI Pipeline Script Directly Before Pushing:**\n   - ECR tokens expire after 12 hours. Never reuse static docker login sessions across CI builds.\n   - Add dynamic re-authentication in the pipeline step:\n     `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com`\n\n2. **Verify the Target ECR Repository Exists:**\n   - Run: `aws ecr describe-repositories --repository-names api --region us-east-1`\n   - If it does not exist, create it:\n     `aws ecr create-repository --repository-name api --image-scanning-configuration scanOnPush=true`\n\n3. **Inspect IAM Permissions on the CI Runner Role:**\n   - Verify the IAM Role attached to the runner has the AWS-managed policy `AmazonEC2ContainerRegistryPowerUser` or custom least-privilege policy:\n     ```json\n     {\n       \"Version\": \"2012-10-17\",\n       \"Statement\": [\n         {\n           \"Effect\": \"Allow\",\n           \"Action\": \"ecr:GetAuthorizationToken\",\n           \"Resource\": \"*\"\n         },\n         {\n           \"Effect\": \"Allow\",\n           \"Action\": [\n             \"ecr:BatchCheckLayerAvailability\",\n             \"ecr:GetDownloadUrlForLayer\",\n             \"ecr:PutImage\",\n             \"ecr:InitiateLayerUpload\",\n             \"ecr:UploadLayerPart\",\n             \"ecr:CompleteLayerUpload\"\n           ],\n           \"Resource\": \"arn:aws:ecr:us-east-1:123456789012:repository/api\"\n         }\n       ]\n     }\n     ```\n\n4. **Test and Verify Push:**\n   - Rerun the CI/CD pipeline.\n   - Confirm image digest sha256 is recorded in Amazon ECR console.",
    "tagsJson": "[\"CI/CD\",\"AWS ECR\",\"Docker Push\",\"IAM Permissions\",\"DevOps\"]",
    "hints": [
      "Hint 1: Check token expiration. AWS ECR STS login tokens expire after 12 hours.",
      "Hint 2: Verify the calling IAM Role/User permissions on the ECR repository.",
      "Hint 3: Required actions: ecr:GetAuthorizationToken, ecr:BatchCheckLayerAvailability, ecr:PutImage, ecr:InitiateLayerUpload, ecr:UploadLayerPart, ecr:CompleteLayerUpload.",
      "Hint 4: Verify whether the ECR repository 'api' actually exists in that AWS Region."
    ],
    "tags": [
      "CI/CD",
      "AWS ECR",
      "Docker Push",
      "IAM Permissions",
      "DevOps"
    ]
  },
  {
    "id": "scen-19",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "topicNumber": 2,
    "title": "Scenario: Git 'Detached HEAD' & Unreachable Commits During Emergency Hotfix",
    "difficulty": "Intermediate",
    "prompt": "During a critical production outage, an engineer checked out a specific historical release tag using 'git checkout v2.3.1', applied an emergency security fix, and created two commits. When attempting to push using 'git push origin main', Git outputs 'Everything up-to-date', and the engineer discovers that their commits do not appear on any branch. How do you recover these orphaned commits and merge them safely without losing work?",
    "explanation": "Checking out a tag or commit SHA puts Git in a 'Detached HEAD' state where HEAD points directly to a commit object rather than a named branch reference. Any new commits created in this state are orphaned and will eventually be garbage collected.",
    "hintsJson": "[\"Hint 1: Check where HEAD currently points using 'git status' or 'git branch'.\",\"Hint 2: Find the commit hashes of the work using 'git log -n 5' or 'git reflog'.\",\"Hint 3: Create a named branch pointing to the current detached HEAD commit.\",\"Hint 4: Rebase or cherry-pick those commits onto the target release or main branch.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Verify Detached HEAD State:**\n   - Run: `git status`\n   - Notice: `HEAD detached at v2.3.1`. Your commits exist in the object database but have no branch pointing to them.\n\n2. **Immediately Create a Recovery Branch from the Current HEAD:**\n   - Do NOT switch branches yet, or the commits will become unreferenced!\n   - Run: `git branch emergency-hotfix-recovery`\n   - This binds a permanent named branch reference to the latest commit.\n\n3. **Verify the Commits Exist on the Recovery Branch:**\n   - Run: `git log --oneline -n 5 emergency-hotfix-recovery`\n   - Confirm both hotfix commits appear in the history graph.\n\n4. **Integrate into Target Branch (main or release-v2.3):**\n   - Switch to the target branch: `git switch main` (or `git checkout main`)\n   - Fetch latest remote changes: `git pull origin main --rebase`\n   - Cherry-pick the recovery commits:\n     `git cherry-pick v2.3.1..emergency-hotfix-recovery`\n   - Run tests to confirm zero regressions: `npm test`\n   - Push to remote: `git push origin main`\n\n5. **Clean up Temporary Recovery Branch:**\n   - `git branch -d emergency-hotfix-recovery`",
    "tagsJson": "[\"Git\",\"Detached HEAD\",\"Disaster Recovery\",\"Branching\",\"Troubleshooting\"]",
    "hints": [
      "Hint 1: Check where HEAD currently points using 'git status' or 'git branch'.",
      "Hint 2: Find the commit hashes of the work using 'git log -n 5' or 'git reflog'.",
      "Hint 3: Create a named branch pointing to the current detached HEAD commit.",
      "Hint 4: Rebase or cherry-pick those commits onto the target release or main branch."
    ],
    "tags": [
      "Git",
      "Detached HEAD",
      "Disaster Recovery",
      "Branching",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-20",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "topicNumber": 2,
    "title": "Scenario: Resolving Complex 3-Way Git Merge Conflict During Release Rebase",
    "difficulty": "Advanced",
    "prompt": "A developer has been working on a long-lived feature branch for 3 weeks. When rebasing onto upstream main ('git rebase origin/main'), Git halts on commit 3 of 12 with: 'CONFLICT (content): Merge conflict in config/database.js. Failed to merge in the changes'. Both teams made incompatible architectural changes to database pooling logic. How should the team systematically resolve this conflict without corrupting history or introducing syntax bugs?",
    "explanation": "Interactive rebasing replays commits one-by-one on top of the target branch. A merge conflict pauses execution at the exact commit where changes overlap, requiring resolution of conflict markers before continuing.",
    "hintsJson": "[\"Hint 1: Inspect which files are conflicted using 'git status'.\",\"Hint 2: Understand conflict markers: <<<<<<< HEAD (the upstream target) vs >>>>>>> (the incoming feature commit).\",\"Hint 3: Use a 3-way visual merge tool like 'git mergetool' or VS Code diff editor.\",\"Hint 4: After editing, stage the resolved files with 'git add' and run 'git rebase --continue'. Never run git commit during rebase!\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Inspect Conflict State:**\n   - Run: `git status`\n   - Identify files listed under `both modified:` (e.g. `config/database.js`).\n\n2. **Understand the Conflict Markers:**\n   - Open `config/database.js`.\n   - `<<<<<<< HEAD` represents the state of the branch you are rebasing ONTO (the upstream main code).\n   - `=======` is the dividing baseline.\n   - `>>>>>>> [commit SHA]` represents the changes from your feature branch being applied.\n\n3. **Resolve the Conflict Logic:**\n   - Coordinate with the upstream author if necessary.\n   - Combine the connection pool configuration while preserving the new security parameters.\n   - Completely delete the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).\n\n4. **Stage the Resolved File:**\n   - Run: `git add config/database.js`\n   - Verify all conflicts are staged: `git status`\n\n5. **Continue the Rebase Sequence:**\n   - Execute: `git rebase --continue`\n   - **CRITICAL:** Do NOT run `git commit`, as rebase handles committing automatically.\n   - If subsequent commits have conflicts, repeat steps 1-4.\n   - If the rebase gets completely mangled and you wish to abort safely:\n     `git rebase --abort`\n\n6. **Validate & Push:**\n   - Run full unit and integration test suite: `npm test`\n   - Push to feature branch with lease protection: `git push --force-with-lease origin feature-branch`",
    "tagsJson": "[\"Git\",\"Merge Conflicts\",\"Git Rebase\",\"DevOps\",\"Version Control\"]",
    "hints": [
      "Hint 1: Inspect which files are conflicted using 'git status'.",
      "Hint 2: Understand conflict markers: <<<<<<< HEAD (the upstream target) vs >>>>>>> (the incoming feature commit).",
      "Hint 3: Use a 3-way visual merge tool like 'git mergetool' or VS Code diff editor.",
      "Hint 4: After editing, stage the resolved files with 'git add' and run 'git rebase --continue'. Never run git commit during rebase!"
    ],
    "tags": [
      "Git",
      "Merge Conflicts",
      "Git Rebase",
      "DevOps",
      "Version Control"
    ]
  },
  {
    "id": "scen-21",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "title": "Scenario: Jenkins Pipeline Build Hanging Indefinitely Waiting for Node Agent",
    "difficulty": "Intermediate",
    "prompt": "An automated Jenkins build is triggered upon a GitHub PR merge. However, the pipeline console shows: 'Still waiting to schedule task: All nodes of label 'docker-node-aws' are offline or busy'. The build sits queued for 45 minutes, blocking all subsequent pull requests. How would you systematically diagnose and restore the Jenkins worker agent fleet?",
    "explanation": "Jenkins controllers schedule pipeline stages onto agents matching node labels. If labeled agents are disconnected, lack available executors, or fail cloud auto-provisioning, tasks stay queued indefinitely in the build queue.",
    "hintsJson": "[\"Hint 1: Check the Jenkins Nodes page (Manage Jenkins -> Nodes) to see agent status.\",\"Hint 2: Verify SSH connectivity or JNLP port 50000 communication between controller and agent.\",\"Hint 3: Check agent disk space. Jenkins automatically takes agents offline if free disk falls below threshold (1GB).\",\"Hint 4: Verify whether the agent process/daemon or Docker container crashed on the worker machine.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Check Node Status in Jenkins Web UI:**\n   - Navigate to **Manage Jenkins -> Nodes**.\n   - Check the node labeled `docker-node-aws`. Look for red 'X' or suspended icons.\n\n2. **Inspect Agent Connection Logs:**\n   - Click on the node -> **Log**.\n   - Common culprits:\n     - **Disk Space Out of Bounds:** `Disk space is below threshold of 1.0 GiB. Putting node offline.`\n     - **SSH Authentication Failure:** Key pair rotated or expired credentials.\n     - **JNLP Port Blocked:** Firewall closed TCP port 50000 between agent and master.\n\n3. **Reclaim Disk Space on Agent Node (via SSH):**\n   - Connect to the agent: `ssh ubuntu@<agent-ip>`\n   - Check disk: `df -h`\n   - Reclaim Docker build cache:\n     `docker system prune -a --volumes -f`\n   - Clear old Jenkins workspace remnants:\n     `rm -rf /var/lib/jenkins/workspace/*`\n\n4. **Verify Docker Daemon & Java Version:**\n   - Confirm Docker service is active: `sudo systemctl status docker`\n   - Verify matching OpenJDK version: `java -version` (must match Jenkins controller JDK major release).\n\n5. **Bring Node Online & Configure Quota:**\n   - In Jenkins UI, click **Bring this node back online**.\n   - Verify executors count is set appropriately (e.g. 2-4 executors per 4 vCPUs).\n   - The queued pipeline build will immediately be picked up and begin executing.",
    "tagsJson": "[\"Jenkins\",\"CI/CD\",\"Worker Agents\",\"Disk Space\",\"Troubleshooting\"]",
    "hints": [
      "Hint 1: Check the Jenkins Nodes page (Manage Jenkins -> Nodes) to see agent status.",
      "Hint 2: Verify SSH connectivity or JNLP port 50000 communication between controller and agent.",
      "Hint 3: Check agent disk space. Jenkins automatically takes agents offline if free disk falls below threshold (1GB).",
      "Hint 4: Verify whether the agent process/daemon or Docker container crashed on the worker machine."
    ],
    "tags": [
      "Jenkins",
      "CI/CD",
      "Worker Agents",
      "Disk Space",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-22",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "title": "Scenario: GitHub Webhook 403 Forbidden with HMAC-SHA256 Secret Mismatch",
    "difficulty": "Advanced",
    "prompt": "Your team configured a GitHub repository webhook to trigger a Jenkins multibranch pipeline on git push events. However, developers report that pushing commits does not trigger any builds. Inspecting the GitHub Webhook 'Recent Deliveries' tab reveals HTTP 403 Forbidden responses with body: 'Invalid signature'. How do you diagnose and fix this webhook payload authentication error?",
    "explanation": "GitHub signs webhook payloads using an HMAC-SHA256 hex digest using a shared secret. The receiving Jenkins GitHub plugin computes the hash on the raw payload body. If the secret differs or reverse proxies alter the payload, verification fails with HTTP 403.",
    "hintsJson": "[\"Hint 1: Inspect the X-Hub-Signature-256 header in GitHub delivery payload.\",\"Hint 2: Check Jenkins system configuration for the GitHub Plugin Shared Secret.\",\"Hint 3: Ensure Nginx / reverse proxy does not buffer or strip request headers.\",\"Hint 4: Verify Jenkins CSRF Crumb Issuer settings.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Inspect GitHub Delivery Headers & Response:**\n   - In GitHub -> **Settings -> Webhooks -> [Select Webhook] -> Recent Deliveries**.\n   - Expand the failed delivery: Look at Request Headers:\n     `X-Hub-Signature-256: sha256=d3b07384d113edec49eaa6238ad5ff00...`\n   - Response status: `403 Forbidden`.\n\n2. **Verify Shared Secret Consistency:**\n   - In Jenkins, navigate to **Manage Jenkins -> System -> GitHub -> GitHub Servers**.\n   - Click **Advanced** under GitHub Hook.\n   - Ensure the **Shared Secret** matches the exact secret configured in the GitHub repository Webhook settings character-for-character.\n   - If unsure, regenerate a fresh random 32-character secret:\n     `openssl rand -hex 20`\n   - Update both GitHub Webhook Secret and Jenkins GitHub plugin simultaneously.\n\n3. **Inspect Reverse Proxy (Nginx / ALB) Configuration:**\n   - If Jenkins sits behind Nginx, verify that Nginx passes raw headers without dropping or modifying:\n     ```nginx\n     location /github-webhook/ {\n         proxy_pass http://127.0.0.1:8080/github-webhook/;\n         proxy_set_header Host $http_host;\n         proxy_set_header X-Real-IP $remote_addr;\n         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n         proxy_set_header X-Forwarded-Proto $scheme;\n         proxy_set_header X-Hub-Signature-256 $http_x_hub_signature_256;\n     }\n     ```\n\n4. **Redeliver Test Payload:**\n   - In GitHub Webhook console, click **Redeliver**.\n   - Confirm status changes to **HTTP 200 OK**, and verify Jenkins triggers the pipeline run.",
    "tagsJson": "[\"Jenkins\",\"GitHub Webhook\",\"DevOps\",\"HMAC\",\"Security\"]",
    "hints": [
      "Hint 1: Inspect the X-Hub-Signature-256 header in GitHub delivery payload.",
      "Hint 2: Check Jenkins system configuration for the GitHub Plugin Shared Secret.",
      "Hint 3: Ensure Nginx / reverse proxy does not buffer or strip request headers.",
      "Hint 4: Verify Jenkins CSRF Crumb Issuer settings."
    ],
    "tags": [
      "Jenkins",
      "GitHub Webhook",
      "DevOps",
      "HMAC",
      "Security"
    ]
  },
  {
    "id": "scen-23",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "title": "Scenario: Jenkins Service Fails to Start After Server Reboot — Systemd Unit Configuration, Daemon Reload & Port 8080 Conflict",
    "difficulty": "Intermediate",
    "prompt": "Following a planned Linux kernel upgrade on a RHEL/CentOS server, Jenkins fails to come back online. Running 'systemctl status jenkins' reports: 'failed (Result: exit-code)'. Further inspection shows port 8080 was grabbed by a rogue Tomcat process, and someone modified '/usr/lib/systemd/system/jenkins.service' without executing 'systemctl daemon-reload'. How do you resolve the port collision, reload systemd, and ensure Jenkins starts automatically on boot?",
    "explanation": "Jenkins requires exclusive access to its configured HTTP port (default 8080) and a valid systemd unit definition. Systemd caches unit files in memory, so edits require daemon-reload before starting.",
    "hintsJson": "[\"Hint 1: Check systemd status and journalctl logs: 'journalctl -xeu jenkins'.\",\"Hint 2: Find which process is listening on port 8080 using 'sudo lsof -i :8080' or 'sudo ss -tulpn | grep 8080'.\",\"Hint 3: Reload systemd configuration with 'sudo systemctl daemon-reload'.\",\"Hint 4: Ensure auto-restart on boot with 'sudo systemctl enable jenkins'.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Inspect Systemd Failure Logs:**\n   - Execute: `sudo systemctl status jenkins`\n   - Read system journal: `sudo journalctl -xeu jenkins -n 50`\n   - Look for JVM bind exceptions: `java.io.IOException: Failed to bind to 0.0.0.0/0.0.0.0:8080: Address already in use`.\n\n2. **Identify and Terminate Port Collisions:**\n   - Check what process occupies port 8080:\n     `sudo lsof -i :8080` or `sudo ss -tulpn | grep 8080`\n   - If a rogue or duplicate process is running:\n     `sudo kill -9 <PID>`\n   - Alternatively, reconfigure Jenkins to run on a dedicated port (e.g. 8088):\n     Edit `/etc/systemd/system/jenkins.service.d/override.conf`:\n     ```ini\n     [Service]\n     Environment=\"JENKINS_PORT=8088\"\n     ```\n\n3. **Reload Systemd Daemon:**\n   - Whenever service unit files or overrides change:\n     `sudo systemctl daemon-reload`\n\n4. **Start and Enable Service:**\n   - Start Jenkins: `sudo systemctl start jenkins`\n   - Enable auto-start across reboots: `sudo systemctl enable jenkins`\n\n5. **Verify Service Health & Process:**\n   - Verify active status: `sudo systemctl is-active jenkins` -> `active`\n   - Verify port binding: `sudo ss -tulpn | grep 8088`\n   - Open `http://<server-ip>:8088` in browser to verify UI response.",
    "tagsJson": "[\"Jenkins\",\"Systemd\",\"Linux\",\"RHEL\",\"Port Conflict\",\"Troubleshooting\"]",
    "hints": [
      "Hint 1: Check systemd status and journalctl logs: 'journalctl -xeu jenkins'.",
      "Hint 2: Find which process is listening on port 8080 using 'sudo lsof -i :8080' or 'sudo ss -tulpn | grep 8080'.",
      "Hint 3: Reload systemd configuration with 'sudo systemctl daemon-reload'.",
      "Hint 4: Ensure auto-restart on boot with 'sudo systemctl enable jenkins'."
    ],
    "tags": [
      "Jenkins",
      "Systemd",
      "Linux",
      "RHEL",
      "Port Conflict",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-24",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "title": "Scenario: Overly Permissive 'Logged-in Users Can Do Anything' Security Hole — Locking Down with Role Strategy Plugin (QA Read-Only)",
    "difficulty": "Intermediate",
    "prompt": "A junior QA engineer accidentally clicked 'Configure' on the core payment service build job and deleted the deployment step, breaking staging releases. The Jenkins administrator discovers that 'Logged-in users can do anything' was selected under Configure Global Security. How do you implement the Role Strategy plugin to restrict QA engineers to Job/Read and Job/Build while preventing any configuration or credential tampering?",
    "explanation": "'Logged-in users can do anything' grants full administrative control to any authenticated user. The Role Strategy plugin provides granular Role-Based Access Control (RBAC) to enforce least-privilege policies.",
    "hintsJson": "[\"Hint 1: Install the 'Role-based Authorization Strategy' plugin via Manage Plugins.\",\"Hint 2: Navigate to Manage Jenkins -> Configure Global Security and select 'Role-Based Strategy'.\",\"Hint 3: In Manage and Assign Roles, create a Global Role for Admin and Project Roles for QA and Dev.\",\"Hint 4: Ensure the admin role has Administer permission before saving to prevent lock-out.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Install Role-Based Authorization Strategy Plugin:**\n   - Navigate to **Manage Jenkins -> Manage Plugins -> Available plugins**.\n   - Search for **Role-based Authorization Strategy** and click **Install without restart**.\n\n2. **Activate Role-Based Strategy in Global Security:**\n   - Go to **Manage Jenkins -> Configure Global Security**.\n   - Under **Authorization**, change from \"Logged-in users can do anything\" to **Role-Based Strategy**.\n   - Click **Save**.\n\n3. **Define Granular Roles (Manage Roles):**\n   - Go to **Manage Jenkins -> Manage and Assign Roles -> Manage Roles**.\n   - **Global Roles:**\n     - `admin`: Check **Administer** (gives full access).\n     - `read-only`: Check **Overall -> Read** (allows browsing the dashboard).\n   - **Item Roles (Project-based):**\n     - `qa-role`: Pattern: `.*` (or `qa-.*` for specific folders).\n     - Permissions: Check **Job -> Read**, **Job -> Build**, **Job -> Workspace**.\n     - **CRITICAL:** Do NOT check **Job -> Configure**, **Job -> Delete**, or **Credentials**.\n\n4. **Assign Users to Roles (Assign Roles):**\n   - In **Assign Roles**, under Global Roles, add admin user to `admin` and QA group/users to `read-only`.\n   - Under Item Roles, add QA user/group to `qa-role`.\n   - Click **Save**.\n\n5. **Verify Least-Privilege Enforcement:**\n   - Log in as the QA user:\n     - Verify they can see the job list and click **Build Now**.\n     - Verify the **Configure** and **Delete** options are completely hidden from the job UI.\n     - Verify the **Manage Jenkins** menu is inaccessible (HTTP 403 Forbidden).",
    "tagsJson": "[\"Jenkins\",\"Security\",\"RBAC\",\"Role Strategy\",\"Permissions\",\"Least Privilege\"]",
    "hints": [
      "Hint 1: Install the 'Role-based Authorization Strategy' plugin via Manage Plugins.",
      "Hint 2: Navigate to Manage Jenkins -> Configure Global Security and select 'Role-Based Strategy'.",
      "Hint 3: In Manage and Assign Roles, create a Global Role for Admin and Project Roles for QA and Dev.",
      "Hint 4: Ensure the admin role has Administer permission before saving to prevent lock-out."
    ],
    "tags": [
      "Jenkins",
      "Security",
      "RBAC",
      "Role Strategy",
      "Permissions",
      "Least Privilege"
    ]
  },
  {
    "id": "scen-25",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "title": "Scenario: Job Fails Immediately with No Console Log — Labeled Agent Offline & Controller Executor Starvation",
    "difficulty": "Intermediate",
    "prompt": "A Jenkins build job that has run smoothly for months suddenly fails immediately the millisecond it is clicked. The build status turns red, but there is zero console log output. An engineer claims the pipeline script is broken, but another suspect says the controller cannot schedule the job. How do you systematically diagnose why the job aborted before generating logs, verify agent availability, and resolve executor starvation?",
    "explanation": "When a build aborts immediately without generating console logs, the failure occurs at the Controller scheduler layer before an executor workspace is allocated. Common causes include pinned agent labels being offline or controller executors being set to 0 with no available agents.",
    "hintsJson": "[\"Hint 1: Check the pipeline's agent directive: 'agent { label '...' }'.\",\"Hint 2: Navigate to Manage Jenkins -> Nodes to inspect whether matching agents are offline or disconnected.\",\"Hint 3: Check Jenkins System Log for 'QueueTaskDispatcher' or 'NodeOfflineException'.\",\"Hint 4: Bring the offline agent back online or update the job label to match an active agent.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Inspect Job Configuration and Node Labels:**\n   - In the failing job, check the agent label requested: e.g., `agent { label 'slave2' }` or Freestyle **Restrict where this project can be run**.\n   - If the label specifies a non-existent or misnamed label, Jenkins cannot dispatch the job.\n\n2. **Inspect Node Status in Manage Jenkins:**\n   - Go to **Manage Jenkins -> Nodes**.\n   - Look for the agent labeled `slave2`.\n   - Common failure states:\n     - **Offline (Red Mark):** Agent lost network connectivity or agent daemon stopped.\n     - **Disk space threshold exceeded:** Jenkins automatically took the agent offline because free disk fell below 1GB.\n     - **Executors busy:** All executors on the agent are saturated by long-running or hung builds.\n\n3. **Check Agent Connection Logs:**\n   - Click on the node -> **Log**.\n   - Look for: `Connection was broken: java.io.IOException: Unexpected termination of worker process` or `SSH authentication failed`.\n\n4. **Resolve Agent Connection:**\n   - If agent service is down on the worker machine:\n     `ssh user@slave2 \"sudo systemctl restart jenkins-agent\"`\n   - If disk space is full:\n     `ssh user@slave2 \"docker system prune -f && rm -rf /var/jenkins_home/workspace/*\"`\n   - Click **Relaunch agent** in the Jenkins web UI.\n\n5. **Re-run the Build:**\n   - Once the agent node icon turns green (Online), trigger the job again.\n   - Verify the job acquires an executor immediately and generates full build console logs.",
    "tagsJson": "[\"Jenkins\",\"Agents\",\"Troubleshooting\",\"Executors\",\"Build Queue\",\"Controller\"]",
    "hints": [
      "Hint 1: Check the pipeline's agent directive: 'agent { label '...' }'.",
      "Hint 2: Navigate to Manage Jenkins -> Nodes to inspect whether matching agents are offline or disconnected.",
      "Hint 3: Check Jenkins System Log for 'QueueTaskDispatcher' or 'NodeOfflineException'.",
      "Hint 4: Bring the offline agent back online or update the job label to match an active agent."
    ],
    "tags": [
      "Jenkins",
      "Agents",
      "Troubleshooting",
      "Executors",
      "Build Queue",
      "Controller"
    ]
  },
  {
    "id": "scen-26",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "title": "Scenario: GitHub Webhook Confirmed Delivered with Green Checkmark but Jenkins Job Never Runs",
    "difficulty": "Beginner",
    "prompt": "A DevOps engineer set up a GitHub webhook pointing to 'http://jenkins.corp:8080/github-webhook/'. In GitHub Webhook settings, deliveries show HTTP 200 OK with a green checkmark. However, when developers push commits to the repository, the associated Jenkins pipeline job never triggers. How do you diagnose and fix this common Jenkins trigger misconfiguration?",
    "explanation": "Receiving an HTTP 200 from Jenkins only means Jenkins' GitHub plugin received the payload. To actually start a build, the specific target job must have 'GitHub hook trigger for GITScm polling' checked under its Build Triggers.",
    "hintsJson": "[\"Hint 1: In GitHub, verify the Payload URL ends in '/github-webhook/'.\",\"Hint 2: In Jenkins, open the specific job configuration and inspect Build Triggers.\",\"Hint 3: Ensure 'GitHub hook trigger for GITScm polling' is checked.\",\"Hint 4: Verify the Git repository URL in Source Code Management matches the GitHub repository URL exactly.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Verify Webhook Delivery in GitHub:**\n   - Go to GitHub repo -> **Settings -> Webhooks**.\n   - Check the **Recent Deliveries** tab.\n   - Confirm the Payload URL is: `http://<jenkins-url>:8080/github-webhook/` (the trailing slash is mandatory).\n   - If GitHub shows green checkmark (HTTP 200 OK), the network and Jenkins receiver are working.\n\n2. **Inspect Job Configuration in Jenkins:**\n   - Open the target Jenkins job -> Click **Configure**.\n   - Scroll to **Build Triggers**.\n   - **Root Cause:** The checkbox **GitHub hook trigger for GITScm polling** is unchecked!\n   - Without this setting enabled, Jenkins receives the webhook event from GitHub but has no instruction to match it against this job.\n\n3. **Verify Git SCM Repository Match:**\n   - Under **Source Code Management** (or inside the Jenkinsfile `scm` definition):\n   - Confirm the **Repository URL** matches the GitHub repository URL exactly (e.g. `https://github.com/my-org/my-repo.git`).\n   - If URLs differ (e.g. HTTPS vs SSH or case mismatches), Jenkins will not associate the webhook event with the job.\n\n4. **Save and Test End-to-End:**\n   - Check **GitHub hook trigger for GITScm polling** -> Click **Save**.\n   - In GitHub, edit `README.md` and commit directly to `main`.\n   - In Jenkins, watch the build history: Build #1 triggers automatically within 2 seconds.",
    "tagsJson": "[\"Jenkins\",\"GitHub Webhook\",\"Build Triggers\",\"GITScm\",\"CI/CD\",\"Beginner\"]",
    "hints": [
      "Hint 1: In GitHub, verify the Payload URL ends in '/github-webhook/'.",
      "Hint 2: In Jenkins, open the specific job configuration and inspect Build Triggers.",
      "Hint 3: Ensure 'GitHub hook trigger for GITScm polling' is checked.",
      "Hint 4: Verify the Git repository URL in Source Code Management matches the GitHub repository URL exactly."
    ],
    "tags": [
      "Jenkins",
      "GitHub Webhook",
      "Build Triggers",
      "GITScm",
      "CI/CD",
      "Beginner"
    ]
  },
  {
    "id": "scen-27",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "title": "Scenario: Build Periodically vs Poll SCM Resource Exhaustion Outage & Cron Syntax Drift",
    "difficulty": "Intermediate",
    "prompt": "A team created 40 microservice build jobs in Jenkins with scheduled triggers. Soon, the Jenkins server CPU hovers at 100%, and GitHub API rate-limiting triggers HTTP 429 errors. The lead discovers engineers confused 'Build periodically' with 'Poll SCM' and wrote '* * * * *' instead of spaced schedules. How do you overhaul this configuration, fix the cron expressions, and migrate to event-driven webhooks?",
    "explanation": "'Build periodically' executes the entire build unconditionally on a clock, whereas 'Poll SCM' checks if new commits exist. Running either every minute ('* * * * *') across dozens of jobs exhausts server CPU and Git rate limits.",
    "hintsJson": "[\"Hint 1: Understand the difference: Build periodically builds unconditionally; Poll SCM checks for commits.\",\"Hint 2: Review the 5 cron fields: minute, hour, day-of-month, month, day-of-week.\",\"Hint 3: Replace '* * * * *' with spaced hashes (e.g. 'H/15 * * * *') to balance load.\",\"Hint 4: Best practice: Disable polling completely and migrate to push-driven GitHub webhooks.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Understand the Architectural Difference:**\n   - **Build Periodically:** Triggers a full build (compilation, testing, packaging) on schedule, even if zero code changed! Running this every minute (`* * * * *`) runs 40 heavy builds simultaneously every 60 seconds.\n   - **Poll SCM:** Contacts Git repository on schedule; if no new commits exist since the last build, it exits immediately without running a build.\n\n2. **Audit and Throttle Scheduled Jobs:**\n   - For jobs that legitimately need scheduled checks (e.g., nightly dependency scans):\n     - Change schedule from `* * * * *` to `H 2 * * *` (runs once nightly around 2 AM, with hash-based jitter to avoid load spikes).\n     - If periodic polling is necessary, use `H/30 * * * *` (checks every 30 minutes, distributed across nodes).\n\n3. **Migrate to Push-Driven Webhooks (Enterprise Best Practice):**\n   - Uncheck both **Build periodically** and **Poll SCM** on all 40 jobs.\n   - Enable **GitHub hook trigger for GITScm polling**.\n   - Configure a single GitHub Organization Webhook pointing to `http://<jenkins-url>/github-webhook/`.\n   - **Impact:** Jenkins CPU drops from 100% to under 5%. Builds execute strictly when code is pushed, and GitHub API rate limits are preserved.",
    "tagsJson": "[\"Jenkins\",\"Build Triggers\",\"Cron\",\"Poll SCM\",\"Resource Exhaustion\",\"Webhooks\"]",
    "hints": [
      "Hint 1: Understand the difference: Build periodically builds unconditionally; Poll SCM checks for commits.",
      "Hint 2: Review the 5 cron fields: minute, hour, day-of-month, month, day-of-week.",
      "Hint 3: Replace '* * * * *' with spaced hashes (e.g. 'H/15 * * * *') to balance load.",
      "Hint 4: Best practice: Disable polling completely and migrate to push-driven GitHub webhooks."
    ],
    "tags": [
      "Jenkins",
      "Build Triggers",
      "Cron",
      "Poll SCM",
      "Resource Exhaustion",
      "Webhooks"
    ]
  },
  {
    "id": "scen-28",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "title": "Scenario: Automated Production Deployment Safety — Implementing Interactive Human Approval Gates via 'input' Step",
    "difficulty": "Intermediate",
    "prompt": "A continuous delivery pipeline automatically builds, runs unit tests, and deploys directly to production. After an untested feature slipped through and broke production during business hours, the VP of Engineering mandates: 'All builds must run automated tests, but production deployment must pause and wait for explicit human approval from the release lead.' How do you implement this in a Declarative Jenkinsfile using the 'input' step with timeout protection?",
    "explanation": "Continuous Deployment without approval gates risks deploying broken code to production. Jenkinsfile 'input' step pauses pipeline execution until an authorized human reviews and clicks 'Proceed' or 'Abort'.",
    "hintsJson": "[\"Hint 1: Use the 'input' directive inside a pipeline stage.\",\"Hint 2: Wrap the input step inside a 'timeout' block so unattended builds don't hang forever.\",\"Hint 3: Restrict who can approve using the 'submitter' parameter.\",\"Hint 4: Follow with the deployment stage only if approved.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Implement the Approval Gate Stage:**\n   - In your `Jenkinsfile`, insert a dedicated stage between staging tests and production deployment:\n   ```groovy\n   stage('Production Approval Gate') {\n       steps {\n           timeout(time: 2, unit: 'HOURS') {\n               input message: 'Promote release to AWS Production?',\n                     ok: 'Approve & Deploy',\n                     submitter: 'release-managers,lead-devops'\n           }\n       }\n   }\n   ```\n\n2. **Understand the Parameters:**\n   - `message`: The prompt displayed in the Jenkins UI.\n   - `submitter`: Restricts authorization so only users in the 'release-managers' group can approve.\n   - `timeout`: If no human approves within 2 hours, the pipeline automatically aborts, freeing up executor resources.\n\n3. **Verify Pipeline Execution in Stage View:**\n   - Trigger the pipeline.\n   - Stages 'Checkout', 'Build', and 'Automated Tests' complete automatically with green checkmarks.\n   - At 'Production Approval Gate', the pipeline status turns purple/paused with interactive buttons: **Proceed** or **Abort**.\n   - An authorized release manager clicks **Approve & Deploy**, and stage 'Deploy to Production' executes seamlessly.",
    "tagsJson": "[\"Jenkins\",\"Pipelines\",\"Approval Gate\",\"input step\",\"Production Safety\",\"DevOps\"]",
    "hints": [
      "Hint 1: Use the 'input' directive inside a pipeline stage.",
      "Hint 2: Wrap the input step inside a 'timeout' block so unattended builds don't hang forever.",
      "Hint 3: Restrict who can approve using the 'submitter' parameter.",
      "Hint 4: Follow with the deployment stage only if approved."
    ],
    "tags": [
      "Jenkins",
      "Pipelines",
      "Approval Gate",
      "input step",
      "Production Safety",
      "DevOps"
    ]
  },
  {
    "id": "scen-29",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "title": "Scenario: Email Notification Outage — Fixing Broken SMTP App Password & Eliminating Alert Fatigue via post { failure }",
    "difficulty": "Beginner",
    "prompt": "A DevOps team receives complaints on two fronts: (1) Developers are bombarded by 120 'Build SUCCESS' emails a day and have created email rules sending all Jenkins emails to trash, and (2) Yesterday, a critical build broke and NO failure email was sent because Gmail revoked the Jenkins SMTP account password. How do you reconfigure the Email-ext plugin with a Gmail App Password, verify SMTP connectivity, and restructure the Jenkinsfile post block to notify strictly on failure?",
    "explanation": "Sending emails for successful builds causes alert fatigue. Modern SMTP providers (Gmail, Outlook) reject standard passwords and require dedicated App Passwords with SSL/TLS encryption.",
    "hintsJson": "[\"Hint 1: In Google Account security, enable 2-Step Verification and generate a 16-character 'App Password'.\",\"Hint 2: In Jenkins Manage System -> Extended E-mail Notification, configure SMTP server, port 465 (SSL) or 587 (TLS), and credentials.\",\"Hint 3: Use the 'Test configuration by sending test e-mail' button to verify connectivity.\",\"Hint 4: In the Jenkinsfile, move email notifications inside 'post { failure { mail ... } }'.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Generate Gmail App Password:**\n   - Go to Google Account -> **Security -> 2-Step Verification -> App passwords**.\n   - Select App: **Other (Custom name)** -> Name: **Jenkins CI**.\n   - Copy the generated 16-character password (e.g. `abcd efgh ijkl mnop`).\n\n2. **Configure Extended E-mail Notification in Jenkins:**\n   - Go to **Manage Jenkins -> Configure System** (or System settings).\n   - Scroll to **Extended E-mail Notification**:\n     - **SMTP server:** `smtp.gmail.com`\n     - **Default user e-mail suffix:** `@example.com`\n     - **Advanced -> Use SMTP Authentication:** Checked.\n     - **User Name:** `your-alerts@example.com`.\n     - **Password:** Paste the 16-character App Password.\n     - **Use SSL:** Checked (Port `465`) or **Use TLS** (Port `587`).\n   - Check **Test configuration by sending test e-mail** -> Enter your email -> Click **Test configuration**.\n   - Confirm message: `Email was successfully sent`.\n\n3. **Eliminate Alert Fatigue in Jenkinsfile:**\n   - Remove any email notifications from the main stages.\n   - Use the `post` block to alert ONLY when the build breaks:\n   ```groovy\n   post {\n       always {\n           cleanWs()\n       }\n       failure {\n           mail to: 'devs@example.com',\n                subject: \"[CRITICAL] Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}\",\n                body: \"Pipeline failure detected! Check console logs: ${env.BUILD_URL}\"\n       }\n   }\n   ```\n   - **Result:** Developers only receive emails when immediate action is required, restoring trust in CI alerts.",
    "tagsJson": "[\"Jenkins\",\"Email-ext\",\"SMTP\",\"Alert Fatigue\",\"post block\",\"Notifications\"]",
    "hints": [
      "Hint 1: In Google Account security, enable 2-Step Verification and generate a 16-character 'App Password'.",
      "Hint 2: In Jenkins Manage System -> Extended E-mail Notification, configure SMTP server, port 465 (SSL) or 587 (TLS), and credentials.",
      "Hint 3: Use the 'Test configuration by sending test e-mail' button to verify connectivity.",
      "Hint 4: In the Jenkinsfile, move email notifications inside 'post { failure { mail ... } }'."
    ],
    "tags": [
      "Jenkins",
      "Email-ext",
      "SMTP",
      "Alert Fatigue",
      "post block",
      "Notifications"
    ]
  },
  {
    "id": "scen-30",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "title": "Scenario: Inconsistent Selenium Test Results: Passes Locally in Eclipse but Fails on Linux Jenkins Agent (Headless vs Headed & Missing Xvfb)",
    "difficulty": "Intermediate",
    "prompt": "A QA automation engineer wrote a Selenium WebDriver test suite that passes 100% of the time when executed in Eclipse on their MacBook. When the same test suite runs in Jenkins on an Ubuntu Linux worker agent, the build fails instantly with 'org.openqa.selenium.WebDriverException: unknown error: Chrome failed to start: exited abnormally. (The process started from chrome location /usr/bin/google-chrome is no longer running, so ChromeDriver is assuming that Chrome has crashed)'. How do you diagnose and resolve this headless execution failure?",
    "explanation": "Linux servers in CI/CD environments operate without a physical monitor or graphical X11 display. Attempting to launch a standard (headed) browser causes an immediate crash unless Headless mode is explicitly enabled in ChromeOptions.",
    "hintsJson": "[\"Hint 1: Recognize that Linux CI runners have no display (no X server).\",\"Hint 2: Configure ChromeOptions in Java: addArguments('--headless=new').\",\"Hint 3: Add '--no-sandbox' and '--disable-dev-shm-usage' to prevent container memory crashes.\",\"Hint 4: Alternatively, install and run tests wrapped under Xvfb (virtual framebuffer).\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Understand Root Cause (Headless CI Environment):**\n   - The developer's MacBook has a physical display, so `new ChromeDriver()` opens a visual browser window.\n   - The Linux CI agent has no GUI display server. Without headless configuration, Google Chrome attempts to connect to `DISPLAY=:0`, fails, and crashes immediately.\n\n2. **Refactor Selenium WebDriver Initialization with Headless Options:**\n   - In your test setup class, pass explicit `ChromeOptions`:\n   ```java\n   ChromeOptions options = new ChromeOptions();\n   options.addArguments(\"--headless=new\");          // Modern headless Chrome mode\n   options.addArguments(\"--no-sandbox\");            // Required when running in containers/CI\n   options.addArguments(\"--disable-dev-shm-usage\"); // Writes temp files to /tmp instead of /dev/shm\n   options.addArguments(\"--window-size=1920,1080\"); // Enforces standard desktop viewport\n   WebDriver driver = new ChromeDriver(options);\n   ```\n\n3. **Verify Prerequisite Packages on Linux Agent:**\n   - Confirm Google Chrome and ChromeDriver are installed:\n     `google-chrome --version && chromedriver --version`\n   - If using Xvfb (Virtual Framebuffer) instead:\n     `sudo apt-get install -y xvfb`\n     In Jenkinsfile: `sh 'xvfb-run mvn test'`\n\n4. **Verify Teardown Execution:**\n   - Confirm `driver.quit()` is enclosed in an `@After` method so Chrome processes terminate cleanly.\n   - Re-run the Jenkins pipeline: `mvn test` completes with 100% passing tests!",
    "tagsJson": "[\"Jenkins\",\"Selenium\",\"Headless Chrome\",\"Xvfb\",\"Linux Agent\",\"Maven\",\"Testing\"]",
    "hints": [
      "Hint 1: Recognize that Linux CI runners have no display (no X server).",
      "Hint 2: Configure ChromeOptions in Java: addArguments('--headless=new').",
      "Hint 3: Add '--no-sandbox' and '--disable-dev-shm-usage' to prevent container memory crashes.",
      "Hint 4: Alternatively, install and run tests wrapped under Xvfb (virtual framebuffer)."
    ],
    "tags": [
      "Jenkins",
      "Selenium",
      "Headless Chrome",
      "Xvfb",
      "Linux Agent",
      "Maven",
      "Testing"
    ]
  },
  {
    "id": "scen-31",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "title": "Scenario: Browser & ChromeDriver Version Mismatch Drift During Nightly CI Test Runs",
    "difficulty": "Intermediate",
    "prompt": "A nightly regression suite executing 200 Selenium tests fails with 'SessionNotCreatedException: This version of ChromeDriver only supports Chrome version 122. Current browser version is 124.0.6367.60'. The host OS auto-updated Google Chrome, breaking the pinned ChromeDriver binary. How do you resolve this drift immediately and architect automated driver management using WebDriverManager or Docker containers?",
    "explanation": "ChromeDriver versions must match the major version of Google Chrome. Manual driver downloads on CI servers inevitably break when OS package managers apply browser updates.",
    "hintsJson": "[\"Hint 1: Check installed Chrome version: 'google-chrome --version'.\",\"Hint 2: Download the matching ChromeDriver binary or use automated driver resolution.\",\"Hint 3: Add 'io.github.bonigarcia:webdrivermanager' dependency to pom.xml.\",\"Hint 4: Use containerized Selenium nodes (e.g. selenium/standalone-chrome) to lock both versions together.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Immediate Triage (Manual Binary Alignment):**\n   - Check current browser version: `google-chrome --version` -> `124.0.6367.60`\n   - Check current driver version: `chromedriver --version` -> `122.0.6261.94` (Mismatch!)\n   - Download matching ChromeDriver from Chrome for Testing repository:\n     ```bash\n     wget https://storage.googleapis.com/chrome-for-testing-public/124.0.6367.60/linux64/chromedriver-linux64.zip\n     unzip chromedriver-linux64.zip\n     sudo mv chromedriver-linux64/chromedriver /usr/local/bin/\n     ```\n\n2. **Permanent Solution 1: Automated Driver Resolution via WebDriverManager:**\n   - Add **WebDriverManager** to `pom.xml`:\n     ```xml\n     <dependency>\n         <groupId>io.github.bonigarcia</groupId>\n         <artifactId>webdrivermanager</artifactId>\n         <version>5.8.0</version>\n         <scope>test</scope>\n     </dependency>\n     ```\n   - In test setup:\n     ```java\n     WebDriverManager.chromedriver().setup();\n     WebDriver driver = new ChromeDriver(options);\n     ```\n   - WebDriverManager automatically detects the installed Chrome version and fetches the exact matching ChromeDriver at runtime.\n\n3. **Permanent Solution 2: Containerized Ephemeral Testing (Docker):**\n   - Run tests inside a pre-built Docker image where Chrome and ChromeDriver versions are locked together:\n     ```groovy\n     pipeline {\n         agent {\n             docker { image 'markhobson/maven-chrome:jdk-17' }\n         }\n         stages {\n             stage('Test') { steps { sh 'mvn test' } }\n         }\n     }\n     ```\n   - Eliminates host OS package drift permanently.",
    "tagsJson": "[\"Jenkins\",\"Selenium\",\"ChromeDriver\",\"Version Mismatch\",\"WebDriverManager\",\"Docker\"]",
    "hints": [
      "Hint 1: Check installed Chrome version: 'google-chrome --version'.",
      "Hint 2: Download the matching ChromeDriver binary or use automated driver resolution.",
      "Hint 3: Add 'io.github.bonigarcia:webdrivermanager' dependency to pom.xml.",
      "Hint 4: Use containerized Selenium nodes (e.g. selenium/standalone-chrome) to lock both versions together."
    ],
    "tags": [
      "Jenkins",
      "Selenium",
      "ChromeDriver",
      "Version Mismatch",
      "WebDriverManager",
      "Docker"
    ]
  },
  {
    "id": "scen-32",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "title": "Scenario: Missing JUnit XML Test Report Publisher Causing Silent Regression Masking",
    "difficulty": "Beginner",
    "prompt": "A team's Jenkins pipeline runs 'mvn test' to execute 45 Selenium tests. One test has been failing for two weeks, but because the pipeline only checked overall exit code and pom.xml had '<testFailureIgnore>true</testFailureIgnore>', the build status stayed blue/green! Developers had no visibility into the failing test. How do you reconfigure the Jenkinsfile and Maven Surefire plugin to publish JUnit reports and expose pass/fail trends?",
    "explanation": "Without the JUnit report publisher, Jenkins only reports binary build success/failure. If Maven ignores test failures, broken assertions remain completely hidden from the engineering team.",
    "hintsJson": "[\"Hint 1: Inspect pom.xml for '<testFailureIgnore>true</testFailureIgnore>' and remove it.\",\"Hint 2: Verify Maven Surefire output location: target/surefire-reports/*.xml.\",\"Hint 3: In the Jenkinsfile post block, add: 'junit \\\"**/target/surefire-reports/*.xml\\\"'.\",\"Hint 4: Verify the Jenkins dashboard displays the interactive Test Result Trend chart.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Remove Test Failure Masking in pom.xml:**\n   - In `pom.xml`, look inside `maven-surefire-plugin`:\n     Remove or set to false:\n     `<testFailureIgnore>false</testFailureIgnore>`\n   - Failing tests will now properly exit with non-zero status codes.\n\n2. **Add JUnit Publisher to Jenkinsfile post { always } Block:**\n   - Configure the pipeline to archive Surefire test XML files unconditionally:\n   ```groovy\n   post {\n       always {\n           junit testResults: '**/target/surefire-reports/*.xml',\n                 allowEmptyResults: false\n       }\n   }\n   ```\n   - **CRITICAL:** Placing `junit` inside `always` guarantees test reports are parsed and published even when tests fail!\n\n3. **Verify Interactive Test Analytics in Jenkins UI:**\n   - Run the build: Jenkins marks the build status as **Yellow (UNSTABLE)** rather than masked green.\n   - Click **Test Result** in the build sidebar:\n     - Identifies the exact failing class: `com.example.CheckoutTest#testPaymentProcessing`\n     - Displays assertion failure details and WebDriver screenshot artifact.\n     - The project dashboard now displays an interactive **Test Result Trend** graph tracking pass/fail metrics across all historical builds.",
    "tagsJson": "[\"Jenkins\",\"JUnit\",\"Surefire\",\"Test Reports\",\"Quality Gates\",\"Trend Analysis\"]",
    "hints": [
      "Hint 1: Inspect pom.xml for '<testFailureIgnore>true</testFailureIgnore>' and remove it.",
      "Hint 2: Verify Maven Surefire output location: target/surefire-reports/*.xml.",
      "Hint 3: In the Jenkinsfile post block, add: 'junit \"**/target/surefire-reports/*.xml\"'.",
      "Hint 4: Verify the Jenkins dashboard displays the interactive Test Result Trend chart."
    ],
    "tags": [
      "Jenkins",
      "JUnit",
      "Surefire",
      "Test Reports",
      "Quality Gates",
      "Trend Analysis"
    ]
  },
  {
    "id": "scen-33",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "title": "Scenario: Flaky Selenium CI Suite — Eliminating Brittle Locators & Thread.sleep() via WebDriverWait",
    "difficulty": "Intermediate",
    "prompt": "An e-commerce checkout Selenium test suite in Jenkins fails intermittently 30% of the time with 'NoSuchElementException' or 'ElementClickInterceptedException'. The pipeline takes 22 minutes because the original author littered the tests with 'Thread.sleep(5000)'. How do you refactor the test suite to use explicit WebDriverWait expected conditions, stable locators, and cut execution time down to 4 minutes?",
    "explanation": "Hardcoded Thread.sleep() causes slow builds and race conditions on CI servers with varying CPU loads. Explicit WebDriverWait dynamically polls for element state, proceeding instantly when ready.",
    "hintsJson": "[\"Hint 1: Replace brittle absolute XPaths with stable data-testid or ID attributes.\",\"Hint 2: Remove all Thread.sleep() statements.\",\"Hint 3: Use 'WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10))'.\",\"Hint 4: Use 'wait.until(ExpectedConditions.elementToBeClickable(By.id(...)))'.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Eliminate Hardcoded Sleep (Anti-Pattern):**\n   - `Thread.sleep(5000)` halts the thread blindly. If the network is fast, 4.5 seconds are wasted. If the CI runner is under load and takes 5.1 seconds, the test fails with `NoSuchElementException`!\n\n2. **Implement Explicit WebDriverWait (Best Practice):**\n   - Replace blind sleeps with explicit condition polling:\n   ```java\n   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\n\n   // Wait for element visibility before reading text\n   WebElement header = wait.until(\n       ExpectedConditions.visibilityOfElementLocated(By.id(\"order-confirmation-header\"))\n   );\n\n   // Wait for button to be clickable before clicking\n   WebElement payButton = wait.until(\n       ExpectedConditions.elementToBeClickable(By.cssSelector(\"[data-testid='btn-submit-payment']\"))\n   );\n   payButton.click();\n   ```\n\n3. **Adopt Resilient Locators:**\n   - Avoid brittle DOM-depth XPaths: `/html/body/div[2]/div[1]/form/div[3]/button` (breaks on any CSS change).\n   - Use stable attributes: `By.id(\"login-btn\")` or dedicated test attributes `By.cssSelector(\"[data-testid='login-btn']\")`.\n\n4. **Verify Impact in CI:**\n   - Pipeline duration drops from 22 minutes to 4 minutes.\n   - Flakiness rate drops from 30% to 0%. Test result trend stays solid green.",
    "tagsJson": "[\"Jenkins\",\"Selenium\",\"Flaky Tests\",\"WebDriverWait\",\"Test Optimization\",\"Performance\"]",
    "hints": [
      "Hint 1: Replace brittle absolute XPaths with stable data-testid or ID attributes.",
      "Hint 2: Remove all Thread.sleep() statements.",
      "Hint 3: Use 'WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10))'.",
      "Hint 4: Use 'wait.until(ExpectedConditions.elementToBeClickable(By.id(...)))'."
    ],
    "tags": [
      "Jenkins",
      "Selenium",
      "Flaky Tests",
      "WebDriverWait",
      "Test Optimization",
      "Performance"
    ]
  },
  {
    "id": "scen-34",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "title": "Scenario: Multi-Stage Dockerfile Cache Invalidation Causing 45-Minute CI Builds",
    "difficulty": "Intermediate",
    "prompt": "A Node.js backend container previously took 2 minutes to build in CI. After adding a new analytics feature, developers notice that every single minor code commit now takes 45 minutes to build Docker images because 'npm install' runs completely from scratch every time. Examining the Dockerfile shows:\n\nCOPY . .\nRUN npm install --production\n\nHow do you restructure this Dockerfile to leverage Docker layer caching and restore sub-minute build speeds?",
    "explanation": "Docker invalidates layer cache sequentially. If a COPY directive copies files that change frequently (like source code), all subsequent RUN directives in the Dockerfile will have their cache invalidated and must re-run completely.",
    "hintsJson": "[\"Hint 1: Understand how Docker checks cache: if file checksums in COPY change, all subsequent layers are rebuilt.\",\"Hint 2: Separate dependency manifest files (package.json, package-lock.json) from application source code.\",\"Hint 3: Copy only package*.json first, run npm ci, and THEN copy the rest of the application code.\",\"Hint 4: Use multi-stage builds to discard build dependencies from the production image.\"]",
    "recommendedSolution": "### Step-by-Step Optimization Methodology:\n\n1. **Identify the Layer Invalidation Bug:**\n   - Placing `COPY . .` before `RUN npm install` causes Docker to compute a checksum over all files (including `src/`, `README.md`, etc.).\n   - Whenever any developer touches a single line of JavaScript, the `COPY . .` layer changes -> Docker invalidates the cache for `RUN npm install` -> All packages re-download from NPM registry!\n\n2. **Rewrite with Optimized Layer Order & Multi-Stage Build:**\n   ```dockerfile\n   # Stage 1: Build Dependencies\n   FROM node:20-alpine AS builder\n   WORKDIR /app\n\n   # Step 1: Copy ONLY dependency manifests first\n   COPY package.json package-lock.json ./\n\n   # Step 2: Install dependencies (Cached unless package.json actually changes!)\n   RUN npm ci --prefer-offline\n\n   # Step 3: Copy source code AFTER dependencies are cached\n   COPY . .\n   RUN npm run build\n\n   # Stage 2: Hardened Lean Production Runtime\n   FROM node:20-alpine AS runner\n   WORKDIR /app\n   ENV NODE_ENV=production\n\n   # Copy only production dependencies and compiled build\n   COPY package.json package-lock.json ./\n   RUN npm ci --only=production && npm cache clean --force\n   COPY --from=builder /app/dist ./dist\n\n   USER node\n   EXPOSE 3000\n   CMD [\"node\", \"dist/server.js\"]\n   ```\n\n3. **Add .dockerignore File:**\n   - Create `.dockerignore` to prevent local bloat from entering the build context:\n     ```\n     node_modules\n     npm-debug.log\n     .git\n     dist\n     .env\n     ```\n\n4. **Verify Result:**\n   - Subsequent builds with code changes now skip package installation entirely and finish in under 30 seconds!",
    "tagsJson": "[\"Docker\",\"Dockerfile\",\"Multi-Stage\",\"Layer Caching\",\"Performance\"]",
    "hints": [
      "Hint 1: Understand how Docker checks cache: if file checksums in COPY change, all subsequent layers are rebuilt.",
      "Hint 2: Separate dependency manifest files (package.json, package-lock.json) from application source code.",
      "Hint 3: Copy only package*.json first, run npm ci, and THEN copy the rest of the application code.",
      "Hint 4: Use multi-stage builds to discard build dependencies from the production image."
    ],
    "tags": [
      "Docker",
      "Dockerfile",
      "Multi-Stage",
      "Layer Caching",
      "Performance"
    ]
  },
  {
    "id": "scen-35",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "title": "Scenario: Container Terminated with Exit Code 137 (OOMKilled) Under Spiky Traffic",
    "difficulty": "Advanced",
    "prompt": "An API container in production runs fine during low-traffic hours. However, during flash sale peak hours, the container abruptly terminates and restarts every 10 minutes. Running 'docker inspect' shows 'ExitCode: 137, OOMKilled: true'. How do you systematically analyze memory allocation, tune cgroups limits, and prevent the Linux kernel OOM killer from killing your application?",
    "explanation": "Linux Exit Code 137 corresponds to 128 + 9 (SIGKILL). When a container exceeds its cgroups memory ceiling, the Linux kernel Out-Of-Memory (OOM) killer immediately terminates the process with SIGKILL to protect host stability.",
    "hintsJson": "[\"Hint 1: Inspect container memory limit configuration (--memory or k8s resources.limits.memory).\",\"Hint 2: Check Node.js / Java max old space or heap allocation limits inside the runtime.\",\"Hint 3: Monitor container memory consumption using 'docker stats' during load testing.\",\"Hint 4: Ensure runtime heap size ceiling is configured lower than the cgroups container limit.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Verify OOMKilled Status:**\n   - Run: `docker inspect <container-id> --format='{{.State.OOMKilled}} (Exit: {{.State.ExitCode}})'`\n   - Returns `true (Exit: 137)`.\n   - Inspect dmesg kernel log: `dmesg -T | grep -i oom`\n   - Confirm kernel output: `Task in /docker/... killed as a result of limit of 512M`.\n\n2. **Analyze Container vs Runtime Memory Mismatch:**\n   - If container has `--memory=512m`, but the Node.js V8 runtime defaults to 1.4GB on 64-bit systems, Node.js will continue allocating memory until the kernel abruptly kills it from the outside without warning!\n\n3. **Configure Runtime Heap Ceilings:**\n   - Restrict V8 heap allocation to 75% of the container cgroups limit (leaving 25% for stack, buffers, and OS overhead):\n     ```dockerfile\n     ENV NODE_OPTIONS=\"--max-old-space-size=384\"\n     ```\n   - For Java applications, use JVM flags:\n     ```dockerfile\n     ENV JAVA_OPTS=\"-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0\"\n     ```\n\n4. **Tune Host Container Limits:**\n   - Increase container limit if legitimately required:\n     `docker update --memory=1024m --memory-swap=1024m <container-id>`\n   - In Kubernetes, set balanced requests and limits:\n     ```yaml\n     resources:\n       requests:\n         memory: \"512Mi\"\n       limits:\n         memory: \"1Gi\"\n     ```\n\n5. **Profile for Memory Leaks:**\n   - Use Chrome DevTools / Clinic.js to take heap snapshots and confirm no global arrays or open socket handles are leaking memory over time.",
    "tagsJson": "[\"Docker\",\"OOMKilled\",\"Exit Code 137\",\"Cgroups\",\"Memory Tuning\"]",
    "hints": [
      "Hint 1: Inspect container memory limit configuration (--memory or k8s resources.limits.memory).",
      "Hint 2: Check Node.js / Java max old space or heap allocation limits inside the runtime.",
      "Hint 3: Monitor container memory consumption using 'docker stats' during load testing.",
      "Hint 4: Ensure runtime heap size ceiling is configured lower than the cgroups container limit."
    ],
    "tags": [
      "Docker",
      "OOMKilled",
      "Exit Code 137",
      "Cgroups",
      "Memory Tuning"
    ]
  },
  {
    "id": "scen-36",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "title": "Scenario: 'EACCES Permission Denied' on Mounted Docker Volume with Non-Root User",
    "difficulty": "Intermediate",
    "prompt": "To comply with security audits, you updated a Dockerfile to run as a non-root user using 'USER 1001'. However, when the container launches with a mounted host directory for persistent uploads ('-v /data/uploads:/app/uploads'), the application crashes on boot with: 'Error: EACCES: permission denied, mkdir /app/uploads/avatars'. Why did this happen and how do you resolve the host-container UID ownership mismatch?",
    "explanation": "Linux file permissions on bind mounts are enforced based on numerical User IDs (UIDs). If the host directory is owned by root (UID 0), a container running as non-root (UID 1001) lacks write permissions unless permissions or ownership are explicitly aligned.",
    "hintsJson": "[\"Hint 1: Check permissions of the host directory using 'ls -ld /data/uploads'.\",\"Hint 2: Determine what UID the container process runs under.\",\"Hint 3: Use chown on the host or use Docker named volumes instead of host bind mounts.\",\"Hint 4: Use an entrypoint script or initContainer to fix directory ownership before dropping privileges.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Inspect Host Directory Ownership:**\n   - On the host machine, run: `ls -ld /data/uploads`\n   - Output: `drwxr-xr-x 2 root root 4096 /data/uploads`\n   - Notice: Only `root` (UID 0) has write permissions.\n\n2. **Option A: Adjust Host Directory Ownership (Quick Fix):**\n   - Align host folder ownership to match container UID 1001:\n     `sudo chown -R 1001:1001 /data/uploads`\n     `sudo chmod -R 775 /data/uploads`\n   - Restart container: Container can now create subdirectories without permission errors.\n\n3. **Option B: Use Docker Named Volumes (Recommended for Portability):**\n   - Instead of bind mounts, use Docker-managed named volumes:\n     `docker volume create uploads-data`\n     `docker run -d -v uploads-data:/app/uploads --user 1001:1001 myapp:v1`\n   - Docker automatically initializes named volumes with the container image's target folder permissions.\n\n4. **Option C: Entrypoint Pattern with 'gosu':**\n   - In Dockerfile, start as root, fix volume permissions, and drop privileges before launching app:\n     ```bash\n     #!/bin/sh\n     chown -R appuser:appgroup /app/uploads\n     exec gosu appuser \"$@\"\n     ```",
    "tagsJson": "[\"Docker\",\"Linux Permissions\",\"Volumes\",\"Non-Root\",\"Security\"]",
    "hints": [
      "Hint 1: Check permissions of the host directory using 'ls -ld /data/uploads'.",
      "Hint 2: Determine what UID the container process runs under.",
      "Hint 3: Use chown on the host or use Docker named volumes instead of host bind mounts.",
      "Hint 4: Use an entrypoint script or initContainer to fix directory ownership before dropping privileges."
    ],
    "tags": [
      "Docker",
      "Linux Permissions",
      "Volumes",
      "Non-Root",
      "Security"
    ]
  },
  {
    "id": "scen-37",
    "moduleNumber": 19,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "topicNumber": 2,
    "title": "Scenario: Nginx Ingress Controller Returning 502 Bad Gateway to End Users",
    "difficulty": "Advanced",
    "prompt": "Users reporting intermittent '502 Bad Gateway' errors when visiting your production web application https://app.example.com. The Nginx Ingress Controller is running, SSL certificates are valid, and the DNS records resolve correctly. How do you systematically trace the request through the Ingress controller, Kubernetes Service, and backend pods to isolate and eliminate the 502 gateway error?",
    "explanation": "HTTP 502 Bad Gateway indicates that the Ingress proxy received an invalid response or connection reset from the upstream backend pod. Common causes include unready endpoints, port mismatches in Service definitions, or pods failing readiness probes.",
    "hintsJson": "[\"Hint 1: Check Nginx Ingress controller logs for upstream response status.\",\"Hint 2: Verify the Kubernetes Service endpoints using 'kubectl get endpoints <service-name>'.\",\"Hint 3: Check targetPort in the Service definition: does it match the containerPort where the app listens?\",\"Hint 4: Verify whether backend pods are failing readiness probes and getting removed from active endpoints.\"]",
    "recommendedSolution": "### Step-by-Step Systematic Diagnostic Methodology:\n\n1. **Check Nginx Ingress Controller Logs:**\n   - Run: `kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail=100`\n   - Look for upstream lines:\n     `connect() failed (111: Connection refused) while connecting to upstream, client: 1.2.3.4, server: app.example.com, upstream: \"10.244.2.45:8080\"`\n   - This proves Nginx reached the pod IP `10.244.2.45`, but port `8080` refused connection.\n\n2. **Verify Kubernetes Endpoints:**\n   - Run: `kubectl get endpoints order-service -n production`\n   - If endpoints shows `<none>`, no healthy pods are matching the Service selector!\n   - Verify pod labels match Service `spec.selector`:\n     `kubectl get pods -n production --show-labels`\n\n3. **Verify Port Alignment (Service vs Container):**\n   - Inspect Service definition:\n     ```yaml\n     spec:\n       ports:\n         - port: 80\n           targetPort: 3000 # Must match application listening port!\n     ```\n   - If `targetPort` was configured as 8080 but application listens on port 3000, Nginx receives connection refused (502).\n\n4. **Inspect Pod Readiness Probes:**\n   - Run: `kubectl describe pod <pod-name> -n production`\n   - Check Events: `Readiness probe failed: HTTP probe failed with statuscode: 500`.\n   - If the readiness probe fails, Kubernetes immediately removes the pod IP from the Service endpoints list to stop sending traffic.\n\n5. **Test Backend Pod Directly via Port-Forward:**\n   - Run: `kubectl port-forward pod/<pod-name> 8080:3000 -n production`\n   - Curl locally: `curl -v http://localhost:8080/health`\n   - Confirm backend returns HTTP 200 OK before routing through Ingress.",
    "tagsJson": "[\"Kubernetes\",\"Ingress\",\"502 Bad Gateway\",\"Services\",\"Networking\"]",
    "hints": [
      "Hint 1: Check Nginx Ingress controller logs for upstream response status.",
      "Hint 2: Verify the Kubernetes Service endpoints using 'kubectl get endpoints <service-name>'.",
      "Hint 3: Check targetPort in the Service definition: does it match the containerPort where the app listens?",
      "Hint 4: Verify whether backend pods are failing readiness probes and getting removed from active endpoints."
    ],
    "tags": [
      "Kubernetes",
      "Ingress",
      "502 Bad Gateway",
      "Services",
      "Networking"
    ]
  },
  {
    "id": "scen-38",
    "moduleNumber": 19,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "topicNumber": 1,
    "title": "Scenario: Kubernetes Pod Stuck in 'Pending' State: 0/3 Nodes Available",
    "difficulty": "Intermediate",
    "prompt": "You applied a new deployment YAML for a machine learning inference worker. The pod never starts and remains stuck in 'Pending' state indefinitely. Running 'kubectl describe pod' shows: '0/3 nodes are available: 3 Insufficient cpu, 1 node(s) had untolerated taint'. How would you systematically diagnose and resolve this scheduling deadlock?",
    "explanation": "The kube-scheduler evaluates all worker nodes against pod resource requests, node selectors, taints/tolerations, and affinity rules. If no node meets all criteria simultaneously, the pod remains in Pending until cluster capacity changes.",
    "hintsJson": "[\"Hint 1: Inspect pod resource requests in YAML: are requests set unrealistically high?\",\"Hint 2: Check node allocatable CPU and current utilization with 'kubectl describe nodes'.\",\"Hint 3: Inspect node taints using 'kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints'.\",\"Hint 4: Consider Cluster Autoscaler or Karpenter to spin up additional EC2 worker nodes.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Analyze Scheduler Failure Message:**\n   - Run: `kubectl describe pod <pod-name>`\n   - Scheduler Event: `0/3 nodes are available: 3 Insufficient cpu, 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }`.\n   - Interpretation:\n     - 1 node is the Control Plane (master) node, which has a taint preventing general workloads.\n     - The remaining 2 worker nodes have all their allocatable CPU already reserved by existing pod requests.\n\n2. **Check Current Node Resource Allocations:**\n   - Run: `kubectl top nodes`\n   - Run: `kubectl describe nodes | grep -A 8 \"Allocated resources\"`\n   - Check the **CPU Requests** percentage. If existing pods requested 95% of node CPU, new pods cannot be scheduled, even if actual CPU usage is low!\n\n3. **Right-Size Pod Resource Requests:**\n   - Check deployment manifest:\n     ```yaml\n     resources:\n       requests:\n         cpu: \"4000m\" # Requests 4 entire CPU cores!\n     ```\n   - If worker nodes are `t3.large` (2 vCPUs), a 4-core request is physically impossible to schedule on any single node!\n   - Adjust realistic request:\n     ```yaml\n     resources:\n       requests:\n         cpu: \"500m\" # 0.5 CPU\n         memory: \"512Mi\"\n       limits:\n         cpu: \"2000m\"\n         memory: \"2Gi\"\n     ```\n\n4. **Verify Cluster Autoscaling (AWS EKS):**\n   - If high compute is genuinely required, verify that **Karpenter** or **Cluster Autoscaler** is active:\n     `kubectl get pods -n kube-system -l app=cluster-autoscaler`\n   - Autoscaler will detect pending pods and provision a new EC2 worker instance automatically.\n\n5. **Verify Pod Schedules Successfully:**\n   - Apply updated manifest: `kubectl apply -f worker-deployment.yaml`\n   - Check status: `kubectl get pods -w` -> Status transitions from `Pending` to `Running`.",
    "tagsJson": "[\"Kubernetes\",\"Pending Pod\",\"Scheduling\",\"Resource Requests\",\"Tolerations\"]",
    "hints": [
      "Hint 1: Inspect pod resource requests in YAML: are requests set unrealistically high?",
      "Hint 2: Check node allocatable CPU and current utilization with 'kubectl describe nodes'.",
      "Hint 3: Inspect node taints using 'kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints'.",
      "Hint 4: Consider Cluster Autoscaler or Karpenter to spin up additional EC2 worker nodes."
    ],
    "tags": [
      "Kubernetes",
      "Pending Pod",
      "Scheduling",
      "Resource Requests",
      "Tolerations"
    ]
  },
  {
    "id": "scen-39",
    "moduleNumber": 19,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "topicNumber": 3,
    "title": "Scenario: Kubernetes 'ImagePullBackOff' with Private Amazon ECR Repository",
    "difficulty": "Intermediate",
    "prompt": "You pushed a newly built container image to a private Amazon ECR repository ('123456789012.dkr.ecr.us-east-1.amazonaws.com/api:v1.0.0') and deployed it to your Kubernetes cluster. The pod immediately fails to start with: 'ImagePullBackOff: Failed to pull image ... rpc error: code = Unknown desc = failed to pull and unpack image ... 401 Unauthorized'. How do you resolve this container registry authentication failure?",
    "explanation": "Worker nodes (specifically kubelet) must authenticate with Amazon ECR to pull private images. ECR tokens expire after 12 hours. The cluster must use an imagePullSecret or IAM Roles for Service Accounts / EC2 Node Instance Roles with AmazonEC2ContainerRegistryReadOnly policy.",
    "hintsJson": "[\"Hint 1: Inspect the exact error message with 'kubectl describe pod <pod-name>'.\",\"Hint 2: Verify the worker node EC2 IAM Role has AmazonEC2ContainerRegistryReadOnly attached.\",\"Hint 3: On non-EKS clusters, verify a Kubernetes Secret of type 'docker-registry' exists and is referenced under 'imagePullSecrets'.\",\"Hint 4: Verify the image tag actually exists in the target AWS Region and account.\"]",
    "recommendedSolution": "### Step-by-Step Resolution Methodology:\n\n1. **Confirm Exact Image URI and Tag:**\n   - Run: `aws ecr describe-images --repository-name api --region us-east-1`\n   - Verify that tag `v1.0.0` actually exists and is not misspelled in the deployment YAML.\n\n2. **If Running on Amazon EKS (AWS Native):**\n   - Check the IAM Role attached to the EKS Worker Node Group:\n     - The Node IAM Role MUST have the AWS-managed policy:\n       `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly`\n   - With this policy attached, the Kubelet on each EKS node uses native AWS credential providers to fetch temporary authorization tokens automatically without any imagePullSecrets!\n\n3. **If Running on Self-Managed / On-Prem Kubernetes:**\n   - Generate a dynamic Kubernetes docker-registry secret from active AWS credentials:\n     ```bash\n     TOKEN=$(aws ecr get-login-password --region us-east-1)\n     kubectl create secret docker-registry ecr-secret \\\n       --docker-server=123456789012.dkr.ecr.us-east-1.amazonaws.com \\\n       --docker-username=AWS \\\n       --docker-password=$TOKEN \\\n       --namespace=production\n     ```\n   - Add the secret to the pod spec in `deployment.yaml`:\n     ```yaml\n     spec:\n       imagePullSecrets:\n         - name: ecr-secret\n     ```\n\n4. **Verify Resolution:**\n   - Delete the failed pod: `kubectl delete pod <pod-name> -n production`\n   - Deployment recreates pod: Status transitions to `ContainerCreating` -> `Running`.",
    "tagsJson": "[\"Kubernetes\",\"ImagePullBackOff\",\"AWS ECR\",\"Authentication\",\"DevOps\"]",
    "hints": [
      "Hint 1: Inspect the exact error message with 'kubectl describe pod <pod-name>'.",
      "Hint 2: Verify the worker node EC2 IAM Role has AmazonEC2ContainerRegistryReadOnly attached.",
      "Hint 3: On non-EKS clusters, verify a Kubernetes Secret of type 'docker-registry' exists and is referenced under 'imagePullSecrets'.",
      "Hint 4: Verify the image tag actually exists in the target AWS Region and account."
    ],
    "tags": [
      "Kubernetes",
      "ImagePullBackOff",
      "AWS ECR",
      "Authentication",
      "DevOps"
    ]
  },
  {
    "id": "scen-40",
    "moduleNumber": 2,
    "title": "Scenario: S3 AccessDenied Error Despite IAM AdministratorAccess Policy",
    "difficulty": "Advanced",
    "prompt": "A DevOps engineer has the AWS-managed 'AdministratorAccess' policy attached to their IAM user. However, when attempting to download an object from an internal compliance bucket ('aws s3 cp s3://company-audit-vault/2026/report.pdf .'), the command fails with: 'An error occurred (AccessDenied) when calling the GetObject operation'. How can an administrator be denied access, and how do you systematically isolate which security boundary is blocking the request?",
    "explanation": "IAM policy evaluation is a multi-layered engine. An identity having AdministratorAccess can still be denied by an S3 Bucket Policy explicit deny, an AWS Organizations Service Control Policy (SCP), an IAM Permission Boundary, or lack of KMS Decrypt permissions on a CMK.",
    "hintsJson": "[\"Hint 1: Check if the S3 bucket is encrypted with an AWS KMS Customer Managed Key (CMK). AdministratorAccess on S3 does not grant kms:Decrypt on CMKs with restrictive key policies!\",\"Hint 2: Inspect the S3 Bucket Policy for an Explicit Deny statement.\",\"Hint 3: Check if the AWS account belongs to an AWS Organization with a Service Control Policy (SCP) blocking S3 access.\",\"Hint 4: Check if the IAM user has a Permissions Boundary attached.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Check S3 Object Encryption & KMS Key Policy (Most Common Cause):**\n   - Run: `aws s3api head-object --bucket company-audit-vault --key 2026/report.pdf`\n   - Check `ServerSideEncryption`: Look for `aws:kms` and `SSEKMSKeyId`.\n   - When an object is encrypted with a **Customer Managed Key (CMK)**, access requires BOTH `s3:GetObject` AND `kms:Decrypt`.\n   - AWS KMS key policies are restrictive by default. Even an IAM Administrator cannot decrypt data unless the **KMS Key Policy** explicitly delegates permissions to the root account (`arn:aws:iam::123456789012:root`) or grants access to the engineer's role.\n   - **Fix:** Update KMS Key Policy to allow `kms:Decrypt` for the authorized role.\n\n2. **Inspect S3 Bucket Policy for Explicit Deny:**\n   - Run: `aws s3api get-bucket-policy --bucket company-audit-vault --query Policy -o text | jq .`\n   - Look for statements with `\"Effect\": \"Deny\"` (e.g. denying non-VPC requests or requiring HTTPS):\n     ```json\n     \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n     ```\n   - If sending plain HTTP requests or calling from outside an allowed VPC Endpoint, the Explicit Deny overrides all allows!\n\n3. **Check IAM Permissions Boundary:**\n   - In IAM Console -> Inspect the calling user/role -> **Permissions Boundary**.\n   - If a boundary is set, actions NOT allowed in the boundary are implicitly denied, even with `AdministratorAccess`.\n\n4. **Check AWS Organizations Service Control Policies (SCPs):**\n   - Check if an OU-level SCP restricts access to sensitive compliance vaults from specific developer accounts.\n\n5. **Verify Resolution:**\n   - Once `kms:Decrypt` is granted in KMS key policy and client uses HTTPS:\n     `aws s3 cp s3://company-audit-vault/2026/report.pdf . --sse aws:kms`\n   - Download succeeds with HTTP 200 OK.",
    "tagsJson": "[\"AWS IAM\",\"Amazon S3\",\"AWS KMS\",\"AccessDenied\",\"Security\"]",
    "hints": [
      "Hint 1: Check if the S3 bucket is encrypted with an AWS KMS Customer Managed Key (CMK). AdministratorAccess on S3 does not grant kms:Decrypt on CMKs with restrictive key policies!",
      "Hint 2: Inspect the S3 Bucket Policy for an Explicit Deny statement.",
      "Hint 3: Check if the AWS account belongs to an AWS Organization with a Service Control Policy (SCP) blocking S3 access.",
      "Hint 4: Check if the IAM user has a Permissions Boundary attached."
    ],
    "tags": [
      "AWS IAM",
      "Amazon S3",
      "AWS KMS",
      "AccessDenied",
      "Security"
    ]
  },
  {
    "id": "scen-41",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "title": "Scenario: Container Exits Immediately with Status Code 0 / No Output (Background vs Foreground PID 1 Process)",
    "difficulty": "Beginner",
    "prompt": "A developer builds an image for an Ubuntu-based microservice and runs: 'docker run -d --name my-app my-ubuntu-app:1.0'. The terminal outputs a container ID, indicating success. However, running 'docker ps' shows nothing running. Running 'docker ps -a' shows: 'STATUS: Exited (0) 3 seconds ago'. The developer checks logs with 'docker logs my-app' and sees no error messages or output. Why did the container exit immediately with code 0, and how do you fix it?",
    "explanation": "A Docker container lives only as long as its primary process (PID 1) continues running. If the startup script or command launches a background daemon and exits, or runs a shell without an interactive terminal, PID 1 terminates with exit code 0. Linux kernel namespaces and cgroups associated with the container are immediately reaped by the host kernel.",
    "hintsJson": "[\"Hint 1: Check PID 1 lifecycle in containers: when PID 1 exits, the entire container stops.\",\"Hint 2: Verify whether the container entrypoint runs a daemon in background mode (e.g. 'service nginx start') instead of foreground.\",\"Hint 3: Inspect the container exit status and command using 'docker inspect my-app --format \\\"{{.State.ExitCode}} {{.Config.Cmd}}\\\"'.\",\"Hint 4: For non-daemon containers like Ubuntu/Alpine, running without '-it' or a long-running process results in instant exit.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Diagnose the Container Lifecycle & Exit Code:**\n   - Run: `docker inspect my-app --format 'State: {{.State.Status}} | ExitCode: {{.State.ExitCode}} | Cmd: {{json .Config.Cmd}}'`\n   - Notice that Exit Code is `0`. In Linux, status code 0 indicates normal, successful execution. The process was not killed; it simply reached the end of its instructions and exited.\n\n2. **Understand the Root Cause (Container PID 1 Rule):**\n   - In a VM, init/systemd runs as PID 1 and manages multiple background daemons indefinitely.\n   - In a Docker container, the command specified in `CMD` or `ENTRYPOINT` runs directly as PID 1.\n   - If the Dockerfile specifies:\n     ```dockerfile\n     CMD [\"service\", \"nginx\", \"start\"]\n     ```\n     The `service` command spawns nginx as a background daemon, returns status code 0 to the shell, and the shell process terminates. Because PID 1 terminates, the Docker engine tears down the container.\n\n3. **Resolution Strategies for Foreground Execution:**\n   - **For Web Servers (Nginx / Apache):**\n     Configure the process to run in the foreground:\n     ```dockerfile\n     # WRONG: CMD [\"service\", \"nginx\", \"start\"]\n     # CORRECT:\n     CMD [\"nginx\", \"-g\", \"daemon off;\"]\n     ```\n   - **For Background Worker Scripts:**\n     Ensure your application script stays alive, listening for incoming events:\n     ```dockerfile\n     CMD [\"node\", \"worker.js\"] # or python -u app.py\n     ```\n   - **For Interactive Debugging / Base OS Containers:**\n     If running an interactive distribution like Ubuntu or Alpine for debugging, attach standard input and a pseudo-TTY:\n     ```bash\n     docker run -it --name debug-box ubuntu:22.04 bash\n     ```\n     Or if running in detached background mode:\n     ```bash\n     docker run -d --name bg-box ubuntu:22.04 sleep infinity\n     ```\n\n4. **Verification:**\n   - Relaunch with foreground command: `docker run -d --name my-app-fixed my-ubuntu-app:2.0`\n   - Run `docker ps` and verify status: `Up 45 seconds`.\n   - Run `docker top my-app-fixed` to confirm PID 1 is actively executing in the foreground.",
    "tagsJson": "[\"Docker\",\"PID 1\",\"Container Lifecycle\",\"Exit Code 0\",\"Daemon Off\"]",
    "hints": [
      "Hint 1: Check PID 1 lifecycle in containers: when PID 1 exits, the entire container stops.",
      "Hint 2: Verify whether the container entrypoint runs a daemon in background mode (e.g. 'service nginx start') instead of foreground.",
      "Hint 3: Inspect the container exit status and command using 'docker inspect my-app --format \"{{.State.ExitCode}} {{.Config.Cmd}}\"'.",
      "Hint 4: For non-daemon containers like Ubuntu/Alpine, running without '-it' or a long-running process results in instant exit."
    ],
    "tags": [
      "Docker",
      "PID 1",
      "Container Lifecycle",
      "Exit Code 0",
      "Daemon Off"
    ]
  },
  {
    "id": "scen-42",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "title": "Scenario: Unsecured TCP-Exposed Docker Daemon Exploitation & Privilege Escalation via Host Root Bind-Mount",
    "difficulty": "Advanced",
    "prompt": "During a security penetration test of your AWS cloud infrastructure, an auditor flags an unencrypted, public TCP port 2375 exposed on a production Docker host. Within 10 minutes, the auditor accesses the host's /etc/shadow file and leaves a test file in /root/audit.txt without having SSH credentials to the server. How did the attacker leverage the Docker daemon architecture to escalate privileges to root, and how do you harden the Docker daemon?",
    "explanation": "The Docker daemon (dockerd) runs with root privileges on the Linux host. By default, it communicates locally via the Unix domain socket /var/run/docker.sock. If dockerd is misconfigured to listen on an unauthenticated TCP socket (-H tcp://0.0.0.0:2375), any remote network client can instruct dockerd to spawn a container mounting the host's root directory ('-v /:/host-root'), granting immediate root write access over the entire host OS.",
    "hintsJson": "[\"Hint 1: Review Docker client-server architecture: the CLI speaks REST API to dockerd.\",\"Hint 2: Port 2375 is standard unencrypted Docker REST API; Port 2376 is encrypted TLS.\",\"Hint 3: Understand how volume mounts ('-v /:/host') break boundary isolation when the daemon runs as root.\",\"Hint 4: Inspect /etc/docker/daemon.json and systemd drop-in configuration files.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Security Remediation:\n\n1. **Analyze the Attack Vector (Daemon Remote Execution & Breakout):**\n   - The attacker ran from an external machine:\n     ```bash\n     docker -H tcp://<target-ip>:2375 run --rm -v /:/host-root alpine sh -c \"echo 'attacker_keys' >> /host-root/root/.ssh/authorized_keys\"\n     ```\n   - Because `dockerd` runs as root on the host, it created a mount namespace with the host's root filesystem mapped into `/host-root`. The container process had unrestricted write access to the host's `/etc/shadow`, crontabs, and system files.\n\n2. **Audit Open Sockets and Configuration Files:**\n   - Check listening ports on the host:\n     ```bash\n     sudo netstat -tlpn | grep dockerd\n     # Output: tcp 0 0 0.0.0.0:2375 0.0.0.0:* LISTEN 1184/dockerd\n     ```\n   - Inspect `/etc/docker/daemon.json` and systemd override:\n     ```bash\n     sudo cat /etc/docker/daemon.json\n     sudo systemctl cat docker.service\n     ```\n\n3. **Remediation Steps:**\n   - **Step 1: Remove Plain TCP Listener:**\n     Edit `/etc/docker/daemon.json` to restrict communication to the local Unix domain socket:\n     ```json\n     {\n       \"hosts\": [\"unix:///var/run/docker.sock\"]\n     }\n     ```\n   - **Step 2: If Remote Access is Required, Enforce Mutual TLS (mTLS on Port 2376):**\n     Generate CA, server, and client certificates, and configure `/etc/docker/daemon.json`:\n     ```json\n     {\n       \"hosts\": [\"unix:///var/run/docker.sock\", \"tcp://0.0.0.0:2376\"],\n       \"tlsverify\": true,\n       \"tlscacert\": \"/etc/docker/certs/ca.pem\",\n       \"tlscert\": \"/etc/docker/certs/server-cert.pem\",\n       \"tlskey\": \"/etc/docker/certs/server-key.pem\"\n     }\n     ```\n   - **Step 3: Enable User Namespaces (userns-remap):**\n     Add user namespace remapping in `/etc/docker/daemon.json` so root inside containers maps to an unprivileged UID (e.g. UID 100000) on the host:\n     ```json\n     {\n       \"userns-remap\": \"default\"\n     }\n     ```\n   - **Step 4: Reload and Restart Docker Engine:**\n     ```bash\n     sudo systemctl daemon-reload\n     sudo systemctl restart docker\n     ```\n\n4. **Verification:**\n   - Verify port 2375 is closed: `sudo netstat -tlpn | grep 2375` (no output).\n   - Test unauthorized remote connection: `docker -H tcp://<target-ip>:2375 info` -> `Cannot connect to the Docker daemon`.",
    "tagsJson": "[\"Docker Security\",\"dockerd\",\"Privilege Escalation\",\"Port 2375\",\"mTLS\",\"userns-remap\"]",
    "hints": [
      "Hint 1: Review Docker client-server architecture: the CLI speaks REST API to dockerd.",
      "Hint 2: Port 2375 is standard unencrypted Docker REST API; Port 2376 is encrypted TLS.",
      "Hint 3: Understand how volume mounts ('-v /:/host') break boundary isolation when the daemon runs as root.",
      "Hint 4: Inspect /etc/docker/daemon.json and systemd drop-in configuration files."
    ],
    "tags": [
      "Docker Security",
      "dockerd",
      "Privilege Escalation",
      "Port 2375",
      "mTLS",
      "userns-remap"
    ]
  },
  {
    "id": "scen-43",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "title": "Scenario: Alpine musl libc vs GNU glibc Dynamic Linker Incompatibility Crash in Python/Node C-Extensions",
    "difficulty": "Advanced",
    "prompt": "A DevOps team decides to migrate all company Python microservices from 'python:3.11-slim' (Debian-based, ~140MB) to 'python:3.11-alpine' (Alpine-based, ~50MB) to minimize container storage. While simple scripts run fine, microservices using pandas, numpy, and cryptography either crash on startup with 'Error loading shared library ld-linux-x86-64.so.2: No such file or directory' or increase CI build times from 3 minutes to 35 minutes during 'pip install'. What is the root cause, and how do you resolve it?",
    "explanation": "Alpine Linux uses musl libc, whereas mainstream Linux distributions (Ubuntu, Debian, RHEL) use GNU C Library (glibc). Most pre-compiled Python binary wheels on PyPI (manylinux wheels) link against glibc. On Alpine, pip cannot find compatible pre-compiled wheels, so it falls back to downloading source tarballs and compiling C/C++ extensions from scratch (requiring gcc, g++, make). If a compiled binary is directly copied into Alpine, it fails dynamically linking to ld-linux-x86-64.so.2.",
    "hintsJson": "[\"Hint 1: Inspect the C standard library implementation of Alpine Linux: musl libc vs glibc.\",\"Hint 2: Review PyPI manylinux wheels: they are compiled against glibc, not musl.\",\"Hint 3: Use 'ldd' inside the container on the compiled binary to inspect dynamic linker dependencies.\",\"Hint 4: Weigh image size savings (90MB) against build time penalty (30 mins of compiling) and runtime performance.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Diagnose the Dynamic Linker Error:**\n   - Run inside the Alpine container:\n     ```bash\n     docker run -it --rm python:3.11-alpine sh\n     / # python -c \"import numpy\"\n     # Traceback: ImportError: Error loading shared library ld-linux-x86-64.so.2: No such file or directory\n     ```\n   - Check the system C library:\n     ```bash\n     / # ldd /bin/sh\n     # /lib/ld-musl-x86_64.so.1 (0x7f...) -> musl libc!\n     ```\n\n2. **Understand the Build Penalty:**\n   - On Debian/Ubuntu (`python:3.11-slim`), `pip install pandas numpy` downloads pre-built `.whl` binary files in 5 seconds.\n   - On Alpine, pip detects musl and rejects `manylinux` binary wheels. It must download the full C/Fortran source code and compile on every build, requiring `gcc`, `g++`, `musl-dev`, and taking up to 30 minutes of CPU time. Furthermore, memory allocation algorithms in musl can cause Python scientific workloads to run 1.5x–2x slower.\n\n3. **Recommended Resolution Options:**\n   - **Industry Standard Solution (Recommended):**\n     Use Debian slim images for Python applications with native C-extensions or scientific libraries:\n     ```dockerfile\n     FROM python:3.11-slim\n     WORKDIR /app\n     COPY requirements.txt .\n     RUN pip install --no-cache-dir -r requirements.txt\n     COPY . .\n     USER 10001\n     CMD [\"python\", \"app.py\"]\n     ```\n     *Result:* Fast 10-second builds, instant pre-compiled wheel downloads, and native glibc performance.\n   - **Alternative (If Alpine is Mandated by Corporate Policy):**\n     Install Alpine's pre-compiled community packages or `gcompat` (glibc compatibility layer):\n     ```dockerfile\n     FROM python:3.11-alpine\n     RUN apk add --no-cache gcompat libstdc++\n     ```\n     Or install system packages directly via APK rather than compiling via PIP:\n     ```dockerfile\n     RUN apk add --no-cache py3-numpy py3-pandas py3-cryptography\n     ```\n\n4. **Verification:**\n   - Build image with `python:3.11-slim` and time the build:\n     ```bash\n     time docker build -t py-app:slim .\n     ```\n   - Verify build completes in under 30 seconds and runtime imports succeed without linker errors.",
    "tagsJson": "[\"Docker\",\"Alpine\",\"musl libc\",\"glibc\",\"Python\",\"Manylinux Wheels\"]",
    "hints": [
      "Hint 1: Inspect the C standard library implementation of Alpine Linux: musl libc vs glibc.",
      "Hint 2: Review PyPI manylinux wheels: they are compiled against glibc, not musl.",
      "Hint 3: Use 'ldd' inside the container on the compiled binary to inspect dynamic linker dependencies.",
      "Hint 4: Weigh image size savings (90MB) against build time penalty (30 mins of compiling) and runtime performance."
    ],
    "tags": [
      "Docker",
      "Alpine",
      "musl libc",
      "glibc",
      "Python",
      "Manylinux Wheels"
    ]
  },
  {
    "id": "scen-44",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "title": "Scenario: Accidental 'docker system prune -a' on Shared Host Deleting Pre-Cached Production Deployment Images",
    "difficulty": "Intermediate",
    "prompt": "An on-call DevOps engineer notices that a production host's root disk partition reached 92% disk utilization. To quickly free up disk space, the engineer SSHs into the server and runs: 'docker system prune -a --volumes'. The command frees 120GB of space. However, 15 minutes later, an automated CI/CD canary deployment begins. Instead of deploying in 30 seconds, the deployment times out after 15 minutes because every single microservice base image (Node, Java, Python, Nginx) has been erased and must be pulled across the internet simultaneously, saturating network bandwidth. What did '-a' do, and how do you implement safe Docker cleanup?",
    "explanation": "'docker system prune' removes only stopped containers, unused networks, and dangling images (untagged images showing as <none>). Adding the '-a' (--all) flag instructs Docker to delete ALL images not currently associated with a running container, including pre-cached production base images and previous release rollback images. Adding '--volumes' wipes any unattached persistent storage volumes.",
    "hintsJson": "[\"Hint 1: Differentiate between dangling images (<none>) vs unused images.\",\"Hint 2: Review the flags of 'docker system prune': -a removes ALL unused images, not just dangling ones.\",\"Hint 3: Understand how image caching protects CI/CD rollback and cold-start performance.\",\"Hint 4: Implement scheduled maintenance scripts with explicit filter flags.\"]",
    "recommendedSolution": "### Step-by-Step Incident Recovery & Preventative Maintenance:\n\n1. **Understand What Happened:**\n   - `docker system prune` (safe): Deletes stopped containers, unused networks, and dangling (`<none>`) images created during failed builds.\n   - `docker system prune -a` (destructive on shared hosts): Deletes every image not referenced by an active, running container. Rollback images and base images used by CI jobs are wiped.\n   - `--volumes` (high danger): Deletes any named volume not currently mounted by a container, risking data loss for stopped databases.\n\n2. **Immediate Remediation (Mitigate WAN Saturation):**\n   - Pull the required production base images sequentially rather than allowing simultaneous pulls to saturate the link:\n     ```bash\n     docker pull node:20-alpine\n     docker pull python:3.11-slim\n     docker pull nginx:alpine\n     ```\n\n3. **Implement Safe, Automated Docker Disk Maintenance:**\n   - **Rule 1: Never use `-a` in unattended cron jobs on production hosts.**\n   - **Rule 2: Prune only dangling images and stopped containers older than 24 hours:**\n     ```bash\n     # Clean stopped containers older than 24h\n     docker container prune --filter \"until=24h\" -f\n\n     # Clean only dangling (<none>) images\n     docker image prune -f\n\n     # Clean unused build cache older than 48h\n     docker builder prune --filter \"until=48h\" -f\n     ```\n   - **Rule 3: Protect Critical Images Using Labels:**\n     Tag key base images with a label to exempt them from pruning:\n     ```bash\n     docker image prune -a --filter \"label!=keep=true\" -f\n     ```\n\n4. **Address the Real Root Cause (Log Rotation):**\n   - In 90% of cases, Docker disk exhaustion is caused by unrotated JSON container logs in `/var/lib/docker/containers/*/*.log`.\n   - Configure global log rotation in `/etc/docker/daemon.json`:\n     ```json\n     {\n       \"log-driver\": \"json-file\",\n       \"log-opts\": {\n         \"max-size\": \"20m\",\n         \"max-file\": \"3\"\n       }\n     }\n     ```\n   - Reload daemon: `sudo systemctl restart docker`. Containers will now cap log consumption at 60MB maximum.",
    "tagsJson": "[\"Docker Maintenance\",\"docker system prune\",\"Dangling Images\",\"Disk Cleanup\",\"Log Rotation\"]",
    "hints": [
      "Hint 1: Differentiate between dangling images (<none>) vs unused images.",
      "Hint 2: Review the flags of 'docker system prune': -a removes ALL unused images, not just dangling ones.",
      "Hint 3: Understand how image caching protects CI/CD rollback and cold-start performance.",
      "Hint 4: Implement scheduled maintenance scripts with explicit filter flags."
    ],
    "tags": [
      "Docker Maintenance",
      "docker system prune",
      "Dangling Images",
      "Disk Cleanup",
      "Log Rotation"
    ]
  },
  {
    "id": "scen-45",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "title": "Scenario: Unintended Archive Auto-Extraction and Build Invalidation Bug Caused by ADD vs COPY in Production Dockerfile",
    "difficulty": "Beginner",
    "prompt": "An application requires an uncompressed tarball archive 'seed-dataset.tar.gz' to be placed at '/app/data/' so the application can verify its cryptographic checksum before running an internal ingestion script. The developer writes: 'ADD seed-dataset.tar.gz /app/data/'. When the container boots, the application crashes with 'FileNotFoundError: /app/data/seed-dataset.tar.gz not found'. Upon inspecting the container, the developer finds hundreds of extracted files in '/app/data/' instead of the tarball. Why did this happen, and what is the strict rule for ADD vs COPY?",
    "explanation": "The Dockerfile 'ADD' instruction has special built-in behavior: if the source is a recognized local compression format (tar, gzip, bzip2, xz), Docker automatically unpacks and decompresses the archive into the destination directory. Conversely, 'COPY' strictly copies files and directories byte-for-byte without extraction.",
    "hintsJson": "[\"Hint 1: Compare the feature differences between ADD and COPY in Dockerfiles.\",\"Hint 2: ADD auto-extracts local tar archives into the target directory.\",\"Hint 3: COPY copies the exact archive file as-is without touching its compression format.\",\"Hint 4: Docker official best practices recommend COPY in virtually all scenarios.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Identify the Ingestion Failure:**\n   - Inspect the container filesystem:\n     ```bash\n     docker run --rm my-app ls -la /app/data/\n     ```\n   - Notice that `seed-dataset.tar.gz` does not exist. Instead, the extracted contents (e.g. `table1.csv`, `table2.csv`) are present.\n   - The application expects the raw tarball to compute its SHA256 checksum against an S3 catalog entry before unzipping.\n\n2. **Differentiate ADD vs COPY Specifications:**\n   - **COPY (Recommended Standard):**\n     - Copies local files or directories from the build context into the container filesystem.\n     - Performs a literal, byte-for-byte copy.\n     - Preserves file structure and compression format.\n     - Highly predictable and cache-friendly.\n   - **ADD (Specialized / Discouraged for standard copies):**\n     - Automatically decompresses local tar archives (`.tar`, `.tar.gz`, `.tgz`, `.tar.bz2`).\n     - Supports downloading files from remote HTTP/HTTPS URLs (discouraged because it invalidates layer caching and creates bloated layers).\n\n3. **Resolution:**\n   - Update the Dockerfile to replace `ADD` with `COPY`:\n     ```dockerfile\n     # WRONG: Auto-extracts the tarball\n     # ADD seed-dataset.tar.gz /app/data/\n\n     # CORRECT: Copies the tarball intact\n     WORKDIR /app\n     COPY seed-dataset.tar.gz /app/data/\n     ```\n\n4. **Golden Rule of Thumb for Dockerfile Authors:**\n   - **Always use COPY by default.**\n   - Use ADD **only** when you specifically want Docker to extract a local tarball directly into the image rootfs (e.g. installing custom rootfs archives: `ADD rootfs.tar.xz /`).\n   - For remote files, avoid `ADD https://...`; use `RUN curl -sSL https://... | tar -xz -C /target` chained in a single layer to clean up the downloaded archive immediately.",
    "tagsJson": "[\"Docker\",\"Dockerfile\",\"ADD vs COPY\",\"Layer Optimization\",\"Best Practices\"]",
    "hints": [
      "Hint 1: Compare the feature differences between ADD and COPY in Dockerfiles.",
      "Hint 2: ADD auto-extracts local tar archives into the target directory.",
      "Hint 3: COPY copies the exact archive file as-is without touching its compression format.",
      "Hint 4: Docker official best practices recommend COPY in virtually all scenarios."
    ],
    "tags": [
      "Docker",
      "Dockerfile",
      "ADD vs COPY",
      "Layer Optimization",
      "Best Practices"
    ]
  },
  {
    "id": "scen-46",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "title": "Scenario: Service Name DNS Resolution Failure on Default Bridge Network vs User-Defined Custom Bridge",
    "difficulty": "Intermediate",
    "prompt": "A developer starts two containers manually for testing: 'docker run -d --name mysql-db -e MYSQL_ROOT_PASSWORD=secret mysql:8.0' and 'docker run -d --name backend-api my-api:1.0'. In the API configuration, DB_HOST is set to 'mysql-db'. The API container crashes on startup with: 'Error: getaddrinfo ENOTFOUND mysql-db'. However, running 'docker inspect mysql-db' reveals its IP is 172.17.0.2, and changing DB_HOST to 172.17.0.2 allows the API to connect. Why did DNS resolution fail by container name, and why is hardcoding IP addresses dangerous?",
    "explanation": "By default, containers attach to Docker's default bridge network ('docker0'). The default bridge does NOT have automatic container name DNS resolution enabled; it only supports obsolete '--link' syntax. In contrast, user-defined custom bridge networks provide an internal DNS server (127.0.0.11) that automatically resolves container names and service aliases.",
    "hintsJson": "[\"Hint 1: Check what network the containers joined: run 'docker inspect <container> --format \\\"{{json .NetworkSettings.Networks}}\\\"'.\",\"Hint 2: Understand the difference between the default 'bridge' network and user-defined bridge networks.\",\"Hint 3: Hardcoding container IPs fails because Docker assigns dynamic IPs on every container restart.\",\"Hint 4: Test name resolution from inside the container using 'nslookup' or 'ping'.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Diagnose the DNS Resolution Failure:**\n   - Execute an interactive lookup from inside the API container:\n     ```bash\n     docker exec -it backend-api ping mysql-db\n     # Output: ping: bad address 'mysql-db'\n     ```\n   - Check the network settings:\n     ```bash\n     docker network inspect bridge\n     ```\n   - Both containers are on the default bridge named `bridge`. On this default network, Docker disables its embedded DNS resolver.\n\n2. **Why Hardcoding 172.17.0.2 is a Production Anti-Pattern:**\n   - If `mysql-db` restarts, or if another container boots first after a server reboot, Docker allocates IP addresses sequentially.\n   - `mysql-db` may receive `172.17.0.3`, immediately breaking the API with connection refused.\n\n3. **Resolution: Create and Connect to a User-Defined Bridge Network:**\n   - **Step 1: Create a custom bridge network:**\n     ```bash\n     docker network create --driver bridge my-app-net\n     ```\n   - **Step 2: Connect the running containers to the new network:**\n     ```bash\n     docker network connect my-app-net mysql-db\n     docker network connect my-app-net backend-api\n     ```\n     *Or launch them on the custom network from the beginning:*\n     ```bash\n     docker run -d --name mysql-db --network my-app-net -e MYSQL_ROOT_PASSWORD=secret mysql:8.0\n     docker run -d --name backend-api --network my-app-net -e DB_HOST=mysql-db my-api:1.0\n     ```\n\n4. **Verify Embedded DNS Resolution:**\n   - Inspect container's nameserver:\n     ```bash\n     docker exec backend-api cat /etc/resolv.conf\n     # Output: nameserver 127.0.0.11 (Embedded Docker DNS Resolver)\n     ```\n   - Test resolution:\n     ```bash\n     docker exec backend-api ping -c 2 mysql-db\n     # 64 bytes from 172.18.0.2: icmp_seq=1 ttl=64 time=0.082 ms\n     ```\n   - The embedded DNS resolver at `127.0.0.11` dynamically tracks container IP reassignments and updates DNS records instantly.",
    "tagsJson": "[\"Docker Networking\",\"Bridge Network\",\"Docker DNS\",\"127.0.0.11\",\"Service Discovery\"]",
    "hints": [
      "Hint 1: Check what network the containers joined: run 'docker inspect <container> --format \"{{json .NetworkSettings.Networks}}\"'.",
      "Hint 2: Understand the difference between the default 'bridge' network and user-defined bridge networks.",
      "Hint 3: Hardcoding container IPs fails because Docker assigns dynamic IPs on every container restart.",
      "Hint 4: Test name resolution from inside the container using 'nslookup' or 'ping'."
    ],
    "tags": [
      "Docker Networking",
      "Bridge Network",
      "Docker DNS",
      "127.0.0.11",
      "Service Discovery"
    ]
  },
  {
    "id": "scen-47",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "title": "Scenario: Database Service Crash in Docker Compose Due to depends_on Started vs Ready Healthcheck Race Condition",
    "difficulty": "Intermediate",
    "prompt": "A microservices application is defined in docker-compose.yml. The web API service includes 'depends_on: - db'. When running 'docker compose up', both containers start simultaneously. However, the web API crashes after 3 seconds with 'ECONNREFUSED 172.20.0.2:5432' and restarts repeatedly. Running 'docker compose ps' shows db is Up (PostgreSQL is still generating initial cryptographic keys and schema tables). Why didn't depends_on prevent the API from crashing, and how do you implement a true readiness gate?",
    "explanation": "'depends_on' in Docker Compose controls only container startup order, NOT application readiness. Compose marks the database container as 'started' as soon as its PID 1 process begins executing. However, databases like PostgreSQL, MySQL, and MongoDB take 10–20 seconds to initialize filesystems, run migrations, and open their listening TCP sockets. Without healthcheck conditions, dependent services crash immediately.",
    "hintsJson": "[\"Hint 1: Understand the difference between container 'Running' state vs application 'Ready' state.\",\"Hint 2: Review Docker Compose V2 depends_on syntax: condition: service_healthy.\",\"Hint 3: Configure a database healthcheck instruction using 'pg_isready' or 'mysqladmin ping'.\",\"Hint 4: Observe container status in 'docker compose ps': check for '(health: starting)' vs '(healthy)'.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Understand the Startup Race Condition:**\n   - In `compose.yaml`:\n     ```yaml\n     services:\n       api:\n         depends_on:\n           - db\n     ```\n   - Docker Compose starts `db`. Within 100 milliseconds, `db` is in the 'Running' state.\n   - Compose immediately starts `api`.\n   - `api` initializes in 1 second and immediately tries to connect to `db:5432`.\n   - PostgreSQL is still executing its first-run initialization script (`initdb`, WAL replay) and has not bound port 5432.\n   - The TCP connection is actively refused, causing the API to exit.\n\n2. **Resolution: Implement Docker Healthchecks with depends_on Condition:**\n   - Update `compose.yaml` to add a native `healthcheck` to the database service and update `depends_on` on the API:\n     ```yaml\n     services:\n       db:\n         image: postgres:16-alpine\n         environment:\n           - POSTGRES_PASSWORD=secret\n         volumes:\n           - pgdata:/var/lib/postgresql/data\n         healthcheck:\n           test: [\"CMD-SHELL\", \"pg_isready -U postgres -d postgres\"]\n           interval: 5s\n           timeout: 3s\n           retries: 5\n           start_period: 10s\n\n       api:\n         build: .\n         ports:\n           - \"3000:3000\"\n         depends_on:\n           db:\n             condition: service_healthy\n         environment:\n           - DB_HOST=db\n\n     volumes:\n       pgdata:\n     ```\n\n3. **Key Parameters Explained:**\n   - `test`: Uses `pg_isready` utility included with PostgreSQL to test if the server is accepting client connections.\n   - `start_period: 10s`: Grace period allowing the container to boot without premature failure counts.\n   - `condition: service_healthy`: Explicitly blocks Docker Compose from launching `api` until `db` transitions from `(health: starting)` to `(healthy)`.\n\n4. **Verification:**\n   - Run: `docker compose up --build`\n   - Observe terminal logs:\n     1. `[+] Container db Starting`\n     2. `[+] Container db Waiting for healthy`\n     3. `[+] Container db Healthy`\n     4. `[+] Container api Starting`\n   - The API connects on the very first try with zero connection refused errors.",
    "tagsJson": "[\"Docker Compose\",\"depends_on\",\"HEALTHCHECK\",\"Race Conditions\",\"PostgreSQL\",\"Readiness\"]",
    "hints": [
      "Hint 1: Understand the difference between container 'Running' state vs application 'Ready' state.",
      "Hint 2: Review Docker Compose V2 depends_on syntax: condition: service_healthy.",
      "Hint 3: Configure a database healthcheck instruction using 'pg_isready' or 'mysqladmin ping'.",
      "Hint 4: Observe container status in 'docker compose ps': check for '(health: starting)' vs '(healthy)'."
    ],
    "tags": [
      "Docker Compose",
      "depends_on",
      "HEALTHCHECK",
      "Race Conditions",
      "PostgreSQL",
      "Readiness"
    ]
  },
  {
    "id": "scen-48",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "title": "Scenario: Data Loss Disaster Recovery After Accidental 'docker compose down -v' on Production Database",
    "difficulty": "Advanced",
    "prompt": "An operations engineer preparing for an application version upgrade runs 'docker compose down -v' to clean up before deploying the new version. After running 'docker compose up -d', the team discovers that all customer database records, user tables, and transaction histories have vanished—the PostgreSQL database started completely empty. What caused this disaster, how can the team recover, and what architectural safeguards prevent this permanently?",
    "explanation": "The '-v' (or '--volumes') flag in 'docker compose down' explicitly directs Docker to remove all named volumes declared in the 'volumes:' section of compose.yaml. When docker compose up runs subsequently, Docker creates brand-new, empty named volumes. Without pre-existing automated backups or external volume definitions, all data is permanently lost.",
    "hintsJson": "[\"Hint 1: Review the documentation for 'docker compose down -v': -v removes named volumes.\",\"Hint 2: Contrast 'docker compose down' (safe) vs 'docker compose down -v' (destructive).\",\"Hint 3: Explore the 'external: true' volume declaration in Docker Compose.\",\"Hint 4: Review disaster recovery steps using automated snapshots (AWS EBS) or database logical dumps.\"]",
    "recommendedSolution": "### Step-by-Step Incident Analysis & Architectural Safeguards:\n\n1. **Understand What Happened:**\n   - `docker compose down`: Stops containers and removes containers and networks. **Named volumes are preserved on disk** under `/var/lib/docker/volumes/`.\n   - `docker compose down -v`: **Destroys all named volumes and deletes all files inside them.**\n   - In production, running `-v` is equivalent to executing `rm -rf /var/lib/postgresql/data`.\n\n2. **Immediate Disaster Recovery Protocol:**\n   - **Step 1: Stop Writes Immediately:** Run `docker compose stop` to prevent new containers from writing empty templates over disk blocks.\n   - **Step 2: Check for AWS EBS Snapshots or pg_dump S3 Backups:**\n     If running on AWS EC2, check AWS Console for automated EBS Volume Snapshots or S3 backup buckets:\n     ```bash\n     aws s3 ls s3://company-db-backups/daily/\n     aws s3 cp s3://company-db-backups/daily/db-backup-2026-11-04.sql.gz .\n     ```\n   - **Step 3: Restore Database:**\n     Create a new volume, extract the SQL dump, and import:\n     ```bash\n     docker volume create db_restored\n     # Import database dump\n     gunzip -c db-backup-2026-11-04.sql.gz | docker run -i --rm -v db_restored:/var/lib/postgresql/data postgres:16-alpine psql -U postgres\n     ```\n\n3. **Architectural Safeguards to Prevent Recurrence Permanently:**\n   - **Safeguard 1: Mark Production Volumes as 'external: true' in Compose:**\n     ```yaml\n     services:\n       db:\n         image: postgres:16-alpine\n         volumes:\n           - prod_pgdata:/var/lib/postgresql/data\n\n     volumes:\n       prod_pgdata:\n         external: true # COMPOSE WILL REFUSE TO DELETE THIS VOLUME EVEN WITH -v!\n     ```\n     *How it works:* An external volume must be created beforehand with `docker volume create prod_pgdata`. If anyone runs `docker compose down -v`, Compose throws an error and refuses to delete external volumes.\n   - **Safeguard 2: CI/CD Pipeline Linting:**\n     Add a git pre-commit hook and CI lint check that fails any pull request or deployment script containing `compose down -v` or `compose down --volumes`.\n   - **Safeguard 3: Automated Nightly Backups:**\n     Run an automated sidecar container or cron job streaming compressed pg_dump archives to encrypted S3 with Object Lock (WORM).",
    "tagsJson": "[\"Docker Compose\",\"Data Loss\",\"Named Volumes\",\"Disaster Recovery\",\"external: true\",\"PostgreSQL\"]",
    "hints": [
      "Hint 1: Review the documentation for 'docker compose down -v': -v removes named volumes.",
      "Hint 2: Contrast 'docker compose down' (safe) vs 'docker compose down -v' (destructive).",
      "Hint 3: Explore the 'external: true' volume declaration in Docker Compose.",
      "Hint 4: Review disaster recovery steps using automated snapshots (AWS EBS) or database logical dumps."
    ],
    "tags": [
      "Docker Compose",
      "Data Loss",
      "Named Volumes",
      "Disaster Recovery",
      "external: true",
      "PostgreSQL"
    ]
  },
  {
    "id": "scen-49",
    "moduleNumber": 19,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "topicNumber": 1,
    "title": "Scenario: Kubernetes Cluster Outage Due to etcd Disk I/O Latency Spikes & Leader Election Thrashing",
    "difficulty": "Advanced",
    "prompt": "During a peak-traffic event on a production Kubernetes cluster bootstrapped via kubeadm, developers report that 'kubectl' commands hang for 30 seconds before failing with: 'Error from server: etcdserver: leader changed' and 'etcdserver: request timed out'. Pods are randomly terminated and rescheduled. What is happening inside the control plane, how do you diagnose etcd latency, and how do you restore cluster stability?",
    "explanation": "etcd uses the Raft consensus algorithm, which strictly requires low-latency disk writes for leader heartbeats (fsync < 10ms). If etcd shares a slow disk partition with heavy application logs or I/O-intensive workloads, write latency spikes cause follower nodes to miss heartbeat deadlines, triggering endless leader re-elections and freezing kube-apiserver read/write operations.",
    "hintsJson": "[\"Hint 1: Recall that etcd is the single source of truth; when etcd stalls, kube-apiserver stalls.\",\"Hint 2: Review Raft consensus leader election timeouts and fsync disk latency thresholds.\",\"Hint 3: Check etcd container logs with 'kubectl logs -n kube-system etcd-<control-plane>'.\",\"Hint 4: Dedicate high-performance NVMe / provisioned IOPS SSD storage exclusively to etcd.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Control Plane Recovery:\n\n1. **Inspect Control Plane & etcd Logs:**\n   - Check the etcd pod logs in the `kube-system` namespace:\n     ```bash\n     kubectl logs -n kube-system -l component=etcd --tail=100\n     # Logs show:\n     # \"etcdserver: read-only range request ... took too long (1.2s) to execute\"\n     # \"etcdserver: server is likely overloaded\"\n     # \"raft: leader changed\"\n     ```\n   - Check API server response:\n     ```bash\n     kubectl get nodes\n     # Error from server (Timeout): context deadline exceeded\n     ```\n\n2. **Diagnose Host Disk I/O Performance:**\n   - On the control-plane host, run:\n     ```bash\n     iostat -xz 1 5\n     # Check %util and await times on the etcd mount point\n     ```\n   - If disk `await` exceeds 10ms or disk utilization is near 100%, etcd cannot fsync WAL (Write-Ahead Log) records to disk within the Raft heartbeat interval (100ms).\n\n3. **Remediation & Architectural Hardening:**\n   - **Step 1: Dedicate Fast NVMe / SSD Storage to etcd:**\n     In production, never run etcd on spinning hard drives or standard cloud storage with low IOPS (e.g., standard AWS gp2). Use dedicated NVMe or AWS EBS `gp3`/`io2` with at least 3,000 baseline IOPS.\n   - **Step 2: Isolate Control Plane Nodes:**\n     Ensure control plane nodes have taints preventing application workloads from scheduling alongside etcd:\n     ```bash\n     kubectl taint nodes <control-plane-node> node-role.kubernetes.io/control-plane:NoSchedule --overwrite\n     ```\n   - **Step 3: Tune etcd Heartbeat & Election Timeouts:**\n     If network latency or cloud disk latency cannot be reduced below 10ms, tune etcd parameters in `/etc/kubernetes/manifests/etcd.yaml`:\n     ```yaml\n     - --heartbeat-interval=250\n     - --election-timeout=1250\n     ```\n   - **Step 4: Take Immediate Snapshot Backup:**\n     ```bash\n     ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \\\n       --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n       --cert=/etc/kubernetes/pki/etcd/server.crt \\\n       --key=/etc/kubernetes/pki/etcd/server.key \\\n       snapshot save /var/backups/etcd-snapshot-$(date +%F).db\n     ```",
    "tagsJson": "[\"Kubernetes\",\"etcd\",\"Control Plane\",\"Raft Consensus\",\"Troubleshooting\",\"Disk I/O\"]",
    "hints": [
      "Hint 1: Recall that etcd is the single source of truth; when etcd stalls, kube-apiserver stalls.",
      "Hint 2: Review Raft consensus leader election timeouts and fsync disk latency thresholds.",
      "Hint 3: Check etcd container logs with 'kubectl logs -n kube-system etcd-<control-plane>'.",
      "Hint 4: Dedicate high-performance NVMe / provisioned IOPS SSD storage exclusively to etcd."
    ],
    "tags": [
      "Kubernetes",
      "etcd",
      "Control Plane",
      "Raft Consensus",
      "Troubleshooting",
      "Disk I/O"
    ]
  },
  {
    "id": "scen-50",
    "moduleNumber": 19,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "topicNumber": 1,
    "title": "Scenario: Pods Stuck in 'ContainerCreating' After Bootstrapping Cluster via kubeadm (Missing CNI Network Plugin)",
    "difficulty": "Beginner",
    "prompt": "An engineer bootstraps a new Kubernetes cluster using 'sudo kubeadm init --pod-network-cidr=10.244.0.0/16' and successfully joins two worker nodes. Running 'kubectl get nodes' shows all nodes in 'NotReady' status. When applying a test Pod, the Pod stays indefinitely in 'ContainerCreating' status with events: 'networkPlugin cni failed to set up pod network: network plugin is not ready: cni config uninitialized'. What critical post-installation step was missed, and how do you resolve it?",
    "explanation": "kubeadm only initializes the control plane and node registration; it does NOT include a Container Network Interface (CNI) plugin. Without a CNI plugin (like Flannel, Calico, or Cilium) installed, worker nodes cannot configure virtual interfaces (veth pairs), assign Pod IPs, or establish routing. Nodes remain in 'NotReady' and Pods stay stuck in 'ContainerCreating'.",
    "hintsJson": "[\"Hint 1: Check node status via 'kubectl get nodes'; why are they NotReady?\",\"Hint 2: Review kubeadm init documentation: what networking component must be applied immediately after init?\",\"Hint 3: Inspect pod events via 'kubectl describe pod <name>' and look for CNI uninitialized errors.\",\"Hint 4: Apply a CNI plugin manifest matching the pod-network-cidr configured during init.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Verify the Problem Symptoms:**\n   - Check node status:\n     ```bash\n     kubectl get nodes\n     # NAME        STATUS     ROLES           AGE   VERSION\n     # master-1    NotReady   control-plane   5m    v1.30.0\n     # worker-1    NotReady   <none>          3m    v1.30.0\n     ```\n   - Check Pod status and events:\n     ```bash\n     kubectl get pods\n     # NAME       READY   STATUS              RESTARTS   AGE\n     # test-pod   0/1     ContainerCreating   0          2m\n     kubectl describe pod test-pod\n     # Warning FailedCreatePodSandBox: networkPlugin cni failed to set up pod network: network plugin is not ready: cni config uninitialized\n     ```\n\n2. **Understand the Root Cause:**\n   - Kubernetes requires a CNI-compliant network plugin to implement the cluster-wide flat network.\n   - kubeadm deliberately delegates CNI selection to the cluster administrator so users can choose Flannel (simple VXLAN), Calico (BGP routing & NetworkPolicies), or Cilium (eBPF).\n   - Until a CNI daemonset runs on every node, `/etc/cni/net.d/` is empty, and the kubelet refuses to transition nodes to Ready.\n\n3. **Resolution: Apply a CNI Plugin Manifest:**\n   - For Flannel (matching `--pod-network-cidr=10.244.0.0/16`):\n     ```bash\n     kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml\n     ```\n   - For Calico (alternative enterprise CNI):\n     ```bash\n     kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.0/manifests/calico.yaml\n     ```\n\n4. **Verification:**\n   - Wait 30 seconds and check nodes again:\n     ```bash\n     kubectl get nodes\n     # master-1    Ready   control-plane   6m    v1.30.0\n     # worker-1    Ready   <none>          4m    v1.30.0\n     ```\n   - Verify the test Pod immediately transitions to Running:\n     ```bash\n     kubectl get pods -o wide\n     # test-pod   1/1     Running   0     30s   10.244.1.2   worker-1\n     ```",
    "tagsJson": "[\"Kubernetes\",\"kubeadm\",\"CNI\",\"Flannel\",\"ContainerCreating\",\"NotReady\"]",
    "hints": [
      "Hint 1: Check node status via 'kubectl get nodes'; why are they NotReady?",
      "Hint 2: Review kubeadm init documentation: what networking component must be applied immediately after init?",
      "Hint 3: Inspect pod events via 'kubectl describe pod <name>' and look for CNI uninitialized errors.",
      "Hint 4: Apply a CNI plugin manifest matching the pod-network-cidr configured during init."
    ],
    "tags": [
      "Kubernetes",
      "kubeadm",
      "CNI",
      "Flannel",
      "ContainerCreating",
      "NotReady"
    ]
  },
  {
    "id": "scen-51",
    "moduleNumber": 19,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "topicNumber": 2,
    "title": "Scenario: Kubernetes Service Endpoints Empty — Traffic Silently Dropped Due to Label Selector Mismatch",
    "difficulty": "Beginner",
    "prompt": "A developer deploys a microservice using a Deployment and exposes it with a ClusterIP Service. When another microservice tries to communicate with 'http://payment-service:8080', all requests time out or fail with 'connection refused'. The developer runs 'kubectl get pods' and verifies all 3 payment Pods are in the 'Running' state. Why is the Service dropping traffic, and how do you systematically diagnose and fix it?",
    "explanation": "A Kubernetes Service does not track Pods by name or deployment reference; it uses Label Selectors ('spec.selector') to dynamically discover backing Pods. If there is a typo or mismatch between the Service's selector (e.g. 'app: payment-api') and the Pod's labels (e.g. 'app: payment'), the EndpointsController cannot match them, resulting in an empty EndpointSlice and silent traffic drops.",
    "hintsJson": "[\"Hint 1: Check whether the Service has active endpoints: 'kubectl get endpoints <service-name>'.\",\"Hint 2: Compare the Service's 'spec.selector' with the Deployment's 'spec.template.metadata.labels'.\",\"Hint 3: Label matching is case-sensitive and must match keys and values identically.\",\"Hint 4: Use 'kubectl get pods --show-labels' to view all labels attached to running Pods.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Check the Service Endpoints (The Decisive Diagnostic Step):**\n   - Run:\n     ```bash\n     kubectl get endpoints payment-service\n     # NAME              ENDPOINTS   AGE\n     # payment-service   <none>      5m\n     ```\n   - Notice that `ENDPOINTS` is **<none>**.\n   - If a Service has no endpoints, kube-proxy has no destination Pod IPs to program into iptables, and all traffic sent to the ClusterIP is discarded.\n\n2. **Inspect the Service Selector vs Pod Labels:**\n   - Query the Service selector:\n     ```bash\n     kubectl get svc payment-service -o jsonpath='{.spec.selector}'\n     # Output: {\"app\":\"payment-api\"}\n     ```\n   - Query the labels of the running Pods:\n     ```bash\n     kubectl get pods --show-labels -l app=payment\n     # NAME                           READY   STATUS    LABELS\n     # payment-deploy-79f8b78-abcde   1/1     Running   app=payment,version=v1\n     ```\n   - **Root Cause Identified:** The Service is looking for `app: payment-api`, but the Pods are labeled `app: payment`.\n\n3. **Resolution:**\n   - Edit the Service manifest to align the selector with the Pod labels:\n     ```yaml\n     apiVersion: v1\n     kind: Service\n     metadata:\n       name: payment-service\n     spec:\n       type: ClusterIP\n       selector:\n         app: payment # MATCHES POD TEMPLATE LABELS EXACTLY\n       ports:\n       - port: 8080\n         targetPort: 8080\n     ```\n   - Re-apply the manifest:\n     ```bash\n     kubectl apply -f service.yaml\n     ```\n\n4. **Verification:**\n   - Query endpoints again:\n     ```bash\n     kubectl get endpoints payment-service\n     # NAME              ENDPOINTS                                         AGE\n     # payment-service   10.244.1.15:8080,10.244.2.8:8080,10.244.2.9:8080   6m\n     ```\n   - Endpoints are populated with the 3 Pod IPs. Re-test network connectivity from another Pod; requests succeed with HTTP 200 OK.",
    "tagsJson": "[\"Kubernetes\",\"Service\",\"Endpoints\",\"Label Selector\",\"Debugging\",\"ClusterIP\"]",
    "hints": [
      "Hint 1: Check whether the Service has active endpoints: 'kubectl get endpoints <service-name>'.",
      "Hint 2: Compare the Service's 'spec.selector' with the Deployment's 'spec.template.metadata.labels'.",
      "Hint 3: Label matching is case-sensitive and must match keys and values identically.",
      "Hint 4: Use 'kubectl get pods --show-labels' to view all labels attached to running Pods."
    ],
    "tags": [
      "Kubernetes",
      "Service",
      "Endpoints",
      "Label Selector",
      "Debugging",
      "ClusterIP"
    ]
  },
  {
    "id": "scen-52",
    "moduleNumber": 19,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "topicNumber": 2,
    "title": "Scenario: Clustered Database Corrupted on Reschedule Because It Was Deployed as a Deployment Instead of a StatefulSet",
    "difficulty": "Advanced",
    "prompt": "A software team deploys a 3-node MongoDB replica set using a standard Kubernetes Deployment with 'replicas: 3' and a shared PersistentVolume. Following a node failure, Kubernetes recreates the crashed Pod on a new node with a new random name 'mongo-7f9a8b-x7z2q'. The new Pod cannot join the replica set, claims the lock on the shared volume, and corrupts the database catalog. Why did a Deployment fail for this stateful workload, and how does a StatefulSet resolve it?",
    "explanation": "Deployments treat Pods as interchangeable, stateless cattle: Pod names are random, IPs are dynamic, and all Pods share the same volume declaration. Stateful databases (MongoDB, PostgreSQL, Kafka) require unique stable network identities (mongo-0, mongo-1), predictable startup/shutdown ordering, and dedicated, separate persistent volumes per instance (via volumeClaimTemplates). Deploying a clustered database via a Deployment leads to split-brain and storage corruption.",
    "hintsJson": "[\"Hint 1: Contrast the lifecycle of stateless applications (interchangeable) with stateful applications (persistent identity).\",\"Hint 2: Review StatefulSet features: predictable pod names (web-0, web-1) and volumeClaimTemplates.\",\"Hint 3: Understand Headless Services (clusterIP: None) and DNS records for individual stateful Pods.\",\"Hint 4: Why does a shared PVC mounted by multiple Deployment pods corrupt database transaction logs?\"]",
    "recommendedSolution": "### Architectural Analysis & StatefulSet Remediation:\n\n#### 1. Why Deployments are Unsuitable for Clustered Databases:\n- **Random Pod Names:** In a Deployment, Pods have names like `mongo-64f7b8c7-4m8pk`. When a Pod restarts, it gets a completely new random name, breaking peer discovery in distributed consensus groups.\n- **Shared Storage Hazard:** A Deployment attaches the same PVC to all replica pods. Multiple database instances attempting to write to the same data directory will corrupt transaction journals.\n- **Uncontrolled Startup:** Deployments create and terminate replicas in parallel, which crashes databases requiring primary-before-secondary initialization.\n\n#### 2. The StatefulSet Architectural Solution:\nA `StatefulSet` provides 3 strict guarantees required by stateful applications:\n1. **Predictable, Stable Hostnames:** Pods are numbered from 0 to N-1 (`mongo-0`, `mongo-1`, `mongo-2`). When `mongo-1` crashes, its replacement is guaranteed to be named `mongo-1`.\n2. **Dedicated Per-Pod Storage (volumeClaimTemplates):** Each Pod receives its own dedicated, unshared PersistentVolumeClaim (e.g. `data-mongo-0`, `data-mongo-1`). Even if `mongo-1` is rescheduled to another node, its dedicated storage volume follows it.\n3. **Headless Service DNS Discovery:** Coupled with a headless service (`clusterIP: None`), CoreDNS registers individual DNS A-records for each pod (`mongo-0.mongo-service.default.svc.cluster.local`).\n\n#### 3. Production StatefulSet Specification:\n```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: mongo-headless\nspec:\n  clusterIP: None # HEADLESS SERVICE\n  selector:\n    app: mongo\n  ports:\n  - port: 27017\n    name: mongo\n---\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: mongo\nspec:\n  serviceName: \"mongo-headless\"\n  replicas: 3\n  selector:\n    matchLabels:\n      app: mongo\n  template:\n    metadata:\n      labels:\n        app: mongo\n    spec:\n      containers:\n      - name: mongodb\n        image: mongo:6.0\n        ports:\n        - containerPort: 27017\n        volumeMounts:\n        - name: data\n          mountPath: /data/db\n  volumeClaimTemplates: # DEDICATED PVC CREATED PER POD!\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ \"ReadWriteOnce\" ]\n      resources:\n        requests:\n          storage: 20Gi\n```\n\n4. **Verification:**\n   - Check Pod names: `kubectl get pods -l app=mongo` -> `mongo-0`, `mongo-1`, `mongo-2`.\n   - Check PVCs: `kubectl get pvc` -> `data-mongo-0`, `data-mongo-1`, `data-mongo-2` (independent storage).",
    "tagsJson": "[\"Kubernetes\",\"StatefulSet\",\"Deployment\",\"volumeClaimTemplates\",\"Headless Service\",\"Database\"]",
    "hints": [
      "Hint 1: Contrast the lifecycle of stateless applications (interchangeable) with stateful applications (persistent identity).",
      "Hint 2: Review StatefulSet features: predictable pod names (web-0, web-1) and volumeClaimTemplates.",
      "Hint 3: Understand Headless Services (clusterIP: None) and DNS records for individual stateful Pods.",
      "Hint 4: Why does a shared PVC mounted by multiple Deployment pods corrupt database transaction logs?"
    ],
    "tags": [
      "Kubernetes",
      "StatefulSet",
      "Deployment",
      "volumeClaimTemplates",
      "Headless Service",
      "Database"
    ]
  },
  {
    "id": "scen-53",
    "moduleNumber": 19,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "topicNumber": 3,
    "title": "Scenario: Deployment Rollout Stuck with New Pods in CrashLoopBackOff — Rapid Rollback Strategy",
    "difficulty": "Intermediate",
    "prompt": "A CI/CD pipeline triggers an automated rolling update on a mission-critical e-commerce Deployment using: 'kubectl set image deployment/checkout-api web=checkout-api:v2.4.1'. Immediately, end-users report checkout failures. Running 'kubectl get pods' reveals 2 new Pods in 'CrashLoopBackOff' due to a null-pointer exception, while 2 old v2.4.0 Pods are still struggling under load. What is the fastest command to restore full service, and what prevents future stuck rollouts?",
    "explanation": "Executing 'kubectl rollout undo deployment/checkout-api' immediately aborts the rolling update and reverses the rollout by scaling the previous (still-retained) ReplicaSet back up and the broken new ReplicaSet down. To prevent broken releases from serving user traffic, configure Readiness Probes: Kubernetes will not route traffic to new Pods or terminate old Pods until the new Pod passes its readiness check.",
    "hintsJson": "[\"Hint 1: Do not attempt to debug code while customers are experiencing an outage; roll back first.\",\"Hint 2: Run 'kubectl rollout undo' to scale the previous ReplicaSet back up instantly.\",\"Hint 3: Understand how Readiness Probes prevent bad Pods from receiving Service traffic during a rollout.\",\"Hint 4: Review rollout parameters: maxUnavailable and maxSurge.\"]",
    "recommendedSolution": "### Incident Response & Rollback Protocol:\n\n1. **Immediate Action: Abort & Roll Back Service:**\n   - Execute the rollback command immediately:\n     ```bash\n     kubectl rollout undo deployment/checkout-api\n     ```\n   - Monitor the rollback completion:\n     ```bash\n     kubectl rollout status deployment/checkout-api\n     # Output: deployment \"checkout-api\" successfully rolled out\n     ```\n   - **Why this works instantly:** Kubernetes does not delete the old ReplicaSet during a rolling update; it keeps it scaled to 0. Rolling back simply scales the old ReplicaSet back up to full replica count and terminates the broken pods.\n\n2. **Verify Restored Service:**\n   - Check that all pods are running the previous known-good version:\n     ```bash\n     kubectl get pods -l app=checkout-api\n     # All 4 replicas in Running state\n     ```\n\n3. **Post-Mortem Root Cause Analysis:**\n   - Inspect the logs of the failed container from the crashed ReplicaSet:\n     ```bash\n     kubectl logs <crashed-pod-name> --previous\n     ```\n   - Identify the unhandled exception or missing environment variable in v2.4.1.\n\n4. **Architectural Safeguards to Prevent Future Outages:**\n   - **Add a Readiness Probe:**\n     Without a readiness probe, Kubernetes assumes a container is healthy the moment its process starts. Configure an HTTP readiness probe:\n     ```yaml\n     readinessProbe:\n       httpGet:\n         path: /healthz\n         port: 8080\n       initialDelaySeconds: 5\n       periodSeconds: 5\n     ```\n     *How this protects you:* If v2.4.1 crashes or fails the health check, the Readiness probe fails. Kubernetes **stops the rollout**, never routes traffic to the broken pod, and never terminates the healthy v2.4.0 pods.\n   - **Set maxUnavailable: 0:**\n     ```yaml\n     strategy:\n       rollingUpdate:\n         maxSurge: 1\n         maxUnavailable: 0\n     ```\n     Guarantees 100% of required healthy capacity is maintained at all times.",
    "tagsJson": "[\"Kubernetes\",\"Rollout\",\"Rollback\",\"CrashLoopBackOff\",\"ReadinessProbe\",\"Zero Downtime\"]",
    "hints": [
      "Hint 1: Do not attempt to debug code while customers are experiencing an outage; roll back first.",
      "Hint 2: Run 'kubectl rollout undo' to scale the previous ReplicaSet back up instantly.",
      "Hint 3: Understand how Readiness Probes prevent bad Pods from receiving Service traffic during a rollout.",
      "Hint 4: Review rollout parameters: maxUnavailable and maxSurge."
    ],
    "tags": [
      "Kubernetes",
      "Rollout",
      "Rollback",
      "CrashLoopBackOff",
      "ReadinessProbe",
      "Zero Downtime"
    ]
  },
  {
    "id": "scen-54",
    "moduleNumber": 19,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "topicNumber": 3,
    "title": "Scenario: Horizontal Pod Autoscaler (HPA) Showing 'TARGETS: <unknown>/50%' and Failing to Scale During Traffic Surge",
    "difficulty": "Intermediate",
    "prompt": "Anticipating a flash sale, a DevOps engineer creates an HPA targeting 50% CPU for a shopping cart Deployment. During the sale, traffic spikes by 500%, but the Deployment remains fixed at 2 replicas. Response times degrade from 200ms to 12 seconds. Running 'kubectl get hpa' displays: 'TARGETS: <unknown>/50%, MINPODS: 2, MAXPODS: 10, REPLICAS: 2'. Why is HPA unable to calculate CPU metrics, and how do you resolve it?",
    "explanation": "HPA calculates percentage utilization by dividing actual CPU consumption by the container's configured CPU 'requests' (e.g. actual 100m / requested 200m = 50%). If the target Deployment's containers lack 'resources.requests.cpu', HPA has no denominator to calculate a percentage. Additionally, HPA requires the Metrics Server cluster add-on to collect live resource telemetry; if Metrics Server is missing or unhealthy, metrics report as '<unknown>'.",
    "hintsJson": "[\"Hint 1: Check if the Metrics Server is functioning by testing 'kubectl top pods'.\",\"Hint 2: Review the HPA formula: utilization % = (current CPU usage / requested CPU) * 100.\",\"Hint 3: Inspect the Deployment manifest: are 'resources.requests' defined for all containers?\",\"Hint 4: Review HPA events via 'kubectl describe hpa <name>'.\"]",
    "recommendedSolution": "### Step-by-Step Diagnostic & Resolution Methodology:\n\n1. **Diagnose the HPA Status & Events:**\n   - Describe the HPA resource:\n     ```bash\n     kubectl describe hpa cart-hpa\n     # Conditions:\n     # Type           Status  Reason\n     # ScalingActive  False   FailedGetResourceMetric\n     # Message: missing request for cpu on container cart-service\n     ```\n   - The message explicitly identifies the root cause: `missing request for cpu`.\n\n2. **Verify Metrics Server Health:**\n   - Test if the cluster is collecting metrics:\n     ```bash\n     kubectl top pods\n     ```\n   - If `kubectl top` errors with \"Metrics API not available\", install or fix the Metrics Server:\n     ```bash\n     kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml\n     ```\n\n3. **Resolution: Add Container Resource Requests to Deployment:**\n   - Edit the Deployment manifest to specify both `requests` and `limits`:\n     ```yaml\n     apiVersion: apps/v1\n     kind: Deployment\n     metadata:\n       name: cart-deployment\n     spec:\n       template:\n         spec:\n           containers:\n           - name: cart-service\n             image: cart:v1\n             resources:\n               requests:\n                 cpu: \"200m\"      # BASELINE FOR HPA PERCENTAGE CALCULATION!\n                 memory: \"256Mi\"\n               limits:\n                 cpu: \"500m\"\n                 memory: \"512Mi\"\n     ```\n   - Apply the updated Deployment:\n     ```bash\n     kubectl apply -f cart-deployment.yaml\n     ```\n\n4. **Verify HPA Dynamic Autoscaling:**\n   - Check HPA status after 30 seconds:\n     ```bash\n     kubectl get hpa cart-hpa\n     # NAME       REFERENCE                    TARGETS   MINPODS  MAXPODS  REPLICAS\n     # cart-hpa   Deployment/cart-deployment   78%/50%   2        10       4\n     ```\n   - `TARGETS` now reports real metrics (78%/50%), and HPA has automatically scaled replicas from 2 to 4 to handle the traffic load.",
    "tagsJson": "[\"Kubernetes\",\"HPA\",\"Metrics Server\",\"Autoscaling\",\"Resource Requests\",\"kubectl top\"]",
    "hints": [
      "Hint 1: Check if the Metrics Server is functioning by testing 'kubectl top pods'.",
      "Hint 2: Review the HPA formula: utilization % = (current CPU usage / requested CPU) * 100.",
      "Hint 3: Inspect the Deployment manifest: are 'resources.requests' defined for all containers?",
      "Hint 4: Review HPA events via 'kubectl describe hpa <name>'."
    ],
    "tags": [
      "Kubernetes",
      "HPA",
      "Metrics Server",
      "Autoscaling",
      "Resource Requests",
      "kubectl top"
    ]
  },
  {
    "id": "scen-55",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "title": "Scenario: Unexpected Monthly Billing Despite All EC2 Instances Being Stopped",
    "difficulty": "Beginner",
    "prompt": "A student developer creates an AWS Free Tier account, launches an EC2 instance with an attached 80 GB EBS volume and an Elastic IP for testing, and 'stops' the instance at the end of the day. At the end of the month, their credit card is charged $18.50. The student is shocked: 'My instance was stopped 95% of the month! Why did AWS charge me, and how do I prevent this?'",
    "explanation": "This scenario exposes the two most common beginner billing traps: (1) Stopping an EC2 instance halts hourly compute ($0/hr), but the underlying Elastic Block Store (EBS) volume continues to incur monthly storage fees ($0.08-$0.10/GB/month beyond the 30 GB free tier), and (2) AWS charges an hourly penalty fee for unattached Elastic IPs (~$0.005/hr).",
    "hintsJson": "[\"Does stopping an EC2 virtual machine delete its attached hard drive (EBS volume)?\",\"What is the maximum EBS storage capacity included in the AWS Free Tier (30 GB)?\",\"Does AWS charge for Elastic IP addresses when they are NOT associated with a running instance?\",\"What command releases an unassociated Elastic IP back to AWS?\"]",
    "recommendedSolution": "### Root Cause Analysis & Resolution:\n\n#### 1. The Two Underlying Root Causes:\n1. **The Stopped Instance Storage Trap:**\n   - Stopping an EC2 instance halts virtual CPU and RAM billing.\n   - However, the **EBS Volume (80 GB)** remains provisioned on AWS SAN hardware holding the operating system and data.\n   - The AWS Free Tier provides **30 GB** of free EBS storage.\n   - Billed EBS Storage: $80\\text{ GB} - 30\\text{ GB} = \\mathbf{50\\text{ GB billable storage}}$ at ~\\$0.10/GB = **\\$5.00/month**.\n2. **The Unattached Elastic IP Address Penalty:**\n   - IPv4 public addresses are scarce. AWS allows 1 free Elastic IP **only while attached to a running instance**.\n   - When the instance is stopped, the Elastic IP becomes **unattached**.\n   - AWS bills unattached Elastic IPs at **\\$0.005 per hour**:\n     $$720\\text{ hours} \\times \\$0.005 = \\mathbf{\\$3.60/month}$$\n\n#### 2. Diagnostic CLI Commands:\n```bash\n# 1. Identify all unattached Elastic IPs incurring hourly penalties:\naws ec2 describe-addresses --query 'Addresses[?InstanceId==null].{IP:PublicIp,AllocId:AllocationId}' --output table\n\n# 2. Identify all provisioned EBS volumes exceeding Free Tier:\naws ec2 describe-volumes --query 'Volumes[*].{ID:VolumeId,Size:Size,State:State,Type:VolumeType}' --output table\n```\n\n#### 3. Step-by-Step Resolution:\n1. **Release the Unattached Elastic IP:**\n   ```bash\n   aws ec2 release-address --allocation-id <AllocationId>\n   ```\n2. **Terminate the Instance or Downsize EBS Volume:**\n   - If the instance is no longer needed, terminate it:\n     ```bash\n     aws ec2 terminate-instances --instance-ids <InstanceId>\n     ```\n   - Delete any remaining unattached volumes:\n     ```bash\n     aws ec2 delete-volume --volume-id <VolumeId>\n     ```\n3. **Deploy a $1.00 Budget Guardrail:**\n   - Navigate to **AWS Billing -> Budgets** and configure a monthly $1.00 spending threshold to catch unexpected fees immediately.",
    "tagsJson": "[\"AWS Account\",\"Free Tier\",\"Billing\",\"EC2\",\"EBS\",\"Elastic IP\",\"Cost Optimization\"]",
    "hints": [
      "Does stopping an EC2 virtual machine delete its attached hard drive (EBS volume)?",
      "What is the maximum EBS storage capacity included in the AWS Free Tier (30 GB)?",
      "Does AWS charge for Elastic IP addresses when they are NOT associated with a running instance?",
      "What command releases an unassociated Elastic IP back to AWS?"
    ],
    "tags": [
      "AWS Account",
      "Free Tier",
      "Billing",
      "EC2",
      "EBS",
      "Elastic IP",
      "Cost Optimization"
    ]
  },
  {
    "id": "scen-56",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "title": "Scenario: New Account Creation Blocked with 'Free Tier Ineligible' Status",
    "difficulty": "Intermediate",
    "prompt": "An engineer in Bengaluru creates a brand-new AWS account using a fresh personal email (newdeveloper2026@gmail.com). Upon entering the console and navigating to the Billing Dashboard, the Free Tier section reports: 'Status: Free Tier Ineligible — standard On-Demand pricing applies'. The engineer insists: 'This is a brand new email address that has never touched AWS before! Why is my account flagged as ineligible, and how do I fix it?'",
    "explanation": "AWS uses an advanced multi-factor identity and fraud detection engine. A new email address alone does NOT qualify for a new Free Tier. AWS correlates phone numbers, credit card BINs (last 4 digits + billing address), device fingerprints, and geographical data to enforce a strict limit of one Free Tier per unique global individual.",
    "hintsJson": "[\"Can a user create 10 different email addresses to get 10 consecutive Free Tier years with the same debit card?\",\"What primary factors does AWS use to verify a customer's global identity (phone number, card PAN/address, IP patterns)?\",\"What is the recommended solution according to the AWS Account Creation Guide (recover original account vs support ticket)?\"]",
    "recommendedSolution": "### Root Cause Analysis & Resolution:\n\n#### 1. The Myth vs The Reality:\n- **The Myth:** \"New Email Address = New AWS Free Tier.\"\n- **The Reality:** Free Tier costs AWS ~$100 Million annually. To prevent commercial abuse and bot farming for free compute/GPUs, AWS uses a multi-factor identity graph:\n  - **Primary Identity Anchors:** Mobile phone number (+91...), credit/debit card last 4 digits + cardholder billing address, and bank BIN.\n  - **Secondary Anchors:** Browser device fingerprint, IP subnets, and linked developer accounts (e.g. GitHub SSO).\n- Because the engineer entered the same phone number, physical address, and payment card as an older account created years ago, the fraud prevention engine flagged the account as a duplicate identity and revoked Free Tier promotional trial credits.\n\n#### 2. Recommended Action Plan (3 Pathways):\n\n##### Pathway 1: Recover Original Account (90%+ Success Rate - Best Option)\n1. Navigate to **https://signin.aws.amazon.com/**.\n2. Select **Root user** and click **Forgot password?**.\n3. Input the original email address used previously.\n4. Complete mobile SMS/email OTP verification and reset the master password.\n5. Immediately activate Virtual MFA and resume using the original account.\n\n##### Pathway 2: Open an AWS Support Account Merge Ticket\n1. In the new account, navigate to **Support -> Support Center -> Create case**.\n2. Case Type: **Account and billing support** -> **Account** -> **Activation/Ineligibility**.\n3. Submit the following explanation:\n   ```text\n   Hello AWS Support Team,\n   I previously created an account under [Old Email] and lost credentials. I created this new account [Account ID] under the same identity and received a 'Free Tier Ineligible' flag. Could you please assist in recovering access to my primary account or linking my billing identity?\n   ```\n\n##### Pathway 3: Operate as a Budgeted Paid Account\n- If the original account cannot be recovered, keep the new account on pay-as-you-go, but:\n  1. Stick strictly to Always-Free services (AWS Lambda: 1M invocations/mo, Amazon DynamoDB: 25 GB storage).\n  2. Use Amazon Lightsail ($3.50/month predictable VPS).\n  3. Configure an AWS Budget alert with a strict $5.00 ceiling.",
    "tagsJson": "[\"AWS Account\",\"Free Tier Ineligible\",\"Fraud Detection\",\"Identity Verification\",\"Account Recovery\"]",
    "hints": [
      "Can a user create 10 different email addresses to get 10 consecutive Free Tier years with the same debit card?",
      "What primary factors does AWS use to verify a customer's global identity (phone number, card PAN/address, IP patterns)?",
      "What is the recommended solution according to the AWS Account Creation Guide (recover original account vs support ticket)?"
    ],
    "tags": [
      "AWS Account",
      "Free Tier Ineligible",
      "Fraud Detection",
      "Identity Verification",
      "Account Recovery"
    ]
  },
  {
    "id": "scen-57",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "Scenario: Accidental High-Spec GPU Instance (p3.2xlarge) in a Forgotten Region",
    "difficulty": "Intermediate",
    "prompt": "A cloud student clones an open-source machine learning tutorial from GitHub. The deployment script launches an Amazon EC2 `p3.2xlarge` GPU instance ($3.06/hour) in `eu-west-1` (Ireland). The student only works in `us-east-1` (N. Virginia) and closes their laptop. Seven days later, their bank alerts them of a $514.08 credit card charge. Walk through the exact forensic diagnosis in Cost Explorer, the immediate containment protocol, and how to file a successful one-time refund appeal with AWS Support.",
    "explanation": "Tests incident triage for runaway cloud costs: using Cost Explorer to uncover multi-region usage, executing clean resource termination across all regions, and leveraging AWS Support Center's free billing support to request a courtesy one-time exception refund.",
    "hintsJson": "[\"How do you configure Cost Explorer (Time Period, Granularity, Group By) to isolate the exact service and region causing charges?\",\"Why must resources be stopped or terminated BEFORE opening a billing support ticket?\",\"Is AWS Account and Billing support free for Basic Support plan accounts?\",\"What 4 key elements must be included in a professional refund appeal letter?\"]",
    "recommendedSolution": "### Emergency Incident Triage & Resolution:\n\n#### Step 1: Forensic Root Cause Analysis in Cost Explorer:\n1. Open **AWS Billing & Cost Management** -> **Cost Explorer**.\n2. Set Time Range to the last 14 days.\n3. Set **Granularity** to **Daily**.\n4. Set **Group By** to **Service** -> Immediately highlights Amazon EC2 as the source of the $514 charge.\n5. Change **Group By** to **Region** -> Highlights `eu-west-1` (Europe Ireland) as the active datacenter.\n6. Change **Group By** to **Usage Type** -> Identifies `BoxUsage:p3.2xlarge` (GPU Compute).\n\n#### Step 2: Immediate Containment Protocol (Stop the Bleeding!):\nCharges accumulate every second until instances and disks are destroyed:\n```bash\n# 1. Switch region to eu-west-1 and terminate the GPU instance immediately:\naws ec2 terminate-instances --region eu-west-1 --instance-ids $(aws ec2 describe-instances --region eu-west-1 --filters Name=instance-state-name,Values=running --query 'Reservations[*].Instances[*].InstanceId' --output text)\n\n# 2. Delete attached EBS volumes:\naws ec2 describe-volumes --region eu-west-1 --filters Name=status,Values=available --query 'Volumes[*].VolumeId' --output text | xargs -n 1 -I {} aws ec2 delete-volume --region eu-west-1 --volume-id {}\n\n# 3. Sweep all 30+ regions to confirm zero running workloads:\nfor r in $(aws ec2 describe-regions --query 'Regions[*].RegionName' --output text); do\n  c=$(aws ec2 describe-instances --region $r --filters Name=instance-state-name,Values=running --query 'length(Reservations[*].Instances[*])')\n  [ \"$c\" -gt 0 ] && echo \"WARNING: Running instance found in $r!\"\ndone\n```\n\n#### Step 3: File an AWS Support Case for One-Time Courtesy Refund:\n1. In the console, go to **Support -> Support Center -> Create case**.\n2. Select **Account and billing support** (100% free for all accounts).\n3. Contact Method: **Live Chat** (fastest response) or **Web Ticket** (< 24 hr SLA).\n4. **Professional Refund Appeal Template:**\n   ```text\n   Hello AWS Billing Support Team,\n\n   I am a student and new AWS Free Tier user learning cloud engineering. I cloned an educational tutorial script that inadvertently launched a p3.2xlarge GPU instance in eu-west-1 without my knowledge, resulting in an unexpected charge of $514.08.\n\n   As soon as I received my bank notification, I conducted a full audit across all AWS regions and immediately terminated the instance, deleted all EBS storage volumes, and verified that zero resources are running in any region.\n\n   I have also configured an AWS Budget alert with a $1.00 threshold to prevent this from ever happening again. Since this was an unintentional mistake during learning, I kindly request a one-time courtesy refund or bill credit for this charge.\n\n   Thank you for your understanding and support,\n   [Your Name] - AWS Account ID: 123456789012\n   ```\n\n#### Step 4: Outcome:\nFor first-time users who have demonstrably stopped the runaway resources, AWS billing specialists approve courtesy refunds or credits in over 90% of cases within 24 to 48 hours.",
    "tagsJson": "[\"Cost Explorer\",\"AWS Billing\",\"Support Case\",\"Refund Appeal\",\"EC2\",\"GPU Instance\",\"Incident Triage\"]",
    "hints": [
      "How do you configure Cost Explorer (Time Period, Granularity, Group By) to isolate the exact service and region causing charges?",
      "Why must resources be stopped or terminated BEFORE opening a billing support ticket?",
      "Is AWS Account and Billing support free for Basic Support plan accounts?",
      "What 4 key elements must be included in a professional refund appeal letter?"
    ],
    "tags": [
      "Cost Explorer",
      "AWS Billing",
      "Support Case",
      "Refund Appeal",
      "EC2",
      "GPU Instance",
      "Incident Triage"
    ]
  },
  {
    "id": "scen-58",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "Scenario: Root Account Compromise Due to Missing MFA & Leaked GitHub Credentials",
    "difficulty": "Advanced",
    "prompt": "An engineer commits code containing hardcoded root credentials into a public GitHub repository. Within 45 minutes, automated threat actor bots scrape the keys and launch 40 EC2 `c5.24xlarge` cryptocurrency mining instances across Tokyo and São Paulo. The engineer cannot log in because the root password was changed by the attacker. How does the organization respond to regain control, revoke access, and remediate the security incident?",
    "explanation": "Advanced incident response question testing credential exposure remediation, AWS Trust & Safety escalation, emergency root account recovery, and forensic eradication.",
    "hintsJson": "[\"Can IAM access keys be issued directly for the Root user?\",\"How do you contact AWS Support when completely locked out of the root console?\",\"What is the role of AWS Trust & Safety in compromised account remediation?\",\"Why is Virtual MFA on the Root user mandatory to prevent credential takeover?\"]",
    "recommendedSolution": "### Emergency Security Incident Response:\n\n#### 1. Immediate Root Account Reclamation:\n1. Navigate to **https://support.aws.amazon.com/support/v1#/case/create?issueType=customer-service**.\n2. Select **Account and billing support** -> **Account** -> **Compromised account / Account recovery**.\n3. Provide the account ID, registration email, and verified phone number. AWS Trust & Safety initiates high-priority identity verification via phone callback.\n4. Once identity is verified, AWS Support forcefully terminates active attacker sessions, resets the root credentials, and transmits a temporary recovery link.\n\n#### 2. Containment & Eradication Protocol:\nOnce logged back into the root account:\n1. **Enable Virtual Multi-Factor Authentication (MFA)** immediately on the Root user.\n2. **Delete All Root Access Keys:**\n   - Go to **Security Credentials** -> **Access Keys** -> **Delete** all active `AKIA...` keys. Root should NEVER possess access keys.\n3. **Audit and Purge Compromised IAM Principals:**\n   - Check IAM Users and Roles for unauthorized backdoor accounts created by attackers (e.g. `aws-support-admin`, `backup-service`).\n   - Run:\n     ```bash\n     aws iam list-users --query 'Users[*].[UserName,CreateDate]' --output table\n     ```\n4. **Global Workload Termination:**\n   - Execute an automated script across all regions to terminate rogue instances and unauthorized CloudFormation/Terraform stacks.\n\n#### 3. Post-Incident Hardening:\n- Implement GitHub Secret Scanning and pre-commit hooks (`git-secrets` or `trufflehog`) to block API keys before commits are created.\n- File an Account & Billing support dispute detailing the compromise, attaching the Git commit audit log to request credit cancellation for fraudulent mining fees.",
    "tagsJson": "[\"Root Security\",\"MFA\",\"Credential Leak\",\"Compromised Account\",\"Incident Response\",\"AWS Support\"]",
    "hints": [
      "Can IAM access keys be issued directly for the Root user?",
      "How do you contact AWS Support when completely locked out of the root console?",
      "What is the role of AWS Trust & Safety in compromised account remediation?",
      "Why is Virtual MFA on the Root user mandatory to prevent credential takeover?"
    ],
    "tags": [
      "Root Security",
      "MFA",
      "Credential Leak",
      "Compromised Account",
      "Incident Response",
      "AWS Support"
    ]
  },
  {
    "id": "scen-59",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "title": "Scenario: Single-AZ Datacenter Flood Causes Complete Enterprise Outage",
    "difficulty": "Intermediate",
    "prompt": "An e-commerce company deploys its web servers and PostgreSQL database inside a single Availability Zone (`ap-south-1a` in Mumbai) to avoid inter-AZ data transfer fees ($0.01/GB). A freak monsoon storm causes electrical grid failure and localized flooding, taking the `ap-south-1a` data center offline for 6 hours. The website is completely dark. How should the infrastructure be redesigned to survive a catastrophic AZ loss with zero manual intervention?",
    "explanation": "Tests foundational high-availability architectural design: multi-AZ load balancing, stateless compute auto-scaling across AZs, and Amazon RDS Multi-AZ synchronous standby replication with automatic DNS failover.",
    "hintsJson": "[\"What is the difference between a Region failure and an Availability Zone failure?\",\"How does an Application Load Balancer distribute traffic across multiple subnets in different AZs?\",\"How does Amazon RDS Multi-AZ achieve zero data loss and automated failover (< 60s)?\",\"What is the network latency penalty between AZs in the same Region (< 2ms)?\"]",
    "recommendedSolution": "### Resilient Multi-AZ Redesign:\n\n#### 1. Architectural Weakness in the Original Design:\n- Deploying into a single AZ represents a **Single Point of Failure (SPOF)**.\n- While AWS data centers are engineered with diesel generators and redundant uninterruptible power supplies (UPS), extreme physical events (fires, flooding, civic power grid collapse) can take an entire physical AZ facility offline.\n- Saving $0.01/GB in cross-AZ network fees is completely negated by 6 hours of enterprise e-commerce downtime ($50,000+ in lost revenue).\n\n#### 2. The Multi-AZ Production Architecture:\n1. **Stateless Compute Layer (EC2 Auto Scaling):**\n   - Deploy an **Application Load Balancer (ALB)** spanning **3 Public Subnets** across `ap-south-1a`, `ap-south-1b`, and `ap-south-1c`.\n   - Configure an **Auto Scaling Group (ASG)** with a minimum of 3 instances distributed evenly across the 3 Availability Zones.\n   - If `ap-south-1a` goes completely dark, the ALB automatically marks those instances unhealthy and routes 100% of traffic to surviving healthy instances in AZ-b and AZ-c.\n2. **Stateful Database Layer (Amazon RDS Multi-AZ):**\n   - Enable **Multi-AZ Deployment** on the RDS PostgreSQL instance.\n   - AWS automatically provisions a synchronous Standby replica in a second physical AZ (`ap-south-1b`).\n   - All database writes are synchronously replicated over the low-latency (< 2ms) dedicated private AWS optical fiber backbone.\n   - **Automated Failover:** When `ap-south-1a` fails, the RDS service flips the database CNAME record to the standby replica in `ap-south-1b` within 60 seconds without requiring database IP changes or application downtime.",
    "tagsJson": "[\"Global Infrastructure\",\"High Availability\",\"Multi-AZ\",\"Disaster Recovery\",\"RDS Multi-AZ\",\"ALB\",\"Resilience\"]",
    "hints": [
      "What is the difference between a Region failure and an Availability Zone failure?",
      "How does an Application Load Balancer distribute traffic across multiple subnets in different AZs?",
      "How does Amazon RDS Multi-AZ achieve zero data loss and automated failover (< 60s)?",
      "What is the network latency penalty between AZs in the same Region (< 2ms)?"
    ],
    "tags": [
      "Global Infrastructure",
      "High Availability",
      "Multi-AZ",
      "Disaster Recovery",
      "RDS Multi-AZ",
      "ALB",
      "Resilience"
    ]
  },
  {
    "id": "scen-60",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "title": "Scenario: Global Latency Penalty: Direct Origin S3 Downloads vs CloudFront Edge Caching",
    "difficulty": "Beginner",
    "prompt": "A digital media agency hosts product images and video files in an Amazon S3 bucket located in `us-east-1` (N. Virginia). Users in Sydney, Australia and Tokyo, Japan report that image thumbnails take 1.8 seconds to load, resulting in a high bounce rate. The agency asks: 'Must we duplicate our S3 buckets into Australia and Tokyo to fix this, or is there an edge networking solution that delivers fast global access without managing multiple regional buckets?'",
    "explanation": "Tests understanding of AWS Edge Infrastructure: using Amazon CloudFront's 450+ Points of Presence (PoPs) to cache origin S3 content near end users globally, avoiding multi-region S3 replication overhead and public internet transit latency.",
    "hintsJson": "[\"What AWS service leverages global Edge Locations for content delivery?\",\"How do requests reach edge caches (Anycast DNS routing to closest Point of Presence)?\",\"What is the difference between an Edge Location and an AWS Region?\",\"How does CloudFront Origin Access Control (OAC) keep the central S3 bucket private?\"]",
    "recommendedSolution": "### Global Latency Optimization Architecture:\n\n#### 1. Root Cause of Global Latency:\n- Sydney, Australia is ~9,500 miles away from `us-east-1` (N. Virginia).\n- Every TCP and TLS handshake must traverse 15 to 20 intermediate public internet router hops under the Pacific Ocean, introducing 220ms+ of physical speed-of-light network latency per round-trip.\n- With HTTP/1.1 or unoptimized TLS, multiple round trips delay asset delivery by 1.8+ seconds.\n\n#### 2. The Solution: Amazon CloudFront Content Delivery Network (CDN):\n- Instead of provisioning and synchronizing duplicate S3 buckets in Sydney and Tokyo, deploy an **Amazon CloudFront Distribution**:\n  1. **450+ Points of Presence (PoPs):** CloudFront automatically routes Sydney users to the Sydney Edge Location and Tokyo users to the Tokyo Edge Location using Anycast DNS.\n  2. **Cache Hit Performance:** When a user requests an asset that has already been cached at the edge, response time drops from 1,800ms to **under 15 milliseconds**.\n  3. **AWS Private Backbone for Cache Misses:** When an asset is requested for the first time, the Edge Location fetches the file from the `us-east-1` S3 origin over the dedicated, optimized **AWS Private Transoceanic Fiber Backbone**, completely bypassing the congested public internet.\n  4. **Security Hardening (Origin Access Control - OAC):** Configure S3 bucket policies so the bucket rejects direct public internet access and only accepts signed requests from the CloudFront distribution service principal.",
    "tagsJson": "[\"Global Infrastructure\",\"Edge Locations\",\"CloudFront\",\"CDN\",\"S3\",\"Latency Optimization\"]",
    "hints": [
      "What AWS service leverages global Edge Locations for content delivery?",
      "How do requests reach edge caches (Anycast DNS routing to closest Point of Presence)?",
      "What is the difference between an Edge Location and an AWS Region?",
      "How does CloudFront Origin Access Control (OAC) keep the central S3 bucket private?"
    ],
    "tags": [
      "Global Infrastructure",
      "Edge Locations",
      "CloudFront",
      "CDN",
      "S3",
      "Latency Optimization"
    ]
  },
  {
    "id": "scen-61",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "title": "Scenario: Private Subnet EC2 Instances Cannot Download Security Patches (Missing NAT Gateway)",
    "difficulty": "Intermediate",
    "prompt": "An engineer launches a fleet of backend microservice instances in a private subnet (10.0.2.0/24). The instances have no public IP addresses. When attempting to run 'yum update -y' or 'apt-get update', the command hangs for 120 seconds and terminates with 'Connection timed out'. The engineer verifies the Security Group allows all outbound traffic. What is the networking root cause, and how do you establish outbound-only internet connectivity?",
    "explanation": "Tests foundational VPC routing: private subnets have no route to an Internet Gateway (and instances lack public IPs). Outbound internet connectivity for software patches and package updates requires deploying a NAT Gateway into a public subnet and updating the private route table.",
    "hintsJson": "[\"Can an Internet Gateway communicate directly with an instance that does not possess a Public or Elastic IP address?\",\"In which subnet type (Public or Private) must an AWS NAT Gateway be placed?\",\"What target route must be added to the private subnet route table?\",\"Why must the NAT Gateway have an attached Elastic IP?\"]",
    "recommendedSolution": "### Root Cause Analysis & Step-by-Step Resolution:\n\n#### 1. The Networking Root Cause:\n1. **No Public IP & No 1:1 NAT:**\n   - The private instances only possess private IPv4 addresses (`10.0.2.x`).\n   - Even if you add an Internet Gateway (IGW) route to the private route table, the IGW cannot perform 1:1 NAT translation without an allocated public or Elastic IP.\n   - Private RFC 1918 IP packets cannot be routed over the public internet, so all outbound package manager requests hang and time out.\n\n#### 2. Architecture for Outbound-Only Internet Egress:\nA **Network Address Translation (NAT) Gateway** allows instances in private subnets to initiate outbound connections to the internet (e.g. for OS patches) while completely blocking any inbound connections initiated from the outside internet.\n\n#### 3. Step-by-Step Resolution Protocol:\n1. **Allocate an Elastic IP for the NAT Gateway:**\n   ```bash\n   EIP_ALLOC=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)\n   ```\n2. **Deploy the NAT Gateway into the PUBLIC Subnet:**\n   ```bash\n   # NAT Gateway MUST reside in a public subnet with a route to an IGW!\n   NAT_ID=$(aws ec2 create-nat-gateway \\\n     --subnet-id <PublicSubnetId> \\\n     --allocation-id $EIP_ALLOC \\\n     --query 'NatGateway.NatGatewayId' --output text)\n   \n   # Wait for state to transition from 'pending' to 'available':\n   aws ec2 wait nat-gateway-available --nat-gateway-ids $NAT_ID\n   ```\n3. **Update the Private Route Table:**\n   ```bash\n   # Add default route 0.0.0.0/0 targeting the NAT Gateway:\n   aws ec2 create-route \\\n     --route-table-id <PrivateRouteTableId> \\\n     --destination-cidr-block 0.0.0.0/0 \\\n     --gateway-id $NAT_ID\n   ```\n4. **Verification:**\n   - SSH into the private instance via a Bastion Host in the public subnet and run `curl -I https://amazonlinux.com`.\n   - The command returns `HTTP/2 200` instantaneously.",
    "tagsJson": "[\"VPC\",\"Networking\",\"NAT Gateway\",\"Subnets\",\"Route Tables\",\"Troubleshooting\"]",
    "hints": [
      "Can an Internet Gateway communicate directly with an instance that does not possess a Public or Elastic IP address?",
      "In which subnet type (Public or Private) must an AWS NAT Gateway be placed?",
      "What target route must be added to the private subnet route table?",
      "Why must the NAT Gateway have an attached Elastic IP?"
    ],
    "tags": [
      "VPC",
      "Networking",
      "NAT Gateway",
      "Subnets",
      "Route Tables",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-62",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "title": "Scenario: Subnet IP Exhaustion Causing Auto Scaling Launch Failures (/28 Subnet)",
    "difficulty": "Advanced",
    "prompt": "During a flash-sale event, traffic spikes by 500%. The Auto Scaling Group triggers a scale-up event from 4 to 20 EC2 instances. However, scaling abruptly halts after launching 7 instances, and CloudWatch emits error: 'InsufficientFreeAddressesInSubnet: There are no free IP addresses in subnet-01a2b3c4d5e'. The engineer discovers the subnet CIDR was created as a /28 block. Explain the exact mathematical IP accounting and how to resolve the capacity bottleneck.",
    "explanation": "Deep dive into AWS VPC subnetting mathematics: in any subnet, AWS reserves 5 IP addresses. A /28 block has 16 total IPs minus 5 reserved = only 11 usable IPs. When instances, load balancer interfaces, and Lambda ENIs consume those 11 IPs, scaling fails.",
    "hintsJson": "[\"How many total addresses exist in a /28 IPv4 subnet (2^(32-28) = 16)?\",\"Which 5 specific IP addresses are strictly reserved by AWS in every subnet (.0, .1, .2, .3, .255)?\",\"Can you change the CIDR block size of an existing subnet once created?\",\"How do you add a new secondary subnet to an existing VPC and associate it with the Auto Scaling Group?\"]",
    "recommendedSolution": "### Architectural Analysis & Resolution:\n\n#### 1. The Subnet IP Math & Root Cause:\n- Total theoretical IPs in a `/28` block: $2^{(32 - 28)} = 2^4 = \\mathbf{16\\text{ IP addresses}}$.\n- **The 5 AWS Reserved IPs:**\n  1. `10.0.1.0`: Network address.\n  2. `10.0.1.1`: VPC internal router.\n  3. `10.0.1.2`: Route 53 DNS Resolver (base + 2).\n  4. `10.0.1.3`: Reserved by AWS for future internal capability.\n  5. `10.0.1.15`: Broadcast address.\n- **Usable Host Addresses:** $16 - 5 = \\mathbf{11\\text{ usable IPs}}$.\n- When the 4 baseline instances and 7 scale-up instances were launched, all 11 available IPs were consumed ($4 + 7 = 11$). The 12th instance encountered zero free IPs and crashed.\n\n#### 2. The Solution (Subnets Cannot Be Resized!):\nIn AWS VPC, an existing subnet's CIDR block **cannot be expanded or resized**. You must carve a larger secondary subnet:\n\n1. **Provision a Generous Subnet (/24 or /22):**\n   ```bash\n   # Carve a /22 subnet providing 1,019 usable host addresses (1024 - 5):\n   NEW_SUBNET=$(aws ec2 create-subnet \\\n     --vpc-id <VpcId> \\\n     --cidr-block 10.0.4.0/22 \\\n     --availability-zone <AZ> \\\n     --query 'Subnet.SubnetId' --output text)\n   ```\n2. **Associate with Existing Route Table:**\n   ```bash\n   aws ec2 associate-route-table --subnet-id $NEW_SUBNET --route-table-id <PrivateRouteTableId>\n   ```\n3. **Update the Auto Scaling Group Configuration:**\n   ```bash\n   # Update ASG to utilize the new large subnet alongside existing subnets:\n   aws autoscaling update-auto-scaling-group \\\n     --auto-scaling-group-name prod-web-asg \\\n     --vpc-zone-identifier \"$NEW_SUBNET,<OtherAZSubnets>\"\n   ```\n4. **Best Practice:** Subnets for elastic container/server workloads should always be sized at minimum `/24` (251 usable IPs) or `/22` (1,019 usable IPs).",
    "tagsJson": "[\"VPC\",\"CIDR\",\"Subnetting\",\"Auto Scaling\",\"IP Exhaustion\",\"Reserved IPs\"]",
    "hints": [
      "How many total addresses exist in a /28 IPv4 subnet (2^(32-28) = 16)?",
      "Which 5 specific IP addresses are strictly reserved by AWS in every subnet (.0, .1, .2, .3, .255)?",
      "Can you change the CIDR block size of an existing subnet once created?",
      "How do you add a new secondary subnet to an existing VPC and associate it with the Auto Scaling Group?"
    ],
    "tags": [
      "VPC",
      "CIDR",
      "Subnetting",
      "Auto Scaling",
      "IP Exhaustion",
      "Reserved IPs"
    ]
  },
  {
    "id": "scen-63",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "title": "Scenario: Stateless NACL Silent Drop: Web Requests Hang on Port 80 Return Traffic",
    "difficulty": "Intermediate",
    "prompt": "An administrator hardens a public web subnet by creating a custom Network ACL. Inbound Rule 100 is configured: 'ALLOW TCP Port 80 from 0.0.0.0/0'. Outbound Rule 100 is configured: 'ALLOW TCP Port 80 to 0.0.0.0/0'. The EC2 Security Group allows all inbound HTTP on port 80. However, when users try to visit the website, their browsers spin indefinitely and time out after 60 seconds. What fundamental flaw in the stateless NACL configuration is causing all return packets to be dropped?",
    "explanation": "Classic networking pitfall highlighting the stateless nature of Network Access Control Lists: while the inbound request arrives on port 80, the server's HTTP response is destined for the client's temporary ephemeral return port (1024-65535). A stateless NACL outbound rule restricted to port 80 drops all outgoing web responses.",
    "hintsJson": "[\"Is a Network ACL stateful or stateless?\",\"When a client browser sends an HTTP request from port 51432 to port 80, what port does the web server send the response BACK to?\",\"What is the standard ephemeral port range for modern operating systems (1024-65535)?\",\"Why did the Security Group not prevent this failure?\"]",
    "recommendedSolution": "### Root Cause Analysis & Packet Flow Breakdown:\n\n#### 1. The Stateless Packet Journey:\n1. **Inbound Path (Success):**\n   - Client sends packet: `Src: 198.51.100.10:52410` -> `Dst: 10.0.1.5:80`.\n   - Subnet Inbound NACL Rule 100 allows TCP port 80 from `0.0.0.0/0`.\n   - Security Group allows inbound port 80.\n   - **Result:** Packet reaches Apache/Nginx web server.\n2. **Outbound Return Path (Silent Drop!):**\n   - The web server generates the HTTP 200 response:\n     `Src: 10.0.1.5:80` -> `Dst: 198.51.100.10:52410` (the client's ephemeral port).\n   - The **Security Group** is stateful, so it automatically permits the outbound response without an outbound rule.\n   - **However, the packet hits the Subnet NACL Outbound Rules:**\n     - Outbound Rule 100 only permits destination port **80**.\n     - The response packet is destined for port **52410**!\n     - The packet falls through and hits the default `Rule * (DENY ALL OUTBOUND)`!\n   - **Result:** The web server response is dropped at the subnet boundary. The client browser hangs until connection timeout.\n\n#### 2. Step-by-Step Resolution:\n1. **Add Outbound Ephemeral Return Port Rule:**\n   ```bash\n   aws ec2 create-network-acl-entry \\\n     --network-acl-id <NaclId> \\\n     --egress \\\n     --rule-number 110 \\\n     --protocol tcp \\\n     --port-range From=1024,To=65535 \\\n     --cidr-block 0.0.0.0/0 \\\n     --rule-action allow\n   ```\n2. **Verification in VPC Flow Logs:**\n   - Before fix: VPC Flow Logs show `REJECT OK` on outbound packets with `dstport=52410`.\n   - After fix: VPC Flow Logs show `ACCEPT OK` and the web page loads in 25 milliseconds.",
    "tagsJson": "[\"VPC\",\"NACL\",\"Security Groups\",\"Stateless\",\"Ephemeral Ports\",\"Troubleshooting\"]",
    "hints": [
      "Is a Network ACL stateful or stateless?",
      "When a client browser sends an HTTP request from port 51432 to port 80, what port does the web server send the response BACK to?",
      "What is the standard ephemeral port range for modern operating systems (1024-65535)?",
      "Why did the Security Group not prevent this failure?"
    ],
    "tags": [
      "VPC",
      "NACL",
      "Security Groups",
      "Stateless",
      "Ephemeral Ports",
      "Troubleshooting"
    ]
  },
  {
    "id": "scen-64",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "title": "Scenario: Data Exfiltration via DNS Tunneling Bypassed by Fail-Open DNS Firewall",
    "difficulty": "Advanced",
    "prompt": "A financial organization deploys Route 53 DNS Firewall to prevent data exfiltration to known malicious command-and-control (C2) domains. During an internal red-team penetration test, an attacker compromises an internal server and initiates high-volume base64 DNS tunneling exfiltration. During the attack, a regional AWS network spike causes transient latency in the Route 53 Resolver inspection pipeline. The DNS firewall allows the exfiltration queries to pass through unimpeded. How was the DNS Firewall configured to cause this breach, and what parameter guarantees strict security enforcement?",
    "explanation": "Tests Route 53 DNS Firewall fail-open vs fail-closed security posture: by default or when misconfigured in Fail-Open mode, Route 53 Resolver allows queries through when DNS Firewall rules cannot be evaluated, favoring availability over security. Mission-critical environments mandate Fail-Closed mode.",
    "hintsJson": "[\"What are the two failure modes available in Route 53 DNS Firewall (Fail-Open vs Fail-Closed)?\",\"Which failure mode prioritizes availability by permitting uninspected queries during firewall service delays?\",\"Which failure mode prioritizes security by blocking all queries during inspection timeouts?\",\"What AWS CLI command updates the DNS Firewall configuration for a VPC?\"]",
    "recommendedSolution": "### Root Cause Analysis & Security Hardening:\n\n#### 1. The Root Cause (Fail-Open Vulnerability):\n- When a VPC is associated with Route 53 DNS Firewall, you configure how Route 53 Resolver behaves if it cannot communicate with the firewall engine:\n  - **Fail-Open (Default in some templates):** If the DNS Firewall engine is slow or unresponsive, Resolver permits all queries to pass through. This guarantees high application availability, but creates a catastrophic security hole during network degradation.\n  - **Fail-Closed:** Resolver drops and blocks any DNS query for which it does not receive a definitive allow verdict from the DNS Firewall.\n- The red-team simulated resolver load, triggering the fail-open condition and allowing encoded DNS exfiltration to reach external nameservers.\n\n#### 2. Remediation Protocol:\n```bash\n# 1. Update the VPC DNS Firewall configuration to FAIL-CLOSED:\naws route53resolver update-firewall-config \\\n  --resource-id <VpcId> \\\n  --firewall-fail-open DISABLED\n\n# 2. Verify configuration status:\naws route53resolver get-firewall-config --resource-id <VpcId>\n```\n- Output: `FirewallFailOpen: DISABLED` (enforces Fail-Closed mode).\n\n#### 3. Defense-in-Depth Enhancements:\n- Deploy **AWS Network Firewall** with stateful Suricata rules to inspect raw UDP/TCP port 53 payloads for non-standard DNS tunneling anomalies.\n- Enable **Amazon GuardDuty**, which features automated machine-learning detectors for DNS data exfiltration (`Trojan:EC2/DNSDataExfiltration`).",
    "tagsJson": "[\"VPC\",\"DNS Firewall\",\"Route 53\",\"Security\",\"Fail-Closed\",\"Data Exfiltration\"]",
    "hints": [
      "What are the two failure modes available in Route 53 DNS Firewall (Fail-Open vs Fail-Closed)?",
      "Which failure mode prioritizes availability by permitting uninspected queries during firewall service delays?",
      "Which failure mode prioritizes security by blocking all queries during inspection timeouts?",
      "What AWS CLI command updates the DNS Firewall configuration for a VPC?"
    ],
    "tags": [
      "VPC",
      "DNS Firewall",
      "Route 53",
      "Security",
      "Fail-Closed",
      "Data Exfiltration"
    ]
  },
  {
    "id": "scen-65",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "title": "Scenario: Non-Transitive VPC Peering Routing Failure (VPC A to VPC C via VPC B)",
    "difficulty": "Intermediate",
    "prompt": "A multi-account organization connects three VPCs: VPC A (Production, 10.1.0.0/16), VPC B (Shared Services / Bastion, 10.2.0.0/16), and VPC C (Analytics, 10.3.0.0/16). VPC A is peered to VPC B. VPC B is peered to VPC C. The network engineer adds a route in VPC A's route table: '10.3.0.0/16 -> pcx-ab' expecting VPC B to forward the packets to VPC C. Connectivity completely fails. Why does this packet flow fail, and what are the two production solutions?",
    "explanation": "Tests foundational knowledge of the non-transitive property of AWS VPC Peering: VPC peering does not support edge-to-edge routing or transit routing across intermediate VPCs. Traffic can only flow directly between the two paired VPCs. Solutions are direct full-mesh peering or AWS Transit Gateway.",
    "hintsJson": "[\"Is VPC Peering transitive or non-transitive?\",\"Can a packet entering VPC B from a peering connection be routed out another peering connection in VPC B?\",\"What happens to total peering connection complexity when scaling to 20 or 50 VPCs (N*(N-1)/2)?\",\"Which AWS service acts as a centralized regional star-router for multi-VPC transit routing?\"]",
    "recommendedSolution": "### Architectural Analysis & Two Production Solutions:\n\n#### 1. Why the Routing Fails (The Non-Transitive Rule):\n- **AWS VPC Peering is strictly non-transitive:**\n  - A peering connection is a direct, point-to-point Layer-3 virtual interconnect between **exactly two VPCs**.\n  - AWS SDN explicitly drops any packet whose destination IP belongs to a network beyond the direct peer.\n  - VPC B cannot act as an intermediate transit router or relay host.\n\n#### 2. Solution A: Direct Point-to-Point VPC Peering (Small Scale: 2-3 VPCs)\n- Create a direct peering connection between **VPC A** and **VPC C**:\n  ```bash\n  # 1. Create peering connection between VPC A and VPC C:\n  PEER_AC=$(aws ec2 create-vpc-peering-connection \\\n    --vpc-id <VpcA_Id> --peer-vpc-id <VpcC_Id> \\\n    --query 'VpcPeeringConnection.VpcPeeringConnectionId' --output text)\n  aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id $PEER_AC\n\n  # 2. Add route in VPC A:\n  aws ec2 create-route --route-table-id <VpcA_RouteTable> --destination-cidr-block 10.3.0.0/16 --vpc-peering-connection-id $PEER_AC\n\n  # 3. Add reverse route in VPC C:\n  aws ec2 create-route --route-table-id <VpcC_RouteTable> --destination-cidr-block 10.1.0.0/16 --vpc-peering-connection-id $PEER_AC\n  ```\n\n#### 3. Solution B: AWS Transit Gateway (TGW) (Enterprise Standard: 4+ VPCs)\n- Direct peering creates an unmaintainable full-mesh: for 20 VPCs, you need $\\frac{20 \\times 19}{2} = \\mathbf{190\\text{ peering connections}}$.\n- **Transit Gateway replaces mesh with a Star Hub:**\n  1. Provision an **AWS Transit Gateway (TGW)**.\n  2. Attach VPC A, VPC B, and VPC C to the Transit Gateway (each makes 1 attachment).\n  3. Route tables in all three VPCs simply declare: `10.0.0.0/8 -> tgw-id`.\n  4. The Transit Gateway centrally routes packets between all VPCs and on-premises datacenters with centralized audit logs and routing domains.",
    "tagsJson": "[\"VPC\",\"VPC Peering\",\"Transit Gateway\",\"Non-Transitive\",\"Routing\",\"Architecture\"]",
    "hints": [
      "Is VPC Peering transitive or non-transitive?",
      "Can a packet entering VPC B from a peering connection be routed out another peering connection in VPC B?",
      "What happens to total peering connection complexity when scaling to 20 or 50 VPCs (N*(N-1)/2)?",
      "Which AWS service acts as a centralized regional star-router for multi-VPC transit routing?"
    ],
    "tags": [
      "VPC",
      "VPC Peering",
      "Transit Gateway",
      "Non-Transitive",
      "Routing",
      "Architecture"
    ]
  },
  {
    "id": "scen-66",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "title": "Scenario: Astronomical NAT Gateway Charges from Nightly S3 Database Backups",
    "difficulty": "Advanced",
    "prompt": "An enterprise runs an automated nightly backup job where 40 TB of database snapshots are uploaded from private EC2 instances in a VPC to an Amazon S3 bucket. The cloud finance team issues an alert: the AWS bill has spiked by $1,800/month specifically under the line item 'NatGateway-Bytes' ($0.045/GB data processing). The infrastructure lead asks: 'Why are we paying NAT Gateway fees to upload data to an internal AWS service like S3, and how do we eliminate 100% of these processing charges?'",
    "explanation": "Tests cost optimization and private cloud networking: by default, traffic from private subnets to Amazon S3 routes through the NAT Gateway to public S3 endpoints, incurring both NAT hourly fees and $0.045/GB processing charges. Deploying a free VPC Gateway Endpoint for S3 injects private routes that keep all S3 traffic on the internal AWS network at $0.00 cost.",
    "hintsJson": "[\"Is Amazon S3 an internal VPC service or an AWS public zone service?\",\"What is the data processing fee for an AWS NAT Gateway ($0.045 per GB)?\",\"Which VPC Endpoint type supports Amazon S3 and DynamoDB without any hourly or per-GB charges (Gateway Endpoint)?\",\"How is a Gateway Endpoint configured in a subnet route table?\"]",
    "recommendedSolution": "### Cost Optimization & Architectural Resolution:\n\n#### 1. Financial Root Cause:\n- Amazon S3 is an AWS public-zone service with public IP endpoints.\n- When instances in a private subnet upload data to `s3.us-east-1.amazonaws.com`, the traffic must exit the private subnet via the **NAT Gateway**.\n- **NAT Gateway Data Processing Fee:** **\\$0.045 per GB**.\n- **Monthly Cost Calculation:**\n  $$40\\text{ TB} = 40,000\\text{ GB} \\times \\$0.045 = \\mathbf{\\$1,800.00\\text{ per month in wasted NAT processing fees!}}$$\n\n#### 2. The Zero-Cost Solution: VPC Gateway Endpoint for Amazon S3:\nAWS provides **Gateway Endpoints** for Amazon S3 and DynamoDB at **100% zero cost** ($0/hr and $0/GB):\n1. **Provision the Gateway Endpoint:**\n   ```bash\n   S3_ENDPOINT=$(aws ec2 create-vpc-endpoint \\\n     --vpc-id <VpcId> \\\n     --vpc-endpoint-type Gateway \\\n     --service-name com.amazonaws.us-east-1.s3 \\\n     --route-table-ids <PrivateRouteTableId> \\\n     --query 'VpcEndpoint.VpcEndpointId' --output text)\n   ```\n2. **What Actually Happens to Routing:**\n   - AWS automatically injects the regional S3 prefix list into your route table:\n     ```text\n     Destination: pl-63a5400a (com.amazonaws.us-east-1.s3)\n     Target: vpce-0123456789abcdef0\n     ```\n   - By the rule of **longest prefix match**, S3 traffic is intercepted and routed directly across the high-speed AWS private software-defined network, completely bypassing the NAT Gateway!\n3. **Financial Outcome:**\n   - `NatGateway-Bytes` for S3 backup drops from 40,000 GB to **0 GB**.\n   - **Total Annual Savings: $21,600.00/year.**",
    "tagsJson": "[\"VPC\",\"NAT Gateway\",\"VPC Endpoint\",\"Gateway Endpoint\",\"S3\",\"Cost Optimization\"]",
    "hints": [
      "Is Amazon S3 an internal VPC service or an AWS public zone service?",
      "What is the data processing fee for an AWS NAT Gateway ($0.045 per GB)?",
      "Which VPC Endpoint type supports Amazon S3 and DynamoDB without any hourly or per-GB charges (Gateway Endpoint)?",
      "How is a Gateway Endpoint configured in a subnet route table?"
    ],
    "tags": [
      "VPC",
      "NAT Gateway",
      "VPC Endpoint",
      "Gateway Endpoint",
      "S3",
      "Cost Optimization"
    ]
  },
  {
    "id": "scen-67",
    "moduleNumber": 21,
    "topicNumber": 1,
    "topicSlug": "angular-core-components-lifecycle-databinding",
    "title": "Scenario: Production UI Glitch & ExpressionChangedAfterItHasBeenCheckedError During Tab Switching",
    "difficulty": "Advanced",
    "prompt": "In an enterprise Angular banking portal, developers notice the console flooding with 'NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: false. Current value: true' whenever users switch between transaction dashboard tabs. In production dev builds, the tab header badge briefly flickers and shows inconsistent unread counts. What is the fundamental change detection mechanism causing this error, why does it only happen in development mode, and what is the architecturally correct fix?",
    "explanation": "Tests deep understanding of Angular's two-phase change detection lifecycle in development mode (render pass followed by verification pass) and the danger of mutating parent state or component bindings inside ngAfterViewInit or child lifecycle hooks.",
    "hintsJson": "[\"Why does Angular change detection run a second verification pass in Development mode?\",\"In which lifecycle hook was the property updated: ngOnInit, ngOnChanges, or ngAfterViewInit?\",\"Can updating a parent property in a child's ngAfterViewInit cause this error?\",\"What are the recommended fixes: ChangeDetectorRef.detectChanges(), queueMicrotask(), or restructuring state ownership?\"]",
    "recommendedSolution": "### Root Cause Analysis & Architecture Resolution:\n\n#### 1. Why NG0100 Occurs (Two-Pass Change Detection):\nIn Angular development mode, change detection executes **two consecutive passes**:\n1. **Pass 1 (Change Detection & DOM Render):** Angular traverses the component tree from top to bottom, evaluates template expressions, checks bindings, and updates DOM nodes.\n2. **Pass 2 (Verification Pass):** Angular re-traverses the tree and asserts that no template expressions have changed their values since Pass 1. If an expression produces a different value, Angular throws `NG0100`.\n\nThis guarantees **unidirectional data flow**: data must flow down from parent to child, and rendering must stabilize in a single pass. If a child updates a parent property inside `ngAfterViewInit` or `ngAfterViewChecked`, the parent's template binding changes after it was already verified.\n\n#### 2. Root Cause in Tab Switching Component:\nA child tab component updated the parent tab-header's badge count inside `ngAfterViewInit()`:\n```typescript\n// ANTI-PATTERN: Mutating parent state after view check\nngAfterViewInit() {\n  this.parentDashboard.hasUnreadAlerts = true; // NG0100!\n}\n```\n\n#### 3. Production Solutions:\n- **Solution A (Best Practice - Upstream State or Signals):**\n  Move the shared state to an injected reactive service or Angular Signal evaluated before view rendering:\n  ```typescript\n  // Service-based reactive state\n  @Injectable({ providedIn: 'root' })\n  export class AlertStateService {\n    unreadCount = signal(0);\n  }\n  ```\n- **Solution B (Asynchronous Deferral via queueMicrotask):**\n  Schedule the state mutation to occur in the next microtask turn, allowing the current change detection pass to complete cleanly:\n  ```typescript\n  ngAfterViewInit() {\n    queueMicrotask(() => {\n      this.hasUnreadAlerts.set(true);\n    });\n  }\n  ```\n- **Solution C (Manual Change Detection Trigger):**\n  Inject `ChangeDetectorRef` and invoke `cdr.detectChanges()` if synchronization must occur synchronously.",
    "tagsJson": "[\"Angular\",\"Change Detection\",\"Lifecycle Hooks\",\"NG0100\",\"Frontend Architecture\"]",
    "hints": [
      "Why does Angular change detection run a second verification pass in Development mode?",
      "In which lifecycle hook was the property updated: ngOnInit, ngOnChanges, or ngAfterViewInit?",
      "Can updating a parent property in a child's ngAfterViewInit cause this error?",
      "What are the recommended fixes: ChangeDetectorRef.detectChanges(), queueMicrotask(), or restructuring state ownership?"
    ],
    "tags": [
      "Angular",
      "Change Detection",
      "Lifecycle Hooks",
      "NG0100",
      "Frontend Architecture"
    ]
  },
  {
    "id": "scen-68",
    "moduleNumber": 21,
    "topicNumber": 2,
    "topicSlug": "angular-rxjs-services-dependency-injection",
    "title": "Scenario: Single-Page Application Memory Leak and Stale State from Unmanaged RxJS Subscriptions",
    "difficulty": "Advanced",
    "prompt": "An Angular healthcare application that stays open continuously on clinic workstations experiences severe memory degradation. Over an 8-hour shift, browser RAM climbs from 120MB to over 2.8GB, causing tabs to freeze. Profiling reveals thousands of orphan RxJS Subscriber instances retaining component DOM nodes in memory, and event handlers fire multiple duplicate notifications for a single incoming WebSocket payload. Where is the memory leak stemming from, and how do you remediate it using modern Angular best practices?",
    "explanation": "Tests diagnosis and resolution of RxJS memory leaks in single-page applications where components subscribe to infinite Observable streams (e.g. from singleton services or NgRx stores) without unsubscribing on component destruction.",
    "hintsJson": "[\"Do subscriptions to infinite Observables (like BehaviorSubject, Router events, or interval) complete on their own?\",\"Why does retaining a subscription keep the entire unmounted component and its DOM in heap memory?\",\"What is the modern Angular 16+ replacement for the traditional 'takeUntil(destroy$)' pattern?\",\"Why is the async pipe naturally immune to this leak?\"]",
    "recommendedSolution": "### Root Cause Analysis & Memory Remediation:\n\n#### 1. Why the Memory Leak Occurs:\n1. **Singleton Service Lifetime:**\n   Services provided with `@Injectable({ providedIn: 'root' })` live for the entire duration of the browser tab.\n2. **Retained Reference Cycles:**\n   When a short-lived component subscribes to an infinite stream on a root service:\n   ```typescript\n   // ANTI-PATTERN: Leaks memory every time user visits this page!\n   this.telemetryService.vitals$.subscribe(data => {\n     this.patientVitals = data; // Component instance cannot be garbage collected!\n   });\n   ```\n   The service holds an active reference to the observer callback, which holds a reference to the component instance (`this`), which in turn references DOM trees and component state. Even after routing away, the component is never garbage collected.\n3. **Duplicate Handlers:**\n   Every time the user visits the page, a new subscriber is added. After 10 page visits, 10 duplicate handlers execute for every emitted event!\n\n#### 2. Modern Angular 16+ Remediation:\n- **Strategy 1: Use takeUntilDestroyed() Operator (Recommended):**\n  ```typescript\n  import { Component, OnInit, inject, DestroyRef } from '@angular/core';\n  import { takeUntilDestroyed } from '@angular/core/rxjs-interop';\n\n  @Component({ ... })\n  export class PatientVitalsComponent implements OnInit {\n    private telemetryService = inject(TelemetryService);\n    private destroyRef = inject(DestroyRef);\n\n    ngOnInit() {\n      this.telemetryService.vitals$\n        .pipe(takeUntilDestroyed(this.destroyRef))\n        .subscribe(data => {\n          this.patientVitals = data;\n        });\n    }\n  }\n  ```\n- **Strategy 2: Declarative async Pipe in Template:**\n  ```html\n  <div *ngIf=\"telemetryService.vitals$ | async as vitals\">\n    <span>Heart Rate: {{ vitals.bpm }}</span>\n  </div>\n  ```\n  The `async` pipe automatically subscribes on render and unsubscribes immediately when the template element is destroyed.",
    "tagsJson": "[\"Angular\",\"RxJS\",\"Memory Leak\",\"takeUntilDestroyed\",\"Dependency Injection\"]",
    "hints": [
      "Do subscriptions to infinite Observables (like BehaviorSubject, Router events, or interval) complete on their own?",
      "Why does retaining a subscription keep the entire unmounted component and its DOM in heap memory?",
      "What is the modern Angular 16+ replacement for the traditional 'takeUntil(destroy$)' pattern?",
      "Why is the async pipe naturally immune to this leak?"
    ],
    "tags": [
      "Angular",
      "RxJS",
      "Memory Leak",
      "takeUntilDestroyed",
      "Dependency Injection"
    ]
  },
  {
    "id": "scen-69",
    "moduleNumber": 21,
    "topicNumber": 3,
    "topicSlug": "angular-routing-forms-change-detection-signals",
    "title": "Scenario: 5,000-Row Grid Locks Browser on Keystrokes & Insecure Child Route Access",
    "difficulty": "Advanced",
    "prompt": "In an enterprise financial trading application: 1) A tabular grid with 5,000 active positions stutters and freezes for 800ms on every search input keystroke. 2) Security auditing discovers that unauthenticated users can directly navigate to '/admin/audit-logs' by typing the URL, even though '/admin' has a CanActivate guard attached. What are the two distinct root causes (one in Zone.js change detection, one in Angular router guard inheritance), and how do you resolve both?",
    "explanation": "Tests optimization of high-frequency DOM re-rendering using ChangeDetectionStrategy.OnPush / Angular Signals, and security nuances between CanActivate vs CanActivateChild in Angular route hierarchies.",
    "hintsJson": "[\"How does Zone.js handle DOM events like (input) or (keydown)? Does it check the entire application tree?\",\"How does ChangeDetectionStrategy.OnPush prune the change detection tree?\",\"Does a CanActivate guard placed on a parent route automatically protect child routes when navigating directly to a child URL?\",\"What is the difference between CanActivate and CanActivateChild?\"]",
    "recommendedSolution": "### Root Cause Analysis & Architecture Resolution:\n\n#### Problem 1: Change Detection Thrashing on 5,000 Rows:\n- **Root Cause:**\n  By default, Angular uses `ChangeDetectionStrategy.Default`. Zone.js patches all browser event listeners (`input`, `keydown`, `mousemove`, HTTP responses). Every keystroke in the search box triggers a top-down dirty-check pass evaluating expressions on all 5,000 table rows, resulting in severe CPU lag.\n- **Resolution:**\n  1. Set `changeDetection: ChangeDetectionStrategy.OnPush` on the row/grid components.\n  2. Implement virtual scrolling with `@angular/cdk/scrolling` (`cdk-virtual-scroll-viewport`) so only the 20 visible rows exist in the DOM.\n  3. Migrate search filtering to Angular Signals:\n     ```typescript\n     searchTerm = signal('');\n     filteredPositions = computed(() => {\n       const term = this.searchTerm().toLowerCase();\n       return this.allPositions().filter(p => p.symbol.toLowerCase().includes(term));\n     });\n     ```\n\n#### Problem 2: Child Route Bypass:\n- **Root Cause:**\n  In Angular's router, `canActivate` attached to a parent route only runs when the parent route itself is activated. If child routes exist and a user directly enters `/admin/audit-logs`, some router configurations bypass the parent `canActivate` check or do not evaluate child permissions.\n- **Resolution:**\n  Use `canActivateChild` on the parent route to guarantee every descendant child route executes the guard:\n  ```typescript\n  export const routes: Routes = [\n    {\n      path: 'admin',\n      component: AdminLayoutComponent,\n      canActivateChild: [authGuard], // Enforces guard on all child routes!\n      children: [\n        { path: 'audit-logs', component: AuditLogsComponent },\n        { path: 'users', component: UserManagementComponent }\n      ]\n    }\n  ];\n  ```",
    "tagsJson": "[\"Angular\",\"OnPush\",\"Zone.js\",\"Routing Guards\",\"CanActivateChild\"]",
    "hints": [
      "How does Zone.js handle DOM events like (input) or (keydown)? Does it check the entire application tree?",
      "How does ChangeDetectionStrategy.OnPush prune the change detection tree?",
      "Does a CanActivate guard placed on a parent route automatically protect child routes when navigating directly to a child URL?",
      "What is the difference between CanActivate and CanActivateChild?"
    ],
    "tags": [
      "Angular",
      "OnPush",
      "Zone.js",
      "Routing Guards",
      "CanActivateChild"
    ]
  },
  {
    "id": "scen-70",
    "moduleNumber": 22,
    "topicNumber": 1,
    "topicSlug": "nodejs-event-loop-libuv-async-programming",
    "title": "Scenario: Production API Latency Spikes to 30 Seconds Caused by Event Loop Starvation",
    "difficulty": "Advanced",
    "prompt": "A Node.js e-commerce microservice normally responds to GET /api/v1/products in 15ms. During a Black Friday flash sale, average p99 latency spikes to 32 seconds, Kubernetes health probes (/healthz) begin failing with 503 timeouts, and pods are terminated as unhealthy. Server CPU is at 98%, but database CPU is below 15%. Investigation reveals synchronous password hashing (bcrypt.hashSync) and an inefficient regex on search queries. Explain why this brought down the entire Node.js server, and detail the architectural remedy.",
    "explanation": "Tests deep understanding of Node.js single-threaded V8 execution model, libuv event loop starvation, the dangers of synchronous CPU-bound operations on the main thread, and how to properly offload CPU-intensive tasks.",
    "hintsJson": "[\"Can the Node.js event loop process incoming TCP packets or HTTP requests while executing a synchronous while loop or hashSync?\",\"Why did the /healthz probe time out even though it doesn't touch the database?\",\"What is the difference between bcrypt.hashSync and bcrypt.hash (or worker_threads)?\",\"How do catastrophic backtracking regular expressions (ReDoS) stall the V8 engine?\"]",
    "recommendedSolution": "### Root Cause Analysis & Architecture Resolution:\n\n#### 1. The Root Cause: Event Loop Starvation:\n- **Single-Threaded Execution:**\n  Node.js executes JavaScript on a single thread (the V8 call stack). While this thread executes synchronous JavaScript code, **the event loop cannot process any other work**, including incoming HTTP connections, timer callbacks, or Kubernetes `/healthz` ping checks.\n- **The Culprits:**\n  1. `bcrypt.hashSync('pass', 12)`: Takes ~250ms of pure CPU time per call. Under 100 concurrent logins, the call stack is blocked for 25 continuous seconds!\n  2. Catastrophic Regex Backtracking (ReDoS): An unanchored nested quantifier regex (e.g. `/^(a+)+$/`) on unvalidated user input took 8,000ms to evaluate a 40-character malformed payload.\n- **Cascading Failure:**\n  Because the main thread was stalled, Kubernetes liveness probes timed out (>3s). Kubelet assumed the container was dead and killed the pod, compounding load on remaining instances and causing a total service outage.\n\n#### 2. Architecture Remediation Protocol:\n1. **Never use Synchronous Crypto / Hashing on the Main Thread:**\n   Switch to asynchronous hashing which libuv delegates to its C++ background worker thread pool:\n   ```javascript\n   // ASYNC: Runs in libuv background thread pool, freeing V8 event loop!\n   const hash = await bcrypt.hash(password, 12);\n   ```\n2. **Prevent ReDoS with Safe Regex & Input Limits:**\n   - Use non-backtracking regex engines or test patterns with tools like `safe-regex`.\n   - Impose strict maximum lengths on search queries (e.g. `req.query.q.slice(0, 100)`).\n3. **Offload Heavy CPU Computation to Node Worker Threads:**\n   For report generation or heavy math, spawn `worker_threads` or use a dedicated queue service (RabbitMQ / BullMQ) with standalone worker processes.\n4. **Isolate Health Checks:**\n   Implement `perf_hooks.monitorEventLoopDelay()` to track lag, and configure Kubernetes liveness probe thresholds with appropriate timeout buffers.",
    "tagsJson": "[\"Node.js\",\"Event Loop\",\"libuv\",\"ReDoS\",\"Worker Threads\",\"Performance\"]",
    "hints": [
      "Can the Node.js event loop process incoming TCP packets or HTTP requests while executing a synchronous while loop or hashSync?",
      "Why did the /healthz probe time out even though it doesn't touch the database?",
      "What is the difference between bcrypt.hashSync and bcrypt.hash (or worker_threads)?",
      "How do catastrophic backtracking regular expressions (ReDoS) stall the V8 engine?"
    ],
    "tags": [
      "Node.js",
      "Event Loop",
      "libuv",
      "ReDoS",
      "Worker Threads",
      "Performance"
    ]
  },
  {
    "id": "scen-71",
    "moduleNumber": 22,
    "topicNumber": 2,
    "topicSlug": "nodejs-streams-buffer-file-handling",
    "title": "Scenario: Node.js Container Crashes with 'JavaScript heap out of memory' During Multi-Gigabyte CSV Export",
    "difficulty": "Advanced",
    "prompt": "An internal financial tool allows managers to export historical audit records to a CSV file. When an analyst requests 5 years of transactions (approx. 850,000 rows, 1.2 GB of data), the Node.js container abruptly exits with error: 'FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory' (Exit Code 137). The code was doing: const rows = await db.query(); const csv = formatCsv(rows); fs.writeFileSync('export.csv', csv);. How do you redesign this feature using Node.js streaming and backpressure to run with under 50MB RAM?",
    "explanation": "Tests mastery of Node.js stream pipelines, Transform streams, chunk-by-chunk processing, and avoiding in-memory array/string buffer accumulation on large I/O workloads.",
    "hintsJson": "[\"What is the default Node.js V8 max heap size on a 64-bit Linux container?\",\"Why does holding 850,000 JavaScript objects in memory require 4-5x more RAM than the raw CSV file on disk?\",\"How can a database query stream (e.g. pg-query-stream) emit rows one by one?\",\"Why should you use stream.promises.pipeline() instead of raw readable.pipe()?\"]",
    "recommendedSolution": "### Root Cause Analysis & Streaming Solution:\n\n#### 1. Why Heap Exhaustion Occurs:\n- **V8 Heap Overhead:**\n  A 1.2 GB CSV file on disk translates to over 4 GB of JavaScript heap objects due to V8 object wrappers, hidden classes, and string duplication.\n- **Buffer Ingestion:**\n  `fs.writeFileSync()` requires the **entire payload** to be present in memory as a single contiguous string or Buffer before writing. When heap usage hits ~1.4GB - 2GB (default Node V8 heap limit), V8 aborts with OOM crash.\n\n#### 2. Redesigning with Node.js Streaming Architecture:\nBy chaining database query streams directly through a CSV Transform stream to the HTTP response or file writable stream, memory usage remains **constant (~30MB)** regardless of whether the export is 10,000 rows or 10,000,000 rows.\n\n```javascript\nconst { pipeline } = require('stream/promises');\nconst { Transform } = require('stream');\nconst QueryStream = require('pg-query-stream');\nconst fs = require('fs');\n\nasync function exportLargeAuditCsv(res) {\n  const client = await pool.connect();\n  try {\n    const query = new QueryStream('SELECT id, timestamp, user_id, amount, status FROM audit_logs ORDER BY timestamp ASC');\n    const dbStream = client.query(query);\n\n    // Transform stream converts JSON object chunks into CSV line strings\n    let isFirst = true;\n    const csvTransformer = new Transform({\n      objectMode: true,\n      transform(chunk, encoding, callback) {\n        if (isFirst) {\n          this.push(Object.keys(chunk).join(',') + '\\n');\n          isFirst = false;\n        }\n        const line = Object.values(chunk).map(v => `\"${String(v).replace(/\"/g, '\"\"')}\"`).join(',');\n        this.push(line + '\\n');\n        callback();\n      }\n    });\n\n    res.setHeader('Content-Type', 'text/csv');\n    res.setHeader('Content-Disposition', 'attachment; filename=\"audit_export.csv\"');\n\n    // stream/promises.pipeline manages backpressure, errors, and cleanup automatically\n    await pipeline(dbStream, csvTransformer, res);\n    console.log('Export streamed successfully with constant memory!');\n  } finally {\n    client.release();\n  }\n}\n```\n\n#### 3. Verification:\n- Monitor container memory with `docker stats`: RSS memory remains flat at ~42MB throughout the entire 1.2GB streaming transfer.",
    "tagsJson": "[\"Node.js\",\"Streams\",\"Backpressure\",\"OOM\",\"Memory Management\",\"Transform\"]",
    "hints": [
      "What is the default Node.js V8 max heap size on a 64-bit Linux container?",
      "Why does holding 850,000 JavaScript objects in memory require 4-5x more RAM than the raw CSV file on disk?",
      "How can a database query stream (e.g. pg-query-stream) emit rows one by one?",
      "Why should you use stream.promises.pipeline() instead of raw readable.pipe()?"
    ],
    "tags": [
      "Node.js",
      "Streams",
      "Backpressure",
      "OOM",
      "Memory Management",
      "Transform"
    ]
  },
  {
    "id": "scen-72",
    "moduleNumber": 22,
    "topicNumber": 3,
    "topicSlug": "express-middleware-security-performance-caching",
    "title": "Scenario: Express Server Crashes Silently on Async Errors & Missing CORS on 500 Responses",
    "difficulty": "Advanced",
    "prompt": "In a production Express.js microservice: 1) Whenever a database timeout occurs inside an async route handler (e.g. app.get('/items', async (req, res) => { await db.query(); })), the process crashes with 'UnhandledPromiseRejection'. 2) When errors do return, the Angular frontend cannot read the error details because the browser displays 'No Access-Control-Allow-Origin header is present on the requested resource'. What are the Express middleware flaws leading to these issues, and how do you resolve them in Express 4 and Express 5?",
    "explanation": "Tests error handling mechanics in Express.js (lack of automatic async promise trapping in Express 4 vs Express 5), middleware registration order, and placing CORS and centralized error handlers properly.",
    "hintsJson": "[\"Does Express 4 automatically catch rejected promises in async route handlers?\",\"Why must async handlers in Express 4 use try/catch or an express-async-errors wrapper?\",\"Why did the error response lack CORS headers? Where was app.use(cors()) placed relative to the router and error handler?\",\"What are the 4 arguments required for an Express centralized error-handling middleware?\"]",
    "recommendedSolution": "### Root Cause Analysis & Architecture Resolution:\n\n#### 1. Why Express 4 Crashes on Async Errors:\nIn **Express 4**, the router engine only handles synchronous errors thrown inside middleware. If an `async` route handler rejects without a `try...catch` block, the rejected promise is unhandled by Express:\n```javascript\n// EXPRESS 4 ANTI-PATTERN: Crashes process on DB error!\napp.get('/items', async (req, res) => {\n  const items = await db.query(); // If this throws, Express NEVER catches it!\n  res.json(items);\n});\n```\nIn Node.js 16+, unhandled promise rejections terminate the process with exit code 1.\n\n#### 2. Why CORS Headers Were Missing on Error Responses:\nIf `app.use(cors())` is placed after some routes, or if the error handler manually creates a new response without headers, browser CORS policy blocks the client from inspecting HTTP 500 details.\n\n#### 3. Enterprise Fix:\n1. **In Express 4:** Install `express-async-errors` or use an `asyncHandler` wrapper:\n   ```javascript\n   const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);\n   app.get('/items', asyncHandler(async (req, res) => {\n     const items = await db.query();\n     res.json(items);\n   }));\n   ```\n   *(Note: Express 5 natively catches rejected promises in route handlers).*\n2. **Middleware Ordering Protocol:**\n   Place security headers and CORS **at the very top** of the middleware chain:\n   ```javascript\n   const app = express();\n   app.use(helmet());\n   app.use(cors({ origin: 'https://app.enterprise.domain', credentials: true })); // FIRST!\n   app.use(express.json());\n\n   // Routes\n   app.use('/api/v1', router);\n\n   // Centralized 4-parameter error handler (MUST BE LAST!)\n   app.use((err, req, res, next) => {\n     const statusCode = err.statusCode || 500;\n     res.status(statusCode).json({\n       status: statusCode,\n       message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message\n     });\n   });\n   ```",
    "tagsJson": "[\"Express.js\",\"Error Handling\",\"CORS\",\"Middleware\",\"Async/Await\"]",
    "hints": [
      "Does Express 4 automatically catch rejected promises in async route handlers?",
      "Why must async handlers in Express 4 use try/catch or an express-async-errors wrapper?",
      "Why did the error response lack CORS headers? Where was app.use(cors()) placed relative to the router and error handler?",
      "What are the 4 arguments required for an Express centralized error-handling middleware?"
    ],
    "tags": [
      "Express.js",
      "Error Handling",
      "CORS",
      "Middleware",
      "Async/Await"
    ]
  },
  {
    "id": "scen-73",
    "moduleNumber": 23,
    "topicNumber": 1,
    "topicSlug": "rest-api-design-http-protocol-idempotency",
    "title": "Scenario: Customers Double-Charged During Mobile Network Dropouts (Missing Idempotency Keys)",
    "difficulty": "Advanced",
    "prompt": "A mobile banking app allows customers to transfer money via POST /api/v1/transfers. On slow cellular networks (3G/trains), the client sends the payment request, the backend processes the charge, but the cellular tower drops before the HTTP 201 response reaches the phone. The mobile app automatically retries the request upon reconnecting. As a result, 4% of users are double-debited. How do you design an Idempotency-Key transaction mechanism using Redis and HTTP headers to make POST requests safely retryable?",
    "explanation": "Tests deep understanding of HTTP method idempotency constraints, the difference between safe and unsafe methods, and implementing the IETF Idempotency-Key specification with distributed locks and Redis cache.",
    "hintsJson": "[\"Is HTTP POST inherently idempotent according to RFC 7231?\",\"What HTTP header does Stripe and the IETF draft specify for safe retries?\",\"How should the backend handle a duplicate request while the first request is still processing (concurrent duplicate)?\",\"What HTTP status code and cached body should be returned on an idempotent replay?\"]",
    "recommendedSolution": "### Root Cause Analysis & Idempotency Key Architecture:\n\n#### 1. Why the Failure Occurs:\n- **POST is Non-Idempotent:**\n  According to HTTP/1.1 specifications, POST operations create new resources or initiate side effects each time they are executed.\n- **The Two-Generals Problem:**\n  In distributed networks, when a client does not receive an HTTP response, it cannot distinguish between:\n  a) The request never reached the server.\n  b) The server processed the request, but the response was lost during transmission.\n  Retrying a naive POST request causes duplicate charges.\n\n#### 2. The Idempotency-Key Solution Protocol (IETF Standard):\n1. **Client Generates V4 UUID:**\n   Before initiating payment, client generates a unique `Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d` and sends it in the HTTP headers.\n2. **Server Middleware Pipeline:**\n   ```javascript\n   async function idempotencyMiddleware(req, res, next) {\n     const key = req.headers['idempotency-key'];\n     if (!key) return next();\n\n     const redisKey = `idempotency:${req.user.id}:${key}`;\n     \n     // 1. Check if previously completed\n     const cachedRecord = await redis.get(redisKey);\n     if (cachedRecord) {\n       const { status, statusCode, headers, body } = JSON.parse(cachedRecord);\n       if (status === 'IN_FLIGHT') {\n         // Concurrent duplicate in progress: return 409 Conflict\n         return res.status(409).json({\n           title: 'Conflict',\n           detail: 'A transaction with this Idempotency-Key is currently in progress.'\n         });\n       }\n       // Return cached result with custom replay header\n       res.setHeader('X-Cache-Lookup', 'IDEMPOTENCY-HIT');\n       return res.status(statusCode).json(body);\n     }\n\n     // 2. Acquire lock in Redis with 120s TTL\n     await redis.set(redisKey, JSON.stringify({ status: 'IN_FLIGHT' }), 'EX', 120, 'NX');\n\n     // 3. Intercept response to store result\n     const originalJson = res.json.bind(res);\n     res.json = (body) => {\n       redis.set(redisKey, JSON.stringify({\n         status: 'COMPLETED',\n         statusCode: res.statusCode,\n         body\n       }), 'EX', 86400); // 24hr retention\n       return originalJson(body);\n     };\n\n     next();\n   }\n   ```\n3. **Verification:**\n   Retried requests receive HTTP 201 with identical payment reference ID and header `X-Cache-Lookup: IDEMPOTENCY-HIT`, completely preventing double charges.",
    "tagsJson": "[\"REST API\",\"Idempotency\",\"HTTP\",\"Redis\",\"Payment Architecture\"]",
    "hints": [
      "Is HTTP POST inherently idempotent according to RFC 7231?",
      "What HTTP header does Stripe and the IETF draft specify for safe retries?",
      "How should the backend handle a duplicate request while the first request is still processing (concurrent duplicate)?",
      "What HTTP status code and cached body should be returned on an idempotent replay?"
    ],
    "tags": [
      "REST API",
      "Idempotency",
      "HTTP",
      "Redis",
      "Payment Architecture"
    ]
  },
  {
    "id": "scen-74",
    "moduleNumber": 23,
    "topicNumber": 2,
    "topicSlug": "api-security-jwt-rbac-rate-limiting-cors",
    "title": "Scenario: Compromised JWT Access Token Allows 24 Hours of Unauthorized API Access Post-Suspension",
    "difficulty": "Advanced",
    "prompt": "An employee at a fintech enterprise has their credentials compromised. Security immediately suspends the user account in PostgreSQL and changes their role to SUSPENDED. However, SIEM logs show the attacker continues making authenticated API calls and downloading customer PII for the next 24 hours. The engineering team used self-contained, stateless JWTs with 24-hour expiration stored in localStorage. How do you re-architect the authentication and authorization system to achieve instantaneous revocation and secure token storage?",
    "explanation": "Tests security architecture trade-offs of purely stateless JWTs, implementing token blacklists/Redis revocation lists, dual-token architecture (short-lived access + rotated refresh tokens), and immune token storage.",
    "hintsJson": "[\"Can a stateless JWT be revoked before its 'exp' timestamp without checking a central store?\",\"What is the recommended lifespan for a stateless JWT access token (15 minutes vs 24 hours)?\",\"Why is storing tokens in localStorage dangerous against XSS attacks?\",\"How does a dual-token (access + refresh) architecture with refresh token rotation prevent this vulnerability?\"]",
    "recommendedSolution": "### Root Cause Analysis & Security Re-Architecture:\n\n#### 1. Why the Compromise Succeeded:\n- **Stateless Verification Trap:**\n  The API gateways verified the JWT solely by checking the cryptographic signature and `exp` claim without querying the database or cache. Because the token had a 24-hour lifespan, it remained cryptographically valid even after the database record was set to SUSPENDED.\n- **LocalStorage XSS Vulnerability:**\n  Storing tokens in `localStorage` allows any Cross-Site Scripting (XSS) vulnerability to exfiltrate the token to an external server.\n\n#### 2. Enterprise Authentication Re-Architecture:\n1. **Drastically Shorten Access Token Lifespan (10 - 15 Minutes):**\n   Stateless access tokens should expire within 10-15 minutes. This bounds the maximum window of vulnerability.\n2. **Dual-Token with Refresh Token Rotation (RTR):**\n   - **Access Token:** Short-lived (15 mins), passed in `Authorization: Bearer <token>`.\n   - **Refresh Token:** Long-lived (7 days), stored in an `httpOnly`, `Secure`, `SameSite=Strict` cookie (inaccessible to JavaScript XSS).\n   - Each refresh token can be used **exactly once**. Issuing a new access token invalidates the previous refresh token and issues a new one.\n3. **Instant Revocation via Redis Revocation List / Versioning:**\n   - Add a `tokenVersion` or `lastRevocationTime` field to the user entity.\n   - Embed `tokenVersion: 3` inside the JWT payload.\n   - When suspending a user, increment `tokenVersion` in Redis/DB.\n   - Gateway checks `jwtPayload.tokenVersion === redis.get('user:version:' + userId)` via fast sub-millisecond Redis lookup.\n4. **Immediate Revocation on Suspension:**\n   ```javascript\n   async function suspendUser(userId) {\n     await db.users.update({ where: { id: userId }, data: { status: 'SUSPENDED' } });\n     await redis.set(`blacklist:user:${userId}`, 'SUSPENDED', 'EX', 900); // 15 min TTL matching access token\n     await redis.del(`refresh_token:${userId}`); // Destroy active refresh session\n   }\n   ```",
    "tagsJson": "[\"API Security\",\"JWT\",\"RBAC\",\"Authentication\",\"Redis\",\"XSS\"]",
    "hints": [
      "Can a stateless JWT be revoked before its 'exp' timestamp without checking a central store?",
      "What is the recommended lifespan for a stateless JWT access token (15 minutes vs 24 hours)?",
      "Why is storing tokens in localStorage dangerous against XSS attacks?",
      "How does a dual-token (access + refresh) architecture with refresh token rotation prevent this vulnerability?"
    ],
    "tags": [
      "API Security",
      "JWT",
      "RBAC",
      "Authentication",
      "Redis",
      "XSS"
    ]
  },
  {
    "id": "scen-75",
    "moduleNumber": 23,
    "topicNumber": 3,
    "topicSlug": "api-validation-pagination-filtering-error-handling",
    "title": "Scenario: 100% Database CPU and Memory Exhaustion from OFFSET 500,000 Pagination",
    "difficulty": "Advanced",
    "prompt": "A SaaS analytics platform provides an API endpoint: GET /api/v1/events?offset=500000&limit=50. When marketing scrapers and automated ETL scripts query deep pagination pages, database CPU utilization hits 100%, disk I/O saturates, and query times climb from 4ms to 18 seconds. Simultaneously, client developers complain that error responses lack standardized format, making it impossible to build generic error toast notifications in Angular. How do you fix both issues?",
    "explanation": "Tests mastery of cursor-based / keyset pagination vs classic OFFSET-based degradation, and adopting RFC 7807 (Problem Details for HTTP APIs) for standardized error reporting.",
    "hintsJson": "[\"How does the database execute 'OFFSET 500000 LIMIT 50'? Does it read and discard 500,000 index entries?\",\"How does Keyset (Cursor) pagination achieve O(1) performance regardless of page depth?\",\"What standard fields are defined in RFC 7807 (type, title, status, detail, instance)?\",\"How do cursor tokens encode values securely using Base64URL?\"]",
    "recommendedSolution": "### Root Cause Analysis & Solution Protocol:\n\n#### 1. The OFFSET Performance Disaster:\n- **Why OFFSET Fails at Scale:**\n  When executing `SELECT * FROM events ORDER BY id ASC LIMIT 50 OFFSET 500000`, the database cannot magically jump to row 500,000. It must **scan 500,050 rows**, sort them, and discard the first 500,000 rows. Disk seek times and buffer thrashing cause O(N) degradation.\n- **The Keyset / Cursor Solution:**\n  Use an indexed seek condition (`WHERE id > :last_seen_id ORDER BY id ASC LIMIT 50`). The database traverses the B-Tree directly to the target row in **O(log N)** time (~1-2ms), regardless of whether it is page 1 or page 10,000!\n\n```javascript\n// Keyset Cursor Pagination Implementation\nasync function listEvents(limit = 50, afterCursor = null) {\n  let whereClause = {};\n  if (afterCursor) {\n    const { id, createdAt } = decodeCursor(afterCursor);\n    whereClause = {\n      OR: [\n        { createdAt: { lt: createdAt } },\n        { createdAt, id: { lt: id } }\n      ]\n    };\n  }\n\n  const items = await prisma.events.findMany({\n    where: whereClause,\n    take: limit + 1, // Fetch 1 extra to check if next page exists\n    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }]\n  });\n\n  const hasMore = items.length > limit;\n  const data = hasMore ? items.slice(0, limit) : items;\n  const nextCursor = hasMore ? encodeCursor(data[data.length - 1]) : null;\n\n  return { data, pagination: { limit, hasMore, nextCursor } };\n}\n```\n\n#### 2. Adopting RFC 7807 Standardized Problem Details:\nStandardize all error payloads with Content-Type `application/problem+json`:\n```json\n{\n  \"type\": \"https://api.enterprise.domain/errors/invalid-cursor\",\n  \"title\": \"Invalid Pagination Cursor\",\n  \"status\": 400,\n  \"detail\": \"The provided cursor token has expired or is malformed.\",\n  \"instance\": \"/api/v1/events?after=invalid_token\",\n  \"correlationId\": \"req_8f12b7a9\"\n}\n```\nAngular HTTP interceptors can now universally parse `error.title` and `error.detail` for clean UI alerts!",
    "tagsJson": "[\"Pagination\",\"Cursor Pagination\",\"RFC 7807\",\"Query Performance\",\"REST API\"]",
    "hints": [
      "How does the database execute 'OFFSET 500000 LIMIT 50'? Does it read and discard 500,000 index entries?",
      "How does Keyset (Cursor) pagination achieve O(1) performance regardless of page depth?",
      "What standard fields are defined in RFC 7807 (type, title, status, detail, instance)?",
      "How do cursor tokens encode values securely using Base64URL?"
    ],
    "tags": [
      "Pagination",
      "Cursor Pagination",
      "RFC 7807",
      "Query Performance",
      "REST API"
    ]
  },
  {
    "id": "scen-76",
    "moduleNumber": 24,
    "topicNumber": 1,
    "topicSlug": "sql-nosql-schema-modeling-indexing",
    "title": "Scenario: Relational Deadlocks and Flash Sale Inventory Inconsistency",
    "difficulty": "Advanced",
    "prompt": "During a limited-inventory product flash sale (1,000 units available), an e-commerce platform processes 10,000 concurrent checkout attempts. Database error logs report hundreds of 'ERROR: deadlock detected (SQLSTATE 40P01)', several transactions crash, and an inventory audit reveals 1,048 units were sold (oversold by 48 units). Code was executing: 1) SELECT stock FROM inventory WHERE product_id = 1; 2) if (stock > 0) UPDATE inventory SET stock = stock - 1; 3) INSERT INTO orders. Explain the concurrency race condition, why deadlocks occurred, and provide the ACID solution.",
    "explanation": "Tests deep understanding of ACID transaction isolation levels, read-modify-write race conditions, row-level locking (SELECT FOR UPDATE), and atomic decrement queries.",
    "hintsJson": "[\"What is the difference between Read Committed and Serializable isolation levels?\",\"Why does checking stock in application code before updating create a classic Race Condition (Time-of-Check to Time-of-Use)?\",\"How does 'SELECT ... FOR UPDATE' acquire an exclusive row lock?\",\"Can this be solved with a single atomic SQL statement: 'UPDATE inventory SET stock = stock - 1 WHERE id = ? AND stock > 0'?\"]",
    "recommendedSolution": "### Root Cause Analysis & Concurrency Resolution:\n\n#### 1. Why Overselling Occurred (Time-of-Check to Time-of-Use):\nThe code suffered from a classic **read-modify-write race condition**:\n1. When stock was 1, 50 concurrent transactions executed `SELECT stock FROM inventory` simultaneously. All 50 read `stock = 1`.\n2. Each transaction passed the `if (stock > 0)` check in Node.js.\n3. All 50 proceeded to execute `UPDATE inventory SET stock = stock - 1`.\n4. Result: 50 orders were placed for a single available unit (oversold by 49)!\n\n#### 2. Why Deadlocks Occurred:\nTransactions updated multiple related tables (inventory, orders, user wallets) in **inconsistent order**:\n- Transaction A locked Product 101, then requested Product 102.\n- Transaction B locked Product 102, then requested Product 101.\n- Both transactions blocked each other indefinitely until PostgreSQL aborted one with `ERROR: deadlock detected`.\n\n#### 3. Enterprise ACID Resolution Protocol:\n- **Solution 1: Atomic Conditional Decrement (Simplest & Highest Throughput):**\n  ```sql\n  UPDATE inventory\n  SET stock = stock - 1\n  WHERE product_id = 1 AND stock >= 1;\n  ```\n  In Node.js, inspect the affected row count (`result.rowCount`):\n  - If `rowCount === 1`: Inventory reserved successfully; proceed with order.\n  - If `rowCount === 0`: Sold out; abort transaction immediately with 409 Conflict.\n  This avoids application-level race conditions and requires zero manual locking!\n\n- **Solution 2: Explicit Row Locking (SELECT FOR UPDATE):**\n  If business logic requires inspection inside a transaction:\n  ```sql\n  BEGIN;\n  SELECT stock FROM inventory WHERE product_id = 1 FOR UPDATE; -- Acquires exclusive row lock\n  -- Perform additional validations...\n  UPDATE inventory SET stock = stock - 1 WHERE product_id = 1;\n  INSERT INTO orders (...);\n  COMMIT;\n  ```\n- **Deadlock Prevention Rule:**\n  Always acquire locks in a globally deterministic order (e.g. sorted by primary key ID).",
    "tagsJson": "[\"PostgreSQL\",\"ACID\",\"Transactions\",\"Deadlocks\",\"Row Locking\",\"Concurrency\"]",
    "hints": [
      "What is the difference between Read Committed and Serializable isolation levels?",
      "Why does checking stock in application code before updating create a classic Race Condition (Time-of-Check to Time-of-Use)?",
      "How does 'SELECT ... FOR UPDATE' acquire an exclusive row lock?",
      "Can this be solved with a single atomic SQL statement: 'UPDATE inventory SET stock = stock - 1 WHERE id = ? AND stock > 0'?"
    ],
    "tags": [
      "PostgreSQL",
      "ACID",
      "Transactions",
      "Deadlocks",
      "Row Locking",
      "Concurrency"
    ]
  },
  {
    "id": "scen-77",
    "moduleNumber": 24,
    "topicNumber": 2,
    "topicSlug": "query-optimization-execution-plans-caching",
    "title": "Scenario: Dashboard Latency Degrades from 40ms to 12 Seconds Due to N+1 Queries and Sequential Scans",
    "difficulty": "Advanced",
    "prompt": "An Angular enterprise admin dashboard displays a list of 50 organizations, each showing member count, active subscription tier, and latest invoice date. As user volume grew to 200,000 records, the dashboard API response time degraded from 40ms to 12.4 seconds. EXPLAIN ANALYZE reveals: 1) Over 150 separate SQL queries fired per HTTP request. 2) A 'Seq Scan on subscriptions (cost=0.00..18450.00 rows=200000)' taking 9,200ms. What are the two distinct database bottlenecks, and how do you optimize the query plan to achieve sub-50ms latency?",
    "explanation": "Tests query execution plan analysis (EXPLAIN ANALYZE), recognizing and fixing the N+1 ORM query problem, and adding composite indexes on foreign keys to eliminate sequential disk scans.",
    "hintsJson": "[\"What is the N+1 query problem, and why do ORMs (TypeORM/Prisma/Hibernate) produce it when lazy-loading relations?\",\"How do you eliminate N+1 queries using SQL JOINs or DataLoader batching?\",\"Why did the database perform a Sequential Scan on the subscriptions table instead of an Index Scan?\",\"What composite index should be added to subscriptions (organization_id, status)?\"]",
    "recommendedSolution": "### Root Cause Analysis & Query Optimization:\n\n#### 1. Bottleneck 1: The N+1 Query Disaster:\n- **Root Cause:**\n  The backend code queried the 50 organizations, and then executed separate queries inside a loop for each organization's subscriptions and members:\n  ```javascript\n  // ANTI-PATTERN: Fired 1 + 50 + 50 = 101 queries!\n  const orgs = await db.organizations.findMany();\n  for (const org of orgs) {\n    org.members = await db.members.count({ where: { orgId: org.id } });\n    org.subscription = await db.subscriptions.findFirst({ where: { orgId: org.id } });\n  }\n  ```\n  Network round-trips to the database caused cumulative latency delays.\n\n#### 2. Bottleneck 2: Missing Index Causing Full Sequential Scan:\n- **Root Cause:**\n  The `subscriptions` table had no index on the `organization_id` foreign key. To find an organization's subscription, PostgreSQL had to read every single 8KB disk block across all 200,000 rows (Sequential Scan).\n\n#### 3. Sub-50ms Optimization Protocol:\n1. **Add Composite Covering Index:**\n   ```sql\n   CREATE INDEX CONCURRENTLY idx_subscriptions_org_status\n   ON subscriptions (organization_id, status)\n   INCLUDE (plan_tier, current_period_end);\n   ```\n   This transforms the Sequential Scan into an **Index Only Scan** completing in 0.04ms.\n2. **Eager Loading with Aggregated SQL JOIN:**\n   Replace the 101 separate queries with a single optimized SQL query:\n   ```sql\n   SELECT \n     o.id, \n     o.name, \n     COUNT(m.id) AS member_count, \n     s.plan_tier, \n     s.current_period_end\n   FROM organizations o\n   LEFT JOIN members m ON m.organization_id = o.id\n   LEFT JOIN subscriptions s ON s.organization_id = o.id AND s.status = 'ACTIVE'\n   GROUP BY o.id, s.plan_tier, s.current_period_end;\n   ```\n3. **Add Redis Cache-Aside Layer:**\n   Cache the aggregated dashboard payload with a 60-second TTL to reduce database load to near-zero for repeat visits. Response time drops from 12,400ms to **8ms**!",
    "tagsJson": "[\"Query Optimization\",\"EXPLAIN ANALYZE\",\"N+1 Problem\",\"Indexes\",\"PostgreSQL\",\"Redis\"]",
    "hints": [
      "What is the N+1 query problem, and why do ORMs (TypeORM/Prisma/Hibernate) produce it when lazy-loading relations?",
      "How do you eliminate N+1 queries using SQL JOINs or DataLoader batching?",
      "Why did the database perform a Sequential Scan on the subscriptions table instead of an Index Scan?",
      "What composite index should be added to subscriptions (organization_id, status)?"
    ],
    "tags": [
      "Query Optimization",
      "EXPLAIN ANALYZE",
      "N+1 Problem",
      "Indexes",
      "PostgreSQL",
      "Redis"
    ]
  },
  {
    "id": "scen-78",
    "moduleNumber": 24,
    "topicNumber": 3,
    "topicSlug": "fullstack-system-design-angular-node-integration",
    "title": "Scenario: 50,000 Reconnecting Angular Clients Crash Node.js Cluster (WebSocket Storm)",
    "difficulty": "Advanced",
    "prompt": "A collaborative project management tool built with Angular and Node.js uses WebSockets (Socket.io) for live document updates. During a brief 10-second Nginx load balancer reload, all 50,000 connected clients lose connection. The instant Nginx recovers, all 50,000 clients simultaneously attempt to reconnect, negotiate TLS, perform JWT verification, and query user permissions from PostgreSQL. The backend Node.js cluster experiences 100% CPU lockup, DB connection pools exhaust, and the cluster enters an unrecoverable restart loop. How do you re-architect the client reconnection and backend capacity to withstand connection storms?",
    "explanation": "Tests enterprise full-stack system design, WebSocket scalability, the Thundering Herd / Connection Storm problem, exponential backoff with jitter on the Angular client, and Redis Pub/Sub adapter scaling.",
    "hintsJson": "[\"Why does simultaneous reconnection from 50,000 clients create a 'Thundering Herd' on authentication endpoints?\",\"How does exponential backoff with randomized jitter prevent synchronized reconnection spikes?\",\"Why should WebSocket token validation use cached public keys rather than hitting the primary database?\",\"How does the Socket.io Redis Streams / PubSub adapter decouple WebSocket instances?\"]",
    "recommendedSolution": "### Root Cause Analysis & System Design Architecture:\n\n#### 1. Why the Thundering Herd Crashed the System:\n- **Synchronized Reconnection:**\n  The Angular frontend had a naive reconnection policy: on disconnect, immediately retry every 1,000ms. When 50,000 clients disconnected at the same instant, all 50,000 fired reconnection handshakes at exact 1-second intervals.\n- **Resource Exhaustion:**\n  Each handshake required:\n  a) TLS Handshake computation.\n  b) HTTP upgrade overhead.\n  c) Database query to verify user permissions (`SELECT * FROM users`).\n  The database connection pool limit (100 connections) was exceeded in 50ms, causing database connection timeouts and cascading node crashes.\n\n#### 2. System Design Resolution:\n\n##### A. Angular Client: Exponential Backoff with Full Jitter:\nNever retry on fixed intervals. Implement full jitter so client retries are uniformly distributed across time:\n```typescript\nfunction getReconnectDelay(retryAttempt: number): number {\n  const baseDelay = 1000; // 1s\n  const maxDelay = 30000; // 30s\n  // Exponential calculation\n  const temp = Math.min(maxDelay, baseDelay * Math.pow(2, retryAttempt));\n  // Full Jitter: random integer between 0 and temp\n  return Math.floor(Math.random() * temp);\n}\n```\nThis smooths 50,000 simultaneous reconnects into a gradual, manageable trickle over 30 seconds.\n\n##### B. Backend: Stateless JWT Handshake Verification:\n- Stop querying the SQL database during the WebSocket handshake!\n- Verify the user's JWT locally using the RSA public key.\n- Store active channel permissions in Redis in-memory cache.\n\n##### C. Horizontal WebSocket Scaling with Redis Adapter:\nUse `@socket.io/redis-adapter` so that Node.js worker nodes can scale horizontally across multiple container instances without needing sticky sessions or cross-worker polling.\n\n##### D. Edge Rate Limiting:\nConfigure Nginx connection limits:\n```nginx\nlimit_conn_zone $binary_remote_addr zone=addr:10m;\nlimit_req_zone $binary_remote_addr zone=reconnect_limit:10m rate=10r/s;\n\nlocation /socket.io/ {\n    limit_req zone=reconnect_limit burst=20 nodelay;\n    proxy_pass http://node_backend;\n}\n```",
    "tagsJson": "[\"System Design\",\"WebSockets\",\"Thundering Herd\",\"Exponential Backoff\",\"Angular\",\"Node.js\"]",
    "hints": [
      "Why does simultaneous reconnection from 50,000 clients create a 'Thundering Herd' on authentication endpoints?",
      "How does exponential backoff with randomized jitter prevent synchronized reconnection spikes?",
      "Why should WebSocket token validation use cached public keys rather than hitting the primary database?",
      "How does the Socket.io Redis Streams / PubSub adapter decouple WebSocket instances?"
    ],
    "tags": [
      "System Design",
      "WebSockets",
      "Thundering Herd",
      "Exponential Backoff",
      "Angular",
      "Node.js"
    ]
  }
,
  {
  "id": "scen-iam-cross-account-denied",
  "moduleNumber": 2,
  "title": "Scenario: Cross-Account S3 Access Denied Despite IAM Allow Policy",
  "difficulty": "Advanced",
  "prompt": "A data science application running in AWS Account B needs to read parquet files from an Amazon S3 bucket located in AWS Account A. The DevOps engineer in Account B attached an IAM policy granting 's3:GetObject' and 's3:ListBucket' on 'arn:aws:s3:::analytics-data-lake-a/*'. However, when the application runs 'aws s3 ls s3://analytics-data-lake-a', it receives 'An error occurred (AccessDenied) when calling the ListObjectsV2 operation'. What is missing, and how do you resolve this cross-account access failure?",
  "explanation": "Tests cross-account authorization principles: for same-account access, either an IAM policy OR a resource policy is sufficient. For cross-account access, BOTH the IAM policy in the caller account AND the resource-based bucket policy in the resource owner account must explicitly permit the access.",
  "hintsJson": "[\"Hint 1: Does an IAM policy in Account B have the authority to grant access to a resource owned by Account A?\",\"Hint 2: What resource-based policy exists on the S3 bucket in Account A?\",\"Hint 3: Does the bucket policy in Account A include Account B's IAM Role ARN as a Principal?\",\"Hint 4: If the objects are encrypted with SSE-KMS, does Account B have kms:Decrypt permissions on the KMS key?\"]",
  "recommendedSolution": "### Root Cause Analysis & Step-by-Step Resolution:\n\n1. **The Cross-Account Authorization Rule:**\n   - For same-account access: IAM Policy **OR** Resource Policy = Access Granted.\n   - For cross-account access: **IAM Policy in Account B AND Bucket Policy in Account A MUST BOTH grant access.**\n   - Account B cannot unilaterally grant its own identities permission to access Account A's resources.\n\n2. **Fix Step 1: Update the S3 Bucket Policy in Account A:**\n   - In Account A, add a Bucket Policy explicitly naming the Account B IAM Role ARN as the `Principal`:\n```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"AllowAccountBAccess\",\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"AWS\": \"arn:aws:iam::ACCOUNT_B_ID:role/DataScienceAppRole\"\n      },\n      \"Action\": [\n        \"s3:ListBucket\",\n        \"s3:GetObject\"\n      ],\n      \"Resource\": [\n        \"arn:aws:s3:::analytics-data-lake-a\",\n        \"arn:aws:s3:::analytics-data-lake-a/*\"\n      ]\n    }\n  ]\n}\n```\n\n3. **Fix Step 2: KMS Key Policy Permissions (If Encrypted with SSE-KMS):**\n   - If objects in `analytics-data-lake-a` are encrypted using an AWS KMS Customer Master Key (CMK), Account B will still fail with AccessDenied during `s3:GetObject` unless Account A's KMS Key Policy also grants `kms:Decrypt` to Account B's role.\n\n4. **Fix Step 3: Enforce S3 Object Ownership:**\n   - Set S3 Object Ownership to **BucketOwnerEnforced** on Account A's bucket so that all future writes from Account B automatically belong to Account A, preventing permission mismatches.",
  "tagsJson": "[\"IAM\",\"S3\",\"Cross-Account\",\"Security\",\"Troubleshooting\"]",
  "hints": [
    "Hint 1: Does an IAM policy in Account B have the authority to grant access to a resource owned by Account A?",
    "Hint 2: What resource-based policy exists on the S3 bucket in Account A?",
    "Hint 3: Does the bucket policy in Account A include Account B's IAM Role ARN as a Principal?",
    "Hint 4: If the objects are encrypted with SSE-KMS, does Account B have kms:Decrypt permissions on the KMS key?"
  ],
  "tags": [
    "IAM",
    "S3",
    "Cross-Account",
    "Security",
    "Troubleshooting"
  ]
},
  {
  "id": "scen-rds-multiaz-failover-remediation",
  "moduleNumber": 9,
  "title": "Scenario: Investigating Production Database Downtime During Availability Zone Outage",
  "difficulty": "Advanced",
  "prompt": "During a major regional storm, AWS us-east-1a experiences a facility power disruption. Your company's primary MySQL RDS instance is located in us-east-1a configured as Multi-AZ with a standby in us-east-1b. The web application reports HTTP 500 database connection errors for approximately 75 seconds, after which traffic automatically recovers with zero data loss. The VP of Engineering asks you: (1) Why did the 75-second outage occur? (2) Why did no one have to manually update application database endpoints? (3) How do you verify the standby is now the primary?",
  "explanation": "Validates real-world understanding of Multi-AZ automatic failover mechanics, DNS TTL caching behaviors, and operational monitoring.",
  "hintsJson": "[\"Hint 1: What synchronous replication guarantees zero data loss (RPO = 0) in RDS Multi-AZ?\",\"Hint 2: How does RDS redirect database traffic from the failed host to the standby host?\",\"Hint 3: Why do applications experience a 60-120 second pause before reconnecting?\",\"Hint 4: Which AWS CloudWatch events and RDS Console views confirm failover completion?\"]",
  "recommendedSolution": "### Executive Incident Post-Mortem & Architecture Explanation:\n\n1. **Why the 75-Second Disruption Occurred:**\n   - **Automated Failover Steps:**\n     1. **Failure Detection (~20-30s):** RDS health monitors detect that the primary DB host in us-east-1a is unresponsive.\n     2. **Standby Promotion (~20s):** RDS promotes the standby instance in us-east-1b to become the active read/write master.\n     3. **DNS Propagation (~30s):** RDS flips the DNS CNAME record of the DB endpoint (`mydb.c7xxxx.us-east-1.rds.amazonaws.com`) to the IP address of the newly promoted instance in us-east-1b.\n   - **Application JVM/Node.js DNS Caching:** If backend application instances cache DNS indefinitely instead of respecting low TTLs (typically 5 seconds), reconnection is delayed until existing TCP sockets error out and re-resolve DNS.\n\n2. **Why Endpoints Did NOT Need Manual Updating:**\n   - RDS Multi-AZ uses a **dynamic DNS CNAME record** for the database endpoint.\n   - The connection string configured in application environment variables (`DATABASE_URL = mydb.c7xxxx.us-east-1.rds.amazonaws.com`) never changes.\n   - When the failover completes, the DNS record resolves to the new IP address automatically.\n\n3. **Zero Data Loss Guarantee (RPO = 0):**\n   - Because Multi-AZ uses **synchronous physical block-level replication**, every transaction committed on the primary was already written to disk on the standby before the client received an acknowledgement. Therefore, zero committed transactions were lost.\n\n4. **Verification & Post-Failover Actions:**\n   - Inspect **RDS Events**: Look for event `RDS-EVENT-0049: A failure occurred on the primary host. Multi-AZ failover initiated` followed by `RDS-EVENT-0047: Multi-AZ failover completed`.\n   - In the AWS Console, observe that the DB instance's **Availability Zone** is now `us-east-1b`.\n   - RDS will automatically provision a new standby in another healthy AZ to restore high-availability redundancy once capacity is available.",
  "tagsJson": "[\"RDS\",\"Multi-AZ\",\"High Availability\",\"Incident Response\",\"Post-Mortem\"]",
  "hints": [
    "Hint 1: What synchronous replication guarantees zero data loss (RPO = 0) in RDS Multi-AZ?",
    "Hint 2: How does RDS redirect database traffic from the failed host to the standby host?",
    "Hint 3: Why do applications experience a 60-120 second pause before reconnecting?",
    "Hint 4: Which AWS CloudWatch events and RDS Console views confirm failover completion?"
  ],
  "tags": [
    "RDS",
    "Multi-AZ",
    "High Availability",
    "Incident Response",
    "Post-Mortem"
  ]
},
  {
  "id": "scen-lambda-rds-exhaustion",
  "moduleNumber": 10,
  "title": "Scenario: Serverless Lambda Functions Crashing Relational Database with Max Connections Error",
  "difficulty": "Advanced",
  "prompt": "A food delivery startup launches a mobile marketing campaign. Traffic surges from 50 orders/minute to 4,000 orders/minute. The backend architecture consists of API Gateway invoking an AWS Lambda function that queries a db.t3.medium Amazon RDS PostgreSQL database. Within 2 minutes of the launch, Lambda functions begin timing out, and CloudWatch logs show 'FATAL: remaining connection slots are reserved for non-replicated superuser connections'. How do you resolve this connection pooling crisis?",
  "explanation": "Classic serverless-to-relational bottleneck: Lambda scales out horizontally by spinning up new concurrent containers, each opening independent database connections that quickly overwhelm relational database connection limits.",
  "hintsJson": "[\"Hint 1: How many concurrent connections can a db.t3.medium PostgreSQL instance support?\",\"Hint 2: What happens when 1,000 Lambda microVMs all execute database pool creation inside their handlers?\",\"Hint 3: Which managed AWS proxy service pools and multiplexes database connections for serverless applications?\",\"Hint 4: How can Lambda reserved concurrency throttle traffic to safe database limits?\"]",
  "recommendedSolution": "### Architectural Root Cause & Production Remediation:\n\n1. **Root Cause Analysis:**\n   - A `db.t3.medium` PostgreSQL instance supports a maximum of approximately **150-200 concurrent connections**.\n   - As incoming HTTP traffic surged, AWS Lambda rapidly scaled out to **1,000 concurrent execution environments**.\n   - Each Lambda container opened its own database connection (or pool of 5-10 connections). Total requested connections exceeded 3,000, immediately crashing PostgreSQL with `max_connections` exhaustion.\n   - When database connections failed, Lambda invocations hung until their 30-second timeout expired, keeping connection slots locked in a deadly spiral.\n\n2. **Immediate Production Mitigation:**\n   - Apply **Reserved Concurrency** on the Lambda function (e.g. `aws lambda put-function-concurrency --reserved-concurrent-executions 80`). This immediately stops new Lambda instances from flooding the database beyond its capacity.\n\n3. **Permanent Architectural Solution: Deploy Amazon RDS Proxy:**\n   - Deploy **Amazon RDS Proxy** between Lambda and the PostgreSQL database.\n   - **How RDS Proxy Solves the Problem:**\n     1. **Connection Pooling & Multiplexing:** Thousands of concurrent Lambda microVMs connect to the RDS Proxy. The proxy multiplexes these thousands of short-lived client connections across a small, persistent pool of ~50-80 connections to PostgreSQL.\n     2. **Connection Reuse:** Warm Lambda containers reuse proxy connections without connection handshakes.\n     3. **Failover Acceleration:** If RDS performs a Multi-AZ failover, RDS Proxy automatically redirects traffic to the new standby, reducing failover connection drop time by up to 66%.\n\n4. **Lambda Code Optimization:**\n   - Ensure the database client or ORM connection pool is instantiated **outside the Lambda handler function (in the global execution scope)** so that warm microVMs reuse existing database connections across multiple invocations rather than opening a new connection on every single request.",
  "tagsJson": "[\"Lambda\",\"RDS\",\"RDS Proxy\",\"Connection Pooling\",\"Serverless Architecture\"]",
  "hints": [
    "Hint 1: How many concurrent connections can a db.t3.medium PostgreSQL instance support?",
    "Hint 2: What happens when 1,000 Lambda microVMs all execute database pool creation inside their handlers?",
    "Hint 3: Which managed AWS proxy service pools and multiplexes database connections for serverless applications?",
    "Hint 4: How can Lambda reserved concurrency throttle traffic to safe database limits?"
  ],
  "tags": [
    "Lambda",
    "RDS",
    "RDS Proxy",
    "Connection Pooling",
    "Serverless Architecture"
  ]
},
  {
  "id": "scen-s3-ransomware-object-lock",
  "moduleNumber": 6,
  "title": "Scenario: Architecting SEC Rule 17a-4 Regulatory Compliance & Ransomware Defense on Amazon S3",
  "difficulty": "Advanced",
  "prompt": "An investment bank requires that all trade confirmation records and customer wire receipts are retained for exactly 7 years. Regulatory compliance (SEC Rule 17a-4 and FINRA) mandates that: (1) Once written, records cannot be modified, deleted, or renamed by ANY user, including the AWS Account Root User or cloud administrators, (2) If a ransomware attacker compromises administrator credentials, they must be unable to wipe or encrypt the bucket, (3) After 7 years, files must automatically expire to minimize storage liability. How do you design this on AWS?",
  "explanation": "Tests enterprise compliance architecture: WORM storage, S3 Object Lock in Compliance Mode, S3 Versioning, KMS Customer Master Keys, and lifecycle expiration.",
  "hintsJson": "[\"Hint 1: What S3 feature provides Write Once Read Many (WORM) storage?\",\"Hint 2: What is the crucial difference between Governance Mode and Compliance Mode in Object Lock?\",\"Hint 3: Can Object Lock be enabled on an existing unversioned bucket without AWS Support?\",\"Hint 4: How do lifecycle rules safely delete objects after their retention period expires?\"]",
  "recommendedSolution": "### Production Enterprise Architecture Design:\n\n1. **Storage Foundation with S3 Object Lock (WORM Storage):**\n   - Create a dedicated Amazon S3 bucket with **S3 Object Lock** enabled at creation time (this automatically enables **S3 Versioning**).\n   - Configure **Default Retention Mode: COMPLIANCE MODE** with a duration of **7 years (2,555 days)**.\n   - **Why Compliance Mode is Essential:**\n     - In **Governance Mode**, users with the `s3:BypassGovernanceRetention` permission can still delete objects.\n     - In **Compliance Mode**, **NO ONE—not even the AWS account root user, IAM administrators, or AWS Support engineers—can delete, overwrite, or shorten the retention period of an object** until the 7-year clock expires. This provides 100% defense against rogue insider attacks and ransomware wipers.\n\n2. **Server-Side Encryption with Multi-Account KMS Key:**\n   - Encrypt all objects using **SSE-KMS** with an AWS KMS Customer Master Key (CMK) configured with annual automatic key rotation.\n   - Store the KMS CMK in a **separate dedicated Security Account** governed by AWS Organizations SCPs preventing key deletion (`kms:ScheduleKeyDeletion` denied).\n\n3. **Bucket Access Hardening:**\n   - Enable **S3 Block Public Access** with all 4 settings active.\n   - Set **S3 Object Ownership to BucketOwnerEnforced** to eliminate legacy ACL vulnerabilities.\n   - Enforce in-transit encryption by adding a Bucket Policy denying `aws:SecureTransport: false`.\n\n4. **Automated Lifecycle Expiration:**\n   - Create an **S3 Lifecycle Rule**:\n     - Action: Expire objects after **2,556 days (7 years + 1 day)**.\n     - Action: Permanently delete noncurrent object versions after 30 days.\n   - When the 7-year retention period expires, S3 lifecycle automation safely deletes the files, freeing the bank from perpetual storage costs and legal discovery exposure.",
  "tagsJson": "[\"S3\",\"Object Lock\",\"WORM\",\"Compliance\",\"Ransomware\",\"Security\"]",
  "hints": [
    "Hint 1: What S3 feature provides Write Once Read Many (WORM) storage?",
    "Hint 2: What is the crucial difference between Governance Mode and Compliance Mode in Object Lock?",
    "Hint 3: Can Object Lock be enabled on an existing unversioned bucket without AWS Support?",
    "Hint 4: How do lifecycle rules safely delete objects after their retention period expires?"
  ],
  "tags": [
    "S3",
    "Object Lock",
    "WORM",
    "Compliance",
    "Ransomware",
    "Security"
  ]
}
,
  {
  "id": "scen-ec2-system-status-remediation",
  "moduleNumber": 4,
  "title": "Scenario: Production Web Server Failing System Status Check (1/2 Checks Passed)",
  "difficulty": "Intermediate",
  "prompt": "At 03:00 AM, CloudWatch triggers an alarm for your primary production EC2 instance running on us-east-1. The AWS Management Console shows the instance status as '1/2 checks passed' with 'System Status Check: Failed' and 'Instance Status Check: Passed'. Users cannot reach the hosted web portal. The on-call engineer attempts an OS reboot from the console, but the system check remains 'Failed' after 10 minutes. How do you resolve this incident and restore production traffic?",
  "explanation": "Tests understanding of physical host virtualization failure remediation. System status check failures stem from AWS underlying hardware and cannot be solved with an OS reboot.",
  "hintsJson": "[\"Hint 1: What is the underlying cause of a System Status Check failure?\",\"Hint 2: Why does rebooting an EC2 instance keep it on the exact same physical host hardware?\",\"Hint 3: What command or console action forces AWS to migrate the instance to a new physical host?\",\"Hint 4: What happens to the public IP address if an Elastic IP is not attached?\"]",
  "recommendedSolution": "### Step-by-Step Incident Resolution:\n\n1. **Root Cause Identification:**\n   - **StatusCheckFailed_System** indicates a fault in the **underlying physical server hardware, rack power supply, top-of-rack network switch, or hypervisor software**.\n   - An OS reboot (`aws ec2 reboot-instances`) only restarts the virtual operating system inside the existing hypervisor container—it keeps the instance bound to the exact same degraded physical hardware.\n\n2. **Immediate Remediation Workflow (Host Migration):**\n   - To force AWS to relocate the VM to a healthy physical host machine:\n     1. **Stop the Instance:** Run `aws ec2 stop-instances --instance-ids <instance-id>` (or click Instance State → Stop in the Console). This deallocates the hypervisor slot on the damaged hardware host.\n     2. **Start the Instance:** Run `aws ec2 start-instances --instance-ids <instance-id>`. AWS EC2 fleet scheduler selects a completely new, healthy physical server within the same Availability Zone and attaches the persistent EBS root volume.\n     3. **Verify:** Wait 2 minutes and confirm the instance state reaches **'2/2 status checks passed'**.\n\n3. **Critical Networking Caveat (Public IP Address):**\n   - If the instance relied on an auto-assigned public IPv4 address, stopping and starting the instance **releases that public IP back to AWS's public pool**, assigning a new public IP.\n   - Ensure an **Elastic IP (EIP)** was attached, or immediately update your domain's DNS A/CNAME record in Route 53 to point to the newly assigned public IPv4 address.\n\n4. **Preventative Automation:**\n   - Create a CloudWatch Alarm monitoring metric `StatusCheckFailed_System`.\n   - Add an **EC2 Auto-Recovery action** (`arn:aws:automate:REGION:ec2:recover`) so that if a physical hardware failure reoccurs, AWS automatically migrates the instance to healthy hardware without human intervention.",
  "tagsJson": "[\"EC2\",\"Status Checks\",\"Troubleshooting\",\"High Availability\",\"SysOps\"]",
  "hints": [
    "Hint 1: What is the underlying cause of a System Status Check failure?",
    "Hint 2: Why does rebooting an EC2 instance keep it on the exact same physical host hardware?",
    "Hint 3: What command or console action forces AWS to migrate the instance to a new physical host?",
    "Hint 4: What happens to the public IP address if an Elastic IP is not attached?"
  ],
  "tags": [
    "EC2",
    "Status Checks",
    "Troubleshooting",
    "High Availability",
    "SysOps"
  ]
},
  {
  "id": "scen-elb-alb-path-routing-microservices",
  "moduleNumber": 5,
  "title": "Scenario: Consolidating 4 Independent Web Services into an Application Load Balancer with Path-Based Routing and SNI",
  "difficulty": "Advanced",
  "prompt": "An enterprise currently operates 4 independent Classic Load Balancers running 4 separate web services: (1) Main Storefront (www.company.com), (2) REST API (api.company.com), (3) Checkout (/checkout/*), and (4) Legacy App (portal.company.com). The infrastructure bill is bloated with ELB hourly costs, and developers want to enable HTTP/2 and modern SSL with centralized AWS WAF. How would you re-architect this onto a single Application Load Balancer?",
  "explanation": "Architectural consolidation exercise leveraging ALB Layer 7 content routing, Server Name Indication (SNI), target groups, and HTTP/2 performance.",
  "hintsJson": "[\"Hint 1: How can an ALB route based on hostnames vs URL paths?\",\"Hint 2: Which feature allows multiple SSL certificates to coexist on port 443?\",\"Hint 3: How are backend compute instances grouped for independent routing?\",\"Hint 4: How do you enforce HTTP-to-HTTPS redirection at the ALB tier?\"]",
  "recommendedSolution": "### Production Modernization Architecture:\n\n1. **Target Group Segregation:**\n   - Create 4 independent **Target Groups**:\n     - `tg-storefront`: EC2 instances running frontend web application.\n     - `tg-api`: ECS container tasks running backend Node.js APIs.\n     - `tg-checkout`: Auto Scaling Group dedicated to checkout microservice.\n     - `tg-legacy`: Legacy EC2 instances.\n\n2. **Single HTTPS Listener (Port 443) with Server Name Indication (SNI):**\n   - Bind an ACM SSL certificate for `www.company.com` as the default certificate.\n   - Attach additional ACM SSL certificates for `api.company.com` and `portal.company.com` using **Server Name Indication (SNI)** on the same port 443 listener.\n\n3. **Content-Based Routing Rules Configuration:**\n   - **Rule 1 (Host-Based):** If `Host is portal.company.com` → Forward to `tg-legacy`.\n   - **Rule 2 (Host-Based):** If `Host is api.company.com` → Forward to `tg-api`.\n   - **Rule 3 (Path-Based):** If `Path is /checkout/*` → Forward to `tg-checkout`.\n   - **Default Rule:** Forward all other traffic to `tg-storefront`.\n\n4. **Security & Performance Enhancements:**\n   - **HTTP-to-HTTPS Redirection:** Create an HTTP listener on port 80 with a default action of **Redirect to HTTPS port 443 (301 Permanent)**.\n   - **Protocol Upgrade:** Enable **HTTP/2** on the ALB for multiplexed parallel asset streaming.\n   - **Centralized Security:** Attach **AWS WAF** to the single ALB to enforce rate limiting and OWASP Top 10 threat protection across all 4 services simultaneously.",
  "tagsJson": "[\"ALB\",\"ELB\",\"SNI\",\"Microservices\",\"Path Routing\",\"Architecture\"]",
  "hints": [
    "Hint 1: How can an ALB route based on hostnames vs URL paths?",
    "Hint 2: Which feature allows multiple SSL certificates to coexist on port 443?",
    "Hint 3: How are backend compute instances grouped for independent routing?",
    "Hint 4: How do you enforce HTTP-to-HTTPS redirection at the ALB tier?"
  ],
  "tags": [
    "ALB",
    "ELB",
    "SNI",
    "Microservices",
    "Path Routing",
    "Architecture"
  ]
},
  {
  "id": "scen-asg-boot-grace-period-thrashing",
  "moduleNumber": 5,
  "title": "Scenario: Auto Scaling Group Terminating Booting Instances in Infinite Loop (Flapping)",
  "difficulty": "Advanced",
  "prompt": "A fintech engineering team deploys a new Java Spring Boot microservice to an Auto Scaling Group behind an Application Load Balancer. The application requires 4 minutes to download dependencies, run database schema validations, and start the JVM. However, during scale-out, newly launched instances enter an infinite cycle: the ASG launches an instance, marks it 'Unhealthy' after 30 seconds, terminates it, and launches another one continuously. What is the root cause, and how do you resolve it?",
  "explanation": "Classic production failure caused by mismatched ELB health checks and ASG Health Check Grace Periods, where the autoscaler kills healthy instances before their software completes startup.",
  "hintsJson": "[\"Hint 1: How long does the ASG wait before checking an instance's health after launch?\",\"Hint 2: What is the default Health Check Grace Period on an ASG?\",\"Hint 3: What happens when an ALB health check receives connection refused on a booting app?\",\"Hint 4: How do you configure the grace period to accommodate a 4-minute boot time?\"]",
  "recommendedSolution": "### Root Cause Analysis & Production Remediation:\n\n1. **Root Cause Analysis:**\n   - The Java application requires **4 minutes (240 seconds)** to complete initialization and begin listening on port 8080.\n   - The Auto Scaling Group's **Health Check Grace Period** was set to only **30 seconds** (or left at default with an aggressive ALB health check interval).\n   - At the 31-second mark, the ALB probes `GET /health` on the instance. Because the Spring Boot container is still starting up, the TCP connection is refused.\n   - The ALB immediately marks the instance **Unhealthy**.\n   - Because the ASG's health check type is configured to `ELB`, the ASG detects the unhealthy status, immediately terminates the instance, and launches a replacement. The replacement suffers the exact same fate, creating an **infinite boot-kill loop (instance thrashing/flapping)**.\n\n2. **Step-by-Step Production Fix:**\n   1. **Increase Health Check Grace Period:**\n      - Update the Auto Scaling Group's **Health Check Grace Period to 360 seconds (6 minutes)**:\n        ```bash\n        aws autoscaling update-auto-scaling-group --auto-scaling-group-name api-asg --health-check-grace-period 360\n        ```\n      - This guarantees the ASG ignores all failed ALB health check reports for the first 6 minutes, allowing the JVM to finish booting and pass warm-up checks.\n   2. **Optimize Health Check Parameters on Target Group:**\n      - Set `HealthCheckIntervalSeconds: 15`.\n      - Set `HealthyThresholdCount: 2` (requires 2 consecutive successes to mark healthy).\n      - Set `UnhealthyThresholdCount: 5` (requires 5 consecutive failures before evicting).\n   3. **Accelerate Startup via Golden AMI (Packer):**\n      - Pre-bake dependencies, JVM runtimes, and application binaries directly into a custom AMI so instance boot time drops from 4 minutes to under 30 seconds.",
  "tagsJson": "[\"Auto Scaling\",\"ASG\",\"Health Checks\",\"Grace Period\",\"Troubleshooting\"]",
  "hints": [
    "Hint 1: How long does the ASG wait before checking an instance's health after launch?",
    "Hint 2: What is the default Health Check Grace Period on an ASG?",
    "Hint 3: What happens when an ALB health check receives connection refused on a booting app?",
    "Hint 4: How do you configure the grace period to accommodate a 4-minute boot time?"
  ],
  "tags": [
    "Auto Scaling",
    "ASG",
    "Health Checks",
    "Grace Period",
    "Troubleshooting"
  ]
}
,
  {
  "id": "scen-cloudwatch-alarm-auto-recovery",
  "moduleNumber": 12,
  "title": "Scenario: Automating Mission-Critical Database Host Self-Healing via CloudWatch Auto-Recovery",
  "difficulty": "Intermediate",
  "prompt": "You manage an EC2-hosted self-managed PostgreSQL database in us-east-1. Due to physical hardware degradation in the AWS data center, the underlying host server occasionally suffers power or hardware faults, triggering StatusCheckFailed_System. When this occurs, manual intervention takes 30 minutes to wake an on-call engineer, stop the instance, and start it on healthy hardware. How can you configure AWS CloudWatch to automatically detect this hardware failure and migrate the instance to a new physical host without human intervention?",
  "explanation": "Tests hands-on SRE automation using CloudWatch Alarms combined with native EC2 Auto-Recovery actions to achieve self-healing infrastructure.",
  "hintsJson": "[\"Hint 1: Which CloudWatch metric monitors physical AWS hardware and hypervisor health?\",\"Hint 2: What EC2-specific action can be attached directly to a CloudWatch Alarm?\",\"Hint 3: Does an EC2 auto-recovery action preserve the instance ID, private IP, and Elastic IP?\",\"Hint 4: What prerequisites must the EC2 instance meet to support auto-recovery (EBS-backed, instance type)?\"]",
  "recommendedSolution": "### Step-by-Step Self-Healing Automation:\n\n1. **Understand EC2 Auto-Recovery Action:**\n   - Amazon CloudWatch supports an automated action: `arn:aws:automate:REGION:ec2:recover`.\n   - When attached to an alarm monitoring physical hardware degradation, AWS automatically recovers the instance onto a **new physical host server** within the same Availability Zone.\n   - **What Is Preserved:** The recovered instance retains its **Instance ID, Private IPv4 address, Elastic IP, attached EBS volumes, and metadata**.\n\n2. **Prerequisites for Auto-Recovery:**\n   - The instance must be **EBS-backed** (Instance Store-backed root volumes cannot be recovered).\n   - The instance must use modern virtualization families (C3, C4, C5, C6i, M4, M5, M6i, R4, R5, T2, T3, etc.).\n\n3. **CLI / Terraform Implementation:**\n   - Create a CloudWatch Alarm monitoring metric `StatusCheckFailed_System`:\n```bash\naws cloudwatch put-metric-alarm \\\n  --alarm-name \"AutoRecover-Postgres-Host-Fault\" \\\n  --namespace \"AWS/EC2\" \\\n  --metric-name \"StatusCheckFailed_System\" \\\n  --dimensions Name=InstanceId,Value=i-0e54d474bc8e85f27 \\\n  --statistic \"Maximum\" \\\n  --period 60 \\\n  --evaluation-periods 2 \\\n  --threshold 1 \\\n  --comparison-operator \"GreaterThanOrEqualToThreshold\" \\\n  --alarm-actions \\\n    \"arn:aws:automate:us-east-1:ec2:recover\" \\\n    \"arn:aws:sns:us-east-1:123456789012:SRE-Critical-Alerts\"\n```\n\n4. **Outcome:**\n   - If physical hardware fails, the alarm enters the **ALARM** state after two consecutive 1-minute checks.\n   - AWS automatically moves the VM to a healthy physical host, boots the operating system, and sends an SNS notification. Total downtime drops from 30 minutes to **under 3 minutes** with zero human paging.",
  "tagsJson": "[\"CloudWatch\",\"EC2\",\"Auto-Recovery\",\"Self-Healing\",\"SRE\",\"Automation\"]",
  "hints": [
    "Hint 1: Which CloudWatch metric monitors physical AWS hardware and hypervisor health?",
    "Hint 2: What EC2-specific action can be attached directly to a CloudWatch Alarm?",
    "Hint 3: Does an EC2 auto-recovery action preserve the instance ID, private IP, and Elastic IP?",
    "Hint 4: What prerequisites must the EC2 instance meet to support auto-recovery (EBS-backed, instance type)?"
  ],
  "tags": [
    "CloudWatch",
    "EC2",
    "Auto-Recovery",
    "Self-Healing",
    "SRE",
    "Automation"
  ]
},
  {
  "id": "scen-cloudwatch-synthetics-api-canary",
  "moduleNumber": 12,
  "title": "Scenario: Proactive Incident Detection: Implementing 24x7 CloudWatch Synthetics Canaries for Payments API",
  "difficulty": "Advanced",
  "prompt": "An e-commerce company experiences a silent outage: third-party payment gateway certificates expire at midnight, causing 100% of checkout attempts to fail with SSL handshake errors. Because backend EC2 instances have normal CPU (20%) and zero traffic arrives, standard CloudWatch CPU alarms never fire, and the engineering team only discovers the outage 6 hours later when customer support is flooded with complaints. How do you design an active 24x7 synthetic monitoring pipeline using CloudWatch Synthetics Canaries to detect this within 60 seconds?",
  "explanation": "Contrasts passive resource monitoring with proactive synthetic user transaction testing to eliminate silent customer-facing outages.",
  "hintsJson": "[\"Hint 1: Why did passive metrics like CPU and memory fail to detect the expired SSL certificate?\",\"Hint 2: What is a CloudWatch Synthetics Canary, and how often can it execute?\",\"Hint 3: What does a canary script emulate (HTTP requests, headless browser interactions)?\",\"Hint 4: How does a canary trigger an immediate PagerDuty or SNS alarm upon failure?\"]",
  "recommendedSolution": "### Active Observability Architecture Design:\n\n1. **The Root Flaw in Passive Monitoring:**\n   - Passive metrics (CPU, Memory, Disk) only report **resource utilization of your instances**. If traffic stops flowing due to an expired external certificate or bad DNS, CPU utilization actually drops, leaving passive alarms completely blind to the catastrophe.\n\n2. **Deploying CloudWatch Synthetics Canaries:**\n   - Create a **CloudWatch Synthetics Canary** running a headless Node.js Puppeteer or Python script configured with schedule `rate(1 minute)`.\n   - **Canary Execution Flow (Every 60 Seconds):**\n     1. The canary sends a simulated payment payload to `https://api.company.com/v1/payments/health-check`.\n     2. It establishes a real TLS/SSL handshake, validating that certificates are valid, unexpired, and trusted.\n     3. It asserts that the HTTP response code is `200 OK` and the response payload contains `{\"gateway_status\": \"connected\"}`.\n     4. It captures HTTP timings (DNS resolution, SSL connect, time-to-first-byte) and stores execution artifacts (screenshots, HAR logs) in Amazon S3.\n\n3. **Alarm & Incident Notification:**\n   - CloudWatch Synthetics automatically creates metrics: `SuccessPercent` and `Duration`.\n   - Create a CloudWatch Alarm:\n     - Metric: `SuccessPercent < 100` for **1 evaluation period (1 minute)**.\n     - Action: Dispatch immediate high-priority alert via Amazon SNS to **PagerDuty / Opsgenie**.\n   - **Result:** Within **60 seconds** of any certificate expiration, DNS failure, or API code regression, the on-call engineer is paged with complete screenshot evidence before customers notice.",
  "tagsJson": "[\"CloudWatch\",\"Synthetics\",\"Canaries\",\"Observability\",\"API Monitoring\",\"SRE\"]",
  "hints": [
    "Hint 1: Why did passive metrics like CPU and memory fail to detect the expired SSL certificate?",
    "Hint 2: What is a CloudWatch Synthetics Canary, and how often can it execute?",
    "Hint 3: What does a canary script emulate (HTTP requests, headless browser interactions)?",
    "Hint 4: How does a canary trigger an immediate PagerDuty or SNS alarm upon failure?"
  ],
  "tags": [
    "CloudWatch",
    "Synthetics",
    "Canaries",
    "Observability",
    "API Monitoring",
    "SRE"
  ]
},
  {
  "id": "scen-asg-scheduled-and-dynamic-scaling",
  "moduleNumber": 5,
  "title": "Scenario: Black Friday Capacity Planning: Combining Scheduled Scaling with Dynamic Target Tracking",
  "difficulty": "Advanced",
  "prompt": "An online retailer is preparing for Black Friday. Historical data shows traffic spikes 20x at exactly 00:00:01 AM on Friday when promotional doorbusters go live. If relying solely on dynamic scaling policies, instances take 4 minutes to launch and warm up, resulting in 504 Gateway Timeouts for the first 10,000 shoppers. How do you combine Scheduled Scaling with Dynamic Target Tracking to guarantee zero downtime while still optimizing costs throughout the weekend?",
  "explanation": "Mastery of hybrid auto-scaling strategies: pre-provisioning capacity for anticipated step-function traffic spikes while keeping dynamic elastic policies active for unpredictable fluctuations.",
  "hintsJson": "[\"Hint 1: Why is reactive dynamic scaling insufficient for instantaneous 20x traffic spikes?\",\"Hint 2: What ASG feature allows setting Min, Max, and Desired capacity at a specific calendar date and time?\",\"Hint 3: What time should the scheduled scaling action trigger relative to midnight?\",\"Hint 4: How does Target Tracking take over after the scheduled scaling baseline is established?\"]",
  "recommendedSolution": "### Production Scaling Architecture & Execution Plan:\n\n1. **Why Reactive Scaling Fails for Flash Events:**\n   - Target Tracking and Step Scaling are **reactive**: they require metric thresholds to breach for 1-3 minutes, followed by 3-5 minutes for EC2 instances to launch, download code, and pass ELB health checks.\n   - For an instantaneous 20x surge at midnight, shoppers overwhelm the existing instances before the ASG can finish booting replacements, causing cascading 502/504 timeouts.\n\n2. **Step 1: Scheduled Scaling (Proactive Warm Capacity):**\n   - Configure an **ASG Scheduled Action** to pre-provision capacity **30 minutes prior to the event (11:30 PM Thursday)**:\n```bash\naws autoscaling put-scheduled-update-group-action \\\n  --auto-scaling-group-name ecommerce-web-asg \\\n  --scheduled-action-name PreWarmBlackFriday \\\n  --start-time \"2026-11-26T23:30:00Z\" \\\n  --min-size 20 \\\n  --max-size 100 \\\n  --desired-capacity 40\n```\n   - By 11:35 PM, all 40 instances are fully booted, warmed up, and passing ALB health checks. When midnight strikes, the infrastructure absorbs the 20x surge effortlessly with 0% dropped connections.\n\n3. **Step 2: Dynamic Target Tracking (Handling Ongoing Weekend Waves):**\n   - Maintain an active **Target Tracking Scaling Policy** on the ASG:\n     - Metric: **ALBRequestCountPerTarget = 1,000**.\n   - If Black Friday traffic exceeds expectations and requires 60 instances, Target Tracking seamlessly scales out beyond the 40 pre-warmed instances up to the new `max-size: 100`.\n\n4. **Step 3: Scheduled Ramp-Down:**\n   - Configure a second scheduled action for Monday morning (e.g. 06:00 AM) to reset `min-size: 2` and `desired-capacity: 4`, allowing dynamic scaling to take over for normal operations and avoiding excess post-holiday spending.",
  "tagsJson": "[\"Auto Scaling\",\"ASG\",\"Scheduled Scaling\",\"Target Tracking\",\"Capacity Planning\"]",
  "hints": [
    "Hint 1: Why is reactive dynamic scaling insufficient for instantaneous 20x traffic spikes?",
    "Hint 2: What ASG feature allows setting Min, Max, and Desired capacity at a specific calendar date and time?",
    "Hint 3: What time should the scheduled scaling action trigger relative to midnight?",
    "Hint 4: How does Target Tracking take over after the scheduled scaling baseline is established?"
  ],
  "tags": [
    "Auto Scaling",
    "ASG",
    "Scheduled Scaling",
    "Target Tracking",
    "Capacity Planning"
  ]
},
  {
  "id": "scen-net-01",
  "moduleNumber": 3,
  "topicSlug": "devops-network-protocols-dns-troubleshooting-tools",
  "title": "Production Incident: Diagnosing 502 Bad Gateway vs 504 Gateway Timeout Outages",
  "difficulty": "Advanced",
  "prompt": "During an e-commerce flash sale, customer checkout requests through an Application Load Balancer (ALB) suddenly spike with HTTP 502 Bad Gateway and HTTP 504 Gateway Timeout errors. The operations team is unsure whether the root cause is ALB misconfiguration, Nginx reverse proxy worker exhaustion, or backend Node.js microservice crashes. How do you systematically differentiate 502 from 504, pinpoint the failing layer, and resolve the outage under high traffic?",
  "explanation": "HTTP 502 and 504 represent fundamentally different failure modes in reverse proxy architectures. A 502 Bad Gateway indicates that the reverse proxy received an invalid response, an immediate TCP RST (reset), or an unexpected connection termination from the upstream backend (typically due to application crashes, uncaught exceptions, or out-of-memory OOM kills). A 504 Gateway Timeout indicates that the reverse proxy established a connection or waited for a response, but the upstream backend took longer than the configured timeout threshold (e.g. 60 seconds) to respond (typically due to database thread pool exhaustion, unindexed queries, or deadlocks).",
  "hintsJson": "[\"Check ALB Access Logs: compare elb_status_code with target_status_code.\",\"Check backend target response time and memory metrics in CloudWatch.\",\"Differentiate connection reset (502) from connection timeout (504).\"]",
  "recommendedSolution": "### Systematic Root-Cause Analysis & Remediation:\n\n1. **Diagnostic Differentiation:**\n   - **502 Bad Gateway:** Upstream backend answered immediately with an error or closed the connection prematurely (TCP RST). Caused by Node.js process crashing, container OOM-killed, or keep-alive timeout mismatch between ALB (60s) and backend (Node.js default 5s).\n   - **504 Gateway Timeout:** Upstream backend accepted the request but failed to complete processing within ALB idle timeout (default 60s). Caused by blocking I/O, database connection pool exhaustion, or downstream API deadlocks.\n\n2. **Metric & Log Investigation:**\n   - Query CloudWatch metrics for ALB: HTTPCode_Target_5XX vs HTTPCode_ELB_5XX. If Target_5XX is zero but ELB_502 is high, the target dropped connection before sending headers.\n   - Inspect ALB access logs: examine `request_processing_time`, `target_processing_time`, and `response_processing_time`. If `target_processing_time` = -1, the target did not respond in time (504).\n   - Inspect Node.js backend container logs via `kubectl logs` or CloudWatch Logs: look for `JavaScript heap out of memory` or unhandled promise rejections.\n\n3. **Immediate Remediation:**\n   - **Fix Keep-Alive Mismatch:** Configure backend Node.js server keep-alive timeout to 65 seconds (higher than ALB 60s idle timeout) to prevent backend from closing connections before ALB: `server.keepAliveTimeout = 65000; server.headersTimeout = 66000;`\n   - **Scale Backend Replicas:** Increase ECS/Kubernetes target replicas immediately to drain pending request backlog.\n   - **Increase Database Connection Pool & Add Read Replicas:** Resolve 504 database thread starvation by offloading search queries to read replicas and caching session data in Redis.",
  "tagsJson": "[\"HTTP Status Codes\",\"502 Bad Gateway\",\"504 Gateway Timeout\",\"Reverse Proxy\",\"ALB\",\"DevOps Scenario\"]",
  "hints": [
    "Check ALB Access Logs: compare elb_status_code with target_status_code.",
    "Check backend target response time and memory metrics in CloudWatch.",
    "Differentiate connection reset (502) from connection timeout (504)."
  ],
  "tags": [
    "HTTP Status Codes",
    "502 Bad Gateway",
    "504 Gateway Timeout",
    "Reverse Proxy",
    "ALB",
    "DevOps Scenario"
  ]
},
  {
  "id": "scen-net-02",
  "moduleNumber": 3,
  "topicSlug": "devops-networking-osi-tcpip-subnetting-cidr",
  "title": "Enterprise IPAM: Designing Subnets for a /24 Network & Handling AWS 5-IP Reservation",
  "difficulty": "Intermediate",
  "prompt": "You are allocated the Class C network block 192.168.10.0/24 to host a production web application and a staging environment. You must divide this /24 block into two equal subnets. Calculate the subnet mask, network address, broadcast address, and usable IP range for each subnet. Furthermore, explain why deploying this design inside an AWS VPC provides 3 fewer usable host IPs per subnet than deploying on physical on-premises servers.",
  "explanation": "Dividing a /24 network (256 addresses, mask 255.255.255.0) into two equal subnets requires borrowing 1 host bit, yielding a /25 prefix (mask 255.255.255.128) with 128 total IPs per subnet. On-premises networking reserves 2 IP addresses per subnet (Network ID and Broadcast), yielding 126 usable hosts (2^7 - 2). AWS VPC reserves 5 IP addresses per subnet (.0 Network, .1 VPC Router, .2 Amazon DNS Resolver, .3 Future AWS reservation, .255 Broadcast), yielding only 123 usable host IPs.",
  "hintsJson": "[\"Subnetting formula: Usable hosts = 2^H - 2 on-premises, and 2^H - 5 in AWS VPC.\",\"/25 borrows 1 bit from host portion: 32 - 25 = 7 host bits (2^7 = 128 IPs).\",\"List the exact 5 reserved IP addresses in AWS VPC.\"]",
  "recommendedSolution": "### Subnetting Architecture & AWS VPC Comparison:\n\n1. **Subnetting Calculations for 192.168.10.0/24:**\n   - Original Network: 192.168.10.0/24 (Subnet Mask: 255.255.255.0, 256 total IPs).\n   - Subnetting into 2 Equal Subnets (/25, Subnet Mask: 255.255.255.128, 128 total IPs each).\n\n   **Subnet 1 (Production Subnet - 192.168.10.0/25):**\n   - Network Address: `192.168.10.0`\n   - Broadcast Address: `192.168.10.127`\n   - Netmask: `255.255.255.128`\n   - On-Premises Usable IP Range: `192.168.10.1` to `192.168.10.126` (126 usable host IPs).\n\n   **Subnet 2 (Staging Subnet - 192.168.10.128/25):**\n   - Network Address: `192.168.10.128`\n   - Broadcast Address: `192.168.10.255`\n   - Netmask: `255.255.255.128`\n   - On-Premises Usable IP Range: `192.168.10.129` to `192.168.10.254` (126 usable host IPs).\n\n2. **Why AWS VPC Provides 3 Fewer Usable IPs (123 vs 126):**\n   In an AWS VPC, AWS reserves 5 IP addresses in every subnet for cloud infrastructure services:\n   - **1st IP (.0 / .128):** Network address.\n   - **2nd IP (.1 / .129):** Reserved by AWS for the default VPC virtual router.\n   - **3rd IP (.2 / .130):** Reserved by AWS for the Amazon Route 53 DNS server (VPC base IP + 2).\n   - **4th IP (.3 / .131):** Reserved by AWS for future internal use.\n   - **5th IP (.127 / .255):** Network broadcast address (AWS VPC does not support broadcast, but reserves the address per standard).\n\n   **Result in AWS VPC:** 128 - 5 = **123 usable IP addresses** for EC2 instances, ENIs, and container pods per subnet.",
  "tagsJson": "[\"Subnetting\",\"CIDR\",\"IPAM\",\"AWS VPC Reserved IPs\",\"DevOps Scenario\"]",
  "hints": [
    "Subnetting formula: Usable hosts = 2^H - 2 on-premises, and 2^H - 5 in AWS VPC.",
    "/25 borrows 1 bit from host portion: 32 - 25 = 7 host bits (2^7 = 128 IPs).",
    "List the exact 5 reserved IP addresses in AWS VPC."
  ],
  "tags": [
    "Subnetting",
    "CIDR",
    "IPAM",
    "AWS VPC Reserved IPs",
    "DevOps Scenario"
  ]
},
  {
  "id": "scen-net-03",
  "moduleNumber": 3,
  "topicSlug": "devops-network-protocols-dns-troubleshooting-tools",
  "title": "DevOps Linux Incident: Step-by-Step Triage of a Failing Payment Webhook",
  "difficulty": "Advanced",
  "prompt": "An automated billing worker running inside an isolated Linux container in an AWS private subnet fails to send outgoing webhook notifications to a partner's HTTPS API ('https://hooks.partner.com/notify'). Curl commands hang indefinitely with 'Connection timed out'. Provide a comprehensive step-by-step diagnostic triage procedure using Linux command-line tools and AWS VPC routing analysis to identify the root cause and restore webhook delivery.",
  "explanation": "When an outbound HTTPS connection hangs with 'Connection timed out', the root cause is almost always Layer 3 routing or Layer 4 firewall packet filtering. A systematic triage checks DNS resolution (dig), outbound route table rules (NAT Gateway vs local), firewall egress rules (Security Groups and NACLs), and TCP SYN reachability (traceroute and telnet/nc).",
  "hintsJson": "[\"Differentiate 'Connection refused' (service rejected) from 'Connection timed out' (packets dropped).\",\"Verify if the private subnet has an outbound route 0.0.0.0/0 pointing to a healthy NAT Gateway.\",\"Check if ephemeral return ports (1024-65535) are allowed on the Network ACL (NACL).\"]",
  "recommendedSolution": "### Step-by-Step Diagnostic Runbook:\n\n1. **Step 1: Verify DNS Resolution:**\n   - Execute `dig +short hooks.partner.com`.\n   - If it returns an IP (e.g. 203.0.113.80), DNS is functioning properly. If it hangs or returns empty, check `/etc/resolv.conf` and Route 53 VPC DNS resolution attributes (`enableDnsSupport`, `enableDnsHostnames`).\n\n2. **Step 2: Test TCP Layer 4 Reachability:**\n   - Execute `nc -zv -w 5 hooks.partner.com 443` or `curl -Iv --connect-timeout 5 https://hooks.partner.com/notify`.\n   - **Observation:** Hangs until timeout -> Packets are being silently dropped by an egress firewall or blackhole route.\n\n3. **Step 3: Analyze Route Table (Longest Prefix Match):**\n   - Check the AWS Route Table associated with the private subnet via AWS CLI:\n     `aws ec2 describe-route-tables --filter Name=association.subnet-id,Values=subnet-private123`\n   - Verify destination `0.0.0.0/0`:\n     - If `0.0.0.0/0` is missing or points to an Internet Gateway (`igw-xxx`) instead of a NAT Gateway (`nat-xxx`), instances without public IPs cannot reach the Internet.\n     - If it points to a NAT Gateway, verify the NAT Gateway state is `available` and resides in a Public Subnet with a route to an IGW.\n\n4. **Step 4: Audit Security Groups & Stateless NACLs:**\n   - **Security Group:** Outbound rules must allow HTTPS (port 443) to `0.0.0.0/0`.\n   - **Stateless NACL Check:** Even if outbound rule allows port 443, NACLs are stateless. The inbound NACL rule on the private subnet must explicitly allow return traffic on ephemeral client ports (TCP 1024-65535) from `0.0.0.0/0`. If missing, the return TCP SYN-ACK packet is dropped by the NACL, causing curl to hang.\n\n5. **Step 5: Execute Hop-by-Hop Trace:**\n   - Run `traceroute -n -T -p 443 hooks.partner.com`.\n   - If trace stops at the VPC virtual router (.1), the route table is dropping the packet. If it traverses the NAT Gateway but stops upstream, verify partner firewall IP whitelisting for the NAT Gateway Elastic IP.",
  "tagsJson": "[\"Linux Troubleshooting\",\"NAT Gateway\",\"Route Table\",\"curl\",\"dig\",\"NACL\",\"DevOps Scenario\"]",
  "hints": [
    "Differentiate 'Connection refused' (service rejected) from 'Connection timed out' (packets dropped).",
    "Verify if the private subnet has an outbound route 0.0.0.0/0 pointing to a healthy NAT Gateway.",
    "Check if ephemeral return ports (1024-65535) are allowed on the Network ACL (NACL)."
  ],
  "tags": [
    "Linux Troubleshooting",
    "NAT Gateway",
    "Route Table",
    "curl",
    "dig",
    "NACL",
    "DevOps Scenario"
  ]
},
];
