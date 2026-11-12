import { PYTHON_MODULES } from './pythonLearningData.js';

/**
 * Universal Fallback Modules Dataset (AWS, DevOps, Full-Stack, and Python)
 */
export const FALLBACK_MODULES = [
  {
    "moduleNumber": 1,
    "title": "AWS Cloud Account Setup, Free Tier Governance & Global Infrastructure",
    "slug": "global-infrastructure-and-architecture",
    "description": "Step-by-step AWS account creation, root account hardening, IAM best practices, AWS Budgets $1 guardrails, Cost Explorer accidental charges triage, AWS Support refund resolution, and global Regions/AZs architecture.",
    "icon": "globe",
    "level": "Beginner",
    "topics": [
      {
        "topicNumber": 1,
        "title": "AWS Free Tier Account Creation, Root Security & IAM Best Practices",
        "slug": "aws-account-creation-root-security-iam",
        "summary": "Step-by-step account signup prerequisites (email, mobile OTP, card verification), root account MFA hardening, creating non-root IAM users, setting up AWS Budgets $1 threshold alerts, and navigating Free Tier 6-month trial vs Always-Free service limits.",
        "difficulty": "Beginner",
        "estimatedMinutes": 35,
        "keyTakeaway": "Never use the Root account for daily tasks; lock it down with MFA immediately, create an IAM user for administration, and set a $1 AWS Budget alert before provisioning resources."
      },
      {
        "topicNumber": 2,
        "title": "Accidental Charges Incident Triage, Cost Explorer & AWS Support Refund Resolution",
        "slug": "accidental-charges-cost-explorer-support-refunds",
        "summary": "Diagnose surprise cloud bills using AWS Billing Dashboard and Cost Explorer group-by-service/region, immediately terminate runaway resources (unattached Elastic IPs, orphan EBS snapshots, GPU instances), open an Account & Billing support case, write an effective one-time refund appeal, and understand multi-factor fraud detection.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "Stopping an EC2 instance stops compute fees but NOT disk storage; delete orphan EBS volumes and release unattached Elastic IPs immediately, and file a polite support case for a one-time courtesy refund."
      },
      {
        "topicNumber": 3,
        "title": "AWS Global Infrastructure: Regions, Availability Zones & Edge Infrastructure",
        "slug": "regions-azs-and-edge-infrastructure",
        "summary": "Understand the physical and logical layout of AWS: geographic Regions, isolated Availability Zones (AZs), low-latency Edge Locations, Local Zones, and multi-AZ fault tolerance.",
        "difficulty": "Beginner",
        "estimatedMinutes": 30,
        "keyTakeaway": "Region = Geographic Area (independent isolated zone); AZ = Independent Data Center Group with dedicated power and networking connected by low-latency fiber."
      }
    ]
  },
    {
    "moduleNumber": 2,
    "title": "IAM, Identity & Access Management",
    "slug": "iam-identity-and-access-management",
    "description": "Enterprise cloud security governance: IAM Users, Groups, Roles, JSON policy anatomy, Explicit Deny evaluation logic, Permissions Boundaries, Service Control Policies (SCPs), and Security Token Service (STS) temporary credentials.",
    "icon": "shield-check",
    "level": "Beginner",
    "topics": [
      {
        "topicNumber": 1,
        "title": "IAM Fundamentals, JSON Policy Elements & Evaluation Logic",
        "slug": "iam-fundamentals-and-policy-evaluation",
        "summary": "Master IAM Users, IAM Groups, implicit vs explicit deny evaluation logic, and JSON policy syntax: Version (2012-10-17), Statement, Sid, Effect (Allow/Deny), Action, Resource (ARN), and Condition blocks.",
        "difficulty": "Beginner",
        "estimatedMinutes": 35,
        "keyTakeaway": "All new IAM users are created with ZERO permissions (implicit deny). An Explicit Deny in any attached policy overrides any Explicit Allow."
      },
      {
        "topicNumber": 2,
        "title": "IAM Roles, AWS Security Token Service (STS) & EC2 Instance Profiles",
        "slug": "iam-roles-sts-and-instance-profiles",
        "summary": "Implement secure workload identity using IAM Roles and AWS STS: dynamic short-lived temporary security credentials, EC2 Instance Profiles without embedded credentials, and Role Trust Policies defining trusted principals.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "Never embed long-term IAM access keys in source code or EC2 instances. Attach an IAM Role via an Instance Profile so STS automatically provides and rotates temporary credentials."
      },
      {
        "topicNumber": 3,
        "title": "Advanced IAM Governance: Permissions Boundaries, SCPs & Cross-Account Access",
        "slug": "iam-advanced-governance-scps-and-boundaries",
        "summary": "Enforce multi-account guardrails: Permissions Boundaries to prevent privilege escalation by delegates, AWS Organizations Service Control Policies (SCPs), and cross-account access via STS AssumeRole delegation.",
        "difficulty": "Advanced",
        "estimatedMinutes": 45,
        "keyTakeaway": "Permissions Boundaries define the maximum permissions an identity policy can grant; SCPs set the maximum permissions across an entire AWS Organization or OU."
      }
    ]
  },
  {
    "moduleNumber": 3,
    "title": "Networking for DevOps & Amazon VPC – Cloud Infrastructure & Traffic Engineering",
    "slug": "amazon-vpc-advanced-networking",
    "description": "Master end-to-end computer networking and cloud infrastructure: Network devices (Switches, Routers, Hubs, NICs), OSI 7-layer vs TCP/IP 4-layer models, IPv4/IPv6, RFC 1918 private ranges, Subnetting & CIDR calculations, TCP 3-way handshake vs UDP, HTTP status codes, DNS hierarchical resolution, Linux network troubleshooting tools (ping, traceroute, dig, curl, netstat, nmap), and production AWS VPC architecture with Subnets, Route Tables, Internet Gateways, NAT Gateways, Security Groups, NACLs, Peering, and Transit Gateway.",
    "icon": "network",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "DevOps Networking Fundamentals: OSI vs TCP/IP Models, IPv4/IPv6, Classes & Subnetting Math",
        "slug": "devops-networking-osi-tcpip-subnetting-cidr",
        "summary": "Master core networking for DevOps: Switches vs Routers vs Hubs, OSI 7 Layers vs TCP/IP 4 Layers, Data Encapsulation/Decapsulation (Bits -> Frames -> Packets -> Segments -> Data), IPv4 32-bit dotted-decimal octets vs IPv6 128-bit, Public vs RFC 1918 Private IPs, Classes A-E, 0.0.0.0 and 127.0.0.1 localhost loopback, Network ID vs Host ID direct connection logic, and Subnetting Math dividing /24 networks into /25 subnets (126 usable hosts).",
        "difficulty": "Beginner",
        "estimatedMinutes": 45,
        "keyTakeaway": "Devices with the same Network ID connect directly via Layer 2 switch; devices with different Network IDs require a Layer 3 router. Subnetting restricts broadcast domains and enhances security."
      },
      {
        "topicNumber": 2,
        "title": "Protocols, DNS Architecture, HTTP Status Codes & DevOps Diagnostic Tools",
        "slug": "devops-network-protocols-dns-troubleshooting-tools",
        "summary": "Master production protocol mechanics: TCP 3-way handshake (SYN, SYN-ACK, ACK) vs connectionless UDP, well-known ports (80, 443, 22, 53, 25, 110, 143), HTTP statelessness & cookies, HTTP status code families (2xx, 3xx, 4xx, 500/502/503/504), DNS hierarchical resolution (Root, TLD, Authoritative, Delegation via NS), DNS record types (A, AAAA, CNAME vs ALIAS at zone apex, MX, TXT, TTL), Longest Prefix Match routing tables, and the DevOps troubleshooting command suite: ping, traceroute, telnet, curl, dig, netstat/ss, nmap, ssh, and scp.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 50,
        "keyTakeaway": "Route tables evaluate the Longest Prefix Match (most specific CIDR mask wins). DNS CNAME cannot exist at the zone apex due to RFC standards, requiring ALIAS records in Route 53."
      },
      {
        "topicNumber": 3,
        "title": "VPC Architecture, Subnetting (CIDR), Gateways & Route Tables",
        "slug": "vpc-subnetting-gateways-packet-flow",
        "summary": "Master Default vs Custom VPCs, CIDR block allocation (/16 and /24), 5 AWS reserved IPs per subnet, Public vs Private subnets, Route Tables (Destination & Target), Internet Gateways, Egress-Only IPv6 Gateways, Carrier Gateways, Elastic IPs, and Bastion Host jump servers.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "A subnet resides strictly within one Availability Zone; public subnets have a route table targeting an Internet Gateway (0.0.0.0/0 -> igw), whereas private subnets route internet-bound traffic through a NAT Gateway."
      },
      {
        "topicNumber": 4,
        "title": "VPC Security Architecture: Stateful Security Groups, Stateless NACLs, DNS Firewall & Flow Logs",
        "slug": "vpc-security-groups-nacls-firewall-flow-logs",
        "summary": "Implement defense-in-depth network security: instance-level Stateful Security Groups (allow rules only) vs subnet-level Stateless NACLs (numbered evaluation, explicit allow/deny, ephemeral return ports 1024-65535), Route 53 DNS Firewall (fail-open vs fail-closed), and out-of-band VPC Flow Logs to CloudWatch Logs and S3.",
        "difficulty": "Advanced",
        "estimatedMinutes": 45,
        "keyTakeaway": "Security Groups are stateful (inbound return traffic is automatically permitted), whereas NACLs are stateless and require explicit rules in both directions including ephemeral client return ports."
      },
      {
        "topicNumber": 5,
        "title": "Hybrid Connectivity & Advanced Routing: NAT Gateways, Endpoints, Peering, VPN & Transit Gateway",
        "slug": "vpc-peering-transit-gateway-endpoints-vpn",
        "summary": "Deploy managed NAT Gateways, private AWS service connectivity via Gateway Endpoints (S3/DynamoDB) and Interface Endpoints (PrivateLink), non-transitive VPC Peering, Site-to-Site IPsec VPN with dual tunnels, hub-and-spoke AWS Transit Gateway, Traffic Mirroring, and VPC Service Quotas.",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "VPC Peering is non-transitive and creates complex N*(N-1)/2 meshes; AWS Transit Gateway solves this with a centralized star hub interconnecting thousands of VPCs and on-premises networks."
      }
    ]
  },
    {
    "moduleNumber": 4,
    "title": "EC2 & Compute Architecture",
    "slug": "ec2-and-compute-architecture",
    "description": "Enterprise compute engineering: 4 instance families (General Purpose, Compute, Memory, Storage Optimized), Purchasing models (On-Demand, Reserved, Savings Plans, Spot with 2-minute interruption warning), System vs Instance Status Checks, Persistent EBS (gp3, io1/io2, st1, sc1) vs Ephemeral Instance Store, ENIs, Security Groups, and Step-by-Step Console Launch Guide.",
    "icon": "cpu",
    "level": "Beginner",
    "topics": [
      {
        "topicNumber": 1,
        "title": "EC2 Fundamentals, 4 Instance Families, Purchasing Models & Status Checks",
        "slug": "ec2-concepts-purchasing-models-lifecycle",
        "summary": "Master EC2 core architecture: scalable on-demand virtual servers, 4 instance families (General Purpose T/M, Compute Optimized C, Memory Optimized R/X/z, Storage Optimized I/D/H), purchasing models (On-Demand, Reserved, Savings Plans, Spot with 2-minute notice, Dedicated Hosts), and CloudWatch monitoring with System vs Instance Status Checks.",
        "difficulty": "Beginner",
        "estimatedMinutes": 40,
        "keyTakeaway": "System status checks indicate physical host/hardware faults requiring AWS migration (stop/start); Instance status checks indicate OS/kernel/boot faults requiring administrative remediation."
      },
      {
        "topicNumber": 2,
        "title": "EC2 Storage Architecture: Persistent EBS (gp3, io1/io2, st1, sc1) vs Ephemeral Instance Store",
        "slug": "ec2-storage-ebs-types-vs-instance-store",
        "summary": "Differentiate persistent network block storage (EBS gp3 baseline 3000 IOPS/125 MB/s, io1/io2 Provisioned IOPS for transactional OLTP, st1 Throughput Optimized HDD, sc1 Cold HDD) from ultra-fast non-persistent Ephemeral Instance Store physically attached to the host hardware.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Instance Store provides ultra-high IOPS and lowest latency but is 100% ephemeral (data is permanently lost on instance stop, terminate, or hardware failure); EBS persists independently."
      },
      {
        "topicNumber": 3,
        "title": "EC2 Networking, Security Groups, ENIs & Step-by-Step Instance Launch",
        "slug": "ec2-networking-eni-security-groups-key-pairs",
        "summary": "Understand Public vs Private IPs, Elastic Network Interfaces (ENIs for network separation and failover), stateful Security Groups (automatic return traffic), Key Pairs (.pem/.ppk for SSH/RDP), and follow the 10-step production launch guide from AMI selection to 2/2 status checks verification.",
        "difficulty": "Beginner",
        "estimatedMinutes": 40,
        "keyTakeaway": "Security Groups are stateful virtual firewalls attached to ENIs; Key Pairs use asymmetric encryption where AWS holds the public key and the user safeguards the private key."
      }
    ]
  },
    {
    "moduleNumber": 5,
    "title": "Elastic Load Balancing & Auto Scaling",
    "slug": "elastic-load-balancing-and-auto-scaling",
    "description": "High Availability, Traffic Engineering & Elasticity: 4 ELB products (ALB Layer 7, NLB Layer 4, GLB Layer 3, CLB legacy), Internet-facing vs Internal-facing topologies, content-based routing, SNI, Sticky Sessions, Target Groups, Health Checks, and Auto Scaling Groups (Target Tracking, Step, Simple Scaling, and Spot Fleets).",
    "icon": "activity",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Elastic Load Balancing: 4 ELB Types (ALB, NLB, GLB, CLB) & Internet vs Internal",
        "slug": "elb-types-routing-rules-auto-scaling",
        "summary": "Compare ELB products across the OSI model: Application Load Balancer (Layer 7 HTTP/HTTPS content routing), Network Load Balancer (Layer 4 TCP/UDP, millions of req/sec, ultra-low latency, static/Elastic IPs), Gateway Load Balancer (Layer 3 transparent GENEVE appliances), and architect multi-tier internet-facing vs internal-facing load balancing.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Use ALB for Layer 7 microservices and HTTP routing; use NLB for Layer 4 extreme performance and static IP requirements; use GLB for transparent inline virtual security appliances."
      },
      {
        "topicNumber": 2,
        "title": "ALB Advanced Traffic Engineering: Target Groups, SNI, Sticky Sessions & Health Checks",
        "slug": "elb-advanced-features-target-groups-health-checks",
        "summary": "Deep dive into ALB capabilities: Target Groups (EC2, IP, Lambda), Server Name Indication (SNI for multi-cert SSL on 1 listener), Sticky Sessions (cookie-based affinity), HTTP/2, WebSockets, Request Tracing (X-Amzn-Trace-Id), WAF integration, Slow Start mode, HTTP-to-HTTPS redirects, and health check thresholds.",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "Server Name Indication (SNI) enables one ALB HTTPS listener to serve multiple distinct SSL certificates for different domains; Target Groups route traffic to EC2, containers, IPs, or Lambda."
      },
      {
        "topicNumber": 3,
        "title": "Auto Scaling Groups (ASG): Launch Templates, Scaling Policies & Resilience",
        "slug": "asg-scaling-policies-lifecycle-and-resilience",
        "summary": "Master automated elastic capacity: Launch Templates vs Launch Configurations, Target Tracking scaling policies (e.g. 50% CPU), Step scaling policies, Simple scaling policies, Health Check Grace Periods, default cooldowns, and cost-optimized Spot Fleet blending.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Target tracking scaling dynamically adjusts instance counts to maintain a specific metric; Health Check Grace Periods prevent terminating instances that are still completing boot initialization."
      }
    ]
  },
    {
    "moduleNumber": 6,
    "title": "Amazon S3 – Advanced Storage",
    "slug": "amazon-s3-advanced-storage",
    "description": "Enterprise cloud object storage: 11 9s durability, global unique bucket namespaces, strong read-after-write consistency, 7 storage classes, lifecycle automation, encryption (SSE-S3, SSE-KMS, SSE-C), Block Public Access, Object Lock (WORM), and Cross-Region Replication (CRR).",
    "icon": "database",
    "level": "Beginner",
    "topics": [
      {
        "topicNumber": 1,
        "title": "S3 Architecture, 11 9s Durability, Storage Classes & Lifecycle Automation",
        "slug": "s3-storage-classes-lifecycle-security",
        "summary": "Understand S3 object storage fundamentals: global unique bucket namespace, 0B-5TB object sizes, 11 9s durability across AZs, strong read-after-write consistency, 7 storage tiers (Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant/Flexible/Deep Archive), and automated lifecycle transition/expiration rules.",
        "difficulty": "Beginner",
        "estimatedMinutes": 40,
        "keyTakeaway": "S3 provides 99.999999999% (11 9s) durability by redundantly storing objects across multiple AZs; Lifecycle rules automate cost optimization with minimum 30-day tier intervals."
      },
      {
        "topicNumber": 2,
        "title": "S3 Access Control, Block Public Access, Object Ownership & Encryption",
        "slug": "s3-encryption-access-control-and-bpa",
        "summary": "Master S3 security layers: Resource-based Bucket Policies (JSON up to 20KB) vs legacy XML ACLs, S3 Object Ownership (BucketOwnerEnforced to disable ACLs), S3 Block Public Access (4 controls), in-transit TLS, and server-side encryption (SSE-S3, SSE-KMS, SSE-C).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Disable legacy ACLs using BucketOwnerEnforced. Protect data using S3 Block Public Access and SSE-KMS for automated key rotation and CloudTrail audit logging."
      },
      {
        "topicNumber": 3,
        "title": "Advanced S3: Versioning, Object Lock (WORM), Replication & Access Points",
        "slug": "s3-advanced-versioning-replication-and-object-lock",
        "summary": "Deep dive into compliance and performance features: S3 Versioning (accidental deletion protection), Object Lock WORM (Governance, Compliance, and Legal Hold modes), Cross-Region Replication (CRR), Transfer Acceleration via Edge Locations, Requester Pays, and S3 Access Points.",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "S3 Object Lock in Compliance Mode prevents object deletion or modification even by the root user; Replication rules require versioning enabled on both source and destination buckets."
      }
    ]
  },
  {
    "moduleNumber": 7,
    "title": "EBS, EFS & Storage Selection",
    "slug": "ebs-efs-and-storage-selection",
    "description": "Compare Block vs File vs Object storage. Deep dive into EBS volume types, snapshots, multi-attach, and EFS shared distributed POSIX file system.",
    "icon": "hard-drive",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "EBS vs EFS vs S3: Architectural Decision Matrix",
        "slug": "ebs-vs-efs-vs-s3-storage-matrix",
        "summary": "Identify when to choose persistent block storage (EBS), shared multi-instance file storage (EFS), or scalable object storage (S3).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 30,
        "keyTakeaway": "EBS = 1 EC2 Instance (Block); EFS = Many EC2 Instances (File / NFS); S3 = Global REST API (Object)."
      }
    ]
  },
  {
    "moduleNumber": 8,
    "title": "AWS Databases – Advanced Overview",
    "slug": "aws-databases-advanced-overview",
    "description": "Purpose-built databases: RDS, Aurora, DynamoDB (NoSQL), ElastiCache (In-memory), Redshift (OLAP Data Warehouse), DocumentDB, and Neptune (Graph).",
    "icon": "layers",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Purpose-Built AWS Databases & Selection Framework",
        "slug": "purpose-built-databases-selection-framework",
        "summary": "Evaluate OLTP vs NoSQL vs OLAP vs In-Memory caching vs Graph databases for optimal performance and operational simplicity.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 35,
        "keyTakeaway": "Choose purpose-built databases: RDS/Aurora for ACID relational, DynamoDB for single-digit ms NoSQL, ElastiCache for caching, Redshift for analytics."
      }
    ]
  },
    {
    "moduleNumber": 9,
    "title": "RDS, Aurora & Database High Availability",
    "slug": "rds-aurora-and-database-ha",
    "description": "Enterprise relational database engineering: Fully managed DB instances, 7 database engines, General Purpose vs Provisioned IOPS storage, Multi-AZ synchronous standby failover, asynchronous Read Replicas, automated backups, and point-in-time recovery.",
    "icon": "server",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Amazon RDS Architecture, Database Engines & Managed Storage",
        "slug": "multi-az-vs-read-replicas-aurora",
        "summary": "Master RDS core fundamentals: isolated DB Instances, automated OS patching and maintenance windows, 7 supported engines (MySQL, MariaDB, PostgreSQL, Oracle, SQL Server, Aurora, IBM DB2), General Purpose SSD (gp2/gp3) vs Provisioned IOPS (io1/io2) for transactional OLTP workloads, and 12-month Free Tier.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 35,
        "keyTakeaway": "RDS is a fully managed service that restricts OS access; Provisioned IOPS SSD delivers fast, consistent I/O performance optimized for transactional OLTP database workloads."
      },
      {
        "topicNumber": 2,
        "title": "RDS High Availability: Synchronous Multi-AZ Standby vs Asynchronous Read Replicas",
        "slug": "rds-high-availability-multi-az-and-read-replicas",
        "summary": "Compare disaster recovery and performance scaling: Multi-AZ synchronous physical replication with automatic DNS CNAME failover (zero IP changes, RTO < 60s) vs up to 5 asynchronous Read Replicas across AZs or regions for offloading read traffic.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Multi-AZ is for High Availability and Disaster Recovery (synchronous, standby invisible to queries); Read Replicas are for Read Performance and Scalability (asynchronous, actively queried)."
      },
      {
        "topicNumber": 3,
        "title": "RDS Backup Strategies: Automated Backups, Point-in-Time Recovery & DB Snapshots",
        "slug": "rds-backup-strategies-snapshots-and-point-in-time-recovery",
        "summary": "Master database recovery mechanisms: Automated Backups with 1 to 35-day retention combining daily snapshots and transaction logs in S3 for point-in-time recovery down to the second, manual persistent DB Snapshots, and restoring to a new DB instance endpoint.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "Restoring an RDS backup always provisions a brand-new DB instance with a new endpoint URL, allowing parallel verification without impacting the original instance."
      }
    ]
  },
    {
    "moduleNumber": 10,
    "title": "Serverless Architecture (AWS Lambda & API Gateway)",
    "slug": "serverless-architecture",
    "description": "Cloud-native event-driven compute: AWS Lambda serverless execution, stateless functions, event triggers (S3, Kinesis, DynamoDB, API Gateway), memory-to-CPU scaling, concurrency controls, VPC Hyperplane networking, and cold start mitigation.",
    "icon": "zap",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "AWS Lambda Serverless Compute, Event Triggers & Stateless Architecture",
        "slug": "lambda-api-gateway-event-driven-patterns",
        "summary": "Run code without managing servers: event-driven compute model, pay only for execution time, automatic scaling from zero to thousands of concurrent requests, stateless design, native language runtimes (Node.js, Python, Java, Go, C#, Ruby) and Runtime API for custom languages.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "Lambda functions must be completely stateless with no affinity to underlying infrastructure; event triggers integrate seamlessly across the AWS stack (S3, Kinesis, API Gateway, SQS, IoT)."
      },
      {
        "topicNumber": 2,
        "title": "Lambda Execution Environment, Memory Scaling, Concurrency & VPC Hyperplane",
        "slug": "lambda-runtime-memory-scaling-and-concurrency",
        "summary": "Master execution parameters: memory allocation from 128 MB to 10,240 MB (RAM proportionally scales CPU and network), 15-minute maximum execution timeout, 512 MB to 10 GB /tmp storage, concurrency limits (1000 default), and VPC deployment with Hyperplane ENIs.",
        "difficulty": "Advanced",
        "estimatedMinutes": 45,
        "keyTakeaway": "Allocating more memory to Lambda proportionally increases CPU cores and network bandwidth, often reducing execution duration and lowering total billable cost."
      },
      {
        "topicNumber": 3,
        "title": "Lambda Limits, Deployment Packages, Container Images & Cold Start Optimization",
        "slug": "lambda-limits-deployment-and-cold-start-optimization",
        "summary": "Architect for production reliability: 50 MB zipped deployment package limits, 250 MB uncompressed limits, container images up to 10 GB, 4 KB environment variables, cold start lifecycle (init vs invoke), and Provisioned Concurrency for zero-latency execution.",
        "difficulty": "Advanced",
        "estimatedMinutes": 45,
        "keyTakeaway": "Use Provisioned Concurrency to eliminate cold starts for latency-sensitive APIs; container images allow up to 10 GB deployment packages with complex machine learning dependencies."
      }
    ]
  },
  {
    "moduleNumber": 11,
    "title": "Containers – ECS, EKS & Fargate",
    "slug": "containers-ecs-eks-and-fargate",
    "description": "Container orchestration on AWS: Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), AWS Fargate serverless compute, and ECR.",
    "icon": "box",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Container Services Comparison: ECS vs EKS vs Fargate",
        "slug": "ecs-vs-eks-vs-fargate-comparison",
        "summary": "Select the right container engine: AWS-native simplicity with ECS, Kubernetes standards with EKS, or serverless maintenance-free with Fargate.",
        "difficulty": "Advanced",
        "estimatedMinutes": 40,
        "keyTakeaway": "Choose ECS for AWS simplicity, EKS for Kubernetes ecosystem portability, and Fargate to run containers without managing underlying EC2 VMs."
      }
    ]
  },
    {
    "moduleNumber": 12,
    "title": "Monitoring, Logging & Observability (CloudWatch, CloudTrail & X-Ray)",
    "slug": "monitoring-logging-and-observability",
    "description": "Full-stack cloud observability: Amazon CloudWatch (Metrics, Alarms, Logs Insights, Events/EventBridge with 6-field Cron), ServiceLens, Synthetics Canaries, AWS CloudTrail audit logs, and AWS X-Ray distributed tracing.",
    "icon": "activity",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "CloudWatch Metrics, Alarms (3 States) & CloudWatch vs CloudTrail Golden Rule",
        "slug": "cloudwatch-cloudtrail-config-xray-observability",
        "summary": "Master CloudWatch monitoring levels: Basic (5-min free) vs Detailed (1-min), Global Dashboards (3 free up to 50 metrics), CloudWatch Alarms with 3 states (OK, INSUFFICIENT_DATA, ALARM), multi-action triggers (SNS, Auto Scaling, EC2 Auto-Recovery), and the golden rule: CloudWatch monitors performance (operations) while CloudTrail audits actions (security/API calls).",
        "difficulty": "Beginner",
        "estimatedMinutes": 40,
        "keyTakeaway": "CloudWatch monitors PERFORMANCE (metrics, CPU, latency, operations); CloudTrail monitors ACTIONS (who made which API call from where and when)."
      },
      {
        "topicNumber": 2,
        "title": "CloudWatch Logs, Logs Insights & EventBridge (Cron & Rate Schedules)",
        "slug": "cloudwatch-logs-insights-events-and-cron",
        "summary": "Centralize application and OS logs from EC2 and on-premises using the CloudWatch Agent, write interactive query syntax in CloudWatch Logs Insights, and automate event-driven workflows with EventBridge using 6-field Cron expressions: cron(Minutes Hours Day-of-month Month Day-of-week Year) and Rate expressions: rate(value unit).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "CloudWatch Logs Insights queries terabytes of logs in seconds; EventBridge Cron expressions require 6 fields (Minutes, Hours, Day-of-month, Month, Day-of-week, Year)."
      },
      {
        "topicNumber": 3,
        "title": "Enterprise Observability: ServiceLens, Synthetics Canaries & X-Ray Distributed Tracing",
        "slug": "cloudwatch-servicelens-synthetics-and-xray",
        "summary": "Implement modern proactive observability: CloudWatch ServiceLens combining metrics, logs, and traces for infrastructure and transaction health; CloudWatch Synthetics running 24x7 canaries to verify REST APIs, web pages, and detect phishing/XSS; and AWS X-Ray distributed tracing for microservices bottlenecks.",
        "difficulty": "Advanced",
        "estimatedMinutes": 45,
        "keyTakeaway": "CloudWatch Synthetics provides 24x7 outside-in verification of customer experience before real users are affected; ServiceLens provides an integrated service map linking metrics, logs, and X-Ray traces."
      }
    ]
  },
  {
    "moduleNumber": 13,
    "title": "Security, Encryption & Compliance",
    "slug": "security-encryption-and-compliance",
    "description": "Defense-in-depth: AWS KMS key management, Secrets Manager, AWS WAF, Shield DDoS mitigation, GuardDuty threat detection, and Security Hub.",
    "icon": "lock",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Defense-in-Depth Architecture & 5 Golden Security Rules",
        "slug": "defense-in-depth-and-golden-security-rules",
        "summary": "Protect workloads at every layer: perimeter WAF/Shield, network security groups, KMS encryption at rest, TLS in transit, and Secrets Manager rotation.",
        "difficulty": "Advanced",
        "estimatedMinutes": 40,
        "keyTakeaway": "5 Golden Rules: (1) Least privilege, (2) Encrypt sensitive data, (3) Rotate secrets, (4) Enable logging, (5) Enforce MFA."
      }
    ]
  },
  {
    "moduleNumber": 14,
    "title": "DevOps, CI/CD & Infrastructure as Code",
    "slug": "devops-cicd-and-infrastructure-as-code",
    "description": "Automate delivery and provisioning: CodePipeline, CodeBuild, CodeDeploy, CloudFormation, AWS CDK, Terraform, and zero-downtime deployment strategies.",
    "icon": "git-pull-request",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "AWS CI/CD Pipelines & Modern Deployment Strategies",
        "slug": "cicd-pipelines-and-deployment-strategies",
        "summary": "Implement automated delivery pipelines, compare CloudFormation/CDK vs Terraform, and evaluate Rolling, Blue/Green, and Canary releases.",
        "difficulty": "Advanced",
        "estimatedMinutes": 45,
        "keyTakeaway": "Automate everything with IaC and CI/CD. Use Blue/Green or Canary deployments to eliminate downtime and enable instant rollbacks."
      }
    ]
  },
  {
    "moduleNumber": 15,
    "title": "AWS Advanced Architecture + Pro Tips",
    "slug": "aws-advanced-architecture-pro-tips",
    "description": "Production-grade reference architectures, end-to-end multi-tier setups, and the 10 Essential Design Principles for Well-Architected AWS workloads.",
    "icon": "award",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Production Reference Architecture & 10 Design Principles",
        "slug": "production-reference-architecture-design-principles",
        "summary": "Synthesize all services into a high-availability, fault-tolerant, cost-effective enterprise architecture following AWS Well-Architected principles.",
        "difficulty": "Advanced",
        "estimatedMinutes": 45,
        "keyTakeaway": "Design for failure, deploy Multi-AZ by default, decouple with queues/events, automate with IaC, and right-size continuously."
      }
    ]
  },
  {
    "moduleNumber": 16,
    "title": "Git & GitHub – Enterprise Source Control & GitOps",
    "slug": "git-and-github-enterprise-source-control",
    "description": "Master distributed version control, the three-section local repository architecture, Atlassian command cheat sheet workflows, advanced branching, pull request reviews, and GitHub Actions CI/CD automation.",
    "icon": "git-branch",
    "level": "Beginner",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Git Architecture, Version Control Fundamentals & Three-Section Local Repository",
        "slug": "git-fundamentals-branching-merge-strategies",
        "summary": "Understand Version Control System (VCS) fundamentals, Centralized vs Distributed architectures (SVN vs Git), Ubuntu/Windows setup, global identity configuration, and the three local sections: Working Directory (untracked), Staging Area (Index/staged), and Local Repository (committed snapshots), plus safe unstaging with 'git rm --cached'.",
        "difficulty": "Beginner",
        "estimatedMinutes": 35,
        "keyTakeaway": "Every Git clone is a complete backup of project history (no single point of failure). Files transition: Working Directory -> git add -> Staging Area -> git commit -> Local Repository. Unstage safely with 'git rm --cached <file>' without losing disk changes."
      },
      {
        "topicNumber": 2,
        "title": "Git Command Suite & Cheat Sheet Mastery (History, Diffs, Undoing & Remote Sync)",
        "slug": "git-command-suite-cheat-sheet-mastery",
        "summary": "Master the complete Atlassian Git Cheat Sheet: git init, git clone, config aliases/editor, git status, git log options (--oneline, -p, --stat, --graph --decorate, --author, --grep), git diff (HEAD, --cached), git reset (soft, hard, pointers), git revert, git clean -n/-f, branching, interactive rebasing (git rebase -i), reflog, and remote sync (fetch, pull --rebase, push --force/--tags/--all).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "Run 'git status' constantly to eliminate guesswork. Inspect with 'git log --graph --oneline', undo safely with 'git revert' or soft reset, dry-run with 'git clean -n', and sync remotes using 'git pull --rebase'."
      },
      {
        "topicNumber": 3,
        "title": "GitHub Actions CI/CD, Secrets & Enterprise Workflows",
        "slug": "github-actions-cicd-matrix-secrets",
        "summary": "Automate builds and deployments using YAML workflows: triggers (push, pull_request, schedule), runner environments, matrix builds across OS/Node versions, encrypted secrets, and environment protection rules.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "GitHub Actions provides native CI/CD with reusable composite actions, encrypted environment secrets, and strict branch protection rules to enforce status checks."
      }
    ]
  },
  {
    "moduleNumber": 17,
    "title": "Jenkins – Enterprise CI/CD Pipeline Automation",
    "slug": "jenkins-enterprise-cicd-pipeline-automation",
    "description": "Master enterprise continuous integration and delivery with Jenkins: RHEL/CentOS setup, initial unlock, Global Security & Role Strategy RBAC, Controller-Agent distributed architecture, GitHub webhooks, multi-stage Declarative Pipelines, Cron build triggers, email alerts, and automated headless Selenium browser testing with Maven and JUnit XML reports.",
    "icon": "play-circle",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Jenkins Controller-Agent Architecture, Linux Setup & Global Security (RBAC)",
        "slug": "jenkins-architecture-master-agents",
        "summary": "Master Jenkins core architecture: Java 17 prerequisite, RHEL/CentOS YUM installation, systemctl service daemon, initialAdminPassword unlock wizard, Global Security Realm vs Authorization Strategy (Matrix-based and Role Strategy plugin for least-privilege), and Controller-Agent distributed builds with 'agent any' vs 'agent { label }' and 0 executors on Controller.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 35,
        "keyTakeaway": "Jenkins orchestrates build tools; it does not compile code itself. Never run heavy build workloads on the Controller—set Controller executors to 0 and delegate to dedicated labeled agents. Secure user access using the Role Strategy plugin instead of 'logged-in users can do anything'."
      },
      {
        "topicNumber": 2,
        "title": "Build Triggers, SCM Integration & Declarative Pipelines (Jenkinsfile & Cron Scheduling)",
        "slug": "declarative-jenkinsfile-production-pipelines",
        "summary": "Master Jenkins automation workflows: Freestyle vs Pipeline jobs, GitHub webhooks (/github-webhook/ with 'GitHub hook trigger for GITScm polling'), Build Triggers (Manual, Remote token, Build periodically vs Poll SCM, Upstream dependencies), 5-field Cron syntax, Declarative Jenkinsfiles (agent, stages, steps, post failure email notifications), and interactive human approval gates.",
        "difficulty": "Advanced",
        "estimatedMinutes": 40,
        "keyTakeaway": "Prefer GitHub webhooks over Poll SCM for instant event-driven builds. Define all pipelines as version-controlled Declarative Jenkinsfiles in SCM. Use post { failure { mail ... } } to eliminate noisy success alert fatigue, and input steps for production deployment gates."
      },
      {
        "topicNumber": 3,
        "title": "Automated Testing & Continuous Integration: Selenium, Maven & Headless Test Automation",
        "slug": "jenkins-selenium-maven-headless-testing",
        "summary": "Automate browser testing in CI/CD: Selenium WebDriver setup in Eclipse/Maven, pom.xml dependencies with test scope, writing robust web tests with explicit waits and driver.quit(), running headless browser tests on Linux CI agents (ChromeDriver/Xvfb), Jenkins Maven Freestyle/Declarative integration, and publishing JUnit XML test reports (**/target/surefire-reports/*.xml) for trend analysis.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 40,
        "keyTakeaway": "Automated Selenium testing in Jenkins eliminates 'works on my machine' flakiness. Run browser tests headlessly on Linux CI agents, always close WebDriver sessions with driver.quit(), and publish JUnit XML reports to track test pass/fail trends over time."
      }
    ]
  },
  {
    "moduleNumber": 18,
    "title": "Docker – Modern Containerization Deep Dive",
    "slug": "docker-modern-containerization-deep-dive",
    "description": "Container virtualization fundamentals: Linux namespaces & cgroups, Docker daemon architecture, multi-stage Dockerfile optimization, caching, Docker Compose multi-service stacks, networking, and volumes.",
    "icon": "box",
    "level": "Beginner",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Container Internals, Namespaces & Docker Architecture",
        "slug": "docker-internals-container-architecture",
        "summary": "Deconstruct container virtualization: Type 1 vs Type 2 hypervisors, Linux kernel namespaces (PID, NET, MNT, IPC, UTS, USER), Control Groups (cgroups v1/v2), OverlayFS union filesystems, Docker client-server architecture (CLI, REST API, dockerd, containerd, runc), Docker group security risks, and container lifecycle states.",
        "difficulty": "Beginner",
        "estimatedMinutes": 40,
        "keyTakeaway": "Containers are isolated Linux processes sharing the host kernel, not full-blown VMs. The Docker CLI speaks REST over a Unix socket to dockerd, which delegates execution to containerd and the runc OCI runtime."
      },
      {
        "topicNumber": 2,
        "title": "Docker Images, Dockerfile Engineering & Registry Distribution",
        "slug": "docker-images-dockerfile-registries",
        "summary": "Master Docker image engineering: read-only immutable layers, content-addressable SHA256 hashes, Dockerfile directives (ARG vs ENV, COPY vs ADD, RUN chaining, WORKDIR, EXPOSE), CMD vs ENTRYPOINT matrix, build context optimization, layer cache invalidation rules, base image selection (Alpine musl vs Debian glibc, Distroless, Scratch), multi-stage builds, and image registries (Docker Hub, Harbor, private registry:2).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Order Dockerfile instructions from least-frequently to most-frequently changing to maximize layer cache hits. Use multi-stage builds to discard build tools and compilers from production runtime containers."
      },
      {
        "topicNumber": 3,
        "title": "Docker Networking, Storage Volumes & Multi-Container Docker Compose Stacks",
        "slug": "dockerfile-multistage-compose-networking",
        "summary": "Architect connected container systems: default bridge vs user-defined bridge networks with automatic DNS service discovery, host and none drivers, storage persistence (named volumes vs bind mounts vs tmpfs), multi-container orchestration with Docker Compose (docker-compose.yml), service dependencies and healthchecks, container resource quotas, and production incident troubleshooting.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "User-defined bridge networks provide automatic DNS resolution between containers by service name. Docker Compose depends_on only checks container process start, not application readiness — always combine with healthcheck condition."
      }
    ]
  },
  {
    "moduleNumber": 19,
    "title": "Kubernetes (K8s) – Production Container Orchestration",
    "slug": "kubernetes-production-container-orchestration",
    "description": "Enterprise container orchestration: Control Plane (API Server, etcd, Scheduler) & Worker Nodes (Kubelet, Kube-Proxy), Pods, Deployments, Services (ClusterIP, NodePort, LoadBalancer), Ingress, ConfigMaps, Secrets, PV/PVC, and Helm.",
    "icon": "layers",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Kubernetes Architecture, Control Plane & Cluster Bootstrapping",
        "slug": "kubernetes-architecture-control-plane-nodes",
        "summary": "Deconstruct the distributed K8s control plane: kube-apiserver REST gateway, etcd distributed consensus, kube-scheduler placement, kube-controller-manager loops, cloud-controller-manager, Kubelet node agents, kube-proxy iptables/IPVS routing, Container Runtime Interface (CRI: containerd, CRI-O), CoreDNS, CNI plugins (Flannel, Calico), cluster bootstrapping (kind, kubeadm), and manifest anatomy (apiVersion, kind, metadata, spec, status, requests vs limits).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Only kube-apiserver talks to etcd directly. The scheduler decides WHICH node runs a Pod; the kubelet on that node actually starts it. Use declarative 'kubectl apply -f' over imperative commands."
      },
      {
        "topicNumber": 2,
        "title": "Kubernetes Workloads, Core Objects, Networking & Storage Abstractions",
        "slug": "kubernetes-objects-workloads-networking-storage",
        "summary": "Master core Kubernetes abstractions: Pods, Deployments, ReplicaSets, Namespaces, Service types (ClusterIP, NodePort, LoadBalancer, ExternalName), ConfigMaps & Secrets (base64 vs etcd encryption at rest), PersistentVolumes (PV) & PersistentVolumeClaims (PVC), Reclaim Policies, DaemonSets (per-node agents) vs StatefulSets (ordered names & per-pod PVCs), Jobs & CronJobs, and Ingress routing.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 50,
        "keyTakeaway": "Deployments manage stateless Pods; StatefulSets manage stateful databases with stable identities and persistent PVCs. Services select Pods via label selectors, and Ingress requires an active Ingress Controller."
      },
      {
        "topicNumber": 3,
        "title": "Zero-Downtime Rollouts, Autoscaling (HPA), Helm Packaging & Production Operations",
        "slug": "k8s-workloads-services-networking-helm",
        "summary": "Operate production Kubernetes clusters: Deployment rollout upgrades (kubectl set image, rollout status/history/undo), RollingUpdate (maxUnavailable, maxSurge) vs Recreate strategies, Horizontal Pod Autoscaler (HPA) with Metrics Server and CPU thresholds, Helm package manager (Chart.yaml, values.yaml, templates/, install, upgrade, rollback), and incident troubleshooting (Pending, CrashLoopBackOff).",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "RollingUpdate scales the new ReplicaSet up while scaling the old one down, keeping the old ReplicaSet at 0 replicas for instant rollback. HPA strictly requires container resource requests to calculate utilization percentages."
      }
    ]
  },
  {
    "moduleNumber": 20,
    "title": "Complete End-to-End DevOps & Cloud CI/CD Mastery",
    "slug": "complete-end-to-end-devops-cloud-cicd",
    "description": "Synthesize the full modern cloud-native engineering stack: Git commit -> GitHub webhook -> Jenkins pipeline -> Docker build & security scan -> AWS ECR -> Kubernetes (EKS) automated blue/green rolling deployment.",
    "icon": "cpu",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "The Unified Pipeline: GitHub + Jenkins + Docker + K8s + AWS",
        "slug": "end-to-end-devops-pipeline-github-jenkins-docker-k8s-aws",
        "summary": "Build an enterprise-grade automated deployment pipeline connecting GitHub source control, Jenkins CI automation, Docker containerization, Trivy vulnerability scanning, Amazon ECR container registry, and Amazon EKS Kubernetes clusters.",
        "difficulty": "Advanced",
        "estimatedMinutes": 55,
        "keyTakeaway": "Modern DevOps integrates Developer velocity with Cloud resilience: code changes automatically test, package, scan, and deploy with zero downtime and instant rollback capabilities."
      }
    ]
  },
  {
    "moduleNumber": 21,
    "title": "Angular Enterprise Frontend Architecture (Components, RxJS, Signals & Change Detection)",
    "slug": "angular-enterprise-frontend-architecture",
    "description": "Master modern Angular architecture: Standalone components, Ivy compiler, ViewEncapsulation, DI hierarchies, RxJS reactive streams, functional routing guards, dynamic Reactive Forms, OnPush change detection, and fine-grained Angular Signals.",
    "icon": "code",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Angular Architecture, Standalone Components, View Encapsulation & Lifecycle Hooks",
        "slug": "angular-core-components-lifecycle-databinding",
        "summary": "Master modern Angular standalone components, Ivy compiler template bytecode, ViewEncapsulation modes (Emulated vs ShadowDom vs None), 4-way data binding, and the component lifecycle execution sequence from constructor through ngOnDestroy.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Standalone components eliminate NgModule boilerplate, while Emulated View Encapsulation scopes CSS using generated host/content attributes without Shadow DOM overhead."
      },
      {
        "topicNumber": 2,
        "title": "Dependency Injection, Hierarchical Injectors & RxJS Reactive Streams",
        "slug": "angular-rxjs-services-dependency-injection",
        "summary": "Deep dive into Angular's multi-tiered DI hierarchy (providedIn: 'root', Element vs Environment injectors), InjectionTokens, and RxJS reactive programming (Observables, Subjects: Behavior/Replay, pipeable operators switchMap/mergeMap/concatMap/exhaustMap, and memory leak prevention).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 50,
        "keyTakeaway": "Use switchMap for cancellable search queries and exhaustMap for non-reentrant button submissions. Avoid subscription memory leaks by using takeUntilDestroyed() or the async pipe."
      },
      {
        "topicNumber": 3,
        "title": "Routing Guards, Reactive Forms, OnPush Change Detection & Angular Signals",
        "slug": "angular-routing-forms-change-detection-signals",
        "summary": "Build enterprise routing with functional guards and interceptors, author dynamic Reactive Forms with custom async validators, and master Zone.js change detection, OnPush immutability optimization, and modern fine-grained Angular Signals (signal, computed, effect).",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "OnPush change detection skips subtrees unless input object references change or events fire. Angular Signals enable fine-grained reactivity without Zone.js overhead."
      }
    ]
  },
  {
    "moduleNumber": 22,
    "title": "Node.js Scalable Backend & Async Runtime Architecture",
    "slug": "nodejs-scalable-backend-architecture",
    "description": "Deep dive into the Node.js V8 runtime: libuv event loop phases, microtask queue precedence, asynchronous patterns, streams, backpressure management, Express middleware chains, Redis in-memory caching, and multi-core cluster scaling.",
    "icon": "server",
    "level": "Intermediate",
    "topics": [
      {
        "topicNumber": 1,
        "title": "Node.js Architecture, libuv Event Loop Phases, Microtasks & Async Programming",
        "slug": "nodejs-event-loop-libuv-async-programming",
        "summary": "Deconstruct the single-threaded V8 execution model, libuv thread pool (UV_THREADPOOL_SIZE), event loop phases (Timers, Pending I/O, Poll, Check, Close), and microtask queue precedence (process.nextTick vs Promise.then vs setImmediate).",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "Node.js is single-threaded for JavaScript execution but offloads I/O and crypto/fs to libuv threads. Never block the event loop with synchronous computation or heavy loops."
      },
      {
        "topicNumber": 2,
        "title": "Node.js Streams, Buffer Internals, File Handling & Backpressure Management",
        "slug": "nodejs-streams-buffer-file-handling",
        "summary": "Master high-throughput streaming architectures: Readable, Writable, Duplex, and Transform streams, binary Buffer manipulation, stream piping with stream.pipeline(), and handling high-water mark backpressure to prevent out-of-memory crashes.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 50,
        "keyTakeaway": "Streams process data in chunks without loading entire multi-gigabyte files into RAM. Always check stream.write() return value and listen for 'drain' to handle backpressure."
      },
      {
        "topicNumber": 3,
        "title": "Express.js Middleware Pipeline, Redis Caching, Clustering & PM2 Scalability",
        "slug": "express-middleware-security-performance-caching",
        "summary": "Architect production-grade Express applications: Custom middleware chaining, error-handling middleware (err, req, res, next), in-memory caching with Redis, Node.js cluster multi-core utilization, and PM2 process management.",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "Error-handling middleware must declare 4 parameters (err, req, res, next). Multi-core cluster mode forks worker processes to utilize all server CPU cores via OS round-robin load distribution."
      }
    ]
  },
  {
    "moduleNumber": 23,
    "title": "RESTful APIs, Integration, Security & Performance",
    "slug": "restful-apis-integration-security-performance",
    "description": "Architect enterprise REST APIs: Roy Fielding constraints, HTTP method idempotency, status code contracts, schema validation with Zod/Joi, JWT authentication lifecycle with refresh token rotation, RBAC, rate limiting, and CORS preflight handling.",
    "icon": "zap",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "RESTful API Architectural Constraints, HTTP Protocol & Idempotency",
        "slug": "rest-api-design-http-protocol-idempotency",
        "summary": "Master REST constraints: Statelessness, client-server decoupling, uniform interface, noun-based URI design, HTTP verbs (GET, POST, PUT, PATCH, DELETE), status codes (2xx, 3xx, 4xx, 5xx), and method idempotency.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 45,
        "keyTakeaway": "GET, PUT, and DELETE must be idempotent (multiple identical requests yield identical server state). POST is non-idempotent and creates new sub-resources."
      },
      {
        "topicNumber": 2,
        "title": "API Security: JWT Token Lifecycle, RBAC Authorization, Rate Limiting & CORS",
        "slug": "api-security-jwt-rbac-rate-limiting-cors",
        "summary": "Implement defense-in-depth API security: Cryptographically signed JWT tokens, access token + refresh token rotation in HttpOnly cookies, Role-Based Access Control (RBAC) middleware, Redis token-bucket rate limiting, and CORS preflight OPTIONS headers.",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "Store short-lived JWT access tokens in memory and long-lived refresh tokens in secure HttpOnly SameSite cookies to protect against both XSS and CSRF."
      },
      {
        "topicNumber": 3,
        "title": "Schema Validation, Cursor Pagination, Filtering, Sorting & RFC 7807 Errors",
        "slug": "api-validation-pagination-filtering-error-handling",
        "summary": "Enforce strict API request/response contracts using Zod/Joi schema validation, implement high-performance cursor-based pagination over offset pagination, and standardize error responses adhering to RFC 7807 Problem Details.",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "Offset pagination degrades to O(N) at high page counts and suffers from data shift; cursor-based pagination uses indexed WHERE clauses to achieve constant O(1) performance."
      }
    ]
  },
  {
    "moduleNumber": 24,
    "title": "Database Engineering, Query Optimization & Full-Stack System Design",
    "slug": "database-engineering-fullstack-system-design",
    "description": "Enterprise database engineering and system design: Relational ACID vs NoSQL BASE, normalization vs denormalization, B-Tree indexes, transactions, EXPLAIN ANALYZE query tuning, avoiding N+1 queries, and end-to-end full-stack integration.",
    "icon": "database",
    "level": "Advanced",
    "topics": [
      {
        "topicNumber": 1,
        "title": "SQL vs NoSQL Data Modeling, B-Tree Indexing & ACID Transactions",
        "slug": "sql-nosql-schema-modeling-indexing",
        "summary": "Compare Relational ACID databases (PostgreSQL/MySQL) with NoSQL document stores (MongoDB), master normalization vs denormalization trade-offs, B-Tree index structures, and ACID transactional isolation levels.",
        "difficulty": "Intermediate",
        "estimatedMinutes": 50,
        "keyTakeaway": "Relational databases enforce schema consistency and transactional atomicity; NoSQL provides flexible schemas and horizontal sharding. Indexes speed up reads but add overhead on writes."
      },
      {
        "topicNumber": 2,
        "title": "Query Optimization, EXPLAIN ANALYZE, Joins & Cache Invalidation Patterns",
        "slug": "query-optimization-execution-plans-caching",
        "summary": "Diagnose database bottlenecks using EXPLAIN ANALYZE execution plans, optimize complex multi-table joins (Nested Loop, Hash, Merge Joins), eliminate N+1 query antipatterns, and implement Cache-Aside with Redis.",
        "difficulty": "Advanced",
        "estimatedMinutes": 50,
        "keyTakeaway": "Sequential scans (Seq Scan) on large tables indicate missing indexes. Solve N+1 queries by replacing iterative queries with JOINs or SQL IN(...) batch fetching."
      },
      {
        "topicNumber": 3,
        "title": "Full-Stack Enterprise System Design: Angular + Node.js + DB + WebSockets",
        "slug": "fullstack-system-design-angular-node-integration",
        "summary": "Synthesize the entire modern full-stack: Angular standalone frontend client communicating with an Express/Node.js API gateway, relational database with read replicas, Redis caching tier, and real-time bidirectional WebSockets.",
        "difficulty": "Advanced",
        "estimatedMinutes": 55,
        "keyTakeaway": "A scalable full-stack system cleanly separates concerns: client-side SPA rendering, stateless Node.js compute, managed database clusters, and sub-millisecond in-memory caching."
      }
    ]
  }
];

FALLBACK_MODULES.push(...PYTHON_MODULES);

export function getFallbackTopic(slug) {
  for (const mod of FALLBACK_MODULES) {
    const found = mod.topics?.find(t => t.slug === slug);
    if (found) {
      return {
        id: found.slug,
        ...found,
        costRisk: 'FREE_TIER',
        module: {
          id: mod.slug,
          moduleNumber: mod.moduleNumber,
          title: mod.title,
          slug: mod.slug
        }
      };
    }
  }
  return null;
}
