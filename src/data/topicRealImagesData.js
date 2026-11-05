// Real AWS Console Screenshots, Physical Architecture Diagrams & Practical Walkthrough Images
// Extracted directly from official course guides and production AWS Management Consoles.
// All images are stored as high-resolution PNGs in /images/aws-account/ and /images/aws-vpc/

export const TOPIC_REAL_VISUALS = {
  // =========================================================================
  // MODULE 1 - TOPIC 1: AWS Account Creation, Root Security & IAM Best Practices
  // =========================================================================
  'aws-account-creation-root-security-iam': {
    primaryArchitectureImage: '/images/aws-account/16-root-mfa-security-checklist.png',
    primaryArchitectureTitle: 'AWS Root Security Posture & Virtual MFA Hardening Flow',
    primaryArchitectureCaption: 'Actual security guidelines for root account protection, multi-factor authentication, and IAM administrator isolation.',
    gallery: [
      {
        id: 'acc-step-1',
        stepNumber: 1,
        title: 'AWS Free Tier Signup Portal',
        badge: 'AWS Free Tier Portal',
        imageUrl: '/images/aws-account/01-free-tier-signup-portal.png',
        description: 'The official AWS Free Tier landing page offering 12 Months Free (EC2, S3, RDS), Always Free (Lambda, DynamoDB), and short-term Trials.',
        keyPoints: [
          'Navigate to aws.amazon.com/free to ensure eligibility for Free Tier offerings.',
          'Identify the 3 distinct free tier types: Free Trials, 12 Months Free, and Always Free.',
          'Click "Create an AWS Account" to initiate the identity registration sequence.'
        ]
      },
      {
        id: 'acc-step-2',
        stepNumber: 2,
        title: 'Root User Email & Account Name Configuration',
        badge: 'Root Credentials',
        imageUrl: '/images/aws-account/02-root-email-account-name.png',
        description: 'Specifying the Root User email address and unique AWS Account Name. This email possesses ultimate administrative authority over billing and tenancy.',
        keyPoints: [
          'Use a dedicated corporate or personal Gmail address that you permanently control.',
          'Never use shared or temporary emails, as root access recovery depends solely on this inbox.',
          'Choose a descriptive AWS Account Name (e.g. devops-learning-lab).'
        ]
      },
      {
        id: 'acc-step-3',
        stepNumber: 3,
        title: 'Root Email Identity Verification',
        badge: 'Email Verification',
        imageUrl: '/images/aws-account/03-email-verification-code.png',
        description: 'AWS dispatches a 6-digit cryptographic verification code to the root email address to guarantee mailbox ownership before account allocation.',
        keyPoints: [
          'Check inbox and spam folders for the subject "AWS Email Verification".',
          'Code expires within 10 minutes; enter digits promptly and click "Verify".',
          'Prevents typos that could lock administrators out of their new cloud tenant.'
        ]
      },
      {
        id: 'acc-step-4',
        stepNumber: 4,
        title: 'Root Password Creation & Complexity Enforcement',
        badge: 'Password Hardening',
        imageUrl: '/images/aws-account/04-root-password-creation.png',
        description: 'Creating a high-entropy master password for the Root User meeting enterprise complexity constraints.',
        keyPoints: [
          'Must be at least 8 characters (enterprise best practice: 20+ characters in a password manager).',
          'Must include uppercase letters, lowercase letters, numbers, and special symbols (!@#$%^&*).',
          'Store securely in an encrypted vault (1Password, Bitwarden) — never write down in plaintext.'
        ]
      },
      {
        id: 'acc-step-5',
        stepNumber: 5,
        title: 'Contact Information & Account Type Selection',
        badge: 'Contact Details',
        imageUrl: '/images/aws-account/06-contact-information-form.png',
        description: 'Selecting "Personal" for learning purposes and providing verified legal contact details for AWS compliance.',
        keyPoints: [
          'Select "Personal - for your own projects" to streamline free tier verification.',
          'Provide accurate international phone number, country, and postal address.',
          'Accept the AWS Customer Agreement terms of service.'
        ]
      },
      {
        id: 'acc-step-6',
        stepNumber: 6,
        title: 'Payment Method Validation & Identity Hold',
        badge: 'Payment Hold',
        imageUrl: '/images/aws-account/07-payment-card-validation.png',
        description: 'Submitting a credit or debit card for identity verification. AWS performs a temporary authorization hold (~₹2 / $1 USD) that is automatically refunded.',
        keyPoints: [
          'Card must have International and Online e-commerce transactions enabled in banking settings.',
          'Hold charge (~₹2 in India, $1 USD globally) validates cardholder legitimacy to deter abusive bot accounts.',
          'No additional fees will occur as long as usage remains within Free Tier thresholds.'
        ]
      },
      {
        id: 'acc-step-7',
        stepNumber: 7,
        title: 'SMS OTP Identity Verification',
        badge: 'Phone OTP',
        imageUrl: '/images/aws-account/09-phone-sms-otp-verification.png',
        description: 'Two-factor phone identity verification sending a 4-digit SMS OTP to prevent automated cloud account hoarding.',
        keyPoints: [
          'Select country code carefully and ensure carrier DND filters are not blocking enterprise transactional SMS.',
          'Solve the visual security captcha and click "Send SMS".',
          'Submit the received 4-digit numeric token on the following screen.'
        ]
      },
      {
        id: 'acc-step-8',
        stepNumber: 8,
        title: 'Basic Support Plan Selection ($0 / Free)',
        badge: 'Support Plan',
        imageUrl: '/images/aws-account/11-support-plan-basic-free.png',
        description: 'Selecting the Basic Support tier ($0/month) offering 24/7 access to customer service, documentation, and core Trusted Advisor checks.',
        keyPoints: [
          'Always select "Basic Support - Free" ($0/month); avoid Developer ($29/mo) or Business ($100/mo) unless company-sponsored.',
          'Provides 24x7 customer support for account, billing, and accidental charge refund inquiries.',
          'Access to 7 core AWS Trusted Advisor security and performance checks.'
        ]
      },
      {
        id: 'acc-step-9',
        stepNumber: 9,
        title: 'AWS Console Root User Sign-In',
        badge: 'Console Login',
        imageUrl: '/images/aws-account/13-console-signin-root-user.png',
        description: 'Initial authentication into the AWS Management Console as Root User to perform mandatory security hardening.',
        keyPoints: [
          'Select "Root user" radio button on the AWS sign-in screen.',
          'Enter the verified root email address followed by the master password.',
          'Immediate prerequisite after first login: Navigate directly to IAM to activate MFA.'
        ]
      },
      {
        id: 'acc-step-10',
        stepNumber: 10,
        title: 'AWS Management Console Landing Dashboard',
        badge: 'Console Home',
        imageUrl: '/images/aws-account/15-aws-management-console-home.png',
        description: 'The authenticated AWS Console landing home showing Region selector, Search bar, and AWS CloudShell terminal access.',
        keyPoints: [
          'Region selector (top-right) shows active geographic cluster (e.g. N. Virginia us-east-1).',
          'Search bar allows rapid keyboard jumping to IAM, VPC, EC2, Budgets, and Billing services.',
          'Click the terminal icon to launch AWS CloudShell with pre-authenticated AWS CLI v2.'
        ]
      },
      {
        id: 'acc-step-11',
        stepNumber: 11,
        title: 'Root Virtual MFA Security Checklist & Setup',
        badge: 'Root MFA Checklist',
        imageUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
        description: 'Hardening the root account by attaching a virtual authenticator (Google Authenticator, Microsoft Authenticator) and deleting root API keys.',
        keyPoints: [
          'Top Priority: Never use root account for daily development or CLI tasks.',
          'Scan the IAM MFA QR code using Google Authenticator and enter two consecutive 6-digit TOTP codes.',
          'Verify that ZERO active root access keys exist in IAM Security Credentials.',
          'Create an individual IAM user with AdministratorAccess for day-to-day work.'
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 1 - TOPIC 2: Accidental Charges, Cost Explorer & Support Refunds
  // =========================================================================
  'accidental-charges-cost-explorer-support-refunds': {
    primaryArchitectureImage: '/images/aws-account/18-aws-budgets-and-alarms-guide.png',
    primaryArchitectureTitle: 'AWS Budgets, Zero-Spend Guardrails & Billing Alarm Architecture',
    primaryArchitectureCaption: 'Real-time billing safeguards preventing unexpected charges through CloudWatch metric alarms and AWS Budgets email alerts.',
    gallery: [
      {
        id: 'finops-1',
        stepNumber: 1,
        title: 'AWS Free Tier Usage Alerts & Monitoring Dashboard',
        badge: 'Free Tier Dashboard',
        imageUrl: '/images/aws-account/17-free-tier-usage-dashboard.png',
        description: 'AWS Billing console tracking actual monthly usage against Free Tier allowances (750 EC2 hours, 5 GB S3, 30 GB EBS).',
        keyPoints: [
          'Shows percentage consumed of 750 monthly t2.micro/t3.micro compute hours.',
          'Enable "Receive Free Tier Usage Alerts" to receive email when approaching 85% of allowances.',
          'Check monthly to prevent accidental billing rollovers after the 12-month promotional period.'
        ]
      },
      {
        id: 'finops-2',
        stepNumber: 2,
        title: 'Configuring AWS Budgets & Zero-Spend Alerts ($0.01)',
        badge: 'Zero-Spend Alarm',
        imageUrl: '/images/aws-account/18-aws-budgets-and-alarms-guide.png',
        description: 'Step-by-step setup of proactive cost guardrails in AWS Budgets, triggering alerts the moment spend reaches $0.01.',
        keyPoints: [
          'Create a Cost Budget with Monthly cadence and fixed amount of $1.00 or $5.00.',
          'Set alert threshold to 80% forecasted spend and 100% actual spend.',
          'Add email addresses and Amazon SNS topic ARN for instant mobile/Slack notifications.'
        ]
      },
      {
        id: 'finops-3',
        stepNumber: 3,
        title: 'Idle Resources Cleanup & Courtesy Refund Protocol',
        badge: 'Refund & Cleanup',
        imageUrl: '/images/aws-account/19-delete-idle-resources-guide.png',
        description: 'Auditing hidden cost drivers (unattached Elastic IPs, orphaned EBS volumes, running NAT Gateways) and filing goodwill refund tickets.',
        keyPoints: [
          'Unattached Elastic IPs cost $0.005/hour; release them immediately when not linked to running instances.',
          'NAT Gateways incur ~$0.045/hour plus data processing fees; delete NAT Gateways when labs conclude.',
          'If accidental charges occur, open an AWS Support Case under "Account and billing" -> "Billing" requesting a courtesy educational waiver.'
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 1 - TOPIC 3: AWS Global Infrastructure
  // =========================================================================
  'regions-azs-and-edge-infrastructure': {
    primaryArchitectureImage: '/images/aws-vpc/01-default-vpc-architecture.png',
    primaryArchitectureTitle: 'AWS Multi-AZ Regional Infrastructure & High Availability Topology',
    primaryArchitectureCaption: 'How AWS builds isolated Availability Zones connected via dedicated redundant fiber backbones within each Region.',
    gallery: [
      {
        id: 'infra-1',
        stepNumber: 1,
        title: 'AWS Regional Console & Global Points of Presence',
        badge: 'Regional Switcher',
        imageUrl: '/images/aws-account/15-aws-management-console-home.png',
        description: 'Geographic region selection in the AWS Console, showing physical separation of data center clusters worldwide.',
        keyPoints: [
          'AWS Regions are geographically distinct areas (e.g. us-east-1 N. Virginia, eu-west-1 Ireland, ap-south-1 Mumbai).',
          'Each Region contains at least 3 isolated Availability Zones (AZs) connected with ultra-low latency fiber.',
          'Global services (IAM, Route 53, CloudFront) operate globally; regional services (VPC, EC2, RDS) exist inside a specific Region.'
        ]
      },
      {
        id: 'infra-2',
        stepNumber: 2,
        title: 'Multi-AZ Subnet Partitioning & Fault Domain Isolation',
        badge: 'Multi-AZ Design',
        imageUrl: '/images/aws-vpc/01-default-vpc-architecture.png',
        description: 'VPC topology demonstrating how workloads achieve high availability by placing independent subnets in multiple Availability Zones.',
        keyPoints: [
          'If an entire physical data center loses utility power or flood protection, standby AZs continue operations seamlessly.',
          'Availability Zone names (e.g. us-east-1a) are randomly mapped per account; Zone IDs (e.g. use1-az1) are physically fixed.',
          'Deploying Multi-AZ databases and load-balanced compute tiers guarantees 99.99% cloud uptime SLA.'
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 3 - TOPIC 1: VPC Subnetting, Gateways & Packet Flow
  // =========================================================================
  'vpc-subnetting-gateways-packet-flow': {
    primaryArchitectureImage: '/images/aws-vpc/02-custom-vpc-architecture.png',
    primaryArchitectureTitle: 'Custom Production VPC Architecture vs Default VPC',
    primaryArchitectureCaption: 'Detailed network layout comparing automatic Default VPC routing against isolated Custom 3-Tier VPC subnetting.',
    gallery: [
      {
        id: 'vpc-1',
        stepNumber: 1,
        title: 'Default VPC Architecture Diagram',
        badge: 'Default VPC',
        imageUrl: '/images/aws-vpc/01-default-vpc-architecture.png',
        description: 'The pre-configured Default VPC (172.31.0.0/16) created automatically in every region with attached Internet Gateway and public subnets.',
        keyPoints: [
          'CIDR block 172.31.0.0/16 with /20 public subnets in each Availability Zone.',
          'Includes an attached Internet Gateway (IGW) and default route 0.0.0.0/0 -> IGW.',
          'Every launched EC2 instance automatically receives a Public IPv4 address; unsuitable for secure production databases.'
        ]
      },
      {
        id: 'vpc-2',
        stepNumber: 2,
        title: 'Custom Production VPC Architecture Diagram',
        badge: 'Custom VPC',
        imageUrl: '/images/aws-vpc/02-custom-vpc-architecture.png',
        description: 'Enterprise Custom VPC (10.0.0.0/16) partitioned into isolated Public, Private Application, and Private Database subnets.',
        keyPoints: [
          'No default Internet Gateway or internet routes; maximum security isolation.',
          'Public subnets host Load Balancers and NAT Gateways; backend databases remain completely inaccessible from the internet.',
          'Default quota allows 5 VPCs per region (can be increased via Service Quotas).'
        ]
      },
      {
        id: 'vpc-3',
        stepNumber: 3,
        title: 'VPC CIDR Subnet Partitioning & Routing Topology',
        badge: 'CIDR Subnetting',
        imageUrl: '/images/aws-vpc/03-vpc-cidr-subnet-topology.png',
        description: 'Subnet topology showing CIDR allocation (192.168.0.0/16 partitioned into 192.168.10.0/24 and 192.168.15.0/24).',
        keyPoints: [
          'A subnet resides entirely within a single physical Availability Zone.',
          'AWS reserves 5 IP addresses per subnet (.0 network, .1 router, .2 DNS, .3 future use, .255 broadcast).',
          'Route Tables inspect destination IP and forward to local VPC router or Internet Gateway.'
        ]
      },
      {
        id: 'vpc-4',
        stepNumber: 4,
        title: 'Bastion Host Jump Server Network Architecture',
        badge: 'Bastion Jump Server',
        imageUrl: '/images/aws-vpc/04-bastion-host-network-flow.png',
        description: 'Secure SSH jump host in the Public Subnet enabling administrators to reach private EC2 instances without exposing them publicly.',
        keyPoints: [
          'Bastion host receives an Elastic IP and allows SSH (Port 22) from corporate office IP only.',
          'Admin establishes SSH tunnel to bastion, then jumps to private subnet instance via private IP (10.0.2.x).',
          'Eliminates direct internet exposure for production database and application nodes.'
        ]
      },
      {
        id: 'vpc-5',
        stepNumber: 5,
        title: 'Amazon VPC Regional Limits & Service Quotas Reference',
        badge: 'VPC Limits Guide',
        imageUrl: '/images/aws-vpc/13-vpc-limits-reference-guide.png',
        description: 'Official AWS VPC service limits: 5 VPCs per region, 200 subnets, 5 Elastic IPs, 5 IGWs, 5 NAT GWs per AZ, 200 route tables.',
        keyPoints: [
          'Subnets per region: 200; Elastic IPs: 5; Internet Gateways: 5.',
          'Security Groups per region: 2,500; Rules per Security Group: 60 inbound/outbound.',
          'Active VPC Peering connections: 50; Transit Gateways per VPC: 5. All adjustable via AWS Support request.'
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 3 - TOPIC 2: VPC Security Architecture & Flow Logs
  // =========================================================================
  'vpc-security-groups-nacls-firewall-flow-logs': {
    primaryArchitectureImage: '/images/aws-vpc/08-security-groups-vs-nacls.png',
    primaryArchitectureTitle: 'Layered VPC Defense: Stateful Security Groups vs Stateless NACLs',
    primaryArchitectureCaption: 'Dual-tier firewall model comparing subnet-level stateless rule numbers with instance-level stateful connection tracking.',
    gallery: [
      {
        id: 'sec-1',
        stepNumber: 1,
        title: 'Security Groups vs Network ACLs (NACLs) Architecture',
        badge: 'Stateful vs Stateless',
        imageUrl: '/images/aws-vpc/08-security-groups-vs-nacls.png',
        description: 'Visual comparison of Security Groups operating at the Elastic Network Interface (ENI) level vs NACLs operating at the Subnet boundary.',
        keyPoints: [
          'Security Groups: Stateful — return traffic automatically permitted; support ONLY ALLOW rules; evaluate all rules before decision.',
          'Network ACLs: Stateless — return traffic requires explicit outbound rule on ephemeral ports (1024-65535); support ALLOW and DENY.',
          'NACL rules process in strict numerical order (lowest rule number wins, e.g. Rule 100 before Rule 200).'
        ]
      },
      {
        id: 'sec-2',
        stepNumber: 2,
        title: 'VPC Flow Logs Architecture & Telemetry Pipeline',
        badge: 'VPC Flow Logs',
        imageUrl: '/images/aws-vpc/05-vpc-flow-logs-architecture.png',
        description: 'Flow log capture pipeline collecting IP traffic metadata from VPCs, Subnets, and ENIs, streaming to Amazon CloudWatch Logs and S3.',
        keyPoints: [
          'Captures source IP, destination IP, source port, destination port, protocol, packets, bytes, and action (ACCEPT / REJECT).',
          'Collected out-of-band without degrading network throughput or instance CPU.',
          'Essential forensic tool for debugging blocked connections and detecting port scan attacks.'
        ]
      },
      {
        id: 'sec-3',
        stepNumber: 3,
        title: 'AWS Network Firewall & Inspection Topology',
        badge: 'Network Firewall',
        imageUrl: '/images/aws-vpc/09-network-firewall-single-vpn.png',
        description: 'Deploying managed stateful network inspection endpoints to filter outbound domain traffic and enforce Suricata IPS rules.',
        keyPoints: [
          'Enforces stateful URL and domain whitelist/blacklist filtering (e.g. block unauthorized crypto mining or exfiltration).',
          'Supports 50+ Gbps throughput per Availability Zone with automated scaling.',
          'Inspects VPC ingress, egress, and east-west inter-subnet communication.'
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 3 - TOPIC 3: Hybrid Connectivity & Advanced Routing
  // =========================================================================
  'vpc-peering-transit-gateway-endpoints-vpn': {
    primaryArchitectureImage: '/images/aws-vpc/12-transit-gateway-hub-and-spoke.png',
    primaryArchitectureTitle: 'AWS Transit Gateway (TGW) Regional Hub-and-Spoke Topology',
    primaryArchitectureCaption: 'Centralized cloud router interconnecting multi-tier VPCs, partner accounts, and on-premises data centers.',
    gallery: [
      {
        id: 'hybrid-1',
        stepNumber: 1,
        title: 'VPC Peering Connection Network Topology',
        badge: 'VPC Peering',
        imageUrl: '/images/aws-vpc/07-vpc-peering-topology.png',
        description: 'Point-to-point private optical connection between two VPCs. Zero bandwidth bottlenecks and encrypted AWS private fiber routing.',
        keyPoints: [
          'VPC Peering is non-transitive: If VPC A peers with B, and B peers with C, VPC A CANNOT reach VPC C through B.',
          'CIDR blocks must never overlap between peered VPCs.',
          'Ideal for high-throughput 1-to-1 links; becomes difficult to manage at scale (requires N*(N-1)/2 mesh connections).'
        ]
      },
      {
        id: 'hybrid-2',
        stepNumber: 2,
        title: 'VPC Endpoints & AWS PrivateLink Architecture',
        badge: 'VPC Endpoints',
        imageUrl: '/images/aws-vpc/06-vpc-endpoints-services.png',
        description: 'Private endpoints allowing EC2 instances to communicate with Amazon S3, DynamoDB, and Systems Manager without internet access.',
        keyPoints: [
          'Gateway Endpoints (Free): Attached to VPC Route Tables for Amazon S3 and DynamoDB.',
          'Interface Endpoints (PrivateLink): Creates private Elastic Network Interfaces (ENIs) with private IPs for AWS API services.',
          'Drastically cuts NAT Gateway data processing costs and enhances compliance.'
        ]
      },
      {
        id: 'hybrid-3',
        stepNumber: 3,
        title: 'Site-to-Site VPN Dual-Tunnel Redundant Architecture',
        badge: 'IPsec Dual-Tunnel',
        imageUrl: '/images/aws-vpc/10-multiple-vpn-redundant-tunnels.png',
        description: 'Connecting on-premises Customer Gateway (CGW) to AWS Virtual Private Gateway (VGW) using two redundant IPsec tunnels.',
        keyPoints: [
          'Every AWS Site-to-Site VPN automatically deploys 2 independent tunnels across separate AZs.',
          'BGP dynamic routing or static routes ensure automatic failover if Tunnel 1 experiences connectivity loss.',
          'Data in transit is protected by AES-256 encryption and SHA-256 HMAC integrity.'
        ]
      },
      {
        id: 'hybrid-4',
        stepNumber: 4,
        title: 'VPN Tunnel Automatic Failover Mechanism',
        badge: 'Tunnel Failover',
        imageUrl: '/images/aws-vpc/11-vpn-tunnel-failover.png',
        description: 'Resiliency architecture showing how dynamic routing redirects traffic to Tunnel 2 within seconds during maintenance.',
        keyPoints: [
          'Configured with dual BGP sessions for automated keepalive and route flap prevention.',
          'Zero application packet loss during AWS infrastructure updates or link maintenance.',
          'Can be combined with AWS Direct Connect (DX) for hybrid dedicated 10Gbps/100Gbps connectivity.'
        ]
      },
      {
        id: 'hybrid-5',
        stepNumber: 5,
        title: 'AWS Transit Gateway (TGW) Central Hub Architecture',
        badge: 'Transit Gateway',
        imageUrl: '/images/aws-vpc/12-transit-gateway-hub-and-spoke.png',
        description: 'Hub-and-spoke cloud routing engine replacing complex peering meshes with a single centralized gateway router.',
        keyPoints: [
          'Acts as a virtual router supporting up to 5,000 VPC attachments and on-prem VPN/Direct Connect links.',
          'Supports transitive routing between attached VPCs via Transit Gateway Route Tables.',
          'Simplifies enterprise security isolation by segregating Prod, Dev, and Shared-Services route domains.'
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 17: Jenkins - CI/CD Automation
  // =========================================================================
  "jenkins-architecture-master-agents": {
    primaryArchitectureImage: "/images/jenkins/02-jenkins-core-architecture.png",
    primaryArchitectureTitle: "Jenkins Controller-Agent Distributed Architecture",
    primaryArchitectureCaption: "Official architecture diagram illustrating Master-Agent orchestration, build executors, and TCP/JNLP remoting.",
    gallery: [
      {
        id: "jenkins-1-1",
        stepNumber: 1,
        title: "Jenkins Core Architecture & Terminology",
        badge: "Core Architecture",
        imageUrl: "/images/jenkins/02-jenkins-core-architecture.png",
        description: "Controller (Master) manages scheduling, job configurations, user identity, and UI, while distributed Agents execute build jobs.",
        keyPoints: [
          "Controller handles build scheduling, pipeline orchestration, plugin execution, and web UI.",
          "Agents (Static or Cloud-native) run build workloads isolated from controller disk.",
          "Communication occurs over bi-directional JNLP / WebSockets or secure SSH protocol."
        ]
      },
      {
        id: "jenkins-1-2",
        stepNumber: 2,
        title: "Initial Setup, Unlock Wizard & Security Secret",
        badge: "Setup & Unlock",
        imageUrl: "/images/jenkins/03-jenkins-setup-and-unlock.png",
        description: "Unlocking Jenkins using initialAdminPassword generated at /var/lib/jenkins/secrets/initialAdminPassword.",
        keyPoints: [
          "Retrieve cryptographic initial secret from filesystem using sudo cat.",
          "Install suggested community plugins (Git, Pipeline, Credentials, Email Extension).",
          "Create dedicated named administrative user instead of retaining generic admin account."
        ]
      },
      {
        id: "jenkins-1-3",
        stepNumber: 3,
        title: "Role-Based Access Control (RBAC) & Matrix Security",
        badge: "Security & RBAC",
        imageUrl: "/images/jenkins/04-user-roles-matrix-security.png",
        description: "Enforcing enterprise governance: Global Roles (Admin, Read-Only) vs Item Roles (pattern-matched project permissions).",
        keyPoints: [
          "Never leave security set to Logged-in users can do anything in production.",
          "Configure Role-based Authorization Strategy plugin for fine-grained principle of least privilege.",
          "Segregate Developer (build/cancel) from DevOps Admin (configure/credentials) permissions."
        ]
      },
      {
        id: "jenkins-1-4",
        stepNumber: 4,
        title: "Distributed Build Agents & SSH Node Registration",
        badge: "Distributed Agents",
        imageUrl: "/images/jenkins/08-distributed-master-agents.png",
        description: "Registering remote Linux build agents with custom labels, private SSH credentials, and remote root directory.",
        keyPoints: [
          "Assign semantic node labels (e.g. docker-builder, maven-jdk17, linux-x86).",
          "Pipelines pin workloads using agent { label maven-jdk17 } for deterministic builds.",
          "Offloads CPU-heavy compiling and image building from controller process."
        ]
      },
      {
        id: "jenkins-1-5",
        stepNumber: 5,
        title: "Linux Systemd Service Installation & Package Management",
        badge: "Linux Setup",
        imageUrl: "/images/jenkins/09-linux-installation-guide.png",
        description: "Installing OpenJDK 17, importing Jenkins repository key, and managing daemon lifecycle with systemctl.",
        keyPoints: [
          "Install OpenJDK 17 LTS as mandatory Java runtime for modern Jenkins releases.",
          "Import official Jenkins GPG key and add repository index to package manager.",
          "Enable service: sudo systemctl daemon-reload && sudo systemctl enable --now jenkins."
        ]
      },
      {
        id: "jenkins-1-6",
        stepNumber: 6,
        title: "Plugin Manager Architecture & Dynamic Extensibility",
        badge: "Plugin Ecosystem",
        imageUrl: "/images/jenkins/10-plugin-manager-configuration.png",
        description: "Managing plugin updates, installing Docker/Kubernetes integration plugins, and handling dependency graphs.",
        keyPoints: [
          "Plugins extend core Jenkins functionality into cloud providers, SCM, and testing tools.",
          "Manage via Manage Jenkins -> Plugins -> Available Plugins.",
          "Regularly audit plugin security advisories to avoid CVE exploits."
        ]
      }
    ]
  },

  "declarative-jenkinsfile-production-pipelines": {
    primaryArchitectureImage: "/images/jenkins/07-declarative-pipeline-syntax.png",
    primaryArchitectureTitle: "Declarative Pipeline Grammar & Execution Lifecycle",
    primaryArchitectureCaption: "Syntactic structure of enterprise Jenkinsfiles featuring pipeline, agent, stages, steps, and post condition blocks.",
    gallery: [
      {
        id: "jenkins-2-1",
        stepNumber: 1,
        title: "Declarative Jenkinsfile Pipeline Syntax",
        badge: "Pipeline Grammar",
        imageUrl: "/images/jenkins/07-declarative-pipeline-syntax.png",
        description: "Version-controlled pipeline-as-code syntax providing deterministic, repeatable CI/CD workflows.",
        keyPoints: [
          "Root directive pipeline { ... } encapsulates all execution blocks.",
          "agent any allocates dynamic agent; stages contains discrete phase blocks (Build, Test, Deploy).",
          "post { always/success/failure } handles telemetry, cleanup, and alerts."
        ]
      },
      {
        id: "jenkins-2-2",
        stepNumber: 2,
        title: "Git SCM Webhooks & Polling Triggers",
        badge: "SCM Triggers",
        imageUrl: "/images/jenkins/05-git-scm-webhook-triggers.png",
        description: "Configuring GitHub/GitLab webhook payloads to trigger instantaneous automated builds on git push.",
        keyPoints: [
          "GitHub Webhook points to http://jenkins-host:8080/github-webhook/.",
          "Replaces inefficient periodic cron polling with event-driven sub-second trigger latency.",
          "Enforces branch filters (e.g. only trigger on main or release/* branches)."
        ]
      },
      {
        id: "jenkins-2-3",
        stepNumber: 3,
        title: "Automated Build Notifications (Email-ext & Slack)",
        badge: "Notifications",
        imageUrl: "/images/jenkins/06-notifications-email-slack.png",
        description: "Dispatching rich HTML build status reports, commit diffs, and test failure logs via SMTP and Webhooks.",
        keyPoints: [
          "Configure global SMTP relay under Manage Jenkins -> System Configuration.",
          "Trigger contextual alerts in post { failure { emailext ... } } only on regression.",
          "Sends build artifact links and committer email addresses directly to responsible engineers."
        ]
      },
      {
        id: "jenkins-2-4",
        stepNumber: 4,
        title: "Production Declarative Jenkinsfile Pipeline",
        badge: "Production Pipeline",
        imageUrl: "/images/jenkins/12-production-jenkinsfile-pipeline.png",
        description: "Full production pipeline incorporating checkout, Maven compilation, Docker container packaging, and staging deployment.",
        keyPoints: [
          "Stages execute sequentially with automated rollback on step failure.",
          "Injects credentials securely using withCredentials([string(...)]) or credentials().",
          "Produces immutable versioned artifacts archived for audit compliance."
        ]
      }
    ]
  },

  "jenkins-selenium-maven-headless-testing": {
    primaryArchitectureImage: "/images/jenkins/11-selenium-maven-headless-testing.png",
    primaryArchitectureTitle: "Automated Headless Selenium Testing in CI/CD Pipeline",
    primaryArchitectureCaption: "End-to-end testing architecture executing headless Chrome/Firefox test suites on Jenkins nodes with JUnit reporting.",
    gallery: [
      {
        id: "jenkins-3-1",
        stepNumber: 1,
        title: "Selenium WebDriver & Headless Browser Architecture",
        badge: "Headless Testing",
        imageUrl: "/images/jenkins/11-selenium-maven-headless-testing.png",
        description: "Automating browser interaction in headless Linux environments without requiring an X11 graphical display server.",
        keyPoints: [
          "ChromeOptions arguments: --headless, --no-sandbox, --disable-dev-shm-usage.",
          "Runs browser automation natively inside Docker build agents or cloud VMs.",
          "Captures screenshots on test failure and archives them into build artifacts."
        ]
      },
      {
        id: "jenkins-3-2",
        stepNumber: 2,
        title: "Maven Surefire Test Runner & JUnit Report Archival",
        badge: "JUnit Archival",
        imageUrl: "/images/jenkins/12-production-jenkinsfile-pipeline.png",
        description: "Executing mvn test and publishing XML test results using the junit target/surefire-reports/*.xml post step.",
        keyPoints: [
          "Jenkins parses JUnit XML to generate historical test trend charts and pass/fail metrics.",
          "Build automatically marked UNSTABLE if tests fail, halting deployment stages.",
          "Zero human intervention required to pinpoint flaky or failing functional tests."
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 18: Docker - Container Architecture
  // =========================================================================
  "docker-internals-container-architecture": {
    primaryArchitectureImage: "/images/docker/03-containerization-architecture.png",
    primaryArchitectureTitle: "Docker Containerization & Linux Kernel Primitives Architecture",
    primaryArchitectureCaption: "Official architecture showing container engine sharing host OS kernel via Namespaces and Control Groups (cgroups).",
    gallery: [
      {
        id: "docker-1-1",
        stepNumber: 1,
        title: "Virtualization vs Containerization Architecture",
        badge: "VM vs Containers",
        imageUrl: "/images/docker/02-hypervisor-virtualization.png",
        description: "Contrasting Type-1/Type-2 Hypervisors running complete Guest Operating Systems against lightweight OS-level containerization.",
        keyPoints: [
          "Virtual Machines require dedicated guest OS per instance, consuming gigabytes of RAM and minutes to boot.",
          "Containers share the host Linux kernel, booting in milliseconds with negligible overhead.",
          "Enables 5x to 10x higher workload density per physical server."
        ]
      },
      {
        id: "docker-1-2",
        stepNumber: 2,
        title: "OS-Level Containerization Architecture",
        badge: "Container Engine",
        imageUrl: "/images/docker/03-containerization-architecture.png",
        description: "How Docker container engine provides isolated user-space environments while utilizing a single shared host kernel.",
        keyPoints: [
          "Application processes run as native host processes isolated through kernel boundaries.",
          "Eliminates hypervisor emulation translation penalties for CPU and memory.",
          "Guarantees that an application runs identically across Development, QA, and Production environments."
        ]
      },
      {
        id: "docker-1-3",
        stepNumber: 3,
        title: "Linux Kernel Primitives: Namespaces & Cgroups",
        badge: "Kernel Primitives",
        imageUrl: "/images/docker/04-linux-namespaces-cgroups.png",
        description: "Deep dive into Linux Namespaces (isolation) and Control Groups (resource limits) forming the bedrock of container security.",
        keyPoints: [
          "Namespaces isolate: PID (process IDs), NET (interfaces/routing), MNT (filesystems), UTS (hostnames), IPC (shared memory).",
          "Cgroups (Control Groups) enforce CPU cores, RAM limits, and disk I/O bandwidth throttle quotas.",
          "Prevents rogue processes from starving neighboring containers or crashing the physical host."
        ]
      },
      {
        id: "docker-1-4",
        stepNumber: 4,
        title: "Technical Comparison: Virtual Machines vs Containers",
        badge: "Benchmark Matrix",
        imageUrl: "/images/docker/05-vm-vs-container-matrix.png",
        description: "Comprehensive architectural matrix evaluating boot time, memory footprint, density, isolation strength, and performance.",
        keyPoints: [
          "Boot time: Seconds/Milliseconds (Containers) vs Minutes (Virtual Machines).",
          "Size on disk: Megabytes (Containers) vs Gigabytes (VM guest OS images).",
          "Isolation: Process-level via kernel namespaces (Containers) vs Hardware-assisted hypervisor (VMs)."
        ]
      },
      {
        id: "docker-1-5",
        stepNumber: 5,
        title: "Docker Engine Architecture: dockerd, containerd & runc",
        badge: "Engine Internals",
        imageUrl: "/images/docker/06-docker-engine-daemon-internals.png",
        description: "Modular OCI-compliant engine architecture: Docker CLI -> dockerd REST API -> containerd -> runc OCI runtime.",
        keyPoints: [
          "Docker CLI transmits commands over UNIX socket /var/run/docker.sock to dockerd daemon.",
          "containerd manages container lifecycle, image transfers, and execution hooks.",
          "runc interfaces directly with Linux kernel to spawn isolated process namespaces."
        ]
      },
      {
        id: "docker-1-6",
        stepNumber: 6,
        title: "Core Container Lifecycle Management CLI",
        badge: "Container Lifecycle",
        imageUrl: "/images/docker/08-core-container-lifecycle-cli.png",
        description: "Essential operations for container provisioning, execution, inspecting logs, and managing lifecycle states.",
        keyPoints: [
          "docker run -d --name web -p 80:80 nginx executes container in detached background mode.",
          "docker exec -it web /bin/sh attaches interactive debugging shell without stopping workload.",
          "docker logs -f web streams stdout/stderr output in real time."
        ]
      }
    ]
  },

  "docker-images-dockerfile-registries": {
    primaryArchitectureImage: "/images/docker/09-image-layers-unionfs-storage.png",
    primaryArchitectureTitle: "Docker Image Layer Architecture & Overlay2 Storage Driver",
    primaryArchitectureCaption: "Union Filesystem (UnionFS) showing immutable read-only image layers and thin copy-on-write (CoW) container layer.",
    gallery: [
      {
        id: "docker-2-1",
        stepNumber: 1,
        title: "Docker Image Layer Architecture & UnionFS",
        badge: "Image Layers",
        imageUrl: "/images/docker/09-image-layers-unionfs-storage.png",
        description: "Images consist of a stack of immutable, content-addressable read-only layers combined into a single unified rootfs via Overlay2.",
        keyPoints: [
          "Every Dockerfile command (FROM, RUN, COPY) generates a distinct read-only layer cache.",
          "Containers write strictly to an ephemeral top-level thin read-write layer.",
          "Copy-on-Write (CoW) strategy ensures unchanged files are read directly from shared image layers."
        ]
      },
      {
        id: "docker-2-2",
        stepNumber: 2,
        title: "Dockerfile Instructions & Image Build Grammar",
        badge: "Dockerfile Syntax",
        imageUrl: "/images/docker/10-dockerfile-build-instructions.png",
        description: "Building production container images using declarative Dockerfile instructions: FROM, RUN, COPY, WORKDIR, EXPOSE, CMD.",
        keyPoints: [
          "Combine RUN commands (e.g. apt-get update && apt-get install -y && rm -rf /var/lib/apt/lists/*) to reduce layer bloat.",
          "Use WORKDIR to set absolute execution context instead of chaining cd commands.",
          "Prefer exec form CMD [\"executable\", \"param1\"] over shell form to properly forward SIGTERM signals."
        ]
      },
      {
        id: "docker-2-3",
        stepNumber: 3,
        title: "Docker Hub Registry & Distribution Architecture",
        badge: "Registry Flow",
        imageUrl: "/images/docker/11-docker-hub-registry-flow.png",
        description: "Pushing and pulling images to public Docker Hub and private registries (AWS ECR, Harbor) with content-addressable deduplication.",
        keyPoints: [
          "Authenticate via docker login with access tokens instead of plaintext passwords.",
          "Tag images semantically: docker tag myapp:latest registry.example.com/team/myapp:v1.2.0.",
          "Layer deduplication: only missing layers are transferred during push and pull operations."
        ]
      },
      {
        id: "docker-2-4",
        stepNumber: 4,
        title: "Multi-Stage Dockerfile Size Optimization",
        badge: "Multi-Stage Builds",
        imageUrl: "/images/docker/14-multistage-build-optimization.png",
        description: "Splitting build SDKs and compilers from the final runtime image, shrinking image sizes from 1.2 GB down to 25 MB.",
        keyPoints: [
          "Stage 1 (AS builder): Compile code using full heavyweight SDK (Maven, Go, Node.js).",
          "Stage 2 (Final): Copy only compiled binaries using COPY --from=builder /app/bin /app/bin.",
          "Dramatically minimizes security attack surface by removing package managers, compilers, and shells."
        ]
      }
    ]
  },

  "dockerfile-multistage-compose-networking": {
    primaryArchitectureImage: "/images/docker/15-docker-compose-multi-service.png",
    primaryArchitectureTitle: "Multi-Service Architecture & Networking with Docker Compose",
    primaryArchitectureCaption: "Declarative multi-container orchestration connecting web applications, relational databases, and caches on private networks.",
    gallery: [
      {
        id: "docker-3-1",
        stepNumber: 1,
        title: "Docker Network Drivers: Bridge, Host & Overlay",
        badge: "Networking",
        imageUrl: "/images/docker/12-docker-network-drivers.png",
        description: "Selecting appropriate network drivers for container isolation, embedded DNS service discovery, and inter-host clustering.",
        keyPoints: [
          "Default Bridge (docker0): Legacy network without automatic container name DNS resolution.",
          "Custom User-Defined Bridge: Isolated virtual switch with built-in DNS service discovery.",
          "Host Network: Disables network namespace isolation for ultra-low latency direct port binding."
        ]
      },
      {
        id: "docker-3-2",
        stepNumber: 2,
        title: "Persistent Storage: Named Volumes vs Bind Mounts",
        badge: "Storage Volumes",
        imageUrl: "/images/docker/13-persistent-volumes-bind-mounts.png",
        description: "Decoupling stateful data from ephemeral container lifecycles using Docker managed named volumes and host bind mounts.",
        keyPoints: [
          "Named Volumes: Managed directly by Docker engine in /var/lib/docker/volumes/ (production standard).",
          "Bind Mounts: Directly links host directory to container path (ideal for local development source code hot-reloading).",
          "Data in volumes persists intact even if container is completely stopped, deleted, or upgraded."
        ]
      },
      {
        id: "docker-3-3",
        stepNumber: 3,
        title: "Docker Compose Multi-Container Orchestration",
        badge: "Docker Compose",
        imageUrl: "/images/docker/15-docker-compose-multi-service.png",
        description: "Defining and running complex multi-container microservices using a single compose.yaml declaration.",
        keyPoints: [
          "Defines services, custom bridge networks, named volumes, environment variables, and restart policies.",
          "Containers communicate using service names as hostnames (e.g. postgres://db:5432/mydb).",
          "Single command bootstrap: docker compose up -d initiates complete multi-tier stack."
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 19: Kubernetes - Container Orchestration
  // =========================================================================
  "kubernetes-architecture-control-plane-nodes": {
    primaryArchitectureImage: "/images/kubernetes/02-control-plane-architecture.png",
    primaryArchitectureTitle: "Kubernetes Control Plane & Distributed Cluster Architecture",
    primaryArchitectureCaption: "Master control plane components (API Server, etcd, Scheduler, Controller Manager) orchestrating worker node runtimes.",
    gallery: [
      {
        id: "k8s-1-1",
        stepNumber: 1,
        title: "Kubernetes Control Plane Architecture",
        badge: "Control Plane",
        imageUrl: "/images/kubernetes/02-control-plane-architecture.png",
        description: "The brain of the cluster maintaining desired state, scheduling workloads, and exposing the cluster management API.",
        keyPoints: [
          "kube-apiserver: Stateless REST gateway validating and configuring Pods, Services, and Replication controllers.",
          "etcd: Highly-available distributed key-value store acting as single source of truth for all cluster state.",
          "kube-scheduler: Assigns newly created Pods to optimal worker nodes based on resource capacity and affinities.",
          "kube-controller-manager: Runs core control loops (Node Lifecycle, Deployment, Endpoints) to reconcile desired vs actual state."
        ]
      },
      {
        id: "k8s-1-2",
        stepNumber: 2,
        title: "Kubernetes Worker Node Architecture",
        badge: "Worker Node",
        imageUrl: "/images/kubernetes/03-worker-node-kubelet-runtime.png",
        description: "Worker node execution tier hosting containerized applications and maintaining local networking.",
        keyPoints: [
          "kubelet: Primary node agent communicating with API server to ensure Pod containers are healthy and running.",
          "kube-proxy: Network proxy reflecting services on each node and configuring iptables/IPVS routing rules.",
          "Container Runtime (CRI): Low-level engine (containerd, CRI-O) pulling images and executing containers."
        ]
      },
      {
        id: "k8s-1-3",
        stepNumber: 3,
        title: "Monolithic vs Microservices Architecture",
        badge: "Microservices",
        imageUrl: "/images/kubernetes/04-monolith-vs-microservices.png",
        description: "Evolution from tightly coupled single-executable monolithic codebases to distributed, independently scalable microservices on Kubernetes.",
        keyPoints: [
          "Monoliths suffer from deployment bottlenecks, single points of failure, and difficult horizontal scaling.",
          "Microservices decouple business capabilities into loosely coupled services communicating via REST/gRPC.",
          "Kubernetes provides the automated service discovery, health-checking, and auto-scaling microservices require."
        ]
      },
      {
        id: "k8s-1-4",
        stepNumber: 4,
        title: "Kubernetes Cluster Bootstrapping: kind vs kubeadm",
        badge: "Cluster Setup",
        imageUrl: "/images/kubernetes/05-cluster-setup-kind-kubeadm.png",
        description: "Bootstrapping local development clusters using kind (Kubernetes-in-Docker) and production multi-node clusters via kubeadm.",
        keyPoints: [
          "kind provisions multi-node Kubernetes clusters in seconds by running Docker containers as simulated nodes.",
          "kubeadm: Official production tool for bootstrapping enterprise clusters (kubeadm init & kubeadm join).",
          "Installs standard CNI network plugins (Calico, Flannel) to enable inter-Pod overlay routing."
        ]
      },
      {
        id: "k8s-1-5",
        stepNumber: 5,
        title: "Foundational kubectl Cluster Management CLI",
        badge: "kubectl Inspection",
        imageUrl: "/images/kubernetes/06-kubectl-inspection-commands.png",
        description: "Essential command suite for inspecting cluster health, nodes, namespaces, and querying API resources.",
        keyPoints: [
          "kubectl cluster-info and kubectl get nodes verify control plane and worker connectivity.",
          "kubectl get pods -A displays all workloads running across default and kube-system namespaces.",
          "kubectl describe node <name> details allocated CPU/memory capacity and scheduling taints."
        ]
      }
    ]
  },

  "kubernetes-objects-workloads-networking-storage": {
    primaryArchitectureImage: "/images/kubernetes/08-pods-replicasets-deployments.png",
    primaryArchitectureTitle: "Kubernetes Core Workloads & Declarative Controller Hierarchy",
    primaryArchitectureCaption: "Controller reconciliation hierarchy: Deployments manage ReplicaSets, ReplicaSets manage Pods, and Pods encapsulate containers.",
    gallery: [
      {
        id: "k8s-2-1",
        stepNumber: 1,
        title: "Pod Manifest Anatomy & Specification",
        badge: "Pod YAML",
        imageUrl: "/images/kubernetes/07-pod-manifest-yaml-structure.png",
        description: "The universal 4-part structure of every Kubernetes YAML manifest: apiVersion, kind, metadata, and spec.",
        keyPoints: [
          "apiVersion defines the schema version; kind specifies the Kubernetes object type.",
          "metadata contains semantic labels and annotations used for service routing and querying.",
          "spec describes the desired state, container images, port definitions, and resource limits."
        ]
      },
      {
        id: "k8s-2-2",
        stepNumber: 2,
        title: "Workloads: Pods, ReplicaSets & Deployments",
        badge: "Workload Hierarchy",
        imageUrl: "/images/kubernetes/08-pods-replicasets-deployments.png",
        description: "How Kubernetes controllers maintain self-healing desired state and manage scalable application replicas.",
        keyPoints: [
          "Pod is the atomic scheduling unit containing one or more tightly-coupled co-located containers.",
          "ReplicaSet guarantees that a specific number of identical Pod replicas are actively running.",
          "Deployment provides declarative declarative updates for Pods and ReplicaSets with zero-downtime rolling upgrades."
        ]
      },
      {
        id: "k8s-2-3",
        stepNumber: 3,
        title: "Kubernetes Services: ClusterIP, NodePort & LoadBalancer",
        badge: "Networking & Services",
        imageUrl: "/images/kubernetes/09-services-clusterip-nodeport-lb.png",
        description: "Stable networking abstraction providing static virtual IPs, DNS hostnames, and load balancing over ephemeral Pods.",
        keyPoints: [
          "ClusterIP (Default): Internal virtual IP accessible only within the cluster.",
          "NodePort: Exposes service on a static high port (30000-32767) across every worker node IP.",
          "LoadBalancer: Automatically provisions an external cloud load balancer (e.g. AWS NLB/ALB) pointing to the service."
        ]
      },
      {
        id: "k8s-2-4",
        stepNumber: 4,
        title: "Advanced Workloads: StatefulSets, DaemonSets & Ingress",
        badge: "Advanced Workloads",
        imageUrl: "/images/kubernetes/10-daemonset-statefulset-ingress.png",
        description: "Specialized controllers for clustered databases (StatefulSets), node agents (DaemonSets), and HTTP Layer 7 routing (Ingress).",
        keyPoints: [
          "StatefulSets provide stable, unique network identifiers (web-0, web-1) and dedicated persistent storage per replica.",
          "DaemonSets ensure a copy of a Pod runs on every single worker node (ideal for Fluentd loggers and Datadog agents).",
          "Ingress Controller manages external HTTP/HTTPS traffic routing based on hostnames and URL paths."
        ]
      },
      {
        id: "k8s-2-5",
        stepNumber: 5,
        title: "Decoupled Configuration: ConfigMaps & Secrets",
        badge: "Config & Secrets",
        imageUrl: "/images/kubernetes/11-configmaps-and-secrets.png",
        description: "Injecting non-confidential configuration and sensitive credentials into container filesystems and environment variables.",
        keyPoints: [
          "ConfigMaps store plain text configuration properties and configuration files.",
          "Secrets store sensitive base64-encoded credentials (passwords, TLS certs, API tokens).",
          "Can be mounted dynamically as volume files or injected as environment variables into Pod containers."
        ]
      }
    ]
  },

  "k8s-workloads-services-networking-helm": {
    primaryArchitectureImage: "/images/kubernetes/12-deployment-rolling-update-rollback.png",
    primaryArchitectureTitle: "Zero-Downtime Deployment Rollouts & Instant Rollback Flow",
    primaryArchitectureCaption: "Visualizing RollingUpdate strategy gradually replacing old Pods with new replicas while serving live traffic.",
    gallery: [
      {
        id: "k8s-3-1",
        stepNumber: 1,
        title: "Zero-Downtime Rolling Updates & Instant Rollbacks",
        badge: "Rolling Updates",
        imageUrl: "/images/kubernetes/12-deployment-rolling-update-rollback.png",
        description: "Gradual Pod replacement using maxSurge and maxUnavailable guarantees application availability during production releases.",
        keyPoints: [
          "RollingUpdate strategy provisions new Pods and waits for readiness probes before terminating old replicas.",
          "Recreate strategy terminates all old Pods simultaneously (causes downtime; needed only for legacy single-writer databases).",
          "Instant rollback: kubectl rollout undo deployment/webapp reverts to previous revision in seconds."
        ]
      },
      {
        id: "k8s-3-2",
        stepNumber: 2,
        title: "Horizontal Pod Autoscaler (HPA) Elastic Scaling",
        badge: "Auto Scaling (HPA)",
        imageUrl: "/images/kubernetes/13-horizontal-pod-autoscaler-hpa.png",
        description: "Automated scaling loop querying Metrics Server to adjust Deployment replica count based on real-time CPU and Memory consumption.",
        keyPoints: [
          "HPA controller evaluates metrics every 15 seconds against target utilization thresholds (e.g. 70% CPU).",
          "Scales replicas up rapidly to absorb traffic spikes, and scales down gradually with stabilization cooldowns.",
          "Requires container resource requests to be explicitly defined in the Pod spec."
        ]
      },
      {
        id: "k8s-3-3",
        stepNumber: 3,
        title: "Helm Package Manager: Charts, Templates & Releases",
        badge: "Helm Packaging",
        imageUrl: "/images/kubernetes/14-helm-package-manager-charts.png",
        description: "The package manager for Kubernetes: packaging complex multi-resource applications into reusable, parameterized charts.",
        keyPoints: [
          "Helm Charts bundle templates (deployments, services, ingress) with default configuration in values.yaml.",
          "helm install and helm upgrade allow deploying identical applications across dev, staging, and prod with custom value overrides.",
          "Tracks release history and enables deterministic one-command rollbacks: helm rollback <release> <revision>."
        ]
      }
    ]
  }

};

/**
 * Retrieve real visuals and console screenshots for a given topic slug.
 */
export function getRealVisualsForTopic(topicSlug) {
  return TOPIC_REAL_VISUALS[topicSlug] || null;
}

export const LAB_STEP_SCREENSHOTS = {
  // Module 1 Lab 1: Free tier setup, root MFA & budgets
  'aws-account-creation-root-security-iam': {
    1: {
      url: '/images/aws-account/01-free-tier-signup-portal.png',
      caption: 'AWS Free Tier Signup Portal: Selecting 12-Month Free Tier'
    },
    2: {
      url: '/images/aws-account/02-root-email-account-name.png',
      caption: 'Configuring Root User Email & Unique AWS Account Name'
    },
    3: {
      url: '/images/aws-account/04-root-password-creation.png',
      caption: 'Creating Complex Root Password (Uppercase, Lowercase, Digits, Symbols)'
    },
    4: {
      url: '/images/aws-account/07-payment-card-validation.png',
      caption: 'Payment Method Identity Validation (~₹2 / $1 Refundable Authorization Hold)'
    },
    5: {
      url: '/images/aws-account/11-support-plan-basic-free.png',
      caption: 'Selecting Free Basic Support Plan ($0 / month)'
    },
    6: {
      url: '/images/aws-account/16-root-mfa-security-checklist.png',
      caption: 'Enabling Virtual MFA for Root Account via Google Authenticator'
    }
  },

  // Module 1 Lab 2: Cost Explorer & Alarms
  'accidental-charges-cost-explorer-support-refunds': {
    1: {
      url: '/images/aws-account/17-free-tier-usage-dashboard.png',
      caption: 'AWS Free Tier Usage Alerts & Monitoring Dashboard in Billing Console'
    },
    2: {
      url: '/images/aws-account/18-aws-budgets-and-alarms-guide.png',
      caption: 'Configuring AWS Budgets & CloudWatch $0.01 Zero-Spend Billing Alarm'
    },
    3: {
      url: '/images/aws-account/19-delete-idle-resources-guide.png',
      caption: 'Auditing Orphaned EBS Volumes & Unattached Elastic IPs'
    },
    4: {
      url: '/images/aws-account/19-delete-idle-resources-guide.png',
      caption: 'Terminating Idle Resources & Creating Cost Allocation Tags'
    },
    5: {
      url: '/images/aws-account/11-support-plan-basic-free.png',
      caption: 'Opening AWS Support Case under Account & Billing for Courtesy Refund'
    },
    6: {
      url: '/images/aws-account/18-aws-budgets-and-alarms-guide.png',
      caption: 'Verifying Active Budgets & Alert Notification Delivery'
    }
  },

  // Module 1 Lab 3: Global Infrastructure
  'regions-azs-and-edge-infrastructure': {
    1: {
      url: '/images/aws-account/15-aws-management-console-home.png',
      caption: 'Regional Switcher in AWS Console Navigation Bar'
    },
    2: {
      url: '/images/aws-vpc/01-default-vpc-architecture.png',
      caption: 'Inspecting Availability Zone Data Center Clusters'
    },
    3: {
      url: '/images/aws-vpc/01-default-vpc-architecture.png',
      caption: 'Comparing Physical Zone IDs (ZoneId) Across Accounts'
    },
    4: {
      url: '/images/aws-account/15-aws-management-console-home.png',
      caption: 'AWS CloudShell Terminal Launch for Regional Probing'
    },
    5: {
      url: '/images/aws-account/00-aws-free-tier-cover.png',
      caption: 'AWS Global Fiber Backbone & CloudFront Edge PoPs'
    },
    6: {
      url: '/images/aws-account/15-aws-management-console-home.png',
      caption: 'Multi-Region High Availability Health Verification'
    }
  },

  // Module 3 Lab 1: Custom VPC Subnetting
  'vpc-subnetting-gateways-packet-flow': {
    1: {
      url: '/images/aws-vpc/01-default-vpc-architecture.png',
      caption: 'Analyzing Pre-existing Default VPC (172.31.0.0/16)'
    },
    2: {
      url: '/images/aws-vpc/02-custom-vpc-architecture.png',
      caption: 'Creating Custom Isolated VPC (10.0.0.0/16) in AWS Console'
    },
    3: {
      url: '/images/aws-vpc/03-vpc-cidr-subnet-topology.png',
      caption: 'Partitioning Public & Private Subnets Across Multi-AZ'
    },
    4: {
      url: '/images/aws-vpc/04-bastion-host-network-flow.png',
      caption: 'Creating & Attaching Internet Gateway (IGW) to VPC'
    },
    5: {
      url: '/images/aws-vpc/03-vpc-cidr-subnet-topology.png',
      caption: 'Configuring Route Tables: 0.0.0.0/0 -> Target Internet Gateway'
    },
    6: {
      url: '/images/aws-vpc/04-bastion-host-network-flow.png',
      caption: 'Deploying Bastion Jump Host in Public Subnet for Secure Private SSH'
    }
  },

  // Module 3 Lab 2: Security Groups, NACLs & Flow Logs
  'vpc-security-groups-nacls-firewall-flow-logs': {
    1: {
      url: '/images/aws-vpc/08-security-groups-vs-nacls.png',
      caption: 'Stateful Security Group: Configuring Inbound Allow Rules at ENI Level'
    },
    2: {
      url: '/images/aws-vpc/08-security-groups-vs-nacls.png',
      caption: 'Stateless Subnet Network ACL: Creating Numbered Inbound & Outbound Rules'
    },
    3: {
      url: '/images/aws-vpc/08-security-groups-vs-nacls.png',
      caption: 'Configuring Ephemeral Outbound Return Ports (1024-65535) for Stateless NACL'
    },
    4: {
      url: '/images/aws-vpc/05-vpc-flow-logs-architecture.png',
      caption: 'Enabling VPC Flow Logs to Capture ALL Traffic (ACCEPT & REJECT)'
    },
    5: {
      url: '/images/aws-vpc/05-vpc-flow-logs-architecture.png',
      caption: 'Analyzing Traffic Telemetry & Rejected Packets in CloudWatch Logs Insights'
    },
    6: {
      url: '/images/aws-vpc/09-network-firewall-single-vpn.png',
      caption: 'Testing Security Perimeter with Port Scans & Validating Block Rules'
    }
  },

  // Module 3 Lab 3: Hybrid Routing, Endpoints & Transit Gateway
  'vpc-peering-transit-gateway-endpoints-vpn': {
    1: {
      url: '/images/aws-vpc/06-vpc-endpoints-services.png',
      caption: 'Creating S3 Gateway VPC Endpoint in Route Table (Zero Internet Traversal)'
    },
    2: {
      url: '/images/aws-vpc/06-vpc-endpoints-services.png',
      caption: 'Testing Private S3 Bucket Access from Isolated Private Subnet'
    },
    3: {
      url: '/images/aws-vpc/07-vpc-peering-topology.png',
      caption: 'Creating Non-Transitive VPC Peering Connection Between VPC-A and VPC-B'
    },
    4: {
      url: '/images/aws-vpc/12-transit-gateway-hub-and-spoke.png',
      caption: 'Deploying AWS Transit Gateway (TGW) as Central Regional Router Hub'
    },
    5: {
      url: '/images/aws-vpc/10-multiple-vpn-redundant-tunnels.png',
      caption: 'Configuring Site-to-Site IPsec VPN Dual Tunnels to Customer Gateway'
    },
    6: {
      url: '/images/aws-vpc/11-vpn-tunnel-failover.png',
      caption: 'Simulating VPN Failover & Verifying Traffic Re-routing Across Tunnels'
    }
  },

  // Module 17 Lab 1: Jenkins Controller-Agent
  "jenkins-architecture-master-agents": {
    1: { url: "/images/jenkins/09-linux-installation-guide.png", caption: "Installing OpenJDK 17 & Adding Jenkins Linux Package Repository" },
    2: { url: "/images/jenkins/09-linux-installation-guide.png", caption: "Enabling & Starting Jenkins Systemd Daemon (Port 8080)" },
    3: { url: "/images/jenkins/03-jenkins-setup-and-unlock.png", caption: "Retrieving initialAdminPassword & Completing First-Run Unlock Wizard" },
    4: { url: "/images/jenkins/10-plugin-manager-configuration.png", caption: "Installing Role-based Authorization Strategy Plugin" },
    5: { url: "/images/jenkins/04-user-roles-matrix-security.png", caption: "Configuring Role-Based Access Control (RBAC) & User Matrix Security" },
    6: { url: "/images/jenkins/08-distributed-master-agents.png", caption: "Registering Remote SSH Build Node Agent with Labeled Executors" }
  },

  // Module 17 Lab 2: Declarative Pipelines & Triggers
  "declarative-jenkinsfile-production-pipelines": {
    1: { url: "/images/jenkins/05-git-scm-webhook-triggers.png", caption: "Configuring GitHub SCM Webhook for Instant Event-Driven Builds" },
    2: { url: "/images/jenkins/05-git-scm-webhook-triggers.png", caption: "Configuring Pipeline Job with Webhook Polling & Cron Triggers" },
    3: { url: "/images/jenkins/07-declarative-pipeline-syntax.png", caption: "Authoring Declarative Jenkinsfile (pipeline, agent, stages, steps)" },
    4: { url: "/images/jenkins/12-production-jenkinsfile-pipeline.png", caption: "Adding Production Manual Approval Gate via input Step" },
    5: { url: "/images/jenkins/06-notifications-email-slack.png", caption: "Configuring Email-ext Alerts inside post { failure } Block" },
    6: { url: "/images/jenkins/12-production-jenkinsfile-pipeline.png", caption: "Triggering Full Pipeline Execution via Git Push & Inspecting Stage View" }
  },

  // Module 17 Lab 3: Automated Selenium Testing
  "jenkins-selenium-maven-headless-testing": {
    1: { url: "/images/jenkins/11-selenium-maven-headless-testing.png", caption: "Creating Maven Project with Selenium WebDriver & JUnit Dependencies" },
    2: { url: "/images/jenkins/11-selenium-maven-headless-testing.png", caption: "Writing Headless Selenium WebDriver Test Case with ChromeOptions" },
    3: { url: "/images/jenkins/11-selenium-maven-headless-testing.png", caption: "Executing Test Suite Locally via Maven Surefire Test Runner" },
    4: { url: "/images/jenkins/11-selenium-maven-headless-testing.png", caption: "Configuring Jenkins Freestyle Job with Top-Level Maven Build Target" },
    5: { url: "/images/jenkins/12-production-jenkinsfile-pipeline.png", caption: "Authoring Declarative Jenkinsfile with Automated JUnit XML Publishing" },
    6: { url: "/images/jenkins/12-production-jenkinsfile-pipeline.png", caption: "Analyzing Test Result Trends & Failure Diagnostics in Jenkins Console" }
  },

  // Module 18 Lab 1: Docker Internals & Namespaces
  "docker-internals-container-architecture": {
    1: { url: "/images/docker/06-docker-engine-daemon-internals.png", caption: "Verifying Docker Client-Server Architecture & Engine Components (dockerd, containerd, runc)" },
    2: { url: "/images/docker/04-linux-namespaces-cgroups.png", caption: "Inspecting Linux Kernel Namespaces (PID, Mount, Network Isolation)" },
    3: { url: "/images/docker/04-linux-namespaces-cgroups.png", caption: "Enforcing Resource Quotas via Linux Control Groups (Cgroups CPU & RAM limits)" },
    4: { url: "/images/docker/04-linux-namespaces-cgroups.png", caption: "Simulating Out-of-Memory Killer (OOMKilled) & Diagnosing Exit Code 137" },
    5: { url: "/images/docker/08-core-container-lifecycle-cli.png", caption: "Mastering Container Lifecycle State Transitions (created, running, stopped, paused)" },
    6: { url: "/images/docker/07-docker-installation-linux.png", caption: "Security Audit: Docker Group Host Root Escalation Analysis" }
  },

  // Module 18 Lab 2: Images & Dockerfile
  "docker-images-dockerfile-registries": {
    1: { url: "/images/docker/10-dockerfile-build-instructions.png", caption: "Analyzing Bloated Single-Stage Dockerfile Anti-Patterns" },
    2: { url: "/images/docker/09-image-layers-unionfs-storage.png", caption: "Optimizing Docker Layer Caching & Build Context via .dockerignore" },
    3: { url: "/images/docker/14-multistage-build-optimization.png", caption: "Engineering Production Multi-Stage Build with Alpine musl & Distroless Base" },
    4: { url: "/images/docker/10-dockerfile-build-instructions.png", caption: "Differentiating ARG vs ENV and CMD vs ENTRYPOINT Directives" },
    5: { url: "/images/docker/10-dockerfile-build-instructions.png", caption: "Security Hardening: Implementing Non-Root USER & Verifying Privilege Drop" },
    6: { url: "/images/docker/11-docker-hub-registry-flow.png", caption: "Pushing Images to Registry & Verifying Content-Addressable Deduplication" }
  },

  // Module 18 Lab 3: Networking & Compose
  "dockerfile-multistage-compose-networking": {
    1: { url: "/images/docker/12-docker-network-drivers.png", caption: "Contrasting Default Bridge (docker0) vs User-Defined Custom Bridge Networking" },
    2: { url: "/images/docker/13-persistent-volumes-bind-mounts.png", caption: "Configuring Persistent Storage: Named Volumes vs Ephemeral Writable Layer" },
    3: { url: "/images/docker/15-docker-compose-multi-service.png", caption: "Authoring Declarative Multi-Service compose.yaml (App, PostgreSQL, Redis)" },
    4: { url: "/images/docker/15-docker-compose-multi-service.png", caption: "Configuring Container Healthchecks & depends_on Service Startup Ordering" },
    5: { url: "/images/docker/15-docker-compose-multi-service.png", caption: "Executing Multi-Container Lifecycle Operations (logs, exec, stats, restart)" },
    6: { url: "/images/docker/15-docker-compose-multi-service.png", caption: "Disaster Recovery Drill: Safe Teardown vs Accidental Volume Deletion Prevention" }
  },

  // Module 19 Lab 1: K8s Control Plane & kind
  "kubernetes-architecture-control-plane-nodes": {
    1: { url: "/images/kubernetes/06-kubectl-inspection-commands.png", caption: "Installing kubectl CLI Client & Verifying Cluster Architecture Skew" },
    2: { url: "/images/kubernetes/05-cluster-setup-kind-kubeadm.png", caption: "Bootstrapping Multi-Node Local Cluster Using kind (Kubernetes IN Docker)" },
    3: { url: "/images/kubernetes/02-control-plane-architecture.png", caption: "Inspecting Control Plane Components & System Namespace Pods (etcd, API Server, CoreDNS)" },
    4: { url: "/images/kubernetes/07-pod-manifest-yaml-structure.png", caption: "Authoring Universal Manifest: Enforcing Resource Requests vs Limits" },
    5: { url: "/images/kubernetes/06-kubectl-inspection-commands.png", caption: "Verifying Declarative apply -f vs Imperative create -f Idempotency" },
    6: { url: "/images/kubernetes/02-control-plane-architecture.png", caption: "Security & Architectural Isolation Audit: etcd Port 2379 Access Boundary" }
  },

  // Module 19 Lab 2: Objects, Workloads & Networking
  "kubernetes-objects-workloads-networking-storage": {
    1: { url: "/images/kubernetes/08-pods-replicasets-deployments.png", caption: "Deploying Stateless Microservices via Deployment & ReplicaSet Controllers" },
    2: { url: "/images/kubernetes/09-services-clusterip-nodeport-lb.png", caption: "Exposing Workloads with Service Discovery (ClusterIP) & Label Selectors" },
    3: { url: "/images/kubernetes/11-configmaps-and-secrets.png", caption: "Decoupling Configuration: Injecting ConfigMap Properties & Secret Credentials" },
    4: { url: "/images/kubernetes/10-daemonset-statefulset-ingress.png", caption: "Abstracting Storage: Binding PersistentVolumeClaims (PVC) to Pods" },
    5: { url: "/images/kubernetes/10-daemonset-statefulset-ingress.png", caption: "Contrasting DaemonSet (Node Agents) vs StatefulSet (Clustered Databases)" },
    6: { url: "/images/kubernetes/06-kubectl-inspection-commands.png", caption: "Mastering Daily Pod Debugging Operations (describe, logs, exec, port-forward)" }
  },

  // Module 19 Lab 3: Rollouts, HPA & Helm
  "k8s-workloads-services-networking-helm": {
    1: { url: "/images/kubernetes/12-deployment-rolling-update-rollback.png", caption: "Executing Zero-Downtime Rolling Update & Streaming Rollout Status" },
    2: { url: "/images/kubernetes/12-deployment-rolling-update-rollback.png", caption: "Emergency Incident Response: Instant Rollback via kubectl rollout undo" },
    3: { url: "/images/kubernetes/12-deployment-rolling-update-rollback.png", caption: "Contrasting RollingUpdate Strategy with the Recreate Downtime Strategy" },
    4: { url: "/images/kubernetes/13-horizontal-pod-autoscaler-hpa.png", caption: "Configuring Horizontal Pod Autoscaler (HPA) with CPU Thresholds & Metrics Server" },
    5: { url: "/images/kubernetes/14-helm-package-manager-charts.png", caption: "Authoring and Deploying Parameterized Helm Chart (Templates & Values)" },
    6: { url: "/images/kubernetes/14-helm-package-manager-charts.png", caption: "Managing Helm Release Lifecycle: Upgrade, Rollback & Clean Uninstall" }
  },

};

/**
 * Retrieve screenshot for a specific lab step.
 */
export function getLabStepScreenshot(topicSlug, stepNumber) {
  return LAB_STEP_SCREENSHOTS[topicSlug]?.[stepNumber] || null;
}

