/**
 * Comprehensive Important Ports & Protocols Master Reference
 * Curated for AWS Cloud Architects, DevOps Engineers, and System Administrators.
 */

export const PORT_CATEGORIES = [
  { id: 'all', label: 'All Ports', icon: 'Layers' },
  { id: 'web', label: 'Web & Proxies', icon: 'Globe' },
  { id: 'remote', label: 'Remote Access & Bastion', icon: 'Lock' },
  { id: 'database', label: 'Databases & Caching', icon: 'Database' },
  { id: 'devops', label: 'DevOps & CI/CD', icon: 'Terminal' },
  { id: 'k8s', label: 'Containers & Kubernetes', icon: 'Radio' },
  { id: 'storage', label: 'Cloud Storage & Shares', icon: 'Server' },
  { id: 'monitoring', label: 'Monitoring & Observability', icon: 'Activity' },
  { id: 'network', label: 'DNS & Core Infrastructure', icon: 'Network' },
  { id: 'app', label: 'Application & Microservices', icon: 'Cpu' },
];

export const IMPORTANT_PORTS_DATA = [
  // ==========================================
  // 1. WEB & PROXIES
  // ==========================================
  {
    id: 'port-80',
    port: 80,
    protocol: 'TCP',
    service: 'HTTP',
    commonName: 'Hypertext Transfer Protocol',
    category: 'web',
    categoryLabel: 'Web & Proxies',
    riskLevel: 'STANDARD',
    description: 'Unencrypted standard web communication protocol.',
    whereToUse: 'Inbound on Application Load Balancer (ALB), CloudFront, or Nginx edge proxies from 0.0.0.0/0. Primarily configured to issue immediate HTTP 301 Permanent Redirects to port 443 (HTTPS).',
    awsSecurityGroup: {
      type: 'HTTP',
      protocol: 'TCP',
      portRange: '80',
      recommendedSource: '0.0.0.0/0 (Internet) for public ALBs; restricted for internal ALBs',
      ruleDirection: 'Inbound',
      ruleSeverity: 'SAFE',
      terraformSnippet: 'ingress {\n  from_port   = 80\n  to_port     = 80\n  protocol    = "tcp"\n  cidr_blocks = ["0.0.0.0/0"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-alb --protocol tcp --port 80 --cidr 0.0.0.0/0'
    },
    architecturalGuidance: 'Never transmit passwords, API tokens, or payment data over port 80. Always attach an AWS ACM SSL certificate on the ALB listener and configure an automatic redirect rule: HTTP:80 -> HTTPS:443.',
    interviewTip: 'Q: How do you handle port 80 on AWS? A: Configure an ALB listener on port 80 with a default action to redirect traffic to port 443 with a 301 status code.'
  },
  {
    id: 'port-443',
    port: 443,
    protocol: 'TCP',
    service: 'HTTPS / TLS',
    commonName: 'HTTP Secure (TLS Encrypted)',
    category: 'web',
    categoryLabel: 'Web & Proxies',
    riskLevel: 'SAFE',
    description: 'TLS/SSL encrypted web traffic ensuring privacy, integrity, and authentication.',
    whereToUse: 'Inbound on Internet-facing Application Load Balancers (ALB), Network Load Balancers (NLB), CloudFront distributions, AWS API Gateway custom domains, and Kubernetes Ingress Controllers (Traefik/Nginx).',
    awsSecurityGroup: {
      type: 'HTTPS',
      protocol: 'TCP',
      portRange: '443',
      recommendedSource: '0.0.0.0/0 (IPv4) & ::/0 (IPv6) on Public ALBs',
      ruleDirection: 'Inbound',
      ruleSeverity: 'SAFE',
      terraformSnippet: 'ingress {\n  from_port   = 443\n  to_port     = 443\n  protocol    = "tcp"\n  cidr_blocks = ["0.0.0.0/0"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-alb --protocol tcp --port 443 --cidr 0.0.0.0/0'
    },
    architecturalGuidance: 'Terminate SSL/TLS at the ALB using free auto-renewing certificates from AWS Certificate Manager (ACM). Behind the ALB, target groups can communicate over private VPC networks on container/target ports.',
    interviewTip: 'ALB supports SNI (Server Name Indication) on port 443, allowing multiple certificates for different domain names on a single listener.'
  },
  {
    id: 'port-8080-web',
    port: 8080,
    protocol: 'TCP',
    service: 'Alternative HTTP / Proxy',
    commonName: 'HTTP Secondary / Dev Port',
    category: 'web',
    categoryLabel: 'Web & Proxies',
    riskLevel: 'MEDIUM',
    description: 'Common secondary web port for web applications, Tomcat, Apache, and reverse proxies.',
    whereToUse: 'Inbound on EC2 target instances, ECS tasks, or EKS pods from the ALB Security Group (sg-alb). Rarely exposed directly to the public internet.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8080',
      recommendedSource: 'sg-alb (Reference ALB Security Group by ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 8080\n  to_port         = 8080\n  protocol        = "tcp"\n  security_groups = [aws_security_group.alb.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-app --protocol tcp --port 8080 --source-group sg-alb'
    },
    architecturalGuidance: 'Security Group Chaining: Never open 8080 to CIDR 0.0.0.0/0 on backend servers. Always reference the ALB Security Group ID directly as the source.',
    interviewTip: 'Referencing a Security Group ID instead of CIDR IPs is an AWS best practice because it dynamically permits traffic from auto-scaled instances without hardcoding IP addresses.'
  },
  {
    id: 'port-8443',
    port: 8443,
    protocol: 'TCP',
    service: 'Alternative HTTPS',
    commonName: 'HTTPS Secondary / Admin TLS',
    category: 'web',
    categoryLabel: 'Web & Proxies',
    riskLevel: 'MEDIUM',
    description: 'Secondary secure HTTPS port frequently utilized for internal web consoles and secure management portals.',
    whereToUse: 'Inbound on internal admin portals, API microservices requiring end-to-end TLS, or containerized backends behind private internal load balancers.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8443',
      recommendedSource: 'Corporate VPN CIDR or Internal VPC Subnets',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port   = 8443\n  to_port     = 8443\n  protocol    = "tcp"\n  cidr_blocks = ["10.0.0.0/16"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-admin --protocol tcp --port 8443 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Use when backend compliance mandates mutual TLS (mTLS) or end-to-end encryption from load balancer to application container.',
    interviewTip: 'When configuring end-to-end encryption, the ALB establishes a fresh TLS handshake to port 8443 on the targets.'
  },

  // ==========================================
  // 2. REMOTE ACCESS & BASTION HOSTS
  // ==========================================
  {
    id: 'port-22',
    port: 22,
    protocol: 'TCP',
    service: 'SSH / SFTP',
    commonName: 'Secure Shell',
    category: 'remote',
    categoryLabel: 'Remote Access & Bastion',
    riskLevel: 'CRITICAL',
    description: 'Encrypted network protocol for secure command-line shell access, remote system administration, and SFTP file transfers.',
    whereToUse: 'Inbound on Linux EC2 Bastion Hosts or Jump Boxes located in a Public Subnet. Inbound source MUST be restricted strictly to your static corporate IP / Admin workstation IP (e.g., x.x.x.x/32). Internal private EC2 instances should accept port 22 only from the Bastion SG.',
    awsSecurityGroup: {
      type: 'SSH',
      protocol: 'TCP',
      portRange: '22',
      recommendedSource: 'Your Admin IP (x.x.x.x/32) on Bastion; Bastion SG on Private Instances',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port   = 22\n  to_port     = 22\n  protocol    = "tcp"\n  cidr_blocks = ["203.0.113.50/32"] # YOUR ADMIN IP ONLY\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-bastion --protocol tcp --port 22 --cidr 203.0.113.50/32'
    },
    architecturalGuidance: 'GOLDEN RULE: NEVER open Port 22 to 0.0.0.0/0. Modern Cloud Standard: Replace Bastion hosts completely with AWS Systems Manager (SSM) Session Manager. SSM requires 0 inbound ports, works via HTTPS outbound over AWS private network, and logs all commands to CloudWatch & S3.',
    interviewTip: 'Favorite Interview Question: "How do you securely manage EC2 instances in private subnets without opening port 22?" Answer: Attach an IAM role with AmazonSSMManagedInstanceCore to the instance and use AWS Systems Manager Session Manager.'
  },
  {
    id: 'port-3389',
    port: 3389,
    protocol: 'TCP/UDP',
    service: 'RDP',
    commonName: 'Remote Desktop Protocol',
    category: 'remote',
    categoryLabel: 'Remote Access & Bastion',
    riskLevel: 'CRITICAL',
    description: 'Microsoft proprietary protocol providing a graphical user interface to connect to Windows EC2 instances.',
    whereToUse: 'Inbound on Windows EC2 instances or Windows RD Gateway Bastion hosts. Inbound source must be strictly restricted to corporate VPN or trusted Admin IP (/32).',
    awsSecurityGroup: {
      type: 'RDP',
      protocol: 'TCP',
      portRange: '3389',
      recommendedSource: 'Corporate VPN CIDR or Admin Workstation IP/32 ONLY',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port   = 3389\n  to_port     = 3389\n  protocol    = "tcp"\n  cidr_blocks = ["198.51.100.22/32"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-win-bastion --protocol tcp --port 3389 --cidr 198.51.100.22/32'
    },
    architecturalGuidance: 'Opening port 3389 to 0.0.0.0/0 is the #1 cause of automated ransomware and brute-force attacks on cloud servers. Use AWS Fleet Manager (SSM GUI) or AWS Client VPN instead.',
    interviewTip: 'AWS SSM also supports port forwarding for RDP over session manager: aws ssm start-session --target i-xxxx --document-name AWS-StartPortForwardingSession --parameters portNumber="3389",localPortNumber="53389".'
  },
  {
    id: 'port-23',
    port: 23,
    protocol: 'TCP',
    service: 'Telnet',
    commonName: 'Unencrypted Remote Terminal',
    category: 'remote',
    categoryLabel: 'Remote Access & Bastion',
    riskLevel: 'CRITICAL',
    description: 'Legacy unencrypted bidirectional interactive text communication. All traffic and credentials travel in cleartext.',
    whereToUse: 'DEPRECATED & INSECURE. Never deploy in production AWS environments. Replace exclusively with SSH (Port 22) or SSM Session Manager.',
    awsSecurityGroup: {
      type: 'Telnet',
      protocol: 'TCP',
      portRange: '23',
      recommendedSource: 'BLOCKED (Do Not Permit)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: '# PORT 23 SHOULD NEVER BE ALLOWED IN TERRAFORM',
      awsCliCommand: '# DO NOT OPEN PORT 23'
    },
    architecturalGuidance: 'AWS Security Hub and AWS Config have built-in conformance pack rules that immediately flag open port 23 as a critical security violation.',
    interviewTip: 'If asked why Telnet is dangerous: Passwords, session cookies, and commands are sent in unencrypted plaintext and can be intercepted by anyone on the network path.'
  },

  // ==========================================
  // 3. DATABASES & IN-MEMORY CACHING
  // ==========================================
  {
    id: 'port-3306',
    port: 3306,
    protocol: 'TCP',
    service: 'MySQL / Aurora MySQL / MariaDB',
    commonName: 'MySQL Database Engine',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'CRITICAL',
    description: 'Default communication port for MySQL, AWS Aurora MySQL, and MariaDB relational database management systems.',
    whereToUse: 'Inbound on AWS RDS DB Subnet Groups and EC2 MySQL instances located in Private Data Subnets. Inbound rule MUST reference the Application Security Group ID (sg-app) or Lambda VPC Security Group ID (sg-lambda).',
    awsSecurityGroup: {
      type: 'MySQL/Aurora',
      protocol: 'TCP',
      portRange: '3306',
      recommendedSource: 'sg-app (Application Tier Security Group ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 3306\n  to_port         = 3306\n  protocol        = "tcp"\n  security_groups = [aws_security_group.app_tier.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-rds --protocol tcp --port 3306 --source-group sg-app'
    },
    architecturalGuidance: 'RDS instances should ALWAYS have "Publicly Accessible: No" selected. For read scaling, deploy Aurora Read Replicas across multiple AZs and connect via the Aurora Reader Endpoint on port 3306.',
    interviewTip: 'Q: How do you connect to a private RDS instance on port 3306 from your laptop for debugging? A: Use an SSH Bastion with port tunneling (ssh -L 3306:rds-endpoint:3306 bastion-ip) or AWS SSM Port Forwarding.'
  },
  {
    id: 'port-5432',
    port: 5432,
    protocol: 'TCP',
    service: 'PostgreSQL / Aurora PostgreSQL',
    commonName: 'PostgreSQL Relational DB',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'CRITICAL',
    description: 'Standard connection port for PostgreSQL and Amazon Aurora PostgreSQL Serverless relational database clusters.',
    whereToUse: 'Inbound on private DB Subnets containing RDS PostgreSQL instances. Source must be restricted to backend API security groups, Kubernetes worker node SGs, or AWS Glue ETL jobs.',
    awsSecurityGroup: {
      type: 'PostgreSQL',
      protocol: 'TCP',
      portRange: '5432',
      recommendedSource: 'sg-backend-api (Backend API Security Group)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 5432\n  to_port         = 5432\n  protocol        = "tcp"\n  security_groups = [aws_security_group.backend.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-postgres --protocol tcp --port 5432 --source-group sg-backend'
    },
    architecturalGuidance: 'Enable IAM Database Authentication on port 5432 to authenticate with short-lived AWS IAM tokens instead of hardcoded master passwords. Use AWS Secrets Manager for automatic credential rotation.',
    interviewTip: 'Amazon RDS Proxy sits on port 5432 between Lambda functions and PostgreSQL to pool database connections and prevent Lambda cold starts from exhausting DB connections.'
  },
  {
    id: 'port-1433',
    port: 1433,
    protocol: 'TCP',
    service: 'Microsoft SQL Server',
    commonName: 'MS SQL Server Database Engine',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'CRITICAL',
    description: 'Default port for Microsoft SQL Server Database Engine connections.',
    whereToUse: 'Inbound on AWS RDS for SQL Server or EC2 Windows instances hosting MSSQL from enterprise .NET applications, SSMS workstations over VPN, or PowerBI connectors.',
    awsSecurityGroup: {
      type: 'MS SQL',
      protocol: 'TCP',
      portRange: '1433',
      recommendedSource: 'sg-dotnet-app (App Tier Security Group)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 1433\n  to_port         = 1433\n  protocol        = "tcp"\n  security_groups = [aws_security_group.dotnet_app.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-mssql --protocol tcp --port 1433 --source-group sg-dotnet'
    },
    architecturalGuidance: 'Place in private subnets across multiple AZs using SQL Server Multi-AZ Mirroring or Always On Availability Groups.',
    interviewTip: 'AWS RDS SQL Server supports Windows Authentication through AWS Directory Service (Managed Microsoft AD).'
  },
  {
    id: 'port-1521',
    port: 1521,
    protocol: 'TCP',
    service: 'Oracle Database',
    commonName: 'Oracle Net Listener',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'CRITICAL',
    description: 'Default listener port for Oracle Database client connections and Oracle Enterprise Manager.',
    whereToUse: 'Inbound on AWS RDS for Oracle instances from legacy ERP systems, WebLogic application servers, or middleware integration tiers.',
    awsSecurityGroup: {
      type: 'Oracle',
      protocol: 'TCP',
      portRange: '1521',
      recommendedSource: 'sg-erp-app (ERP Middleware Security Group)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 1521\n  to_port         = 1521\n  protocol        = "tcp"\n  security_groups = [aws_security_group.oracle_clients.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-oracle --protocol tcp --port 1521 --source-group sg-erp'
    },
    architecturalGuidance: 'Oracle on AWS requires specialized licensing considerations (Bring Your Own License - BYOL vs License Included). Protect with Oracle Transparent Data Encryption (TDE) integrated with AWS KMS.',
    interviewTip: 'RDS Oracle Multi-AZ uses Oracle Data Guard physical standby to replicate transactions synchronously.'
  },
  {
    id: 'port-6379',
    port: 6379,
    protocol: 'TCP',
    service: 'Redis / ElastiCache Redis / MemoryDB',
    commonName: 'Redis In-Memory Key-Value Store',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'HIGH',
    description: 'Default port for Redis in-memory data structure store used for database caching, session storage, and Pub/Sub message brokering.',
    whereToUse: 'Inbound on AWS ElastiCache for Redis or Amazon MemoryDB clusters. Source MUST be restricted to the Web/App EC2 Security Group, ECS Task SG, or Lambda VPC SG.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '6379',
      recommendedSource: 'sg-app (Application Security Group ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 6379\n  to_port         = 6379\n  protocol        = "tcp"\n  security_groups = [aws_security_group.app.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-elasticache --protocol tcp --port 6379 --source-group sg-app'
    },
    architecturalGuidance: 'CRITICAL: Redis has NO native authentication by default unless you enable Redis AUTH token and In-Transit Encryption (TLS). Never expose 6379 outside your private VPC.',
    interviewTip: 'Q: What is the caching strategy for Redis on port 6379? A: Lazy Loading (Cache-Aside) for read-heavy workloads or Write-Through to guarantee data consistency.'
  },
  {
    id: 'port-11211',
    port: 11211,
    protocol: 'TCP/UDP',
    service: 'Memcached / ElastiCache Memcached',
    commonName: 'Memcached In-Memory Cache',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'HIGH',
    description: 'High-performance, multithreaded distributed memory object caching system.',
    whereToUse: 'Inbound on AWS ElastiCache for Memcached clusters from compute instances requiring pure horizontal caching with no data persistence needs.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '11211',
      recommendedSource: 'sg-app (Application SG ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 11211\n  to_port         = 11211\n  protocol        = "tcp"\n  security_groups = [aws_security_group.app.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-memcached --protocol tcp --port 11211 --source-group sg-app'
    },
    architecturalGuidance: 'Memcached UDP on port 11211 has historically been used in massive DDoS amplification attacks on the public internet. Ensure UDP is blocked and restrict TCP strictly to your private VPC.',
    interviewTip: 'Difference between Redis (6379) and Memcached (11211): Redis supports data structures, replication, snapshots, multi-AZ failover, and pub/sub. Memcached is simple multithreaded string caching.'
  },
  {
    id: 'port-27017',
    port: 27017,
    protocol: 'TCP',
    service: 'MongoDB / AWS DocumentDB',
    commonName: 'MongoDB NoSQL Document Store',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'CRITICAL',
    description: 'Standard listening port for MongoDB standalone instances, replica sets, and Amazon DocumentDB (with MongoDB compatibility) clusters.',
    whereToUse: 'Inbound on DocumentDB cluster subnets or EC2 MongoDB replica sets from Node.js, Python, or microservice security groups.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '27017',
      recommendedSource: 'sg-microservices (Microservice Task SG)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 27017\n  to_port         = 27017\n  protocol        = "tcp"\n  security_groups = [aws_security_group.microservices.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-docdb --protocol tcp --port 27017 --source-group sg-microservices'
    },
    architecturalGuidance: 'DocumentDB is VPC-bound by design and cannot have public IP addresses. Connect using TLS enabled with the AWS RDS global truststore certificate.',
    interviewTip: 'To connect to Amazon DocumentDB on port 27017 from outside AWS, you must establish an SSH tunnel via an EC2 Bastion in the same VPC.'
  },
  {
    id: 'port-9200',
    port: 9200,
    protocol: 'TCP',
    service: 'OpenSearch / Elasticsearch REST API',
    commonName: 'OpenSearch / Elasticsearch HTTP API',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'HIGH',
    description: 'HTTP JSON REST API port used for searching, indexing, document queries, and cluster management in OpenSearch and Elasticsearch.',
    whereToUse: 'Inbound on Amazon OpenSearch Service domains from Logstash shippers, Fluentd agents, Kibana/OpenSearch Dashboards, or search query microservices.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '9200',
      recommendedSource: 'sg-log-forwarders or sg-search-api',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 9200\n  to_port         = 9200\n  protocol        = "tcp"\n  security_groups = [aws_security_group.search_clients.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-opensearch --protocol tcp --port 9200 --source-group sg-search-clients'
    },
    architecturalGuidance: 'Deploy OpenSearch inside a private VPC with VPC Access (not Public Access). Protect port 9200 with fine-grained access control and IAM role-based request signing (SigV4).',
    interviewTip: 'Port 9200 is for HTTP client queries; Port 9300 is for binary internal cluster node communication.'
  },
  {
    id: 'port-9300',
    port: 9300,
    protocol: 'TCP',
    service: 'Elasticsearch / OpenSearch Node-to-Node',
    commonName: 'Cluster Transport Protocol',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'MEDIUM',
    description: 'Internal transport protocol for communication, master node election, and shard replication between Elasticsearch/OpenSearch nodes.',
    whereToUse: 'Inbound between instances in the Elasticsearch cluster security group (Self-referencing rule).',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '9300',
      recommendedSource: 'sg-opensearch (Self-referencing security group)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port = 9300\n  to_port   = 9300\n  protocol  = "tcp"\n  self      = true\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-opensearch --protocol tcp --port 9300 --source-group sg-opensearch'
    },
    architecturalGuidance: 'Never expose port 9300 outside the cluster nodes. Use a self-referencing security group rule (ingress source = sg-self).',
    interviewTip: 'Self-referencing security group rules allow all EC2 instances attached to the same SG to communicate with each other on designated ports.'
  },
  {
    id: 'port-9042',
    port: 9042,
    protocol: 'TCP',
    service: 'Apache Cassandra / Amazon Keyspaces',
    commonName: 'Cassandra Native CQL Transport',
    category: 'database',
    categoryLabel: 'Databases & Caching',
    riskLevel: 'HIGH',
    description: 'Cassandra Query Language (CQL) binary protocol port for distributed wide-column database queries.',
    whereToUse: 'Inbound on Amazon Keyspaces (for Apache Cassandra) or self-hosted Cassandra clusters from streaming analytical consumers (Apache Spark, Flink, Kafka consumers).',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '9042',
      recommendedSource: 'sg-analytics-workers (VPC CIDR or Worker SG)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 9042\n  to_port         = 9042\n  protocol        = "tcp"\n  security_groups = [aws_security_group.analytics_workers.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-cassandra --protocol tcp --port 9042 --source-group sg-analytics'
    },
    architecturalGuidance: 'Amazon Keyspaces is serverless and communicates over port 9042 with TLS required and AWS SigV4 authentication plugin.',
    interviewTip: 'Keyspaces scales reads and writes automatically with single-digit millisecond latency at any scale.'
  },

  // ==========================================
  // 4. DEVOPS CI/CD & BUILD TOOLS
  // ==========================================
  {
    id: 'port-8080-jenkins',
    port: 8080,
    protocol: 'TCP',
    service: 'Jenkins Controller Web UI',
    commonName: 'Jenkins CI Dashboard',
    category: 'devops',
    categoryLabel: 'DevOps & CI/CD',
    riskLevel: 'HIGH',
    description: 'Web dashboard and webhook reception port for Jenkins automation server.',
    whereToUse: 'Inbound on Jenkins Controller EC2 instances behind an Application Load Balancer with SSL termination (443 -> 8080) or restricted to GitHub Webhook CIDR IP ranges.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8080',
      recommendedSource: 'sg-alb (ALB Security Group) or GitHub Webhook IP list',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 8080\n  to_port         = 8080\n  protocol        = "tcp"\n  security_groups = [aws_security_group.alb.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-jenkins --protocol tcp --port 8080 --source-group sg-alb'
    },
    architecturalGuidance: 'Do NOT expose Jenkins port 8080 directly to 0.0.0.0/0. Place Jenkins behind an ALB with HTTPS (443), integrate with Okta/GitHub SSO, and use AWS WAF to block malicious payloads.',
    interviewTip: 'Q: How do you trigger Jenkins jobs from GitHub in a private VPC? A: Use AWS API Gateway + Lambda as a webhook proxy, or deploy GitHub self-hosted runners which poll outbound over port 443 with zero open ingress ports.'
  },
  {
    id: 'port-50000',
    port: 50000,
    protocol: 'TCP',
    service: 'Jenkins JNLP Agent Port',
    commonName: 'Jenkins Build Agent Tunnel',
    category: 'devops',
    categoryLabel: 'DevOps & CI/CD',
    riskLevel: 'MEDIUM',
    description: 'Java Network Launch Protocol (JNLP) communication port used by Jenkins dynamic worker/agent nodes to communicate with the controller.',
    whereToUse: 'Inbound on Jenkins Master/Controller from Jenkins Build Agent Security Group (sg-jenkins-agents) or Kubernetes worker nodes running Jenkins agent pods.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '50000',
      recommendedSource: 'sg-jenkins-agents (Build Agents SG Only)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 50000\n  to_port         = 50000\n  protocol        = "tcp"\n  security_groups = [aws_security_group.jenkins_agents.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-jenkins --protocol tcp --port 50000 --source-group sg-jenkins-agents'
    },
    architecturalGuidance: 'Fix the JNLP port to 50000 in Jenkins Global Security settings instead of using random ports so it can be cleanly allowed through AWS Security Groups.',
    interviewTip: 'Using ephemeral EC2 agents or Kubernetes Pod agents spinning up on demand saves significant AWS costs compared to standing 24/7 static worker instances.'
  },
  {
    id: 'port-9000',
    port: 9000,
    protocol: 'TCP',
    service: 'SonarQube Server',
    commonName: 'SonarQube Code Quality Platform',
    category: 'devops',
    categoryLabel: 'DevOps & CI/CD',
    riskLevel: 'MEDIUM',
    description: 'Web dashboard and API port for SonarQube continuous inspection of code quality, test coverage, and security vulnerabilities.',
    whereToUse: 'Inbound on SonarQube EC2 instances from Jenkins build agents and developer workstations over internal VPN.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '9000',
      recommendedSource: 'sg-jenkins-agents & Corporate VPN CIDR',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 9000\n  to_port         = 9000\n  protocol        = "tcp"\n  security_groups = [aws_security_group.jenkins.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-sonarqube --protocol tcp --port 9000 --source-group sg-jenkins'
    },
    architecturalGuidance: 'In CI/CD pipelines, the SonarQube Quality Gate webhook calls back into Jenkins to fail builds that do not meet test coverage or code smell standards.',
    interviewTip: 'Integrate SonarQube into the pull request workflow to block merges if new code introduces vulnerabilities.'
  },
  {
    id: 'port-8081',
    port: 8081,
    protocol: 'TCP',
    service: 'Sonatype Nexus Repository',
    commonName: 'Nexus Artifact Manager',
    category: 'devops',
    categoryLabel: 'DevOps & CI/CD',
    riskLevel: 'MEDIUM',
    description: 'Repository manager for storing and proxying software artifacts (Maven JARs, npm packages, PyPI, Docker images).',
    whereToUse: 'Inbound on Nexus instances from Jenkins build workers, developer build tools (mvn, npm), and container deployment targets.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8081',
      recommendedSource: 'VPC CIDR (10.0.0.0/16) or sg-build-tools',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port   = 8081\n  to_port     = 8081\n  protocol    = "tcp"\n  cidr_blocks = ["10.0.0.0/16"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-nexus --protocol tcp --port 8081 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Attach Amazon EBS gp3 volumes or mount AWS EFS for persistent storage of binary artifacts. AWS native alternative: AWS CodeArtifact.',
    interviewTip: 'Using an in-VPC artifact repository like Nexus or AWS CodeArtifact significantly speeds up build pipelines by caching external npm/Maven dependencies.'
  },
  {
    id: 'port-8082',
    port: 8082,
    protocol: 'TCP',
    service: 'JFrog Artifactory',
    commonName: 'Artifactory Universal Repository',
    category: 'devops',
    categoryLabel: 'DevOps & CI/CD',
    riskLevel: 'MEDIUM',
    description: 'Universal artifact repository manager supporting container registries, Helm charts, and package managers.',
    whereToUse: 'Inbound from build automation pipelines inside internal VPC subnets.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8082',
      recommendedSource: 'VPC Subnets & CI/CD runner SGs',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port   = 8082\n  to_port     = 8082\n  protocol    = "tcp"\n  cidr_blocks = ["10.0.0.0/16"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-artifactory --protocol tcp --port 8082 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Backup Artifactory metadata to AWS RDS and store heavy binaries in Amazon S3 for unlimited durability and cost efficiency.',
    interviewTip: 'Artifactory Xray scans binary packages for known CVEs before deployment to production EKS clusters.'
  },

  // ==========================================
  // 5. CONTAINERS & KUBERNETES (K8s)
  // ==========================================
  {
    id: 'port-6443',
    port: 6443,
    protocol: 'TCP',
    service: 'Kubernetes API Server',
    commonName: 'kube-apiserver',
    category: 'k8s',
    categoryLabel: 'Containers & Kubernetes',
    riskLevel: 'CRITICAL',
    description: 'The core control plane component exposing the Kubernetes HTTP REST API. All administrative commands (kubectl) and node communications hit this port.',
    whereToUse: 'Inbound on Kubernetes master control plane nodes (or Amazon EKS cluster endpoint). Permitted for administrator bastion IPs, CI/CD runners, and worker node security groups.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '6443',
      recommendedSource: 'sg-eks-nodes (Worker Node SG) & Admin VPN CIDR',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 6443\n  to_port         = 6443\n  protocol        = "tcp"\n  security_groups = [aws_security_group.eks_nodes.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-eks-cluster --protocol tcp --port 6443 --source-group sg-eks-nodes'
    },
    architecturalGuidance: 'Amazon EKS Best Practice: Configure Cluster Endpoint Access to "Private Only" or "Public and Private with CIDR Whitelisting". Never leave EKS cluster endpoint open to 0.0.0.0/0.',
    interviewTip: 'Q: What communicates with port 6443 in Kubernetes? A: kubelet on worker nodes, kube-proxy, kube-scheduler, kube-controller-manager, and developers running kubectl.'
  },
  {
    id: 'port-2379',
    port: 2379,
    protocol: 'TCP',
    service: 'etcd Client API',
    commonName: 'etcd Key-Value Store Client Port',
    category: 'k8s',
    categoryLabel: 'Containers & Kubernetes',
    riskLevel: 'CRITICAL',
    description: 'Distributed reliable key-value store used as Kubernetes primary data backbone for cluster state and secrets.',
    whereToUse: 'Inbound strictly from Kubernetes Control Plane API servers (kube-apiserver). NEVER accessible to worker nodes, pods, or external networks.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '2379',
      recommendedSource: 'sg-k8s-master (Control Plane SG Only)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 2379\n  to_port         = 2379\n  protocol        = "tcp"\n  security_groups = [aws_security_group.k8s_masters.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-etcd --protocol tcp --port 2379 --source-group sg-k8s-masters'
    },
    architecturalGuidance: 'In managed Amazon EKS, AWS fully manages and protects etcd behind AWS-managed VPCs with automatic backups and multi-AZ redundancy. You do not manage port 2379 directly on EKS.',
    interviewTip: 'etcd holds all Kubernetes Secret resources in base64. Ensure envelope encryption with AWS KMS is enabled in EKS.'
  },
  {
    id: 'port-2380',
    port: 2380,
    protocol: 'TCP',
    service: 'etcd Peer Communication',
    commonName: 'etcd Server-to-Server Raft Sync',
    category: 'k8s',
    categoryLabel: 'Containers & Kubernetes',
    riskLevel: 'CRITICAL',
    description: 'Internal consensus and Raft protocol replication port between members of an etcd cluster.',
    whereToUse: 'Inbound strictly between etcd cluster master instances (Self-referencing SG).',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '2380',
      recommendedSource: 'sg-etcd (Self-referencing rule)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port = 2380\n  to_port   = 2380\n  protocol  = "tcp"\n  self      = true\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-etcd --protocol tcp --port 2380 --source-group sg-etcd'
    },
    architecturalGuidance: 'etcd requires mutual TLS (mTLS) with client and server certificates on ports 2379 and 2380.',
    interviewTip: 'etcd clusters must have an odd number of nodes (3 or 5) to maintain Raft consensus quorum and survive split-brain.'
  },
  {
    id: 'port-10250',
    port: 10250,
    protocol: 'TCP',
    service: 'Kubelet API',
    commonName: 'Node Kubelet Agent',
    category: 'k8s',
    categoryLabel: 'Containers & Kubernetes',
    riskLevel: 'HIGH',
    description: 'HTTPS API on each worker node enabling the control plane to inspect pod status, stream logs, and execute commands (kubectl exec/logs).',
    whereToUse: 'Inbound on worker node security groups from the EKS control plane security group (sg-eks-cluster).',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '10250',
      recommendedSource: 'sg-eks-cluster (EKS Control Plane SG)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 10250\n  to_port         = 10250\n  protocol        = "tcp"\n  security_groups = [aws_security_group.eks_cluster.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-eks-nodes --protocol tcp --port 10250 --source-group sg-eks-cluster'
    },
    architecturalGuidance: 'Ensure anonymous-auth is set to false on kubelet to prevent unauthenticated attackers from executing code inside containers on port 10250.',
    interviewTip: 'If kubectl logs or kubectl exec fails with "connection refused on port 10250", your worker node security group is missing ingress from the control plane security group.'
  },
  {
    id: 'port-30000-32767',
    port: '30000-32767',
    protocol: 'TCP',
    service: 'Kubernetes NodePort Range',
    commonName: 'K8s NodePort Services',
    category: 'k8s',
    categoryLabel: 'Containers & Kubernetes',
    riskLevel: 'MEDIUM',
    description: 'Default reserved port range for Kubernetes NodePort services exposing pods directly on worker node IPs.',
    whereToUse: 'Inbound on worker node security groups strictly from the Network Load Balancer (NLB) or Application Load Balancer (ALB) security group.',
    awsSecurityGroup: {
      type: 'Custom TCP Range',
      protocol: 'TCP',
      portRange: '30000 - 32767',
      recommendedSource: 'sg-nlb or sg-alb (Load Balancer Security Group)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 30000\n  to_port         = 32767\n  protocol        = "tcp"\n  security_groups = [aws_security_group.alb.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-eks-nodes --protocol tcp --port 30000-32767 --source-group sg-alb'
    },
    architecturalGuidance: 'Modern AWS Practice: Use the AWS Load Balancer Controller with IP target mode instead of NodePort mode. In IP target mode, the ALB routes traffic directly to Pod IPs via the AWS VPC CNI with no NodePort overhead.',
    interviewTip: 'NodePort vs ClusterIP vs LoadBalancer: ClusterIP is internal only; NodePort opens a high port on every worker node; LoadBalancer provisions an external cloud load balancer (ALB/NLB).'
  },
  {
    id: 'port-2375',
    port: 2375,
    protocol: 'TCP',
    service: 'Docker Daemon (Unencrypted)',
    commonName: 'Docker Remote API (Insecure)',
    category: 'k8s',
    categoryLabel: 'Containers & Kubernetes',
    riskLevel: 'CRITICAL',
    description: 'Unencrypted Docker Engine REST API socket.',
    whereToUse: 'CRITICALLY INSECURE ON NETWORKS. Never expose port 2375 to any network. Anyone with access to port 2375 has immediate unauthenticated root control of the underlying host.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '2375',
      recommendedSource: 'BLOCKED (Use local unix socket /var/run/docker.sock)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: '# NEVER OPEN PORT 2375 IN TERRAFORM',
      awsCliCommand: '# DO NOT OPEN PORT 2375'
    },
    architecturalGuidance: 'Docker crypto-mining worms continuously scan the internet for exposed port 2375 to take over instances. Use the local Unix socket (/var/run/docker.sock) or TLS on port 2376.',
    interviewTip: 'Exposing port 2375 is equivalent to giving root SSH access with no password.'
  },
  {
    id: 'port-2376',
    port: 2376,
    protocol: 'TCP',
    service: 'Docker Daemon (TLS Encrypted)',
    commonName: 'Docker Remote API over TLS',
    category: 'k8s',
    categoryLabel: 'Containers & Kubernetes',
    riskLevel: 'HIGH',
    description: 'Secure Docker REST API requiring mutual TLS (mTLS) client certificates.',
    whereToUse: 'Inbound on Docker Swarm manager nodes or remote build instances from authenticated CI/CD runners holding valid client certs.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '2376',
      recommendedSource: 'sg-ci-runners (Client TLS authenticated)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 2376\n  to_port         = 2376\n  protocol        = "tcp"\n  security_groups = [aws_security_group.ci_runners.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-docker --protocol tcp --port 2376 --source-group sg-ci-runners'
    },
    architecturalGuidance: 'Prefer container orchestration platforms like Amazon ECS or EKS where the daemon is managed without remote network API exposure.',
    interviewTip: 'Docker Swarm uses port 2377 for cluster management, 7946 for node discovery, and 4789 UDP for overlay networking.'
  },

  // ==========================================
  // 6. CLOUD STORAGE & FILE SHARES
  // ==========================================
  {
    id: 'port-2049',
    port: 2049,
    protocol: 'TCP/UDP',
    service: 'NFS / AWS EFS',
    commonName: 'Network File System / Elastic File System',
    category: 'storage',
    categoryLabel: 'Cloud Storage & Shares',
    riskLevel: 'HIGH',
    description: 'Protocol for mounting scalable shared network file systems simultaneously across multiple compute instances.',
    whereToUse: 'Inbound on AWS EFS Mount Target Security Groups from EC2 instances, ECS containers, or EKS worker nodes within the same VPC.',
    awsSecurityGroup: {
      type: 'NFS',
      protocol: 'TCP',
      portRange: '2049',
      recommendedSource: 'sg-ec2-clients or sg-eks-nodes (Client Compute SG)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port       = 2049\n  to_port         = 2049\n  protocol        = "tcp"\n  security_groups = [aws_security_group.eks_nodes.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-efs --protocol tcp --port 2049 --source-group sg-eks-nodes'
    },
    architecturalGuidance: 'Always create an EFS Mount Target in each Availability Zone where compute instances run. Mount EFS with encryption-in-transit enabled using the amazon-efs-utils tool (TLS wrapper on port 2049).',
    interviewTip: 'Q: How does EFS differ from EBS? A: EBS is a block device attached to a single EC2 instance in a single AZ. EFS is a POSIX shared file system mounted simultaneously by thousands of instances across multiple AZs on port 2049.'
  },
  {
    id: 'port-445',
    port: 445,
    protocol: 'TCP',
    service: 'SMB / CIFS / AWS FSx',
    commonName: 'Server Message Block / AWS FSx for Windows',
    category: 'storage',
    categoryLabel: 'Cloud Storage & Shares',
    riskLevel: 'CRITICAL',
    description: 'Microsoft Windows network file sharing and printer sharing protocol.',
    whereToUse: 'Inbound on Amazon FSx for Windows File Server or AWS Storage Gateway file shares from Windows EC2 instances joined to AWS Managed Active Directory.',
    awsSecurityGroup: {
      type: 'SMB',
      protocol: 'TCP',
      portRange: '445',
      recommendedSource: 'sg-windows-workstations (Internal VPC / Active Directory)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port   = 445\n  to_port     = 445\n  protocol    = "tcp"\n  cidr_blocks = ["10.0.0.0/16"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-fsx --protocol tcp --port 445 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Port 445 has been the target of notorious exploits (WannaCry, EternalBlue). Block port 445 completely at the internet gateway; only permit internal VPC traffic between domain-joined instances.',
    interviewTip: 'AWS FSx for Windows File Server provides native Windows NTFS support, shadow copies, and DFS namespaces over port 445.'
  },
  {
    id: 'port-21',
    port: 21,
    protocol: 'TCP',
    service: 'FTP (Control)',
    commonName: 'File Transfer Protocol',
    category: 'storage',
    categoryLabel: 'Cloud Storage & Shares',
    riskLevel: 'CRITICAL',
    description: 'Legacy unencrypted file transfer protocol command channel.',
    whereToUse: 'Legacy external vendor integrations. Modern standard: AWS Transfer Family for SFTP (Port 22) backed by Amazon S3 buckets.',
    awsSecurityGroup: {
      type: 'FTP',
      protocol: 'TCP',
      portRange: '21',
      recommendedSource: 'Specific Partner Static IP (/32) only',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port   = 21\n  to_port     = 21\n  protocol    = "tcp"\n  cidr_blocks = ["198.51.100.10/32"] # Partner IP only\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-ftp --protocol tcp --port 21 --cidr 198.51.100.10/32'
    },
    architecturalGuidance: 'FTP sends credentials in plaintext. Replace with AWS Transfer Family which supports SFTP (Port 22), FTPS (TLS Port 990), and AS2, mapping directly into Amazon S3.',
    interviewTip: 'FTP requires two ports: Port 21 for commands and Port 20 (or dynamic high ports) for data transfer.'
  },

  // ==========================================
  // 7. MONITORING & OBSERVABILITY
  // ==========================================
  {
    id: 'port-9090-prom',
    port: 9090,
    protocol: 'TCP',
    service: 'Prometheus Server',
    commonName: 'Prometheus Metrics Engine',
    category: 'monitoring',
    categoryLabel: 'Monitoring & Observability',
    riskLevel: 'MEDIUM',
    description: 'Web dashboard and PromQL HTTP query API for the Prometheus time-series metrics collection server.',
    whereToUse: 'Inbound on Prometheus EC2 or pod instances from Grafana data sources and DevOps monitoring workstations.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '9090',
      recommendedSource: 'sg-grafana (Grafana Security Group ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 9090\n  to_port         = 9090\n  protocol        = "tcp"\n  security_groups = [aws_security_group.grafana.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-prometheus --protocol tcp --port 9090 --source-group sg-grafana'
    },
    architecturalGuidance: 'AWS Native Managed Option: Amazon Managed Service for Prometheus (AMP), which provides high-availability serverless Prometheus storage with AWS SigV4 authentication.',
    interviewTip: 'Prometheus uses a pull model: it scrapes metric endpoints on target servers every N seconds over HTTP.'
  },
  {
    id: 'port-9100',
    port: 9100,
    protocol: 'TCP',
    service: 'Prometheus Node Exporter',
    commonName: 'Node Hardware & OS Exporter',
    category: 'monitoring',
    categoryLabel: 'Monitoring & Observability',
    riskLevel: 'MEDIUM',
    description: 'Exposes Linux host system metrics (CPU, memory, disk, network) in Prometheus format.',
    whereToUse: 'Inbound on all Linux EC2 instances strictly from the Prometheus Server Security Group (sg-prometheus).',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '9100',
      recommendedSource: 'sg-prometheus (Prometheus Scraper SG Only)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 9100\n  to_port         = 9100\n  protocol        = "tcp"\n  security_groups = [aws_security_group.prometheus.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-app-nodes --protocol tcp --port 9100 --source-group sg-prometheus'
    },
    architecturalGuidance: 'Node Exporter runs as a DaemonSet in Kubernetes to automatically collect metrics from every worker node in the cluster.',
    interviewTip: 'CloudWatch Agent is the AWS alternative for collecting system metrics and custom memory utilization from EC2.'
  },
  {
    id: 'port-3000-grafana',
    port: 3000,
    protocol: 'TCP',
    service: 'Grafana Dashboard',
    commonName: 'Grafana Visualization UI',
    category: 'monitoring',
    categoryLabel: 'Monitoring & Observability',
    riskLevel: 'MEDIUM',
    description: 'Web dashboard UI for querying and visualizing metrics from Prometheus, CloudWatch, Loki, and Elasticsearch.',
    whereToUse: 'Inbound on Grafana servers behind an Application Load Balancer with HTTPS (443) or restricted to corporate VPN.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '3000',
      recommendedSource: 'sg-alb (ALB Security Group) or VPN CIDR',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 3000\n  to_port         = 3000\n  protocol        = "tcp"\n  security_groups = [aws_security_group.alb.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-grafana --protocol tcp --port 3000 --source-group sg-alb'
    },
    architecturalGuidance: 'Amazon Managed Grafana (AMG) is a fully managed AWS service that eliminates self-hosting Grafana and integrates natively with AWS IAM Identity Center (SSO).',
    interviewTip: 'Grafana can query Amazon CloudWatch metrics natively via an attached IAM role (CloudWatchReadOnlyAccess).'
  },
  {
    id: 'port-3100',
    port: 3100,
    protocol: 'TCP',
    service: 'Grafana Loki',
    commonName: 'Loki Log Aggregation',
    category: 'monitoring',
    categoryLabel: 'Monitoring & Observability',
    riskLevel: 'MEDIUM',
    description: 'Horizontally scalable, multi-tenant log aggregation system inspired by Prometheus.',
    whereToUse: 'Inbound on Loki instances from Promtail/Fluentbit log collectors running across the fleet.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '3100',
      recommendedSource: 'sg-promtail (Log Forwarder SG) & sg-grafana',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port   = 3100\n  to_port     = 3100\n  protocol    = "tcp"\n  cidr_blocks = ["10.0.0.0/16"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-loki --protocol tcp --port 3100 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Loki stores log chunks in Amazon S3 and only indexes metadata labels, resulting in 90% cheaper storage compared to full-text Elasticsearch.',
    interviewTip: 'Loki uses LogQL syntax, making it intuitive for engineers already familiar with PromQL.'
  },
  {
    id: 'port-8200',
    port: 8200,
    protocol: 'TCP',
    service: 'HashiCorp Vault',
    commonName: 'Vault Secrets API',
    category: 'monitoring',
    categoryLabel: 'Monitoring & Observability',
    riskLevel: 'CRITICAL',
    description: 'Secrets management, identity-based access, and data encryption as a service.',
    whereToUse: 'Inbound on Vault cluster instances from applications requesting dynamic database credentials or encryption keys.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8200',
      recommendedSource: 'sg-app & sg-ci-runners (Private VPC Only)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: 'ingress {\n  from_port       = 8200\n  to_port         = 8200\n  protocol        = "tcp"\n  security_groups = [aws_security_group.app.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-vault --protocol tcp --port 8200 --source-group sg-app'
    },
    architecturalGuidance: 'Integrate Vault with AWS KMS for auto-unsealing and authenticate applications using AWS IAM instance profile roles.',
    interviewTip: 'AWS Secrets Manager and AWS SSM Parameter Store are the AWS-native alternatives to HashiCorp Vault.'
  },

  // ==========================================
  // 8. DNS & CORE NETWORKING
  // ==========================================
  {
    id: 'port-53',
    port: 53,
    protocol: 'TCP/UDP',
    service: 'DNS / Amazon Route 53',
    commonName: 'Domain Name System',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'SAFE',
    description: 'Translates human-readable domain names (example.com) into numerical IP addresses.',
    whereToUse: 'UDP/TCP port 53. Outbound on all VPC subnets to Amazon Route 53 Resolver (VPC IPv4 network range plus two - e.g., 10.0.0.2). Inbound on Route 53 Inbound Resolvers from on-premises networks over Direct Connect or VPN.',
    awsSecurityGroup: {
      type: 'DNS (UDP/TCP)',
      protocol: 'UDP & TCP',
      portRange: '53',
      recommendedSource: 'VPC CIDR (10.0.0.0/16) or On-Premises CIDR for Route 53 Resolvers',
      ruleDirection: 'Inbound / Outbound',
      ruleSeverity: 'SAFE',
      terraformSnippet: 'ingress {\n  from_port   = 53\n  to_port     = 53\n  protocol    = "udp"\n  cidr_blocks = ["10.0.0.0/16"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-dns --protocol udp --port 53 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Amazon Route 53 automatically handles public and private DNS without managing DNS servers. Route 53 Inbound and Outbound Resolvers bridge on-prem hybrid cloud DNS resolution.',
    interviewTip: 'DNS uses UDP for standard queries under 512 bytes, and falls back to TCP for large responses, DNSSEC, or zone transfers.'
  },
  {
    id: 'port-123',
    port: 123,
    protocol: 'UDP',
    service: 'NTP / Amazon Time Sync',
    commonName: 'Network Time Protocol',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'SAFE',
    description: 'Synchronizes computer clock time over packet-switched, variable-latency data networks.',
    whereToUse: 'Outbound on all EC2 instances to the Amazon Time Sync Service link-local IP (169.254.169.123) over UDP 123.',
    awsSecurityGroup: {
      type: 'Custom UDP',
      protocol: 'UDP',
      portRange: '123',
      recommendedSource: 'Link-local address (169.254.169.123)',
      ruleDirection: 'Outbound',
      ruleSeverity: 'SAFE',
      terraformSnippet: 'egress {\n  from_port   = 123\n  to_port     = 123\n  protocol    = "udp"\n  cidr_blocks = ["169.254.169.123/32"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-egress --group-id sg-ec2 --protocol udp --port 123 --cidr 169.254.169.123/32'
    },
    architecturalGuidance: 'Amazon Time Sync Service uses a fleet of redundant satellite-connected atomic clocks in each AWS Region to deliver microsecond-accurate time and automatically smooths leap seconds.',
    interviewTip: 'Accurate time sync is mandatory for AWS API requests (SigV4 fails if system clock drifts more than 5 minutes) and distributed databases like Cassandra and Spanner.'
  },
  {
    id: 'port-1194',
    port: 1194,
    protocol: 'UDP/TCP',
    service: 'OpenVPN',
    commonName: 'OpenVPN Tunnel Protocol',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'MEDIUM',
    description: 'Open-source commercial software implementing virtual private network (VPN) techniques for creating secure point-to-point connections.',
    whereToUse: 'Inbound on AWS Client VPN Endpoints or self-hosted OpenVPN Access Server EC2 instances from remote employees connecting to private VPC resources.',
    awsSecurityGroup: {
      type: 'Custom UDP',
      protocol: 'UDP',
      portRange: '1194',
      recommendedSource: '0.0.0.0/0 (with mutual certificate authentication enabled)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port   = 1194\n  to_port     = 1194\n  protocol    = "udp"\n  cidr_blocks = ["0.0.0.0/0"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-vpn --protocol udp --port 1194 --cidr 0.0.0.0/0'
    },
    architecturalGuidance: 'Prefer UDP 1194 over TCP for VPN connections to avoid TCP-over-TCP meltdown caused by retransmission contention.',
    interviewTip: 'AWS Client VPN is a managed OpenVPN-compatible client-based VPN service that scales automatically without managing EC2 instances.'
  },
  {
    id: 'port-500-4500',
    port: '500 / 4500',
    protocol: 'UDP',
    service: 'IPsec IKE & NAT-T',
    commonName: 'IPsec VPN Tunnels',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'MEDIUM',
    description: 'Port 500 (IKE - Internet Key Exchange) and Port 4500 (NAT Traversal) establish encrypted Site-to-Site VPN tunnels.',
    whereToUse: 'Inbound on AWS Virtual Private Gateway (VGW) or Transit Gateway (TGW) endpoints from on-premises corporate firewalls (Cisco, Palo Alto, Fortinet).',
    awsSecurityGroup: {
      type: 'Custom UDP',
      protocol: 'UDP',
      portRange: '500, 4500',
      recommendedSource: 'Customer Gateway Public IP (/32)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: '# AWS Site-to-Site VPN manages ports 500/4500 automatically on the VGW endpoint',
      awsCliCommand: 'aws ec2 create-vpn-connection --customer-gateway-id cgw-xxx --vpn-gateway-id vgw-xxx --type ipsec.1'
    },
    architecturalGuidance: 'AWS Site-to-Site VPN creates two active tunnels per connection for high availability. Use BGP dynamic routing on port 179 for automated failover.',
    interviewTip: 'NAT-T (Port 4500) encapsulates IPsec ESP packets inside UDP so they can safely pass through intermediate NAT routers.'
  },
  {
    id: 'port-25',
    port: 25,
    protocol: 'TCP',
    service: 'SMTP (Direct Mail)',
    commonName: 'Simple Mail Transfer Protocol',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'CRITICAL',
    description: 'Original direct mail delivery protocol between internet mail servers.',
    whereToUse: 'BLOCKED BY DEFAULT BY AWS ON ALL EC2 INSTANCES. Inbound/Outbound port 25 is actively throttled on AWS to prevent spam botnets.',
    awsSecurityGroup: {
      type: 'SMTP',
      protocol: 'TCP',
      portRange: '25',
      recommendedSource: 'BLOCKED BY AWS (Use Port 587 with Amazon SES)',
      ruleDirection: 'Outbound',
      ruleSeverity: 'CRITICAL',
      terraformSnippet: '# PORT 25 OUTBOUND IS BLOCKED BY DEFAULT ON EC2',
      awsCliCommand: '# Use AWS SES instead of direct Port 25'
    },
    architecturalGuidance: 'Never send emails directly from EC2 over port 25. Use Amazon Simple Email Service (Amazon SES) via Port 587 (TLS) or the AWS SDK HTTPS API.',
    interviewTip: 'To send mail over port 25 from EC2, you must submit a formal request to AWS Support to remove the port 25 throttle and provide reverse DNS.'
  },
  {
    id: 'port-587',
    port: 587,
    protocol: 'TCP',
    service: 'SMTP Submission (TLS)',
    commonName: 'Secure Email Relay / Amazon SES',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'SAFE',
    description: 'Modern standard port for submitting emails to an authenticated relay server with STARTTLS encryption.',
    whereToUse: 'Outbound from EC2, ECS, or Lambda to Amazon SES SMTP endpoints (e.g., email-smtp.us-east-1.amazonaws.com).',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '587',
      recommendedSource: 'Amazon SES Endpoint',
      ruleDirection: 'Outbound',
      ruleSeverity: 'SAFE',
      terraformSnippet: 'egress {\n  from_port   = 587\n  to_port     = 587\n  protocol    = "tcp"\n  cidr_blocks = ["0.0.0.0/0"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-egress --group-id sg-app --protocol tcp --port 587 --cidr 0.0.0.0/0'
    },
    architecturalGuidance: 'Configure DKIM, SPF, and DMARC DNS records in Route 53 to guarantee high email deliverability through Amazon SES.',
    interviewTip: 'Port 587 with STARTTLS is the industry standard for sending email from applications; Port 465 is the legacy SMTPS port.'
  },
  {
    id: 'port-389',
    port: 389,
    protocol: 'TCP/UDP',
    service: 'LDAP',
    commonName: 'Lightweight Directory Access Protocol',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'HIGH',
    description: 'Directory service queries for user credentials and enterprise directory information in plaintext.',
    whereToUse: 'Inbound within private VPC subnets to AWS Directory Service or Active Directory domain controllers. Use LDAPS (Port 636) whenever possible.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '389',
      recommendedSource: 'VPC CIDR (10.0.0.0/16)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'HIGH',
      terraformSnippet: 'ingress {\n  from_port   = 389\n  to_port     = 389\n  protocol    = "tcp"\n  cidr_blocks = ["10.0.0.0/16"]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-directory --protocol tcp --port 389 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Never expose port 389 to public subnets. Prefer LDAPS (636) with TLS or AWS IAM Identity Center (SAML 2.0 / OIDC) for modern cloud SSO.',
    interviewTip: 'AWS Directory Service provides Managed Microsoft AD, Simple AD, and AD Connector.'
  },
  {
    id: 'port-636',
    port: 636,
    protocol: 'TCP',
    service: 'LDAPS',
    commonName: 'LDAP over SSL/TLS',
    category: 'network',
    categoryLabel: 'DNS & Core Infrastructure',
    riskLevel: 'MEDIUM',
    description: 'Encrypted directory queries protecting user authentication credentials.',
    whereToUse: 'Inbound on AWS Directory Service or enterprise identity servers from Linux/Windows application tiers.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '636',
      recommendedSource: 'sg-app (Application Security Group ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 636\n  to_port         = 636\n  protocol        = "tcp"\n  security_groups = [aws_security_group.app.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-directory --protocol tcp --port 636 --source-group sg-app'
    },
    architecturalGuidance: 'Enforce client certificate verification and enable client-side caching of directory queries to prevent throttling.',
    interviewTip: 'LDAPS requires a trusted CA certificate installed on both the directory server and the calling client.'
  },

  // ==========================================
  // 9. APPLICATION & MICROSERVICES
  // ==========================================
  {
    id: 'port-3000-node',
    port: 3000,
    protocol: 'TCP',
    service: 'Node.js / Express / Next.js',
    commonName: 'Node.js Web Server',
    category: 'app',
    categoryLabel: 'Application & Microservices',
    riskLevel: 'MEDIUM',
    description: 'Standard development and container port for Node.js, Express, Next.js, and React applications.',
    whereToUse: 'Inbound on ECS Task containers, EC2 instances, or Kubernetes pods from the Application Load Balancer (ALB) Security Group.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '3000',
      recommendedSource: 'sg-alb (ALB Security Group ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 3000\n  to_port         = 3000\n  protocol        = "tcp"\n  security_groups = [aws_security_group.alb.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-nodejs-app --protocol tcp --port 3000 --source-group sg-alb'
    },
    architecturalGuidance: 'Do not expose Node.js directly to the internet; place it behind an AWS ALB or CloudFront CDN with AWS WAF enabled.',
    interviewTip: 'In ECS Fargate, set the target group target type to "ip" and point to container port 3000.'
  },
  {
    id: 'port-4200',
    port: 4200,
    protocol: 'TCP',
    service: 'Angular Dev Server',
    commonName: 'Angular CLI ng serve',
    category: 'app',
    categoryLabel: 'Application & Microservices',
    riskLevel: 'LOW',
    description: 'Default local development port used by Angular CLI (ng serve).',
    whereToUse: 'Local development and staging test containers. For production, Angular is compiled (ng build) to static HTML/CSS/JS and served via Amazon S3 + CloudFront (Port 443), with NO port 4200 needed in production.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '4200',
      recommendedSource: 'Developer localhost or Dev VPN',
      ruleDirection: 'Inbound',
      ruleSeverity: 'SAFE',
      terraformSnippet: '# PRODUCTION ANGULAR USES S3 + CLOUDFRONT (PORT 443), NOT PORT 4200',
      awsCliCommand: '# Dev only: aws ec2 authorize-security-group-ingress --group-id sg-dev --protocol tcp --port 4200 --cidr 10.0.0.0/16'
    },
    architecturalGuidance: 'Production Best Practice: Build Angular with "ng build --configuration production", upload artifacts to a private Amazon S3 bucket, and distribute globally via CloudFront with OAC (Origin Access Control).',
    interviewTip: 'Q: How do you deploy an Angular single-page app on AWS? A: Host static assets in S3 with CloudFront CDN and route /api/* requests to an Application Load Balancer.'
  },
  {
    id: 'port-5000',
    port: 5000,
    protocol: 'TCP',
    service: 'Python Flask / .NET Core',
    commonName: 'Flask / .NET Kestrel Port',
    category: 'app',
    categoryLabel: 'Application & Microservices',
    riskLevel: 'MEDIUM',
    description: 'Default port for Python Flask development server and ASP.NET Core Kestrel HTTP web server.',
    whereToUse: 'Inbound on container tasks from internal reverse proxies (Nginx/Envoy) or ALB target groups.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '5000',
      recommendedSource: 'sg-alb (ALB Security Group ID)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 5000\n  to_port         = 5000\n  protocol        = "tcp"\n  security_groups = [aws_security_group.alb.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-flask --protocol tcp --port 5000 --source-group sg-alb'
    },
    architecturalGuidance: 'Flask development server is single-threaded; run with Gunicorn or uWSGI behind an ALB in production.',
    interviewTip: 'Use environment variables (PORT=5000) so Docker containers can dynamically bind to ports assigned by orchestrators.'
  },
  {
    id: 'port-8000',
    port: 8000,
    protocol: 'TCP',
    service: 'Python Django / FastAPI',
    commonName: 'Django Runserver / Uvicorn',
    category: 'app',
    categoryLabel: 'Application & Microservices',
    riskLevel: 'MEDIUM',
    description: 'Standard port for Django development server, FastAPI/Uvicorn, and alternative microservices.',
    whereToUse: 'Inbound on Python container instances behind ALB or API Gateway HTTP Integrations.',
    awsSecurityGroup: {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8000',
      recommendedSource: 'sg-alb (Application Load Balancer SG)',
      ruleDirection: 'Inbound',
      ruleSeverity: 'MEDIUM',
      terraformSnippet: 'ingress {\n  from_port       = 8000\n  to_port         = 8000\n  protocol        = "tcp"\n  security_groups = [aws_security_group.alb.id]\n}',
      awsCliCommand: 'aws ec2 authorize-security-group-ingress --group-id sg-fastapi --protocol tcp --port 8000 --source-group sg-alb'
    },
    architecturalGuidance: 'FastAPI with Uvicorn worker processes on port 8000 provides high-throughput async processing for AI/ML inference microservices.',
    interviewTip: 'FastAPI automatically generates interactive Swagger API documentation at /docs on port 8000.'
  }
];

export const SECURITY_GROUP_RULES_GUIDE = [
  {
    title: 'Security Group Chaining (Reference by ID)',
    badge: 'Core Architectural Rule',
    description: 'Never hardcode private IP addresses when allowing traffic between tiers. Instead of specifying a CIDR block (like 10.0.1.50/32), reference the Security Group ID of the calling tier directly (e.g. source = sg-alb). This allows Auto Scaling groups to expand and contract dynamically without updating firewall rules.'
  },
  {
    title: 'Stateful Security Groups vs Stateless NACLs',
    badge: 'AWS Exam & Production Essential',
    description: 'Security Groups are STATEFUL: if you permit inbound traffic on port 443, the response traffic is automatically allowed outbound regardless of outbound rules. Network ACLs (NACLs) are STATELESS: you must explicitly open ephemeral return ports (1024-65535) for response packets to travel back.'
  },
  {
    title: 'Principle of Least Privilege',
    badge: 'Zero-Trust Security',
    description: 'Never use 0.0.0.0/0 for administrative or database ports (22, 3389, 3306, 5432). Public exposure should strictly be limited to Port 443 (HTTPS) and Port 80 (Redirect only) on internet-facing load balancers.'
  },
  {
    title: 'Eliminate Port 22 with AWS SSM Session Manager',
    badge: 'Modern Cloud Standard',
    description: 'Traditional bastion hosts require port 22 open to the internet and managing SSH key pairs. AWS Systems Manager (SSM) Session Manager replaces port 22 entirely: it uses outbound HTTPS over AWS private network, requires zero open inbound security group rules, and logs all keystrokes to CloudWatch.'
  }
];
