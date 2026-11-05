// Visual Architecture Diagrams, Concept Flow Images, and In-Depth Explanations for Every Topic & Module
// Vector SVG format ensures high resolution, responsiveness, fast loading, and crisp rendering on any screen.

export const TOPIC_ARCHITECTURE = {
  // -------------------------------------------------------------------------
  // MODULE 1: AWS Cloud Account Setup, Free Tier Governance & Global Infrastructure
  // -------------------------------------------------------------------------
  'aws-account-creation-root-security-iam': {
    moduleNumber: 1,
    title: "AWS Root Account Security Armor & IAM Least-Privilege Hierarchy",
    category: "Identity & Account Security",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'AWS Root Security Posture & Virtual MFA Hardening Flow',
    realDiagramCaption: 'Actual security guidelines for root account protection, multi-factor authentication, and IAM administrator isolation.',
    description: "Multi-layered defense for AWS root credentials: email verification, hardware/virtual MFA activation, root access key elimination, and isolation through a dedicated IAM Administrator user.",
    flowSteps: ["Root Registration & Email Verification", "Virtual/Hardware MFA Hardening", "Root Access Key Deprecation", "Dedicated IAM Admin User Provisioning"],
    stepByStep: [
      { step: 1, component: "AWS Root Account Credentials", role: "Master billing and administrative identity created during account signup.", why: "Has absolute unrevokable power over billing, organization, and all cloud resources." },
      { step: 2, component: "Multi-Factor Authentication (MFA)", role: "Enforces time-based TOTP code challenge upon authentication.", why: "Protects against credential theft; stops 99.9% of automated account takeover attacks." },
      { step: 3, component: "Root Locker & Key Deletion", role: "Deleting root access keys and locking away root credentials for emergency use only.", why: "Prevents accidental catastrophic API exposure in GitHub or environment variables." },
      { step: 4, component: "IAM Administrator Identity", role: "Individual administrative user with AdministratorAccess managed policy and MFA.", why: "Enforces non-repudiation, granular auditing in CloudTrail, and daily least-privilege operations." }
    ],
    interRelationships: [
      { from: "Root Account", to: "MFA Token", relation: "Enforces 6-digit TOTP challenge during root login.", protocol: "RFC 6238 TOTP / FIDO2" },
      { from: "IAM Service", to: "Admin User", relation: "Issues STS session tokens and credentials tied to identity.", protocol: "AWS SigV4 / HTTPS" },
      { from: "Admin User", to: "AWS Resources", relation: "Acts on EC2, VPC, S3 governed by IAM policy and CloudTrail audit logging.", protocol: "AWS REST APIs" }
    ],
    endToEndFlow: [
      { stage: "1. Account Provisioning", action: "Sign-Up Verification", details: "Payment verification holds $1 USD temporary authorization; email verification confirms tenant ownership." },
      { stage: "2. Root Hardening", action: "MFA Activation", details: "Root user scans QR code with Google Authenticator; dual consecutive TOTP tokens register virtual MFA." },
      { stage: "3. Access Key Sweep", action: "Root Key Purge", details: "Ensure zero active root API access keys exist in IAM security credentials console." },
      { stage: "4. Admin Delegation", action: "IAM User Creation", details: "Create admin-user with AdministratorAccess policy; enforce console password reset and MFA." }
    ],
    moduleContext: {
      prevModule: "Linux & Shell Scripting Foundation",
      thisModule: "Module 1: AWS Cloud Account Setup, Free Tier Governance & Global Infrastructure",
      nextModule: "Module 2: IAM Identity & Access Management",
      connectionReason: "Securing root and establishing a pristine administrative user is the foundational prerequisite before creating any policies, roles, or cloud workloads."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="rootBgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#rootBgGrad)" stroke="#1e293b" stroke-width="2"/>
      
      <!-- Tier 1: Root Locker -->
      <g transform="translate(30, 45)">
        <rect width="160" height="170" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
        <text x="80" y="26" fill="#ef4444" font-size="11" font-weight="bold" text-anchor="middle">1. ROOT ACCOUNT</text>
        <circle cx="80" cy="65" r="20" fill="#ef4444" opacity="0.2"/>
        <text x="80" y="72" fill="#f87171" font-size="20" text-anchor="middle">👑</text>
        <text x="80" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Emergency Use Only</text>
        <rect x="15" y="125" width="130" height="22" rx="4" fill="#450a0a"/>
        <text x="80" y="140" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">ZERO Access Keys</text>
        <text x="80" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">Lock in Safe / Bitwarden</text>
      </g>
      
      <!-- Arrow 1 -->
      <path d="M 200 130 L 235 130" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <polygon points="240,130 230,124 230,136" fill="#f59e0b"/>
      
      <!-- Tier 2: MFA Enforcement -->
      <g transform="translate(245, 45)">
        <rect width="165" height="170" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="82" y="26" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">2. HARDENED MFA</text>
        <circle cx="82" cy="65" r="20" fill="#f59e0b" opacity="0.2"/>
        <text x="82" y="72" fill="#fbbf24" font-size="20" text-anchor="middle">🛡️</text>
        <text x="82" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">TOTP / FIDO2 Token</text>
        <rect x="15" y="125" width="135" height="22" rx="4" fill="#78350f"/>
        <text x="82" y="140" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle">2-Factor Authentication</text>
        <text x="82" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">Blocks 99.9% Breaches</text>
      </g>
      
      <!-- Arrow 2 -->
      <path d="M 420 130 L 455 130" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
      <polygon points="460,130 450,124 450,136" fill="#38bdf8"/>
      
      <!-- Tier 3: IAM Admin Identity -->
      <g transform="translate(465, 45)">
        <rect width="170" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="85" y="26" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">3. IAM ADMIN USER</text>
        <circle cx="85" cy="65" r="20" fill="#0284c7" opacity="0.2"/>
        <text x="85" y="72" fill="#38bdf8" font-size="20" text-anchor="middle">👤</text>
        <text x="85" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Day-to-Day Operations</text>
        <rect x="15" y="125" width="140" height="22" rx="4" fill="#0c4a6e"/>
        <text x="85" y="140" fill="#bae6fd" font-size="9" font-weight="bold" text-anchor="middle">AdministratorAccess</text>
        <text x="85" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">Individual Password + MFA</text>
      </g>
      
      <!-- Arrow 3 -->
      <path d="M 645 130 L 675 130" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
      <polygon points="680,130 670,124 670,136" fill="#10b981"/>
      
      <!-- Tier 4: CloudTrail & Least Privilege -->
      <g transform="translate(685, 45)">
        <rect width="135" height="170" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="67" y="26" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">4. AUDIT & LOGS</text>
        <circle cx="67" cy="65" r="20" fill="#059669" opacity="0.2"/>
        <text x="67" y="72" fill="#34d399" font-size="20" text-anchor="middle">📋</text>
        <text x="67" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">AWS CloudTrail</text>
        <rect x="10" y="125" width="115" height="22" rx="4" fill="#064e3b"/>
        <text x="67" y="140" fill="#a7f3d0" font-size="9" font-weight="bold" text-anchor="middle">100% Audit Trails</text>
        <text x="67" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">Non-Repudiation Logging</text>
      </g>
    </svg>`
  },

  'accidental-charges-cost-explorer-support-refunds': {
    moduleNumber: 1,
    title: "AWS Cost Guardrails, Budget Alarms & Accidental Charge Triage Flow",
    category: "Cloud Financial Management (FinOps)",
    realDiagramUrl: '/images/aws-account/18-aws-budgets-and-alarms-guide.png',
    realDiagramTitle: 'AWS Budgets, Zero-Spend Guardrails & Billing Alarm Architecture',
    realDiagramCaption: 'Real-time billing safeguards preventing unexpected charges through CloudWatch metric alarms and AWS Budgets email alerts.',
    description: "Proactive cost protection loop combining zero-spend CloudWatch billing alarms, AWS Budgets forecasting, Cost Explorer granular attribution, and AWS Support case refund remediation.",
    flowSteps: ["Zero-Spend CloudWatch Alarm ($0.01)", "AWS Budgets Monthly Forecast ($5.00)", "Cost Explorer Multi-Dimension Triage", "AWS Support Case Refund Submission"],
    stepByStep: [
      { step: 1, component: "AWS CloudWatch Billing Alarm", role: "Monitors estimated charges metric in us-east-1 and triggers when spend > $0.01.", why: "Instant notification the exact moment any billable resource begins accruing cost." },
      { step: 2, component: "AWS Budgets & SNS Topics", role: "Tracks monthly spend against custom threshold and emails alerts at 80% forecast.", why: "Prevents surprise multi-hundred-dollar month-end invoices before they materialize." },
      { step: 3, component: "AWS Cost Explorer Triage", role: "Visualizes spend grouped by Service, Region, and Usage Type.", why: "Pinpoints the exact rogue resource (e.g. unattached gp3 EBS volume or NAT Gateway) generating charges." },
      { step: 4, component: "AWS Support Center Remediation", role: "Standard protocol to open Account & Billing case requesting one-time courtesy goodwill refund.", why: "Allows students and engineers to reverse inadvertent learning-tier charges." }
    ],
    interRelationships: [
      { from: "Billing Metrics", to: "CloudWatch Alarm", relation: "Pushes estimated metric datapoints every 4-6 hours.", protocol: "CloudWatch Metric Stream" },
      { from: "CloudWatch Alarm", to: "Amazon SNS", relation: "Triggers notification upon state change to ALARM.", protocol: "Amazon SNS Publish" },
      { from: "Cost Explorer", to: "Admin Engineer", relation: "Filters unattached volumes and unassociated Elastic IPs.", protocol: "AWS Billing Console / CLI" },
      { from: "Engineer", to: "AWS Support", relation: "Submits case with root cause explanation and remediation proof.", protocol: "AWS Support API / Portal" }
    ],
    endToEndFlow: [
      { stage: "1. Spend Inception", action: "Resource Spin-Up", details: "Engineer leaves an idle NAT Gateway running; CloudWatch EstimatedCharges metric ticks above $0.01." },
      { stage: "2. Alert Dispatch", action: "SNS Push Notification", details: "CloudWatch transitions to ALARM state and publishes email alert to devops-alerts@company.com." },
      { stage: "3. Root Cause Analysis", action: "Cost Explorer Deep Dive", details: "Filtering by UsageType identifies NatGateway-Hours in ap-south-1 as the primary cost driver." },
      { stage: "4. Containment & Refund", action: "Termination & Support Ticket", details: "Engineer deletes NAT Gateway, then opens Billing Support Case for Free Tier courtesy refund." }
    ],
    moduleContext: {
      prevModule: "Module 1 - Topic 1: AWS Account Creation & Root Security",
      thisModule: "Module 1 - Topic 2: Accidental Charges & Cost Explorer",
      nextModule: "Module 1 - Topic 3: AWS Global Infrastructure",
      connectionReason: "Establishing cost guardrails is essential before experimenting with regional resources, VPC networking, or compute instances."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="costBgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#costBgGrad)" stroke="#1e293b" stroke-width="2"/>
      
      <!-- Box 1: Spend Ingress -->
      <g transform="translate(30, 45)">
        <rect width="160" height="170" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
        <text x="80" y="26" fill="#ef4444" font-size="11" font-weight="bold" text-anchor="middle">1. COST DETECTION</text>
        <circle cx="80" cy="65" r="20" fill="#ef4444" opacity="0.2"/>
        <text x="80" y="72" fill="#f87171" font-size="20" text-anchor="middle">🚨</text>
        <text x="80" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">CloudWatch Alarm</text>
        <rect x="15" y="125" width="130" height="22" rx="4" fill="#450a0a"/>
        <text x="80" y="140" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">Spend &gt; $0.01 Alert</text>
        <text x="80" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">Zero-Spend Guardrail</text>
      </g>
      
      <!-- Arrow 1 -->
      <path d="M 200 130 L 235 130" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <polygon points="240,130 230,124 230,136" fill="#f59e0b"/>
      
      <!-- Box 2: Budgets & SNS -->
      <g transform="translate(245, 45)">
        <rect width="165" height="170" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="82" y="26" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">2. AWS BUDGETS</text>
        <circle cx="82" cy="65" r="20" fill="#f59e0b" opacity="0.2"/>
        <text x="82" y="72" fill="#fbbf24" font-size="20" text-anchor="middle">📊</text>
        <text x="82" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Predictive Thresholds</text>
        <rect x="15" y="125" width="135" height="22" rx="4" fill="#78350f"/>
        <text x="82" y="140" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle">Email &amp; SNS Alert</text>
        <text x="82" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">Forecast Spike Alarms</text>
      </g>
      
      <!-- Arrow 2 -->
      <path d="M 420 130 L 455 130" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
      <polygon points="460,130 450,124 450,136" fill="#06b6d4"/>
      
      <!-- Box 3: Cost Explorer -->
      <g transform="translate(465, 45)">
        <rect width="170" height="170" rx="12" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="85" y="26" fill="#06b6d4" font-size="11" font-weight="bold" text-anchor="middle">3. COST EXPLORER</text>
        <circle cx="85" cy="65" r="20" fill="#0891b2" opacity="0.2"/>
        <text x="85" y="72" fill="#22d3ee" font-size="20" text-anchor="middle">🔍</text>
        <text x="85" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Usage Attribution</text>
        <rect x="15" y="125" width="140" height="22" rx="4" fill="#164e63"/>
        <text x="85" y="140" fill="#a5f3fc" font-size="9" font-weight="bold" text-anchor="middle">Group by Service/Region</text>
        <text x="85" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">Kill Rogue Elastic IPs/NAT</text>
      </g>
      
      <!-- Arrow 3 -->
      <path d="M 645 130 L 675 130" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
      <polygon points="680,130 670,124 670,136" fill="#10b981"/>
      
      <!-- Box 4: Support Refund -->
      <g transform="translate(685, 45)">
        <rect width="135" height="170" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="67" y="26" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">4. SUPPORT REFUND</text>
        <circle cx="67" cy="65" r="20" fill="#059669" opacity="0.2"/>
        <text x="67" y="72" fill="#34d399" font-size="20" text-anchor="middle">💵</text>
        <text x="67" y="110" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Courtesy Credit</text>
        <rect x="10" y="125" width="115" height="22" rx="4" fill="#064e3b"/>
        <text x="67" y="140" fill="#a7f3d0" font-size="9" font-weight="bold" text-anchor="middle">Billing Case Ticket</text>
        <text x="67" y="160" fill="#94a3b8" font-size="8" text-anchor="middle">One-Time Goodwill Waiver</text>
      </g>
    </svg>`
  },

  'regions-azs-and-edge-infrastructure': {
    moduleNumber: 1,
    title: "AWS Global Infrastructure: Regions, AZs & Edge Locations Architecture",
    category: "Global Infrastructure",
    realDiagramUrl: '/images/aws-vpc/01-default-vpc-architecture.png',
    realDiagramTitle: 'AWS Multi-AZ Regional Infrastructure & High Availability Topology',
    realDiagramCaption: 'Physical architecture of isolated Availability Zones connected via dedicated redundant fiber backbones within each Region.',
    description: "Global traffic ingress routes from end users through nearest Edge Locations, entering the 100GbE private AWS Global Network backbone before reaching isolated Availability Zones within the target Region.",
    flowSteps: ["User Browser -> Anycast Edge Location", "CloudFront CDN Edge Cache", "AWS Global 100GbE Fiber Backbone", "Regional Transit -> Multi-AZ Data Centers"],
    stepByStep: [
      { step: 1, component: "Global End Users", role: "Initiates HTTPS web or API requests from worldwide geographic locations.", why: "Represents distributed client traffic requiring sub-50ms latency." },
      { step: 2, component: "Edge Locations (CloudFront & Route 53)", role: "Anycast DNS routing and static asset edge caching.", why: "Prevents every static file request from hitting origin data centers, cutting bandwidth costs by 80%." },
      { step: 3, component: "AWS Global Fiber Backbone", role: "Private 100GbE redundant optical network carrying traffic across oceans.", why: "Bypasses unpredictable public internet routing and packet loss." },
      { step: 4, component: "Target AWS Region & Multi-AZ Cluster", role: "Isolated geographic data centers hosting VPCs, compute, and databases.", why: "Ensures disaster tolerance so if an entire building loses power, standby AZs take over without downtime." }
    ],
    interRelationships: [
      { from: "End Users", to: "Edge Locations", relation: "Resolves domain via Route 53 Anycast to nearest Point of Presence (PoP).", protocol: "DNS / HTTPS (Port 443)" },
      { from: "Edge Locations", to: "AWS Global Backbone", relation: "Cache misses travel through AWS private fiber instead of the open public internet.", protocol: "Private Dedicated Fiber" },
      { from: "AWS Backbone", to: "Multi-AZ VPC Data Centers", relation: "Hands off dynamic packet to regional Internet Gateways and Load Balancers.", protocol: "TCP / TLS 1.3" }
    ],
    endToEndFlow: [
      { stage: "1. DNS Query", action: "Route 53 Lookup", details: "Browser queries app.example.com; Route 53 returns the IP of the geographically closest CloudFront edge server." },
      { stage: "2. Edge Inspection", action: "CloudFront Cache Check", details: "Edge location checks its local SSD cache. If cached, returns HTML/JS in 12ms." },
      { stage: "3. Backbone Ingress", action: "AWS Private Network Transit", details: "Dynamic API calls are routed over private AWS fiber to target region VPC without public internet hops." },
      { stage: "4. Multi-AZ Handshake", action: "VPC ALB Routing", details: "Regional Application Load Balancer distributes packet across AZ-1 and AZ-2 servers." }
    ],
    moduleContext: {
      prevModule: "Physical Server Hardware & Linux Basics",
      thisModule: "Module 1: AWS Global Infrastructure",
      nextModule: "Module 2: IAM Identity & Access Management",
      connectionReason: "Once you have selected your physical Regions and AZs, you must establish zero-trust security and IAM roles (Module 2) before provisioning any resources inside them."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="2"/>
      
      <!-- Users Tier -->
      <g transform="translate(30, 45)">
        <rect width="130" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 2"/>
        <text x="65" y="30" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">END USERS</text>
        <circle cx="65" cy="75" r="22" fill="#0284c7" opacity="0.3"/>
        <text x="65" y="80" fill="#f8fafc" font-size="20" text-anchor="middle">🌐</text>
        <text x="65" y="125" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Global Clients</text>
        <text x="65" y="145" fill="#94a3b8" font-size="9" text-anchor="middle">Sub-50ms Latency</text>
      </g>
      
      <!-- Arrow 1 -->
      <path d="M 170 130 L 220 130" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
      <polygon points="225,130 215,124 215,136" fill="#06b6d4"/>
      
      <!-- Edge Tier -->
      <g transform="translate(230, 45)">
        <rect width="160" height="170" rx="12" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="80" y="30" fill="#06b6d4" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">EDGE LOCATIONS</text>
        <rect x="15" y="50" width="130" height="45" rx="8" fill="#0f172a" stroke="#0ea5e9" stroke-width="1"/>
        <text x="80" y="70" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Amazon CloudFront</text>
        <text x="80" y="86" fill="#38bdf8" font-size="9" text-anchor="middle">600+ Points of Presence</text>
        <rect x="15" y="105" width="130" height="45" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="1"/>
        <text x="80" y="125" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Amazon Route 53</text>
        <text x="80" y="141" fill="#c084fc" font-size="9" text-anchor="middle">Global DNS Anycast</text>
      </g>
      
      <!-- Arrow 2: Backbone -->
      <path d="M 400 130 L 450 130" stroke="#f59e0b" stroke-width="4" stroke-dasharray="6 3"/>
      <polygon points="455,130 445,124 445,136" fill="#f59e0b"/>
      <text x="425" y="115" fill="#f59e0b" font-size="8" font-weight="bold" text-anchor="middle">100GbE FIBER</text>
      
      <!-- AWS Region Box -->
      <g transform="translate(460, 25)">
        <rect width="360" height="210" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
        <text x="180" y="24" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">AWS REGION (e.g. us-east-1)</text>
        
        <!-- AZ-1 -->
        <g transform="translate(20, 40)">
          <rect width="150" height="145" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="75" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">AZ-1 (us-east-1a)</text>
          <rect x="12" y="38" width="126" height="42" rx="6" fill="#0f172a" stroke="#3b82f6"/>
          <text x="75" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Public Subnet</text>
          <text x="75" y="72" fill="#94a3b8" font-size="8" text-anchor="middle">ALB / NAT Gateway</text>
          <rect x="12" y="88" width="126" height="42" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="75" y="108" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Private Subnet</text>
          <text x="75" y="122" fill="#6ee7b7" font-size="8" text-anchor="middle">EC2 Primary Node</text>
        </g>
        
        <!-- AZ-2 -->
        <g transform="translate(190, 40)">
          <rect width="150" height="145" rx="10" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="75" y="24" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">AZ-2 (us-east-1b)</text>
          <rect x="12" y="38" width="126" height="42" rx="6" fill="#0f172a" stroke="#8b5cf6"/>
          <text x="75" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Public Subnet</text>
          <text x="75" y="72" fill="#94a3b8" font-size="8" text-anchor="middle">ALB Standby</text>
          <rect x="12" y="88" width="126" height="42" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="75" y="108" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Private Subnet</text>
          <text x="75" y="122" fill="#6ee7b7" font-size="8" text-anchor="middle">EC2 Standby Node</text>
        </g>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 2: IAM & Least-Privilege
  // -------------------------------------------------------------------------
  'iam-fundamentals-and-policy-evaluation': {
    moduleNumber: 2,
    title: "IAM Policy Evaluation Engine & STS AssumeRole Flow",
    category: "Identity & Security",
    description: "Evaluates Explicit Deny first, matches Permission Boundaries, verifies Explicit Allow, and generates temporary 1-hour STS session tokens.",
    flowSteps: ["Client Request -> Authentication", "Default Implicit Deny State", "Explicit Deny Check (Instant Block)", "Organization SCP & Boundary", "Explicit Allow -> 1-Hour STS Token"],
    stepByStep: [
      { step: 1, component: "Principal & Context", role: "Identifies who is making the request (IAM User, Role, Lambda Service Principal).", why: "Zero-trust starts by proving identity before evaluating permissions." },
      { step: 2, component: "Explicit Deny Engine", role: "Scans for any statement with 'Effect': 'Deny' matching the action and resource.", why: "In AWS, an Explicit Deny always overrides all Allow statements." },
      { step: 3, component: "SCP & Permission Boundaries", role: "Checks AWS Organizations Service Control Policies and maximum delegated limits.", why: "Prevents account admins from granting themselves unauthorized superuser permissions." },
      { step: 4, component: "Explicit Allow & STS Token Issuer", role: "Verifies matching 'Effect': 'Allow' and issues temporary 1-hour access keys.", why: "Eliminates risky long-term static passwords in application code." }
    ],
    interRelationships: [
      { from: "Compute Node (EC2 / Lambda)", to: "IAM Role", relation: "Instances attach an IAM Instance Profile to assume a role automatically.", protocol: "AWS STS AssumeRole" },
      { from: "IAM Role", to: "Target Resource (S3 / DynamoDB)", relation: "Requests pass only if resource ARN matches policy statement.", protocol: "IAM JSON Policy Evaluation" }
    ],
    endToEndFlow: [
      { stage: "1. API Call", action: "SDK Request", details: "Node.js application queries S3: aws.s3.getObject('my-bucket/data.json')." },
      { stage: "2. Token Fetch", action: "IMDSv2 Query", details: "App queries local EC2 metadata service (169.254.169.254) for STS temporary token." },
      { stage: "3. Policy Evaluation", action: "IAM Engine Match", details: "AWS verifies no Deny rules exist, checks SCP, finds Allow statement for my-bucket/*." },
      { stage: "4. S3 Response", action: "Authorized Download", details: "S3 returns object stream with HTTP 200 OK." }
    ],
    moduleContext: {
      prevModule: "Module 1: AWS Global Infrastructure",
      thisModule: "Module 2: IAM Identity & Access Management",
      nextModule: "Module 3: Amazon VPC Advanced Networking",
      connectionReason: "With identity and least-privilege security established, you now create the private network boundary (VPC) to isolate your infrastructure."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="iamBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#111827"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="240" rx="16" fill="url(#iamBg)" stroke="#1f2937" stroke-width="2"/>
      
      <!-- Principal -->
      <g transform="translate(30, 45)">
        <rect width="130" height="155" rx="10" fill="#1f2937" stroke="#ef4444" stroke-width="1.5"/>
        <text x="65" y="28" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">PRINCIPAL</text>
        <circle cx="65" cy="65" r="20" fill="#ef4444" opacity="0.2"/>
        <text x="65" y="72" font-size="18" text-anchor="middle">👤</text>
        <text x="65" y="105" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">IAM Role / User</text>
        <text x="65" y="122" fill="#9ca3af" font-size="8" text-anchor="middle">API Request</text>
        <text x="65" y="136" fill="#38bdf8" font-size="8" text-anchor="middle">Action: s3:GetObject</text>
      </g>
      
      <path d="M 170 120 L 210 120" stroke="#f87171" stroke-width="2"/>
      <polygon points="215,120 205,115 205,125" fill="#f87171"/>
      
      <!-- Step 1: Explicit Deny -->
      <g transform="translate(225, 45)">
        <rect width="140" height="155" rx="10" fill="#1f2937" stroke="#f97316" stroke-width="1.5"/>
        <text x="70" y="25" fill="#fb923c" font-size="11" font-weight="bold" text-anchor="middle">STEP 1: DENY CHECK</text>
        <rect x="12" y="45" width="116" height="40" rx="6" fill="#0f172a" stroke="#ef4444"/>
        <text x="70" y="65" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Explicit Deny?</text>
        <text x="70" y="78" fill="#94a3b8" font-size="8" text-anchor="middle">Any Deny rule overrides all</text>
        
        <path d="M 70 95 L 70 115" stroke="#ef4444" stroke-width="1.5"/>
        <text x="85" y="108" fill="#ef4444" font-size="8">YES</text>
        <rect x="15" y="118" width="110" height="22" rx="4" fill="#450a0a"/>
        <text x="70" y="133" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">DENIED (HTTP 403)</text>
      </g>
      
      <path d="M 375 120 L 415 120" stroke="#fb923c" stroke-width="2"/>
      <polygon points="420,120 410,115 410,125" fill="#fb923c"/>
      <text x="395" y="112" fill="#10b981" font-size="8">NO</text>
      
      <!-- Step 2: SCP & Boundaries -->
      <g transform="translate(425, 45)">
        <rect width="150" height="155" rx="10" fill="#1f2937" stroke="#a855f7" stroke-width="1.5"/>
        <text x="75" y="25" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">STEP 2: BOUNDARIES</text>
        <rect x="12" y="45" width="126" height="42" rx="6" fill="#0f172a" stroke="#a855f7"/>
        <text x="75" y="65" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Organizations SCP</text>
        <text x="75" y="78" fill="#94a3b8" font-size="8" text-anchor="middle">Guardrail Max Permissions</text>
        <rect x="12" y="98" width="126" height="42" rx="6" fill="#0f172a" stroke="#6366f1"/>
        <text x="75" y="118" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Permission Boundary</text>
        <text x="75" y="131" fill="#94a3b8" font-size="8" text-anchor="middle">Delegated Administrator</text>
      </g>
      
      <path d="M 585 120 L 625 120" stroke="#10b981" stroke-width="2"/>
      <polygon points="630,120 620,115 620,125" fill="#10b981"/>
      <text x="605" y="112" fill="#10b981" font-size="8">PASS</text>
      
      <!-- Step 3: Explicit Allow & STS -->
      <g transform="translate(635, 45)">
        <rect width="180" height="155" rx="10" fill="#1f2937" stroke="#10b981" stroke-width="2"/>
        <text x="90" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">STEP 3: EXPLICIT ALLOW</text>
        <rect x="15" y="45" width="150" height="42" rx="6" fill="#064e3b" stroke="#10b981"/>
        <text x="90" y="65" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">ACCESS GRANTED</text>
        <text x="90" y="79" fill="#6ee7b7" font-size="8" text-anchor="middle">Action Matches Resource</text>
        <rect x="15" y="98" width="150" height="42" rx="6" fill="#0f172a" stroke="#38bdf8"/>
        <text x="90" y="116" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">AWS STS Token Issued</text>
        <text x="90" y="130" fill="#94a3b8" font-size="8" text-anchor="middle">Valid: 3600s (Auto-Rotated)</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 3: Amazon VPC Advanced Networking
  // -------------------------------------------------------------------------
  'vpc-subnetting-gateways-packet-flow': {
    moduleNumber: 3,
    title: "Production 3-Tier VPC Subnetting, Gateways & Packet Routing Flow",
    category: "VPC & Networking",
    realDiagramUrl: '/images/aws-vpc/02-custom-vpc-architecture.png',
    realDiagramTitle: 'Custom Production VPC Architecture vs Default VPC',
    realDiagramCaption: 'Detailed network layout comparing automatic Default VPC routing against isolated Custom 3-Tier VPC subnetting.',
    description: "Multi-AZ VPC containing Public Subnets with Internet Gateway (IGW) and NAT Gateways, Private Subnets for application nodes, and Isolated Database Subnets.",
    flowSteps: ["Internet -> IGW (0.0.0.0/0)", "Public Subnet ALB (Layer 7 Routing)", "Private Subnet EC2 via Stateful Security Group", "Outbound Private Traffic -> NAT Gateway"],
    stepByStep: [
      { step: 1, component: "Internet Gateway (IGW)", role: "Translates public IPs and provides a redundant, auto-scaling gate to the internet.", why: "Required for public subnets to communicate outside the AWS VPC." },
      { step: 2, component: "Public Subnet (ALB & NAT)", role: "Directly receives external requests and hosts outbound NAT gateways.", why: "Isolates the perimeter so backend databases and servers are never directly accessible." },
      { step: 3, component: "Private Application Subnet", role: "Hosts EC2 and Kubernetes worker nodes running business logic.", why: "Protected by stateful security groups allowing traffic strictly from the load balancer." },
      { step: 4, component: "Isolated Database Subnet", role: "Hosts RDS Multi-AZ databases with no route to the internet.", why: "Zero direct exposure prevents external data breaches." }
    ],
    interRelationships: [
      { from: "Internet Gateway", to: "Public Route Table", relation: "Default route 0.0.0.0/0 points to IGW.", protocol: "IPv4 Routing" },
      { from: "Application LB (Public)", to: "EC2 App Workers (Private)", relation: "ALB forwards HTTP traffic to private IPs via Target Group.", protocol: "HTTP (Port 80/443)" },
      { from: "EC2 App Workers", to: "RDS Database", relation: "Private subnet queries over internal port.", protocol: "TCP 5432 (Postgres) / 3306 (MySQL)" }
    ],
    endToEndFlow: [
      { stage: "1. Public Ingress", action: "IGW Traversal", details: "User packet enters VPC through Internet Gateway and is routed to ALB in Public Subnet." },
      { stage: "2. Load Balancing", action: "Layer 7 Decision", details: "ALB inspects HTTP path and forwards request to EC2 instance in Private Subnet 10.0.10.15." },
      { stage: "3. Backend Query", action: "DB Handshake", details: "EC2 queries RDS in Database Subnet 10.0.20.50 via private Security Group rule." },
      { stage: "4. Return Journey", action: "Stateful Return", details: "Response flows back through ALB to user; stateful security groups automatically allow outbound return." }
    ],
    moduleContext: {
      prevModule: "Module 2: IAM Identity & Access Management",
      thisModule: "Module 3: Amazon VPC Advanced Networking",
      nextModule: "Module 4: EC2 & Compute Architecture",
      connectionReason: "Now that you have an isolated network with public and private subnets, you can launch virtual compute servers (EC2 in Module 4) safely inside them."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="250" rx="16" fill="#0b1120" stroke="#334155" stroke-width="2"/>
      
      <!-- Internet & IGW -->
      <g transform="translate(25, 40)">
        <rect width="100" height="80" rx="8" fill="#1e293b" stroke="#38bdf8"/>
        <text x="50" y="35" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">INTERNET</text>
        <text x="50" y="55" fill="#94a3b8" font-size="9" text-anchor="middle">0.0.0.0/0</text>
      </g>
      <path d="M 130 80 L 165 80" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="170,80 160,75 160,85" fill="#38bdf8"/>
      
      <!-- IGW Box -->
      <g transform="translate(175, 45)">
        <rect width="70" height="70" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
        <text x="35" y="35" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">IGW</text>
        <text x="35" y="50" fill="#94a3b8" font-size="8" text-anchor="middle">Gateway</text>
      </g>
      
      <!-- Main VPC Boundary -->
      <g transform="translate(265, 20)">
        <rect width="560" height="220" rx="14" fill="#0f172a" stroke="#6366f1" stroke-width="2"/>
        <text x="280" y="22" fill="#a5b4fc" font-size="12" font-weight="bold" text-anchor="middle">VPC: 10.0.0.0/16 (us-east-1)</text>
        
        <!-- Public Subnet Tier -->
        <g transform="translate(20, 35)">
          <rect width="160" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="80" y="22" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">PUBLIC TIER (10.0.1.0/24)</text>
          <rect x="15" y="35" width="130" height="45" rx="6" fill="#0f172a" stroke="#38bdf8"/>
          <text x="80" y="55" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Application LB</text>
          <text x="80" y="68" fill="#94a3b8" font-size="8" text-anchor="middle">Ports 80 / 443</text>
          <rect x="15" y="95" width="130" height="45" rx="6" fill="#0f172a" stroke="#a855f7"/>
          <text x="80" y="115" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">NAT Gateway</text>
          <text x="80" y="128" fill="#94a3b8" font-size="8" text-anchor="middle">EIP Attached</text>
        </g>
        
        <!-- Private App Tier -->
        <g transform="translate(200, 35)">
          <rect width="160" height="170" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="80" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">PRIVATE APP (10.0.10.0/24)</text>
          <rect x="15" y="35" width="130" height="55" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="80" y="55" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">EC2 Web Worker 1</text>
          <text x="80" y="69" fill="#94a3b8" font-size="8" text-anchor="middle">Security Group Inbound: ALB</text>
          <rect x="15" y="100" width="130" height="55" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="80" y="120" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">EC2 Web Worker 2</text>
          <text x="80" y="134" fill="#94a3b8" font-size="8" text-anchor="middle">Auto Scaling Group</text>
        </g>
        
        <!-- Private DB Tier -->
        <g transform="translate(380, 35)">
          <rect width="160" height="170" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="80" y="22" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">DATABASE (10.0.20.0/24)</text>
          <rect x="15" y="35" width="130" height="55" rx="6" fill="#0f172a" stroke="#f59e0b"/>
          <text x="80" y="55" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">RDS Primary Master</text>
          <text x="80" y="69" fill="#94a3b8" font-size="8" text-anchor="middle">Synchronous Replication</text>
          <rect x="15" y="100" width="130" height="55" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-dasharray="4 2"/>
          <text x="80" y="120" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">RDS Standby (AZ-2)</text>
          <text x="80" y="134" fill="#94a3b8" font-size="8" text-anchor="middle">Auto-Failover Node</text>
        </g>
      </g>
    </svg>`
  },

  'vpc-security-groups-nacls-firewall-flow-logs': {
    moduleNumber: 3,
    title: "Defense-in-Depth VPC Security: Stateful Security Groups, Stateless NACLs & Flow Logs",
    category: "VPC Security & Telemetry",
    realDiagramUrl: '/images/aws-vpc/08-security-groups-vs-nacls.png',
    realDiagramTitle: 'Layered VPC Defense: Stateful Security Groups vs Stateless NACLs',
    realDiagramCaption: 'Dual-tier firewall model comparing subnet-level stateless rule numbers with instance-level stateful connection tracking.',
    description: "Multi-layered perimeter defense where traffic is first evaluated by stateless subnet Network ACLs (ordered numbered rules), then inspected by stateful Security Groups at the ENI, with every accepted and rejected packet recorded by VPC Flow Logs.",
    flowSteps: ["Subnet Border Stateless NACL Check", "ENI-Level Stateful Security Group Gatekeeper", "Automatic Stateful Return Packet Evaluation", "VPC Flow Logs Packet Capture -> CloudWatch"],
    stepByStep: [
      { step: 1, component: "Network ACL (Stateless Perimeter)", role: "First line of defense operating at the subnet boundary with ordered numbered allow/deny rules.", why: "Capable of explicitly blocking malicious IP ranges (e.g. Rule 50 DENY 203.0.113.0/24) before packets reach instances." },
      { step: 2, component: "Security Group (Stateful ENI Armor)", role: "Virtual firewall attached directly to Elastic Network Interfaces (ENIs).", why: "Stateful connection tracking means inbound allow automatically permits return traffic regardless of outbound rules." },
      { step: 3, component: "Ephemeral Return Port Handling", role: "Handles outbound client response ports (1024-65535).", why: "Stateless NACLs require explicit outbound rules for ephemeral return ports; Security Groups handle it automatically." },
      { step: 4, component: "VPC Flow Logs & CloudWatch Insights", role: "Captures IP traffic metadata (src, dst, port, protocol, action) at VPC, Subnet, or ENI level.", why: "Provides forensic visibility to diagnose blocked traffic (REJECT) or verify security policy compliance." }
    ],
    interRelationships: [
      { from: "Public Internet", to: "Stateless NACL", relation: "Inbound packet evaluated against numbered rules in numerical order.", protocol: "Layer 3/4 IP/TCP" },
      { from: "Stateless NACL", to: "Stateful Security Group", relation: "Packets passing NACL reach the ENI security group filter.", protocol: "TCP 80/443/22" },
      { from: "Security Group", to: "Target EC2 Workload", relation: "Permitted traffic enters instance socket; connection state tracked.", protocol: "Internal ENI" },
      { from: "ENI Interface", to: "CloudWatch Flow Logs", relation: "Every ACCEPT/REJECT event is published for log analysis.", protocol: "AWS Flow Log V5" }
    ],
    endToEndFlow: [
      { stage: "1. Subnet Boundary Check", action: "NACL Rule Processing", details: "Packet arrives at Subnet 10.0.1.0/24; NACL evaluates Rule 100 ALLOW 0.0.0.0/0 on port 443." },
      { stage: "2. ENI Firewall Check", action: "Security Group Rule Processing", details: "Packet reaches EC2 ENI; SG rule allows TCP 443 from anywhere; connection state recorded in tracking table." },
      { stage: "3. Response Egress", action: "Stateful Auto-Return", details: "Response packet bypasses SG outbound rules because inbound state is active; NACL verifies outbound Rule 100." },
      { stage: "4. Telemetry Telemetry", action: "VPC Flow Log Emitted", details: "Flow log record `2 123456789012 eni-0123 198.51.100.4 10.0.1.15 54321 443 6 15 8400 1620000000 1620000060 ACCEPT OK` written." }
    ],
    moduleContext: {
      prevModule: "Module 3 - Topic 1: VPC Subnetting, Gateways & Packet Flow",
      thisModule: "Module 3 - Topic 2: VPC Security Groups, NACLs & Flow Logs",
      nextModule: "Module 3 - Topic 3: Hybrid Connectivity & Advanced Routing",
      connectionReason: "Securing subnet perimeters and network interfaces with NACLs and Security Groups prevents lateral attacks and ensures full auditability before linking external networks."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="secBgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#secBgGrad)" stroke="#1e293b" stroke-width="2"/>
      
      <!-- Tier 1: Stateless NACL -->
      <g transform="translate(30, 45)">
        <rect width="170" height="170" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="85" y="24" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">1. STATELESS NACL</text>
        <text x="85" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">Subnet Boundary Defense</text>
        <rect x="15" y="55" width="140" height="24" rx="4" fill="#78350f"/>
        <text x="85" y="71" fill="#fef08a" font-size="9" font-weight="bold" text-anchor="middle">Rule 50: DENY 203.0.113.0/24</text>
        <rect x="15" y="85" width="140" height="24" rx="4" fill="#064e3b"/>
        <text x="85" y="101" fill="#a7f3d0" font-size="9" font-weight="bold" text-anchor="middle">Rule 100: ALLOW 0.0.0.0/0</text>
        <rect x="15" y="115" width="140" height="24" rx="4" fill="#450a0a"/>
        <text x="85" y="131" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">Rule *: DENY ALL</text>
        <text x="85" y="155" fill="#cbd5e1" font-size="8" text-anchor="middle">Needs Ephemeral Outbound</text>
      </g>
      
      <!-- Arrow 1 -->
      <path d="M 210 130 L 245 130" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
      <polygon points="250,130 240,124 240,136" fill="#38bdf8"/>
      
      <!-- Tier 2: Stateful Security Group -->
      <g transform="translate(255, 45)">
        <rect width="180" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">2. STATEFUL SEC GROUP</text>
        <text x="90" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">Instance ENI Virtual Firewall</text>
        <rect x="15" y="55" width="150" height="30" rx="4" fill="#0c4a6e"/>
        <text x="90" y="74" fill="#bae6fd" font-size="9" font-weight="bold" text-anchor="middle">ALLOW TCP 443 (HTTPS)</text>
        <circle cx="90" cy="115" r="18" fill="#0284c7" opacity="0.3"/>
        <text x="90" y="121" fill="#38bdf8" font-size="16" text-anchor="middle">⚡</text>
        <text x="90" y="148" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Auto-Return Allowed</text>
        <text x="90" y="162" fill="#94a3b8" font-size="8" text-anchor="middle">Connection Tracking Table</text>
      </g>
      
      <!-- Arrow 2 -->
      <path d="M 445 130 L 480 130" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
      <polygon points="485,130 475,124 475,136" fill="#10b981"/>
      
      <!-- Tier 3: Compute Workload -->
      <g transform="translate(490, 45)">
        <rect width="160" height="170" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="80" y="24" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">3. EC2 / CONTAINER</text>
        <text x="80" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">Application Workload</text>
        <circle cx="80" cy="75" r="22" fill="#059669" opacity="0.2"/>
        <text x="80" y="82" fill="#34d399" font-size="20" text-anchor="middle">🖥️</text>
        <text x="80" y="118" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Private IP: 10.0.1.15</text>
        <text x="80" y="138" fill="#94a3b8" font-size="9" text-anchor="middle">Listens on Port 443</text>
        <text x="80" y="158" fill="#a7f3d0" font-size="8" text-anchor="middle">Zero Internet Public IP</text>
      </g>
      
      <!-- Arrow 3 -->
      <path d="M 660 130 L 690 130" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <polygon points="695,130 685,124 685,136" fill="#a855f7"/>
      
      <!-- Tier 4: VPC Flow Logs -->
      <g transform="translate(700, 45)">
        <rect width="125" height="170" rx="12" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
        <text x="62" y="24" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle">4. FLOW LOGS</text>
        <text x="62" y="40" fill="#94a3b8" font-size="8" text-anchor="middle">Telemetry &amp; Audit</text>
        <rect x="10" y="55" width="105" height="30" rx="4" fill="#064e3b"/>
        <text x="62" y="74" fill="#a7f3d0" font-size="8" font-weight="bold" text-anchor="middle">ACCEPT OK</text>
        <rect x="10" y="95" width="105" height="30" rx="4" fill="#450a0a"/>
        <text x="62" y="114" fill="#fca5a5" font-size="8" font-weight="bold" text-anchor="middle">REJECT NODATA</text>
        <text x="62" y="148" fill="#e9d5ff" font-size="8" text-anchor="middle">CloudWatch Log Group</text>
      </g>
    </svg>`
  },

  'vpc-peering-transit-gateway-endpoints-vpn': {
    moduleNumber: 3,
    title: "Enterprise VPC Interconnect: Peering, Transit Gateway, PrivateLink & Site-to-Site VPN",
    category: "Hybrid & Multi-VPC Networking",
    realDiagramUrl: '/images/aws-vpc/12-transit-gateway-hub-and-spoke.png',
    realDiagramTitle: 'AWS Transit Gateway (TGW) Regional Hub-and-Spoke Topology',
    realDiagramCaption: 'Centralized cloud router interconnecting multi-tier VPCs, partner accounts, and on-premises data centers.',
    description: "Scalable hub-and-spoke interconnect topology connecting multiple VPCs, on-premises data centers via IPsec VPN / Direct Connect, and accessing AWS PaaS services privately via VPC Endpoints without traversing the public internet.",
    flowSteps: ["VPC-A to Spoke VPC-B Peering", "Centralized AWS Transit Gateway (TGW) Hub", "Gateway & Interface VPC Endpoints (PrivateLink)", "Hybrid On-Premises IPsec VPN Tunneling"],
    stepByStep: [
      { step: 1, component: "AWS Transit Gateway (TGW)", role: "Regional cloud router acting as a centralized hub for hundreds of VPCs and on-prem networks.", why: "Eliminates complex N*(N-1)/2 VPC peering mesh topologies with a clean hub-and-spoke model." },
      { step: 2, component: "VPC Peering Connection", role: "Direct, high-performance private optical interconnect between two specific VPCs.", why: "Zero bandwidth bottlenecks and lowest possible latency for high-throughput 1-to-1 links." },
      { step: 3, component: "VPC Endpoints (PrivateLink & Gateway)", role: "Keeps AWS API traffic (S3, DynamoDB, SSM) entirely inside the private AWS network.", why: "Prevents traffic from traversing the internet, reducing NAT Gateway data processing fees." },
      { step: 4, component: "Site-to-Site VPN & Direct Connect", role: "Encrypted IPsec tunnels connecting corporate on-prem data centers to the AWS Transit Gateway.", why: "Enables secure hybrid cloud compute, disaster recovery, and database migration." }
    ],
    interRelationships: [
      { from: "Spoke VPC-A", to: "Transit Gateway", relation: "Attached via TGW Subnet ENI Attachment.", protocol: "AWS Private Fiber" },
      { from: "Transit Gateway", to: "Spoke VPC-B", relation: "Routes packets based on TGW Route Table associations.", protocol: "BGP / AWS Backbone" },
      { from: "Spoke VPC", to: "S3 Gateway Endpoint", relation: "Prefix list `pl-63a5400a` added to VPC route table.", protocol: "Private HTTPS (No NAT)" },
      { from: "On-Prem Gateway", to: "Transit Gateway", relation: "Dual IPsec tunnels with BGP dynamic routing.", protocol: "IPsec / BGP ASN 64512" }
    ],
    endToEndFlow: [
      { stage: "1. Cross-VPC Request", action: "TGW Route Lookup", details: "App in VPC-A (10.1.0.0/16) queries microservice in VPC-B (10.2.0.0/16); VPC route table sends packet to `tgw-xxxx`." },
      { stage: "2. Hub Forwarding", action: "Transit Hub Routing", details: "Transit Gateway inspects destination IP, matches VPC-B attachment route, and injects packet into VPC-B ENI." },
      { stage: "3. Private PaaS Query", action: "PrivateLink Resolution", details: "App queries DynamoDB; DNS resolves to VPC Endpoint private IP; packet bypasses NAT Gateway completely." },
      { stage: "4. Hybrid Sync", action: "IPsec Tunnel Egress", details: "Nightly backup sync pushes replica to On-Prem Data Center through IPsec VPN tunnel over AWS backbone." }
    ],
    moduleContext: {
      prevModule: "Module 3 - Topic 2: VPC Security Groups, NACLs & Flow Logs",
      thisModule: "Module 3 - Topic 3: Hybrid Connectivity & Advanced Routing",
      nextModule: "Module 4: EC2 & Compute Architecture",
      connectionReason: "Completing multi-VPC hub routing and private endpoints provides the enterprise networking foundation before deploying distributed EC2 workloads in Module 4."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="tgwBgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#tgwBgGrad)" stroke="#1e293b" stroke-width="2"/>
      
      <!-- Spoke VPC-A -->
      <g transform="translate(30, 35)">
        <rect width="150" height="85" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="75" y="22" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">SPOKE VPC-A</text>
        <text x="75" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">10.1.0.0/16 (App Tier)</text>
        <rect x="15" y="55" width="120" height="20" rx="4" fill="#0c4a6e"/>
        <text x="75" y="68" fill="#bae6fd" font-size="8" font-weight="bold" text-anchor="middle">TGW Attachment A</text>
      </g>
      
      <!-- Spoke VPC-B -->
      <g transform="translate(30, 140)">
        <rect width="150" height="85" rx="10" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="75" y="22" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">SPOKE VPC-B</text>
        <text x="75" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">10.2.0.0/16 (Data Tier)</text>
        <rect x="15" y="55" width="120" height="20" rx="4" fill="#164e63"/>
        <text x="75" y="68" fill="#a5f3fc" font-size="8" font-weight="bold" text-anchor="middle">TGW Attachment B</text>
      </g>
      
      <!-- Center: Transit Gateway Hub -->
      <g transform="translate(250, 40)">
        <rect width="210" height="180" rx="14" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
        <circle cx="105" cy="45" r="22" fill="#7c3aed" opacity="0.3"/>
        <text x="105" y="52" fill="#a78bfa" font-size="22" text-anchor="middle">🔀</text>
        <text x="105" y="85" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">AWS TRANSIT GATEWAY</text>
        <text x="105" y="102" fill="#c084fc" font-size="9" text-anchor="middle">Central Regional Cloud Router</text>
        <rect x="15" y="115" width="180" height="24" rx="4" fill="#4c1d95"/>
        <text x="105" y="131" fill="#ede9fe" font-size="9" font-weight="bold" text-anchor="middle">Hub-and-Spoke Topology</text>
        <text x="105" y="155" fill="#94a3b8" font-size="8" text-anchor="middle">BGP Dynamic Route Tables</text>
      </g>
      
      <!-- Lines connecting Spokes to TGW -->
      <path d="M 180 77 L 250 110" stroke="#8b5cf6" stroke-width="2.5"/>
      <path d="M 180 182 L 250 150" stroke="#8b5cf6" stroke-width="2.5"/>
      
      <!-- Top Right: VPC Endpoints -->
      <g transform="translate(530, 35)">
        <rect width="180" height="85" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">VPC ENDPOINTS (PrivateLink)</text>
        <text x="90" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Amazon S3 &amp; DynamoDB</text>
        <rect x="15" y="55" width="150" height="20" rx="4" fill="#064e3b"/>
        <text x="90" y="68" fill="#a7f3d0" font-size="8" font-weight="bold" text-anchor="middle">Zero Internet / Zero NAT Fees</text>
      </g>
      
      <!-- Bottom Right: On-Premises & VPN -->
      <g transform="translate(530, 140)">
        <rect width="180" height="85" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="22" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">CORPORATE DATA CENTER</text>
        <text x="90" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">On-Premises Hybrid Network</text>
        <rect x="15" y="55" width="150" height="20" rx="4" fill="#78350f"/>
        <text x="90" y="68" fill="#fde68a" font-size="8" font-weight="bold" text-anchor="middle">Site-to-Site IPsec VPN / DX</text>
      </g>
      
      <!-- Lines connecting TGW to Right side -->
      <path d="M 460 110 L 530 77" stroke="#10b981" stroke-width="2.5"/>
      <path d="M 460 150 L 530 182" stroke="#f59e0b" stroke-width="2.5"/>
      
      <!-- Badges on right side -->
      <text x="785" y="85" fill="#10b981" font-size="20" text-anchor="middle">🔒</text>
      <text x="785" y="188" fill="#f59e0b" font-size="20" text-anchor="middle">🏢</text>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 16: Git & GitHub
  // -------------------------------------------------------------------------
  'git-fundamentals-branching-merge-strategies': {
    moduleNumber: 16,
    title: "Git Three-Tree Architecture & Fast-Forward vs 3-Way Merge Flow",
    category: "Source Control",
    description: "Visualizes the transition of files across Working Directory, Staging Index, and Commit DAG, comparing Fast-Forward linear merges against 3-Way merge commits with conflict resolution.",
    flowSteps: ["Working Directory (Modified)", "git add -> Staging Index", "git commit -> Local Repository DAG", "git push -> GitHub Remote Origin"],
    stepByStep: [
      { step: 1, component: "Working Directory", role: "Actual local files on the engineer's filesystem.", why: "Allows active editing and debugging before preparing commits." },
      { step: 2, component: "Staging Index (.git/index)", role: "Binary staging area preparing the next snapshot.", why: "Enables granular commits by choosing exactly which line changes to commit with 'git add'." },
      { step: 3, component: "Local Repository (.git DAG)", role: "Immutable cryptographic tree of commit snapshots with SHA hashes.", why: "Ensures version history can never be tampered with or accidentally lost." },
      { step: 4, component: "Remote GitHub Repository", role: "Centralized collaboration hub enforcing Pull Requests and CI checks.", why: "Acts as the single source of truth for the entire engineering organization." }
    ],
    interRelationships: [
      { from: "Working Directory", to: "Staging Area", relation: "Changes staged via 'git add'.", protocol: "Git File Indexing" },
      { from: "Staging Area", to: "Local Commit DAG", relation: "Snapshots committed via 'git commit -m'.", protocol: "SHA-1/SHA-256 DAG Snapshot" },
      { from: "Local Git", to: "GitHub Remote", relation: "Pushes commits over SSH or HTTPS.", protocol: "Git Packfile Protocol" },
      { from: "GitHub Remote", to: "Jenkins CI/CD", relation: "Fires automated Webhook on PR merge.", protocol: "HTTPS Webhook POST" }
    ],
    endToEndFlow: [
      { stage: "1. Code Edit", action: "File Saved", details: "Engineer updates src/index.js. File is marked 'modified' in Working Directory." },
      { stage: "2. Stage", action: "git add", details: "Changes are indexed in staging area (.git/index)." },
      { stage: "3. Commit", action: "git commit", details: "Immutable snapshot created with commit hash 7a8b9c and author metadata." },
      { stage: "4. Push & PR", action: "git push origin", details: "Feature branch is pushed to GitHub; engineer opens Pull Request with peer review." }
    ],
    moduleContext: {
      prevModule: "Module 15: AWS Advanced Architecture & Pro Tips",
      thisModule: "Module 16: Git & GitHub Enterprise Source Control",
      nextModule: "Module 17: Jenkins Enterprise Pipeline Automation",
      connectionReason: "Once code is tracked in GitHub, you need Jenkins (Module 17) to automatically test, compile, and build the code on every commit."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#f97316" stroke-width="2"/>
      
      <!-- Working Directory -->
      <g transform="translate(30, 45)">
        <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
        <text x="80" y="28" fill="#fdba74" font-size="11" font-weight="bold" text-anchor="middle">1. WORKING DIRECTORY</text>
        <rect x="15" y="45" width="130" height="40" rx="6" fill="#0f172a" stroke="#f97316"/>
        <text x="80" y="65" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Unstaged Changes</text>
        <text x="80" y="78" fill="#fdba74" font-size="8" text-anchor="middle">git status (Red)</text>
        <text x="80" y="115" fill="#94a3b8" font-size="9" text-anchor="middle">Local sandbox on disk</text>
        <text x="80" y="132" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Command: git add .</text>
      </g>
      
      <path d="M 200 120 L 240 120" stroke="#f97316" stroke-width="2"/>
      <polygon points="245,120 235,115 235,125" fill="#f97316"/>
      
      <!-- Staging Index -->
      <g transform="translate(250, 45)">
        <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="80" y="28" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. STAGING INDEX</text>
        <rect x="15" y="45" width="130" height="40" rx="6" fill="#064e3b" stroke="#10b981"/>
        <text x="80" y="65" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Staged for Commit</text>
        <text x="80" y="78" fill="#6ee7b7" font-size="8" text-anchor="middle">git status (Green)</text>
        <text x="80" y="115" fill="#94a3b8" font-size="9" text-anchor="middle">Prepared snapshot</text>
        <text x="80" y="132" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Command: git commit</text>
      </g>
      
      <path d="M 420 120 L 460 120" stroke="#10b981" stroke-width="2"/>
      <polygon points="465,120 455,115 455,125" fill="#10b981"/>
      
      <!-- Local Repo -->
      <g transform="translate(470, 45)">
        <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="80" y="28" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">3. LOCAL REPO (.git)</text>
        <rect x="15" y="45" width="130" height="40" rx="6" fill="#172554" stroke="#3b82f6"/>
        <text x="80" y="65" fill="#bfdbfe" font-size="10" font-weight="bold" text-anchor="middle">Commit History DAG</text>
        <text x="80" y="78" fill="#93c5fd" font-size="8" text-anchor="middle">SHA-1 / SHA-256 Hashes</text>
        <text x="80" y="115" fill="#94a3b8" font-size="9" text-anchor="middle">Immutable snapshots</text>
        <text x="80" y="132" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Command: git push</text>
      </g>
      
      <path d="M 640 120 L 680 120" stroke="#3b82f6" stroke-width="2"/>
      <polygon points="685,120 675,115 675,125" fill="#3b82f6"/>
      
      <!-- Remote GitHub -->
      <g transform="translate(690, 45)">
        <rect width="130" height="155" rx="12" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
        <text x="65" y="28" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">4. GITHUB ORIGIN</text>
        <circle cx="65" cy="65" r="20" fill="#a855f7" opacity="0.3"/>
        <text x="65" y="72" font-size="20" text-anchor="middle">🐙</text>
        <text x="65" y="110" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Remote Branches</text>
        <text x="65" y="125" fill="#d8b4fe" font-size="8" text-anchor="middle">Pull Requests &amp; CI</text>
      </g>
      
      <!-- Reverse Unstaging Arrow -->
      <path d="M 250 185 L 200 185" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="3"/>
      <polygon points="195,185 205,180 205,190" fill="#f43f5e"/>
      <text x="225" y="200" fill="#fb7185" font-size="7.5" font-family="monospace" text-anchor="middle">git rm --cached</text>
      <text x="225" y="210" fill="#fb7185" font-size="7" font-family="monospace" text-anchor="middle">(unstage to disk)</text>
    </svg>`
  },

  'git-command-suite-cheat-sheet-mastery': {
    moduleNumber: 16,
    title: "Atlassian Git Cheat Sheet Command Flow & Operational Matrix",
    category: "Source Control",
    description: "Visualizes the complete operational domains of the Atlassian Git Cheat Sheet: Git Basics, Undoing Changes, History Rewriting, Branching, Remote Synchronization, and Advanced Power Options.",
    flowSteps: ["1. Git Basics (init, add, commit)", "2. Undoing (rm --cached, reset, clean -n)", "3. History & Reflog (amend, rebase -i)", "4. Remote Sync (pull --rebase, push --tags)"],
    stepByStep: [
      { step: 1, component: "Git Basics & Config", role: "Repository initialization, global identity attribution, and basic staging/commit operations.", why: "Sets up the fundamental version control baseline for any project." },
      { step: 2, component: "Undoing Changes", role: "Safe unstaging with 'git rm --cached' and untracked workspace cleaning with dry-run 'git clean -n'.", why: "Prevents committing unwanted files or secrets without risking local disk data loss." },
      { step: 3, component: "History Rewriting & Reflog", role: "Interactive rebasing ('git rebase -i') and safety ledger audit with 'git reflog'.", why: "Ensures commit history remains clean, linear, and fully auditable before submitting pull requests." },
      { step: 4, component: "Remote Repositories", role: "Rebase pulling ('git pull --rebase') and explicit tag synchronization ('git push --tags').", why: "Maintains synchronization with remote team branches without creating cluttered merge commits." }
    ],
    interRelationships: [
      { from: "Working Directory", to: "Staging Index", relation: "Staged with 'git add'; unstaged with 'git rm --cached'.", protocol: "Local Disk Indexing" },
      { from: "Staging Index", to: "Commit DAG", relation: "Recorded permanently with 'git commit -m'.", protocol: "Cryptographic SHA DAG" },
      { from: "Commit DAG", to: "Git Reflog", relation: "Every HEAD transition recorded in reflog ledger.", protocol: "Local Reference Journal" },
      { from: "Commit DAG", to: "Remote Origin", relation: "Rebased and synchronized via Smart HTTP / SSH.", protocol: "Git Packfile Protocol" }
    ],
    endToEndFlow: [
      { stage: "1. Setup & Init", action: "git init && git config", details: "Creates .git repository structure and configures global user identity and aliases." },
      { stage: "2. Stage & Diff", action: "git add && git diff --cached", details: "Indexes changes selectively and reviews staged diffs against HEAD." },
      { stage: "3. Commit & Log", action: "git commit -m && git log", details: "Creates atomic commit snapshot and inspects DAG with 'git log --graph --oneline'." },
      { stage: "4. Sync Remotes", action: "git pull --rebase && git push", details: "Rebases local feature commits onto remote changes and pushes release tags." }
    ],
    moduleContext: {
      prevModule: "Module 15: AWS Advanced Architecture & Pro Tips",
      thisModule: "Module 16: Git & GitHub Enterprise Source Control",
      nextModule: "Module 17: Jenkins Enterprise Pipeline Automation",
      connectionReason: "Mastery of the Git cheat sheet commands is prerequisite to writing automated CI/CD pipeline checkout steps in Jenkins and GitHub Actions."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#38bdf8" stroke-width="2"/>
      
      <!-- Box 1: Basics -->
      <g transform="translate(25, 35)">
        <rect width="180" height="180" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="25" fill="#38bdf8" font-size="10.5" font-weight="bold" text-anchor="middle">1. GIT BASICS</text>
        <rect x="10" y="38" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="57" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">git init [dir] | clone</text>
        <rect x="10" y="74" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="93" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">git config --global</text>
        <rect x="10" y="110" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="129" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">git add &lt;file&gt; / .</text>
        <text x="90" y="162" fill="#94a3b8" font-size="8.5" text-anchor="middle">Status &amp; Diffing</text>
      </g>
      
      <path d="M 215 125 L 235 125" stroke="#38bdf8" stroke-width="2"/>
      
      <!-- Box 2: Undoing -->
      <g transform="translate(245, 35)">
        <rect width="180" height="180" rx="12" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="90" y="25" fill="#fb7185" font-size="10.5" font-weight="bold" text-anchor="middle">2. UNDOING &amp; CLEANUP</text>
        <rect x="10" y="38" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="57" fill="#fb7185" font-size="8.5" font-family="monospace" text-anchor="middle">git rm --cached &lt;file&gt;</text>
        <rect x="10" y="74" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="93" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">git reset &lt;file&gt; / --hard</text>
        <rect x="10" y="110" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="129" fill="#fb7185" font-size="9" font-family="monospace" text-anchor="middle">git clean -n (dry run)</text>
        <text x="90" y="162" fill="#94a3b8" font-size="8.5" text-anchor="middle">Safe rollback &amp; revert</text>
      </g>
      
      <path d="M 435 125 L 455 125" stroke="#f43f5e" stroke-width="2"/>
      
      <!-- Box 3: History & Reflog -->
      <g transform="translate(465, 35)">
        <rect width="180" height="180" rx="12" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
        <text x="90" y="25" fill="#c084fc" font-size="10.5" font-weight="bold" text-anchor="middle">3. REWRITE &amp; REFLOG</text>
        <rect x="10" y="38" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="57" fill="#c084fc" font-size="9" font-family="monospace" text-anchor="middle">git commit --amend</text>
        <rect x="10" y="74" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="93" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">git rebase -i &lt;base&gt;</text>
        <rect x="10" y="110" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="90" y="129" fill="#c084fc" font-size="8.5" font-family="monospace" text-anchor="middle">git reflog --relative</text>
        <text x="90" y="162" fill="#94a3b8" font-size="8.5" text-anchor="middle">Linear history cleanup</text>
      </g>
      
      <path d="M 655 125 L 675 125" stroke="#a855f7" stroke-width="2"/>
      
      <!-- Box 4: Remotes -->
      <g transform="translate(685, 35)">
        <rect width="140" height="180" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="70" y="25" fill="#34d399" font-size="10.5" font-weight="bold" text-anchor="middle">4. REMOTE SYNC</text>
        <rect x="10" y="38" width="120" height="30" rx="6" fill="#0f172a"/>
        <text x="70" y="57" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">pull --rebase</text>
        <rect x="10" y="74" width="120" height="30" rx="6" fill="#0f172a"/>
        <text x="70" y="93" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">push --tags</text>
        <rect x="10" y="110" width="120" height="30" rx="6" fill="#0f172a"/>
        <text x="70" y="129" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">push --all</text>
        <text x="70" y="162" fill="#94a3b8" font-size="8" text-anchor="middle">Team synchronization</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 17: Enterprise Jenkins CI/CD Automation
  // -------------------------------------------------------------------------
  'jenkins-architecture-master-agents': {
    moduleNumber: 17,
    title: "Jenkins Controller-Agent Architecture, Linux Setup & Global Security (RBAC)",
    category: "CI/CD & Jenkins",
    realDiagramUrl: '/images/jenkins/02-jenkins-core-architecture.png',
    realDiagramTitle: 'Jenkins Controller-Agent Distributed Architecture',
    realDiagramCaption: 'Official architecture diagram illustrating Master-Agent orchestration, build executors, and TCP/JNLP remoting.',
    description: "Distributed Jenkins deployment on Linux (RHEL/CentOS): systemd service lifecycle, initialAdminPassword unlocking, Global Security realms, Role Strategy RBAC matrix, and 0-executor Controller delegating to dedicated labeled agents.",
    flowSteps: ["RHEL Java 17 + YUM Install", "Systemd Daemon & initialAdminPassword Unlock", "Configure Global Security & Role Strategy RBAC", "Controller Executors = 0 Isolation", "Labeled Agent Workload Dispatch"],
    stepByStep: [
      { step: 1, component: "RHEL/CentOS Linux Host", role: "Hosts Java 17 OpenJDK prerequisite and runs the Jenkins daemon on port 8080.", why: "Jenkins executes on the JVM and requires reliable systemd service lifecycle management." },
      { step: 2, component: "Initial Admin Password", role: "Stored at /var/lib/jenkins/secrets/initialAdminPassword to unlock the browser wizard.", why: "Protects newly initialized servers from unauthorized access until an admin account is created." },
      { step: 3, component: "Jenkins Controller (Master)", role: "Orchestrates job scheduling, hosts the web console, and manages user credentials with 0 build executors.", why: "Prevents heavy build tasks from exhausting Controller CPU/memory or crashing the web interface." },
      { step: 4, component: "Role Strategy Plugin", role: "Enforces granular Role-Based Access Control (RBAC), scoping Developer and QA accounts.", why: "Replaces dangerous 'logged-in users can do anything' setting with strict least-privilege security." },
      { step: 5, component: "Dedicated Worker Agents", role: "Separate machines/containers executing builds targeted via labels (agent { label 'linux-builder' }).", why: "Isolates build environments and scales build execution capacity horizontally." }
    ],
    interRelationships: [
      { from: "Linux Systemd", to: "Jenkins Controller", relation: "Manages daemon process and port 8080 binding.", protocol: "systemctl / POSIX Signals" },
      { from: "User / Browser", to: "Jenkins Security Realm", relation: "Authenticates via local database or LDAP.", protocol: "HTTPS / Session Cookie" },
      { from: "Role Strategy", to: "Job Permissions", relation: "Restricts QA to Job/Read and Job/Build without Configure.", protocol: "Jenkins Internal ACL" },
      { from: "Controller Scheduler", to: "Worker Agents", relation: "Dispatches workspace tasks over inbound JNLP / SSH.", protocol: "TCP Port 50000 / SSH Port 22" }
    ],
    endToEndFlow: [
      { stage: "1. Host Setup", action: "yum install java-17 jenkins", details: "Installs prerequisite JVM runtime, imports RPM signing key, and registers systemd service." },
      { stage: "2. Service Boot", action: "systemctl enable --now jenkins", details: "Binds port 8080, writes initialAdminPassword to disk, and presents setup wizard." },
      { stage: "3. RBAC Lockdown", action: "Role Strategy Configuration", details: "Creates Developer and QA roles, restricting configuration access and granting least privilege." },
      { stage: "4. Node Isolation", action: "Set Built-In Executors to 0", details: "Controller is reserved 100% for orchestration; heavy build execution is disabled on master." },
      { stage: "5. Agent Scheduling", action: "agent { label 'linux-builder' }", details: "Builds dispatch to dedicated agent nodes based on environment labels." }
    ],
    moduleContext: {
      prevModule: "Module 16: Git & GitHub – Enterprise Source Control",
      thisModule: "Module 17: Jenkins – Enterprise CI/CD Automation",
      nextModule: "Module 18: Docker – Modern Containerization Deep Dive",
      connectionReason: "Source code managed in Git is orchestrated through automated CI/CD pipelines in Jenkins."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#f59e0b" stroke-width="2"/>
      
      <!-- Host & Setup -->
      <g transform="translate(25, 45)">
        <rect width="160" height="160" rx="10" fill="#1e293b" stroke="#38bdf8"/>
        <text x="80" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">RHEL/CentOS Host</text>
        <rect x="10" y="38" width="140" height="26" rx="4" fill="#0f172a"/>
        <text x="80" y="55" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">Java 17 OpenJDK</text>
        <rect x="10" y="70" width="140" height="26" rx="4" fill="#0f172a"/>
        <text x="80" y="87" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">systemctl enable</text>
        <rect x="10" y="102" width="140" height="45" rx="4" fill="#0f172a"/>
        <text x="80" y="120" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">initialAdminPassword</text>
        <text x="80" y="136" fill="#94a3b8" font-size="7" text-anchor="middle">/var/lib/jenkins/secrets/</text>
      </g>
      
      <path d="M 195 125 L 235 125" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
      
      <!-- Controller -->
      <g transform="translate(245, 35)">
        <rect width="250" height="180" rx="10" fill="#1e293b" stroke="#f59e0b"/>
        <text x="125" y="25" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Jenkins Controller (Master)</text>
        <rect x="15" y="38" width="220" height="30" rx="4" fill="#0f172a"/>
        <text x="125" y="58" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">Executors: 0 (No build execution)</text>
        <rect x="15" y="75" width="220" height="45" rx="4" fill="#0f172a"/>
        <text x="125" y="93" fill="#38bdf8" font-size="9" font-family="system-ui" text-anchor="middle" font-weight="bold">Role Strategy RBAC</text>
        <text x="125" y="108" fill="#94a3b8" font-size="8" text-anchor="middle">Developer &amp; QA Least Privilege</text>
        <rect x="15" y="127" width="220" height="30" rx="4" fill="#0f172a"/>
        <text x="125" y="147" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">Port 8080 (UI) &amp; 50000 (JNLP)</text>
      </g>
      
      <path d="M 505 95 L 545 75" stroke="#10b981" stroke-width="2"/>
      <path d="M 505 155 L 545 175" stroke="#a855f7" stroke-width="2"/>
      
      <!-- Agents -->
      <g transform="translate(555, 30)">
        <rect width="265" height="85" rx="8" fill="#1c2541" stroke="#10b981"/>
        <text x="132" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Agent 1: Linux Build Node</text>
        <text x="132" y="44" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">label: 'linux-builder'</text>
        <text x="132" y="65" fill="#94a3b8" font-size="8" text-anchor="middle">Executes: Maven, npm, Docker builds</text>
      </g>
      
      <g transform="translate(555, 135)">
        <rect width="265" height="85" rx="8" fill="#1c2541" stroke="#a855f7"/>
        <text x="132" y="24" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">Agent 2: Selenium QA Node</text>
        <text x="132" y="44" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">label: 'selenium-qa'</text>
        <text x="132" y="65" fill="#94a3b8" font-size="8" text-anchor="middle">Executes: Headless Chrome / Xvfb suites</text>
      </g>
    </svg>`
  },

  'declarative-jenkinsfile-production-pipelines': {
    moduleNumber: 17,
    title: "Build Triggers, SCM Integration & Declarative Pipelines (Jenkinsfile & Cron Scheduling)",
    category: "CI/CD & Jenkins",
    realDiagramUrl: '/images/jenkins/07-declarative-pipeline-syntax.png',
    realDiagramTitle: 'Declarative Pipeline Grammar & Execution Lifecycle',
    realDiagramCaption: 'Syntactic structure of enterprise Jenkinsfiles featuring pipeline, agent, stages, steps, and post condition blocks.',
    description: "Event-driven continuous integration with Declarative Jenkinsfiles: GitHub webhooks (/github-webhook/ with GITScm polling trigger), 5-field cron scheduling, multi-stage pipeline stages, interactive human approval gates, and failure notifications.",
    flowSteps: ["GitHub Webhook Event Trigger", "Declarative Jenkinsfile SCM Checkout", "Compile & Test Stages", "Interactive Input Approval Gate", "post { failure / always } Action"],
    stepByStep: [
      { step: 1, component: "GitHub Push Webhook", role: "Dispatches HTTP POST to /github-webhook/ upon code commits.", why: "Instant event-driven builds with zero network polling overhead." },
      { step: 2, component: "Build Trigger Routing", role: "Matches repository URL and activates 'GitHub hook trigger for GITScm polling'.", why: "Ensures Jenkins immediately schedules matching pipeline jobs." },
      { step: 3, component: "Declarative Pipeline Stages", role: "Executes structured stages (Checkout, Compile, Test, Deploy) inside an isolated agent.", why: "Standardized Pipeline-as-Code structure version-controlled in Git." },
      { step: 4, component: "Interactive Input Step", role: "Pauses deployment stage waiting for explicit human sign-off from authorized release leads.", why: "Guarantees governance and compliance before promoting changes to production." },
      { step: 5, component: "Post-Build Alerts & Cleanup", role: "Sends high-signal emails only on failure via Email-ext SMTP and cleans workspace via cleanWs().", why: "Eliminates team alert fatigue and prevents disk full incidents." }
    ],
    interRelationships: [
      { from: "GitHub Push", to: "Jenkins Webhook Listener", relation: "Sends commit payload.", protocol: "HTTPS Webhook (Port 443/8080)" },
      { from: "Jenkins Trigger", to: "Declarative Pipeline", relation: "Enqueues build execution in agent workspace.", protocol: "Jenkins Internal Scheduler" },
      { from: "Approval Gate", to: "Release Manager", relation: "Prompts interactive confirmation.", protocol: "Jenkins Web UI / Blue Ocean" },
      { from: "post Block", to: "SMTP Mail Server", relation: "Dispatches failure alert email.", protocol: "SMTP Port 465/587 over TLS" }
    ],
    endToEndFlow: [
      { stage: "1. Code Push", action: "git push origin main", details: "Developer pushes commit; GitHub triggers webhook payload instantly." },
      { stage: "2. Pipeline Start", action: "Declarative Initialization", details: "Jenkins allocates agent, clones repo, and begins stage execution." },
      { stage: "3. Automated Testing", action: "mvn test", details: "Executes unit and integration test suites in isolated workspace." },
      { stage: "4. Human Sign-Off", action: "input step verification", details: "Pipeline pauses at Production Gate until release lead clicks Approve." },
      { stage: "5. Production Deploy", action: "deploy-prod.sh", details: "Release artifact promoted to cloud production environment." }
    ],
    moduleContext: {
      prevModule: "Module 16: Git & GitHub – Enterprise Source Control",
      thisModule: "Module 17: Jenkins – Enterprise CI/CD Automation",
      nextModule: "Module 18: Docker – Modern Containerization Deep Dive",
      connectionReason: "Automated pipelines transform manual builds into resilient, event-driven continuous deployment workflows."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#38bdf8" stroke-width="2"/>
      
      <!-- Trigger Sources -->
      <g transform="translate(25, 45)">
        <rect width="140" height="160" rx="10" fill="#1e293b" stroke="#38bdf8"/>
        <text x="70" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Build Triggers</text>
        <rect x="10" y="38" width="120" height="26" rx="4" fill="#0f172a"/>
        <text x="70" y="55" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">GitHub Webhook</text>
        <rect x="10" y="70" width="120" height="26" rx="4" fill="#0f172a"/>
        <text x="70" y="87" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">Cron: */5 * * * *</text>
        <rect x="10" y="102" width="120" height="26" rx="4" fill="#0f172a"/>
        <text x="70" y="119" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">Poll SCM: H/15 * * * *</text>
        <rect x="10" y="132" width="120" height="22" rx="4" fill="#0f172a"/>
        <text x="70" y="147" fill="#94a3b8" font-size="7" text-anchor="middle">Upstream Job Build</text>
      </g>
      
      <path d="M 175 125 L 210 125" stroke="#38bdf8" stroke-width="2"/>
      
      <!-- Pipeline Stages -->
      <g transform="translate(220, 35)">
        <rect width="400" height="180" rx="10" fill="#1e293b" stroke="#f59e0b"/>
        <text x="200" y="24" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Declarative Pipeline (Jenkinsfile)</text>
        
        <g transform="translate(15, 38)">
          <rect width="80" height="55" rx="6" fill="#0f172a" stroke="#38bdf8"/>
          <text x="40" y="22" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Checkout</text>
          <text x="40" y="40" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">git clone</text>
        </g>
        
        <g transform="translate(110, 38)">
          <rect width="80" height="55" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="40" y="22" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Build</text>
          <text x="40" y="40" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">mvn compile</text>
        </g>
        
        <g transform="translate(205, 38)">
          <rect width="80" height="55" rx="6" fill="#0f172a" stroke="#a855f7"/>
          <text x="40" y="22" fill="#c084fc" font-size="9" font-weight="bold" text-anchor="middle">Test</text>
          <text x="40" y="40" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">mvn test</text>
        </g>
        
        <g transform="translate(300, 38)">
          <rect width="85" height="55" rx="6" fill="#0f172a" stroke="#ef4444"/>
          <text x="42" y="22" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">Gate (input)</text>
          <text x="42" y="40" fill="#f87171" font-size="7" font-family="monospace" text-anchor="middle">Human OK</text>
        </g>
        
        <g transform="translate(15, 108)">
          <rect width="370" height="55" rx="6" fill="#0f172a" stroke="#34d399"/>
          <text x="185" y="22" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">post { always / failure }</text>
          <text x="185" y="40" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">always { cleanWs() } | failure { mail to: 'devs@example.com' }</text>
        </g>
      </g>
      
      <path d="M 630 125 L 665 125" stroke="#f59e0b" stroke-width="2"/>
      
      <!-- Notifications -->
      <g transform="translate(675, 45)">
        <rect width="145" height="160" rx="10" fill="#1e293b" stroke="#10b981"/>
        <text x="72" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Alerts &amp; Reports</text>
        <rect x="10" y="40" width="125" height="30" rx="4" fill="#0f172a"/>
        <text x="72" y="58" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">Email-ext SMTP</text>
        <rect x="10" y="80" width="125" height="30" rx="4" fill="#0f172a"/>
        <text x="72" y="98" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">Slack Webhook</text>
        <rect x="10" y="120" width="125" height="26" rx="4" fill="#0f172a"/>
        <text x="72" y="136" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">JUnit Trend Charts</text>
      </g>
    </svg>`
  },

  'jenkins-selenium-maven-headless-testing': {
    moduleNumber: 17,
    title: "Automated Testing & Continuous Integration: Selenium, Maven & Headless Test Automation",
    category: "CI/CD & Jenkins",
    realDiagramUrl: '/images/jenkins/11-selenium-maven-headless-testing.png',
    realDiagramTitle: 'Automated Headless Selenium Testing in CI/CD Pipeline',
    realDiagramCaption: 'End-to-end testing architecture executing headless Chrome/Firefox test suites on Jenkins nodes with JUnit reporting.',
    description: "Automated browser validation pipeline: managing Selenium WebDriver and JUnit dependencies in Maven pom.xml, headless Chrome execution on Linux CI agents, driver.quit() resource reclamation, and publishing Surefire JUnit XML reports in Jenkins.",
    flowSteps: ["Maven pom.xml Dependency Resolution", "Headless Chrome Launch on Linux CI", "WebDriver Interaction & JUnit Assertions", "Mandatory driver.quit() Teardown", "Jenkins JUnit Test Report Publishing"],
    stepByStep: [
      { step: 1, component: "Maven Project (pom.xml)", role: "Manages selenium-java and junit in test scope (<scope>test</scope>).", why: "Ensures uniform, environment-independent dependency resolution on all machines." },
      { step: 2, component: "Headless Chrome / ChromeDriver", role: "Executes browser tests headlessly (--headless=new, --no-sandbox) on Linux agents without physical monitors.", why: "Prevents GUI display crashes on cloud CI runners while evaluating real web DOMs." },
      { step: 3, component: "WebDriver Test Execution", role: "Navigates to application pages, interacts with elements, and validates JUnit assertions with explicit waits.", why: "Verifies end-to-end functionality from the user's perspective before promotion." },
      { step: 4, component: "driver.quit() Teardown", role: "Closes the browser session and terminates background ChromeDriver processes.", why: "Prevents orphan browser processes from accumulating and exhausting CI agent RAM." },
      { step: 5, component: "Surefire XML Test Publisher", role: "Jenkins parses target/surefire-reports/*.xml in post { always { junit '...' } } to plot test trends.", why: "Provides granular per-test visibility, error stacktraces, and isolates flaky tests across builds." }
    ],
    interRelationships: [
      { from: "Jenkins Pipeline", to: "Maven Runner", relation: "Invokes 'mvn test'.", protocol: "Shell / CLI Execution" },
      { from: "Maven Surefire", to: "ChromeDriver Executable", relation: "Issues W3C WebDriver commands.", protocol: "HTTP JSON Wire Protocol" },
      { from: "ChromeDriver", to: "Headless Chrome Process", relation: "Automates in-memory DOM rendering.", protocol: "Chrome DevTools Protocol (CDP)" },
      { from: "Maven Surefire", to: "Jenkins JUnit Plugin", relation: "Generates XML report schemas for dashboard charts.", protocol: "JUnit XML File Ingestion" }
    ],
    endToEndFlow: [
      { stage: "1. Maven Invocation", action: "sh 'mvn test'", details: "Jenkins executes test goal, resolving test-scoped Selenium and JUnit libraries." },
      { stage: "2. Headless Launch", action: "ChromeDriver --headless=new", details: "Chrome launches without X11 graphical display, applying --no-sandbox constraints." },
      { stage: "3. DOM Assertion", action: "driver.get() + assertEquals()", details: "WebDriver drives interactions and asserts expected DOM state." },
      { stage: "4. Clean Teardown", action: "driver.quit() in @After", details: "Browser process cleanly terminates, freeing system memory and ports." },
      { stage: "5. Report Trend", action: "junit '**/target/surefire-reports/*.xml'", details: "Jenkins indexes XML results into project-level pass/fail trend graphs." }
    ],
    moduleContext: {
      prevModule: "Module 16: Git & GitHub – Enterprise Source Control",
      thisModule: "Module 17: Jenkins – Enterprise CI/CD Automation",
      nextModule: "Module 18: Docker – Modern Containerization Deep Dive",
      connectionReason: "Automated browser testing verifies web application functionality before container packaging and deployment."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#10b981" stroke-width="2"/>
      
      <!-- Maven Dependencies -->
      <g transform="translate(25, 45)">
        <rect width="160" height="160" rx="10" fill="#1e293b" stroke="#38bdf8"/>
        <text x="80" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Maven Project</text>
        <rect x="10" y="38" width="140" height="30" rx="4" fill="#0f172a"/>
        <text x="80" y="56" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">pom.xml: selenium-java</text>
        <rect x="10" y="76" width="140" height="30" rx="4" fill="#0f172a"/>
        <text x="80" y="94" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">pom.xml: junit (test scope)</text>
        <rect x="10" y="114" width="140" height="32" rx="4" fill="#0f172a"/>
        <text x="80" y="133" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">mvn test</text>
      </g>
      
      <path d="M 195 125 L 235 125" stroke="#38bdf8" stroke-width="2"/>
      
      <!-- Headless Chrome on Linux Agent -->
      <g transform="translate(245, 35)">
        <rect width="270" height="180" rx="10" fill="#1e293b" stroke="#10b981"/>
        <text x="135" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Linux CI Agent Execution</text>
        <rect x="15" y="38" width="240" height="35" rx="4" fill="#0f172a"/>
        <text x="135" y="55" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle">Headless Chrome / Xvfb</text>
        <text x="135" y="67" fill="#94a3b8" font-size="7" text-anchor="middle">--headless=new --no-sandbox</text>
        <rect x="15" y="80" width="240" height="42" rx="4" fill="#0f172a"/>
        <text x="135" y="97" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">WebDriver driver.get(url)</text>
        <text x="135" y="112" fill="#f8fafc" font-size="8" text-anchor="middle">assertEquals('Example Domain', title)</text>
        <rect x="15" y="128" width="240" height="36" rx="4" fill="#0f172a"/>
        <text x="135" y="145" fill="#ef4444" font-size="8" font-family="monospace" text-anchor="middle">driver.quit() in @After</text>
        <text x="135" y="157" fill="#94a3b8" font-size="7" text-anchor="middle">Frees RAM &amp; terminates browser process</text>
      </g>
      
      <path d="M 525 125 L 565 125" stroke="#10b981" stroke-width="2"/>
      
      <!-- Jenkins Test Reports -->
      <g transform="translate(575, 35)">
        <rect width="245" height="180" rx="10" fill="#1e293b" stroke="#a855f7"/>
        <text x="122" y="24" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">Jenkins Test Analytics</text>
        <rect x="15" y="38" width="215" height="36" rx="4" fill="#0f172a"/>
        <text x="122" y="55" fill="#c084fc" font-size="8" font-family="monospace" text-anchor="middle">target/surefire-reports/*.xml</text>
        <text x="122" y="67" fill="#94a3b8" font-size="7" text-anchor="middle">Maven Surefire XML Output</text>
        <rect x="15" y="82" width="215" height="38" rx="4" fill="#0f172a"/>
        <text x="122" y="99" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">post { always { junit '...' } }</text>
        <text x="122" y="112" fill="#94a3b8" font-size="7" text-anchor="middle">Publishes reports unconditionally</text>
        <rect x="15" y="128" width="215" height="36" rx="4" fill="#0f172a"/>
        <text x="122" y="145" fill="#34d399" font-size="8" font-weight="bold" text-anchor="middle">Interactive Test Trend Graph</text>
        <text x="122" y="157" fill="#94a3b8" font-size="7" text-anchor="middle">Pass/Fail rates &amp; duration tracking</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 20: Unified Enterprise DevOps
  // -------------------------------------------------------------------------
  'end-to-end-devops-pipeline-github-jenkins-docker-k8s-aws': {
    moduleNumber: 20,
    title: "The Complete Enterprise Cloud-Native CI/CD Pipeline Architecture",
    category: "Full Stack DevOps",
    description: "End-to-end automation flow: Git commit triggers Jenkins CI, packages Docker container, executes Trivy security vulnerability scans, pushes to Amazon ECR, and deploys to Amazon EKS with zero downtime.",
    flowSteps: ["Git Push -> Webhook", "Jenkins CI Automation (Build + Test)", "Trivy Container CVE Scan", "Amazon ECR Registry Push", "Amazon EKS Rolling Deployment"],
    stepByStep: [
      { step: 1, component: "GitHub Repository", role: "Hosts production code and triggers webhooks on pull request merges.", why: "Ensures versioned release tags are the single trigger for deployments." },
      { step: 2, component: "Jenkins Controller & Docker Agent", role: "Spins up an isolated build container, runs unit tests, and verifies SonarQube quality gates.", why: "Prevents failed or unverified code from ever being packaged." },
      { step: 3, component: "Trivy Security Vulnerability Scanner", role: "Inspects container OS libraries and application packages for CVEs.", why: "DevSecOps shift-left security blocks vulnerable packages before cloud deployment." },
      { step: 4, component: "Amazon ECR (Container Registry)", role: "Stores immutable, SHA-tagged production Docker images.", why: "Centralized private storage with high-speed internal network pull into EKS." },
      { step: 5, component: "Amazon EKS (Kubernetes Cluster)", role: "Executes zero-downtime rolling update across worker nodes.", why: "Maintains 100% application uptime while switching traffic to new version." }
    ],
    interRelationships: [
      { from: "GitHub", to: "Jenkins Controller", relation: "Webhook POST fires upon code merge.", protocol: "HTTPS Webhook (Port 443)" },
      { from: "Jenkins Agent", to: "Trivy Scanner", relation: "Passes newly built Docker image for CVE analysis.", protocol: "Docker Engine Daemon" },
      { from: "Jenkins Agent", to: "Amazon ECR", relation: "Pushes validated image with commit SHA tag.", protocol: "AWS CLI + Docker Push over TLS" },
      { from: "Jenkins Pipeline", to: "Amazon EKS", relation: "Runs 'kubectl set image' to trigger rolling deployment.", protocol: "K8s API + AWS IAM Authenticator" }
    ],
    endToEndFlow: [
      { stage: "1. Developer Merge", action: "git push origin main", details: "Pull request is approved and merged into production main branch." },
      { stage: "2. Webhook Event", action: "Jenkins Trigger", details: "GitHub notifies Jenkins; Jenkins launches ephemeral Docker build container." },
      { stage: "3. Build & Scan", action: "Trivy CVE Audit", details: "Application tests pass; multi-stage Docker image built; Trivy confirms 0 Critical CVEs." },
      { stage: "4. ECR Push", action: "Docker Push", details: "Image tagged as 123456.dkr.ecr.us-east-1.amazonaws.com/app:v2.1-hash and pushed." },
      { stage: "5. EKS Rollout", action: "Zero-Downtime Deployment", details: "Kubernetes updates Pods one by one; Ingress routes user traffic to new pods." }
    ],
    moduleContext: {
      prevModule: "Module 19: Kubernetes Production Container Orchestration",
      thisModule: "Module 20: Complete End-to-End DevOps & Cloud CI/CD",
      nextModule: "Production Real-World Engineering Portfolio",
      connectionReason: "Module 20 synthesizes Git, Jenkins, Docker, Kubernetes, and AWS into an industrial-grade automated platform."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#10b981" stroke-width="2"/>
      
      <!-- 1. Git -->
      <g transform="translate(25, 55)">
        <rect width="115" height="130" rx="10" fill="#1e293b" stroke="#f97316"/>
        <text x="57" y="25" fill="#fdba74" font-size="10" font-weight="bold" text-anchor="middle">1. GITHUB</text>
        <circle cx="57" cy="55" r="16" fill="#f97316" opacity="0.3"/>
        <text x="57" y="61" font-size="16" text-anchor="middle">🐙</text>
        <text x="57" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">git push main</text>
        <text x="57" y="105" fill="#94a3b8" font-size="8" text-anchor="middle">Webhook Event</text>
      </g>
      
      <path d="M 145 120 L 175 120" stroke="#f97316" stroke-width="2"/>
      <polygon points="180,120 170,115 170,125" fill="#f97316"/>
      
      <!-- 2. Jenkins -->
      <g transform="translate(185, 55)">
        <rect width="125" height="130" rx="10" fill="#1e293b" stroke="#f59e0b"/>
        <text x="62" y="25" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">2. JENKINS CI</text>
        <circle cx="62" cy="55" r="16" fill="#f59e0b" opacity="0.3"/>
        <text x="62" y="61" font-size="16" text-anchor="middle">⚙️</text>
        <text x="62" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Compile &amp; Test</text>
        <text x="62" y="105" fill="#94a3b8" font-size="8" text-anchor="middle">Unit Test &amp; Lint</text>
      </g>
      
      <path d="M 315 120 L 345 120" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="350,120 340,115 340,125" fill="#f59e0b"/>
      
      <!-- 3. Trivy Security -->
      <g transform="translate(355, 55)">
        <rect width="125" height="130" rx="10" fill="#1e293b" stroke="#ef4444"/>
        <text x="62" y="25" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">3. TRIVY SCAN</text>
        <circle cx="62" cy="55" r="16" fill="#ef4444" opacity="0.3"/>
        <text x="62" y="61" font-size="16" text-anchor="middle">🛡️</text>
        <text x="62" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Container Audit</text>
        <text x="62" y="105" fill="#fca5a5" font-size="8" text-anchor="middle">Zero High CVEs</text>
      </g>
      
      <path d="M 485 120 L 515 120" stroke="#0ea5e9" stroke-width="2"/>
      <polygon points="520,120 510,115 510,125" fill="#0ea5e9"/>
      
      <!-- 4. Amazon ECR -->
      <g transform="translate(525, 55)">
        <rect width="130" height="130" rx="10" fill="#1e293b" stroke="#0ea5e9"/>
        <text x="65" y="25" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">4. AMAZON ECR</text>
        <circle cx="65" cy="55" r="16" fill="#0ea5e9" opacity="0.3"/>
        <text x="65" y="61" font-size="16" text-anchor="middle">📦</text>
        <text x="65" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Docker Image</text>
        <text x="65" y="105" fill="#7dd3fc" font-size="8" text-anchor="middle">SHA Tagged Registry</text>
      </g>
      
      <path d="M 660 120 L 690 120" stroke="#10b981" stroke-width="2"/>
      <polygon points="695,120 685,115 685,125" fill="#10b981"/>
      
      <!-- 5. Amazon EKS -->
      <g transform="translate(700, 55)">
        <rect width="125" height="130" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
        <text x="62" y="25" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">5. AMAZON EKS</text>
        <circle cx="62" cy="55" r="16" fill="#10b981" opacity="0.3"/>
        <text x="62" y="61" font-size="16" text-anchor="middle">☸️</text>
        <text x="62" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Rolling Update</text>
        <text x="62" y="105" fill="#a7f3d0" font-size="8" text-anchor="middle">Zero Downtime</text>
      </g>
    </svg>`
  }
,
  "docker-internals-container-architecture": {
    moduleNumber: 18,
    title: "Docker Client-Server Engine & Linux Kernel Primitives Architecture",
    category: "Containerization & Docker",
    realDiagramUrl: '/images/docker/03-containerization-architecture.png',
    realDiagramTitle: 'Docker Containerization & Linux Kernel Primitives Architecture',
    realDiagramCaption: 'Official architecture showing container engine sharing host OS kernel via Namespaces and Control Groups (cgroups).',
    description: "Deconstructed container virtualization stack: Docker CLI REST calls over /var/run/docker.sock to dockerd, gRPC delegation to containerd, runc OCI runtime invocation, and Linux kernel namespace isolation (PID, NET, MNT, IPC, UTS, USER) with cgroup hardware resource quotas and OverlayFS Copy-on-Write storage.",
    flowSteps: [
      "1. Docker CLI (docker run)",
      "2. REST API (/var/run/docker.sock)",
      "3. dockerd -> containerd Supervisor",
      "4. runc OCI Syscalls (clone, namespaces)",
      "5. Cgroups Quotas & OverlayFS CoW"
    ],
    stepByStep: [
      {
        step: 1,
        component: "Docker CLI Client",
        role: "Accepts operator input and translates commands into structured HTTP REST requests.",
        why: "Decouples the human user interface from the daemon executing system-level operations."
      },
      {
        step: 2,
        component: "dockerd (Docker Daemon)",
        role: "Manages images, networking, and volumes; receives REST calls over /var/run/docker.sock.",
        why: "Centralizes Docker high-level orchestration logic and routes requests via gRPC to containerd."
      },
      {
        step: 3,
        component: "containerd & containerd-shim",
        role: "CNCF runtime supervisor that unpacks image layers and manages container lifecycle.",
        why: "Isolates container supervisor execution so dockerd can restart without terminating running containers."
      },
      {
        step: 4,
        component: "runc OCI Runtime",
        role: "Invokes Linux kernel clone() syscall with CLONE_NEWPID, CLONE_NEWNET, CLONE_NEWNS flags.",
        why: "Standardized low-level OCI reference tool that creates namespaces, configures cgroups, and spawns PID 1."
      },
      {
        step: 5,
        component: "Linux Host Kernel Primitives",
        role: "Enforces process boundaries via Namespaces, resource ceilings via Cgroups, and storage via OverlayFS.",
        why: "Allows hundreds of isolated containers to execute directly on the shared host Linux kernel."
      }
    ],
    interRelationships: [
      { from: "Docker CLI", to: "dockerd", relation: "Communicates via REST API over Unix domain socket /var/run/docker.sock" },
      { from: "dockerd", to: "containerd", relation: "Delegates container execution and image pulls over local gRPC" },
      { from: "containerd", to: "runc", relation: "Spawns runc with OCI runtime bundle (config.json + rootfs)" },
      { from: "runc", to: "Linux Kernel", relation: "Issues clone() and writes to /sys/fs/cgroup/ to instantiate container process" }
    ],
    endToEndFlow: [
      { step: 1, name: "Command Issue", desc: "User executes 'docker run -d --memory=512m nginx:alpine'." },
      { step: 2, name: "Socket Transmission", desc: "CLI formats HTTP POST to /var/run/docker.sock." },
      { step: 3, name: "Layer Unpacking", desc: "containerd unpacks image layers into lowerdir and creates OCI bundle." },
      { step: 4, name: "Kernel Syscalls", desc: "runc instantiates namespaces and sets memory ceiling in /sys/fs/cgroup/." },
      { step: 5, name: "Process Execution", desc: "nginx starts as PID 1; containerd-shim retains stdio supervision." }
    ],
    moduleContext: "Module 18 Topic 1 provides the foundational kernel-level understanding of how containers execute as isolated host processes without hypervisor overhead.",
    svg: `<svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect width="900" height="240" rx="12" fill="#0B132B" stroke="#1C2541" stroke-width="2"/>
      <g transform="translate(25, 45)">
        <rect width="135" height="150" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="67" y="25" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">1. DOCKER CLI</text>
        <rect x="12" y="42" width="111" height="26" rx="4" fill="#0F172A"/>
        <text x="67" y="58" fill="#F8FAFC" font-size="9" font-family="monospace" text-anchor="middle">docker run -d</text>
        <rect x="12" y="78" width="111" height="48" rx="4" fill="#0F172A"/>
        <text x="67" y="96" fill="#94A3B8" font-size="8" text-anchor="middle">REST Client</text>
        <text x="67" y="112" fill="#F59E0B" font-size="8" font-family="monospace" text-anchor="middle">/var/run/docker.sock</text>
      </g>
      <path d="M 165 120 L 195 120" stroke="#38BDF8" stroke-width="2"/>
      <polygon points="200,120 190,115 190,125" fill="#38BDF8"/>
      <g transform="translate(205, 35)">
        <rect width="165" height="170" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
        <text x="82" y="24" fill="#F59E0B" font-size="11" font-weight="bold" text-anchor="middle">2. DOCKER ENGINE</text>
        <rect x="12" y="38" width="141" height="34" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
        <text x="82" y="54" fill="#38BDF8" font-size="9" font-weight="bold" text-anchor="middle">dockerd (Daemon)</text>
        <text x="82" y="65" fill="#94A3B8" font-size="7" text-anchor="middle">API / Networks / Volumes</text>
        <path d="M 82 72 L 82 82" stroke="#F59E0B" stroke-width="1.5"/>
        <rect x="12" y="84" width="141" height="34" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="82" y="100" fill="#10B981" font-size="9" font-weight="bold" text-anchor="middle">containerd</text>
        <text x="82" y="111" fill="#94A3B8" font-size="7" text-anchor="middle">Supervisor (gRPC)</text>
        <path d="M 82 118 L 82 126" stroke="#F59E0B" stroke-width="1.5"/>
        <rect x="12" y="128" width="141" height="28" rx="4" fill="#0F172A" stroke="#A855F7" stroke-width="1"/>
        <text x="82" y="146" fill="#A855F7" font-size="9" font-weight="bold" text-anchor="middle">runc (OCI Runtime)</text>
      </g>
      <path d="M 375 120 L 405 120" stroke="#10B981" stroke-width="2"/>
      <polygon points="410,120 400,115 400,125" fill="#10B981"/>
      <g transform="translate(415, 30)">
        <rect width="455" height="180" rx="8" fill="#111827" stroke="#10B981" stroke-width="1.5"/>
        <text x="227" y="22" fill="#10B981" font-size="12" font-weight="bold" text-anchor="middle">3. LINUX KERNEL PRIMITIVES (HOST)</text>
        <g transform="translate(15, 34)">
          <rect width="205" height="62" rx="6" fill="#1F2937" stroke="#38BDF8" stroke-width="1"/>
          <text x="102" y="18" fill="#38BDF8" font-size="9" font-weight="bold" text-anchor="middle">Namespaces (Isolation)</text>
          <text x="102" y="34" fill="#E2E8F0" font-size="8" font-family="monospace" text-anchor="middle">PID • NET • MNT</text>
          <text x="102" y="48" fill="#94A3B8" font-size="8" font-family="monospace" text-anchor="middle">IPC • UTS • USER</text>
        </g>
        <g transform="translate(235, 34)">
          <rect width="205" height="62" rx="6" fill="#1F2937" stroke="#F59E0B" stroke-width="1"/>
          <text x="102" y="18" fill="#F59E0B" font-size="9" font-weight="bold" text-anchor="middle">Control Groups (cgroups)</text>
          <text x="102" y="34" fill="#E2E8F0" font-size="8" font-family="monospace" text-anchor="middle">CPU Quotas (--cpus=1.0)</text>
          <text x="102" y="48" fill="#EF4444" font-size="8" font-family="monospace" text-anchor="middle">RAM (--memory=512m OOM)</text>
        </g>
        <g transform="translate(15, 106)">
          <rect width="425" height="60" rx="6" fill="#1F2937" stroke="#A855F7" stroke-width="1"/>
          <text x="212" y="18" fill="#C084FC" font-size="10" font-weight="bold" text-anchor="middle">OverlayFS Storage Driver (Copy-on-Write)</text>
          <text x="212" y="34" fill="#34D399" font-size="8" font-family="monospace" text-anchor="middle">Upperdir: Ephemeral Container Layer (Read-Write)</text>
          <text x="212" y="48" fill="#94A3B8" font-size="8" font-family="monospace" text-anchor="middle">Lowerdir: Stacked Image Layers (Read-Only Immutable)</text>
        </g>
      </g>
    </svg>`
  },
  "docker-images-dockerfile-registries": {
    moduleNumber: 18,
    title: "Production Multi-Stage Dockerfile Engineering & Registry Layer Distribution",
    category: "Containerization & Docker",
    realDiagramUrl: '/images/docker/09-image-layers-unionfs-storage.png',
    realDiagramTitle: 'Docker Image Layer Architecture & Overlay2 Storage Driver',
    realDiagramCaption: 'Union Filesystem (UnionFS) showing immutable read-only image layers and thin copy-on-write (CoW) container layer.',
    description: "Architectural pipeline for building hardened, minimal production container images: build context tar streaming, layer caching evaluation, multi-stage separation (Stage 1 SDK compiler vs Stage 2 Alpine/Distroless runtime), non-root USER execution, and content-addressable SHA256 layer deduplication to private registries.",
    flowSteps: [
      "1. Build Context Streaming (.dockerignore)",
      "2. Layer Cache Evaluation (SHA256 Match)",
      "3. Stage 1 Builder (Compilers & SDK)",
      "4. Stage 2 Runtime (Distroless / Alpine)",
      "5. Registry Deduplication (docker push)"
    ],
    stepByStep: [
      {
        step: 1,
        component: "Build Context & .dockerignore",
        role: "CLI streams the working directory tarball to dockerd, excluding node_modules, .git, and secrets.",
        why: "Reduces context upload time from gigabytes to megabytes and prevents credential leakage."
      },
      {
        step: 2,
        component: "Layer Cache Evaluator",
        role: "Compares command strings for RUN and file SHA256 hashes for COPY/ADD.",
        why: "Reuses cached layers instantly; ordering dependency manifests before source code avoids recompiling."
      },
      {
        step: 3,
        component: "Stage 1: AS builder",
        role: "Installs full SDKs, build toolchains (gcc, npm, maven), and compiles application source code.",
        why: "Isolates compilation tools so they never touch the production attack surface."
      },
      {
        step: 4,
        component: "Stage 2: Minimal Runtime",
        role: "Spawns minimal OS (Alpine musl or Distroless), sets unprivileged USER, and copies compiled output.",
        why: "Shrinks container size from 1.2GB to 30MB, eliminating over 95% of OS package CVE vulnerabilities."
      },
      {
        step: 5,
        component: "Content-Addressable Registry",
        role: "Pushes layers indexed by cryptographic SHA256 digests; skips layers that already exist.",
        why: "Dramatically accelerates continuous deployment pipelines via layer deduplication."
      }
    ],
    interRelationships: [
      { from: "Build Context", to: "Cache Engine", relation: "Supplies SHA256 file digests for cache evaluation" },
      { from: "Stage 1 Builder", to: "Stage 2 Runtime", relation: "Transfers compiled binary via 'COPY --from=builder'" },
      { from: "Stage 2 Runtime", to: "Local Engine", relation: "Generates final unprivileged production image tag" },
      { from: "Local Engine", to: "OCI Registry", relation: "Performs layer existence handshake before streaming delta blobs" }
    ],
    endToEndFlow: [
      { step: 1, name: "Context Package", desc: "Docker CLI packages directory excluding .dockerignore entries." },
      { step: 2, name: "Manifest Cache Check", desc: "Docker daemon verifies package.json SHA256 and hits cache." },
      { step: 3, name: "Compilation Stage", desc: "Stage 1 builds production bundle using heavy SDK." },
      { step: 4, name: "Runtime Extraction", desc: "Stage 2 Alpine container copies only compiled dist/ directory." },
      { step: 5, name: "Registry Push", desc: "Client pushes image; base layers report 'Layer already exists'." }
    ],
    moduleContext: "Module 18 Topic 2 covers the complete image engineering lifecycle, eliminating image bloat and accelerating CI/CD deployment velocity.",
    svg: `<svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect width="900" height="240" rx="12" fill="#0B132B" stroke="#1C2541" stroke-width="2"/>
      <g transform="translate(25, 35)">
        <rect width="250" height="175" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="125" y="24" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">STAGE 1: BUILD ENVIRONMENT</text>
        <rect x="12" y="38" width="226" height="52" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
        <text x="125" y="55" fill="#38BDF8" font-size="9" font-family="monospace" text-anchor="middle">FROM node:20 AS builder</text>
        <text x="125" y="70" fill="#94A3B8" font-size="8" font-family="monospace" text-anchor="middle">COPY package*.json ./ &amp;&amp; npm ci</text>
        <text x="125" y="82" fill="#10B981" font-size="8" font-family="monospace" text-anchor="middle">RUN npm run build (Total: 1.1GB)</text>
        <rect x="12" y="98" width="226" height="58" rx="4" fill="#0F172A"/>
        <text x="125" y="116" fill="#F59E0B" font-size="8" text-anchor="middle">Compilers • SDKs • DevTools</text>
        <text x="125" y="132" fill="#EF4444" font-size="8" text-anchor="middle">Discarded from Final Production Container</text>
        <text x="125" y="146" fill="#94A3B8" font-size="7" font-family="monospace" text-anchor="middle">Zero CVE Attack Surface Leakage</text>
      </g>
      <path d="M 285 120 L 325 120" stroke="#F59E0B" stroke-width="2"/>
      <polygon points="330,120 320,115 320,125" fill="#F59E0B"/>
      <g transform="translate(335, 35)">
        <rect width="250" height="175" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.5"/>
        <text x="125" y="24" fill="#10B981" font-size="11" font-weight="bold" text-anchor="middle">STAGE 2: HARDENED RUNTIME</text>
        <rect x="12" y="38" width="226" height="52" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="125" y="55" fill="#10B981" font-size="9" font-family="monospace" text-anchor="middle">FROM node:20-alpine</text>
        <text x="125" y="70" fill="#F59E0B" font-size="8" font-family="monospace" text-anchor="middle">COPY --from=builder /app/dist ./</text>
        <text x="125" y="82" fill="#38BDF8" font-size="8" font-family="monospace" text-anchor="middle">USER node &amp;&amp; CMD ["node","app"]</text>
        <rect x="12" y="98" width="226" height="58" rx="4" fill="#0F172A"/>
        <text x="125" y="116" fill="#10B981" font-size="9" font-weight="bold" text-anchor="middle">Image Size: 32MB (97% Reduction)</text>
        <text x="125" y="132" fill="#38BDF8" font-size="8" text-anchor="middle">Unprivileged UID 10001 (Non-Root)</text>
        <text x="125" y="146" fill="#94A3B8" font-size="7" font-family="monospace" text-anchor="middle">Exec Form: Graceful SIGTERM Handling</text>
      </g>
      <path d="M 595 120 L 635 120" stroke="#38BDF8" stroke-width="2"/>
      <polygon points="640,120 630,115 630,125" fill="#38BDF8"/>
      <g transform="translate(645, 35)">
        <rect width="230" height="175" rx="8" fill="#111827" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="115" y="24" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">REGISTRY DEDUPLICATION</text>
        <rect x="12" y="40" width="206" height="30" rx="4" fill="#1F2937"/>
        <text x="115" y="58" fill="#94A3B8" font-size="8" font-family="monospace" text-anchor="middle">docker push registry/app:v2</text>
        <rect x="12" y="78" width="206" height="42" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="115" y="95" fill="#10B981" font-size="8" font-family="monospace" text-anchor="middle">HEAD /v2/blobs/&lt;sha256&gt;</text>
        <text x="115" y="110" fill="#38BDF8" font-size="8" font-family="monospace" text-anchor="middle">"Layer already exists" (Skip)</text>
        <rect x="12" y="128" width="206" height="34" rx="4" fill="#0F172A" stroke="#F59E0B" stroke-width="1"/>
        <text x="115" y="144" fill="#F59E0B" font-size="8" text-anchor="middle">Delta Upload: Only Modified App Layer</text>
        <text x="115" y="156" fill="#94A3B8" font-size="7" font-family="monospace" text-anchor="middle">Push Time: 4 minutes -&gt; 3 seconds</text>
      </g>
    </svg>`
  },
  "dockerfile-multistage-compose-networking": {
    moduleNumber: 18,
    title: "Multi-Service Docker Compose Stacks, Custom Bridge Networking & Volume Persistence",
    category: "Containerization & Docker",
    realDiagramUrl: '/images/docker/15-docker-compose-multi-service.png',
    realDiagramTitle: 'Multi-Service Architecture & Networking with Docker Compose',
    realDiagramCaption: 'Declarative multi-container orchestration connecting web applications, relational databases, and caches on private networks.',
    description: "End-to-end multi-container microservice topology: declarative compose.yaml orchestration, user-defined bridge network with embedded DNS (127.0.0.11), healthcheck startup gating ('condition: service_healthy'), and named volume storage persistence bypassing the Copy-on-Write layer.",
    flowSteps: [
      "1. compose.yaml Declaration",
      "2. Custom Bridge Creation & Subnet Allocation",
      "3. Embedded DNS Resolution (127.0.0.11)",
      "4. Healthcheck Gating (depends_on: healthy)",
      "5. Named Volume Host Persistence"
    ],
    stepByStep: [
      {
        step: 1,
        component: "Docker Compose Engine",
        role: "Parses declarative compose.yaml file, validates dependencies, networks, and environment variables.",
        why: "Replaces fragile imperative shell scripts with version-controlled multi-container state definitions."
      },
      {
        step: 2,
        component: "User-Defined Bridge Network",
        role: "Allocates private subnet (172.20.0.0/16) and configures Linux iptables NAT forwarding rules.",
        why: "Provides strict multi-tier network isolation and dynamic container connection capabilities."
      },
      {
        step: 3,
        component: "Embedded DNS Resolver (127.0.0.11)",
        role: "Intercepts DNS queries inside container namespaces and resolves service names to active IPs.",
        why: "Eliminates hardcoded IP addresses; allows 'http://db:5432' to resolve dynamically on container restart."
      },
      {
        step: 4,
        component: "Healthcheck Readiness Gate",
        role: "Executes pg_isready inside database; blocks API startup until database enters 'healthy' state.",
        why: "Completely eliminates the common 'database connection refused' startup race condition."
      },
      {
        step: 5,
        component: "Named Volume Storage",
        role: "Mounts persistent storage from /var/lib/docker/volumes/pgdata/_data directly into the database container.",
        why: "Bypasses the Copy-on-Write OverlayFS layer for native disk I/O and survives 'docker compose down'."
      }
    ],
    interRelationships: [
      { from: "Docker Compose", to: "Bridge Network", relation: "Provisions isolated bridge with Docker DNS 127.0.0.11" },
      { from: "Frontend Service", to: "API Service", relation: "Calls http://api:4000 resolved by service name DNS" },
      { from: "API Service", to: "PostgreSQL DB", relation: "Gated by depends_on: condition: service_healthy" },
      { from: "PostgreSQL DB", to: "Named Volume", relation: "Persists data to /var/lib/docker/volumes/pgdata/_data" }
    ],
    endToEndFlow: [
      { step: 1, name: "Stack Launch", desc: "User executes 'docker compose up -d --build'." },
      { step: 2, name: "Network Setup", desc: "Compose creates 'backend-net' bridge with DNS 127.0.0.11." },
      { step: 3, name: "Database Boot", desc: "PostgreSQL container starts and begins pg_isready healthcheck." },
      { step: 4, name: "Health Readiness", desc: "Healthcheck succeeds; Compose unblocks API container launch." },
      { step: 5, name: "Service Discovery", desc: "API connects to 'db:5432' via embedded DNS with zero errors." }
    ],
    moduleContext: "Module 18 Topic 3 arms engineers with the production orchestration and troubleshooting skills required to deploy multi-tier microservice stacks.",
    svg: `<svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect width="900" height="240" rx="12" fill="#0B132B" stroke="#1C2541" stroke-width="2"/>
      <g transform="translate(25, 35)">
        <rect width="530" height="180" rx="8" fill="#111827" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="265" y="24" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">USER-DEFINED BRIDGE NETWORK (app-net • 172.20.0.0/16)</text>
        <g transform="translate(20, 38)">
          <rect width="140" height="120" rx="6" fill="#1F2937" stroke="#10B981" stroke-width="1"/>
          <text x="70" y="20" fill="#10B981" font-size="9" font-weight="bold" text-anchor="middle">Frontend (React)</text>
          <text x="70" y="34" fill="#94A3B8" font-size="8" font-family="monospace" text-anchor="middle">172.20.0.2</text>
          <rect x="10" y="45" width="120" height="60" rx="4" fill="#0F172A"/>
          <text x="70" y="64" fill="#38BDF8" font-size="8" font-family="monospace" text-anchor="middle">GET http://api:4000</text>
          <text x="70" y="78" fill="#F59E0B" font-size="7" font-family="monospace" text-anchor="middle">DNS Query</text>
          <text x="70" y="92" fill="#34D399" font-size="7" font-family="monospace" text-anchor="middle">127.0.0.11 -&gt; 172.20.0.3</text>
        </g>
        <path d="M 165 98 L 195 98" stroke="#38BDF8" stroke-width="2"/>
        <polygon points="200,98 190,93 190,103" fill="#38BDF8"/>
        <g transform="translate(205, 38)">
          <rect width="145" height="120" rx="6" fill="#1F2937" stroke="#F59E0B" stroke-width="1"/>
          <text x="72" y="20" fill="#F59E0B" font-size="9" font-weight="bold" text-anchor="middle">API Service (Node)</text>
          <text x="72" y="34" fill="#94A3B8" font-size="8" font-family="monospace" text-anchor="middle">172.20.0.3</text>
          <rect x="10" y="45" width="125" height="60" rx="4" fill="#0F172A"/>
          <text x="72" y="64" fill="#F59E0B" font-size="8" font-family="monospace" text-anchor="middle">connect db:5432</text>
          <text x="72" y="78" fill="#94A3B8" font-size="7" text-anchor="middle">depends_on: db</text>
          <text x="72" y="92" fill="#10B981" font-size="7" font-family="monospace" text-anchor="middle">condition: healthy</text>
        </g>
        <path d="M 355 98 L 385 98" stroke="#F59E0B" stroke-width="2"/>
        <polygon points="390,98 380,93 380,103" fill="#F59E0B"/>
        <g transform="translate(395, 38)">
          <rect width="120" height="120" rx="6" fill="#1F2937" stroke="#38BDF8" stroke-width="1"/>
          <text x="60" y="20" fill="#38BDF8" font-size="9" font-weight="bold" text-anchor="middle">PostgreSQL DB</text>
          <text x="60" y="34" fill="#94A3B8" font-size="8" font-family="monospace" text-anchor="middle">172.20.0.4</text>
          <rect x="8" y="45" width="104" height="60" rx="4" fill="#0F172A"/>
          <text x="60" y="64" fill="#10B981" font-size="8" font-family="monospace" text-anchor="middle">pg_isready</text>
          <text x="60" y="78" fill="#38BDF8" font-size="7" text-anchor="middle">HEALTHCHECK</text>
          <text x="60" y="92" fill="#34D399" font-size="7" font-weight="bold" text-anchor="middle">STATUS: healthy</text>
        </g>
      </g>
      <g transform="translate(575, 35)">
        <rect width="300" height="180" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.5"/>
        <text x="150" y="24" fill="#10B981" font-size="11" font-weight="bold" text-anchor="middle">NAMED VOLUME PERSISTENCE</text>
        <rect x="15" y="38" width="270" height="62" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="150" y="56" fill="#10B981" font-size="8" font-family="monospace" text-anchor="middle">/var/lib/docker/volumes/pgdata/_data</text>
        <text x="150" y="72" fill="#94A3B8" font-size="8" text-anchor="middle">Bypasses Copy-on-Write (Native Disk I/O)</text>
        <text x="150" y="86" fill="#34D399" font-size="8" text-anchor="middle">Survives 'docker compose down'</text>
        <rect x="15" y="108" width="270" height="56" rx="4" fill="#0F172A" stroke="#EF4444" stroke-width="1"/>
        <text x="150" y="126" fill="#EF4444" font-size="8" font-weight="bold" font-family="monospace" text-anchor="middle">DANGER: docker compose down -v</text>
        <text x="150" y="140" fill="#FCA5A5" font-size="8" text-anchor="middle">Permanently purges all named volumes!</text>
        <text x="150" y="152" fill="#94A3B8" font-size="7" font-family="monospace" text-anchor="middle">Protect with: 'volumes: pgdata: external: true'</text>
      </g>
    </svg>`
  },

  "kubernetes-architecture-control-plane-nodes": {
    moduleNumber: 19,
    title: "Kubernetes Control Plane, Worker Nodes & Distributed State Architecture",
    category: "Kubernetes (K8s)",
    realDiagramUrl: '/images/kubernetes/02-control-plane-architecture.png',
    realDiagramTitle: 'Kubernetes Control Plane & Distributed Cluster Architecture',
    realDiagramCaption: 'Master control plane components (API Server, etcd, Scheduler, Controller Manager) orchestrating worker node runtimes.',
    description: "Production Kubernetes cluster topology: kube-apiserver as the single REST hub, etcd Raft consensus store, kube-scheduler two-phase node filtering/scoring, kube-controller-manager reconciliation loops, and worker nodes executing pods via kubelet gRPC calls to CRI containerd with kube-proxy packet filtering.",
    flowSteps: [
      "1. Operator (kubectl apply -f)",
      "2. kube-apiserver (AuthN/AuthZ/Validation)",
      "3. etcd (Raft Consensus Quorum)",
      "4. kube-scheduler (Filtering & Scoring)",
      "5. kubelet -> CRI containerd (Pod Run)"
    ],
    stepByStep: [
      {
        step: 1,
        component: "kubectl & kube-apiserver",
        role: "Sole REST API gateway that authenticates operators, validates manifests against OpenAPI schema, and enforces RBAC.",
        why: "No component communicates directly with etcd; the API server is the single entrypoint and validation gatekeeper."
      },
      {
        step: 2,
        component: "etcd Distributed Key-Value Store",
        role: "Highly available, strongly consistent Raft consensus datastore holding the entire declarative state of the cluster.",
        why: "Stores all Pods, Secrets, ConfigMaps, and cluster metadata. Requires an odd number of nodes (3 or 5) for quorum."
      },
      {
        step: 3,
        component: "kube-scheduler",
        role: "Watches for newly created pods with no assigned node, filters candidate nodes based on resource requests, and scores the best node.",
        why: "Guarantees optimal workload placement without overloading individual worker nodes."
      },
      {
        step: 4,
        component: "kube-controller-manager",
        role: "Runs core reconciliation loops (DeploymentController, ReplicaSetController, NodeController) constantly aligning actual state to desired state.",
        why: "Provides self-healing: detects dead nodes and automatically schedules replacement pods elsewhere."
      },
      {
        step: 5,
        component: "Worker Node Agents (Kubelet & Kube-Proxy)",
        role: "Kubelet watches assigned PodSpecs and invokes containerd via CRI gRPC. Kube-proxy programs host iptables/IPVS for service routing.",
        why: "Executes the physical Linux containers on worker compute instances and routes cluster traffic."
      }
    ],
    interRelationships: [
      {
        from: "kubectl",
        to: "kube-apiserver",
        relation: "Sends declarative YAML manifests over HTTPS port 6443"
      },
      {
        from: "kube-apiserver",
        to: "etcd",
        relation: "Only authorized component to read and write Raft log on port 2379"
      },
      {
        from: "kube-scheduler",
        to: "kube-apiserver",
        relation: "Watches unscheduled pods and patches nodeName bindings"
      },
      {
        from: "kubelet",
        to: "containerd",
        relation: "Issues CRI gRPC commands to pull images, create cgroups, and run containers"
      }
    ],
    endToEndFlow: [
      {
        step: 1,
        name: "Manifest Submission",
        desc: "Engineer executes 'kubectl apply -f deploy.yaml'; TLS request reaches kube-apiserver on port 6443."
      },
      {
        step: 2,
        name: "Admission & Validation",
        desc: "API Server authenticates certificate, verifies RBAC permissions, runs Mutating & Validating webhooks, and writes state to etcd."
      },
      {
        step: 3,
        name: "Reconciliation",
        desc: "DeploymentController notices new Deployment, creates ReplicaSet, which generates Pod definitions with 'nodeName: \"\"'."
      },
      {
        step: 4,
        name: "Node Scheduling",
        desc: "kube-scheduler filters worker nodes by resource requests/limits, scores remaining nodes, and assigns 'nodeName: worker-1'."
      },
      {
        step: 5,
        name: "Container Launch",
        desc: "Worker-1 kubelet detects assigned Pod, calls containerd CRI to pull images, sets up networking via CNI, and reports 'Running'."
      }
    ],
    moduleContext: "Module 19 Topic 1 demystifies the master-worker control plane architecture that powers high-availability Kubernetes container orchestration.",
    svg: `<svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="890" height="230" rx="12" fill="#0B1120" stroke="#1E293B" stroke-width="2"/>
      
      <!-- Control Plane Box -->
      <rect x="20" y="20" width="410" height="200" rx="10" fill="#0F172A" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="4 2"/>
      <text x="35" y="42" fill="#38BDF8" font-size="11" font-weight="bold" font-family="monospace">CONTROL PLANE (MASTER)</text>
      
      <!-- API Server -->
      <g transform="translate(40, 55)">
        <rect width="160" height="65" rx="6" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="80" y="26" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">kube-apiserver</text>
        <text x="80" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Port 6443 / REST Gateway</text>
        <text x="80" y="56" fill="#38BDF8" font-size="7" font-family="monospace" text-anchor="middle">Single etcd Gatekeeper</text>
      </g>
      
      <!-- etcd -->
      <g transform="translate(245, 55)">
        <rect width="160" height="65" rx="6" fill="#1E293B" stroke="#A855F7" stroke-width="1.5"/>
        <text x="80" y="26" fill="#A855F7" font-size="11" font-weight="bold" text-anchor="middle">etcd Cluster</text>
        <text x="80" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Raft Quorum Store</text>
        <text x="80" y="56" fill="#C084FC" font-size="7" font-family="monospace" text-anchor="middle">(N/2)+1 Quorum</text>
      </g>
      
      <!-- Scheduler & Controller Manager -->
      <g transform="translate(40, 135)">
        <rect width="160" height="70" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
        <text x="80" y="26" fill="#F59E0B" font-size="10" font-weight="bold" text-anchor="middle">kube-scheduler</text>
        <text x="80" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">2-Phase Placement</text>
        <text x="80" y="58" fill="#FBBF24" font-size="7" font-family="monospace" text-anchor="middle">Filtering &amp; Scoring</text>
      </g>
      
      <g transform="translate(245, 135)">
        <rect width="160" height="70" rx="6" fill="#1E293B" stroke="#EC4899" stroke-width="1.5"/>
        <text x="80" y="26" fill="#EC4899" font-size="10" font-weight="bold" text-anchor="middle">controller-manager</text>
        <text x="80" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Reconciliation Loops</text>
        <text x="80" y="58" fill="#F472B6" font-size="7" font-family="monospace" text-anchor="middle">Desired == Actual</text>
      </g>
      
      <!-- Master Internal Connectors -->
      <path d="M 200 87 L 245 87" stroke="#38BDF8" stroke-width="2"/>
      <path d="M 120 120 L 120 135" stroke="#F59E0B" stroke-width="2"/>
      <path d="M 325 120 L 325 135" stroke="#EC4899" stroke-width="2"/>
      
      <!-- Arrow to Worker -->
      <path d="M 430 87 L 470 87" stroke="#10B981" stroke-width="2.5" stroke-dasharray="4 2"/>
      <polygon points="475,87 465,82 465,92" fill="#10B981"/>
      
      <!-- Worker Node Box -->
      <rect x="475" y="20" width="405" height="200" rx="10" fill="#0F172A" stroke="#10B981" stroke-width="1.5"/>
      <text x="490" y="42" fill="#10B981" font-size="11" font-weight="bold" font-family="monospace">WORKER NODE (COMPUTE)</text>
      
      <!-- Kubelet -->
      <g transform="translate(495, 55)">
        <rect width="170" height="65" rx="6" fill="#1E293B" stroke="#10B981" stroke-width="1.5"/>
        <text x="85" y="26" fill="#10B981" font-size="11" font-weight="bold" text-anchor="middle">kubelet Agent</text>
        <text x="85" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Watches PodSpecs</text>
        <text x="85" y="56" fill="#34D399" font-size="7" font-family="monospace" text-anchor="middle">Calls CRI via gRPC</text>
      </g>
      
      <!-- Kube-Proxy -->
      <g transform="translate(690, 55)">
        <rect width="170" height="65" rx="6" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
        <text x="85" y="26" fill="#06B6D4" font-size="11" font-weight="bold" text-anchor="middle">kube-proxy</text>
        <text x="85" y="44" fill="#94A3B8" font-size="8" text-anchor="middle">Virtual IP Routing</text>
        <text x="85" y="56" fill="#22D3EE" font-size="7" font-family="monospace" text-anchor="middle">iptables / IPVS VIPs</text>
      </g>
      
      <!-- Container Runtime & Pods -->
      <g transform="translate(495, 135)">
        <rect width="365" height="70" rx="6" fill="#1E293B" stroke="#6366F1" stroke-width="1.5"/>
        <text x="182" y="22" fill="#6366F1" font-size="10" font-weight="bold" text-anchor="middle">CRI containerd + Pod Containers</text>
        <rect x="15" y="32" width="105" height="28" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="67" y="49" fill="#10B981" font-size="7" font-family="monospace" text-anchor="middle">Pod-A (10.244.1.5)</text>
        <rect x="130" y="32" width="105" height="28" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="182" y="49" fill="#10B981" font-size="7" font-family="monospace" text-anchor="middle">Pod-B (10.244.1.6)</text>
        <rect x="245" y="32" width="105" height="28" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
        <text x="297" y="49" fill="#38BDF8" font-size="7" font-family="monospace" text-anchor="middle">CNI (Calico/Flannel)</text>
      </g>
    </svg>`
  },

  "kubernetes-objects-workloads-networking-storage": {
    moduleNumber: 19,
    title: "Kubernetes Workloads, Flat Pod Networking & Decoupled Storage Architecture",
    category: "Kubernetes (K8s)",
    realDiagramUrl: '/images/kubernetes/08-pods-replicasets-deployments.png',
    realDiagramTitle: 'Kubernetes Core Workloads & Declarative Controller Hierarchy',
    realDiagramCaption: 'Controller reconciliation hierarchy: Deployments manage ReplicaSets, ReplicaSets manage Pods, and Pods encapsulate containers.',
    description: "Kubernetes abstraction tiers: Deployments managing ReplicaSets and Pods, ClusterIP/NodePort/LoadBalancer Services with CoreDNS discovery and kube-proxy DNAT translation, ConfigMaps and base64 Secrets mounted into containers, and CSI dynamic PersistentVolume provisioning bound to PVCs.",
    flowSteps: [
      "1. Deployment Controller",
      "2. Pod Lifecycle & Probes",
      "3. Service VIP & CoreDNS",
      "4. ConfigMap & Secret Injection",
      "5. PV / PVC Storage CSI Mount"
    ],
    stepByStep: [
      {
        step: 1,
        component: "Deployment & ReplicaSet",
        role: "Declarative workload controllers that manage the desired count of stateless Pods and execute rolling updates.",
        why: "Protects applications from node failures by automatically rescheduling pods on surviving nodes."
      },
      {
        step: 2,
        component: "Health Probes (Startup, Liveness, Readiness)",
        role: "Kubelet health checks that protect booting apps, restart deadlocked processes, and gate customer traffic.",
        why: "Readiness probes isolate sick or overloaded pods from Service traffic without killing them."
      },
      {
        step: 3,
        component: "Kubernetes Service (ClusterIP & NodePort)",
        role: "Provides a stable virtual IP (VIP) and CoreDNS name, load-balancing traffic across dynamically shifting Pod IPs.",
        why: "Shields clients from ephemeral Pod IP churn when pods crash or scale."
      },
      {
        step: 4,
        component: "ConfigMaps & Secrets",
        role: "Decouples configuration flags and base64 sensitive credentials from container images.",
        why: "Allows identical immutable container images to run across Dev, Staging, and Production environments."
      },
      {
        step: 5,
        component: "PersistentVolumes & CSI Dynamic Provisioning",
        role: "Decouples storage requirements (PVC) from cloud infrastructure disks (AWS EBS/EFS PVs).",
        why: "Guarantees stateful database data survives container restarts and pod reschedule events."
      }
    ],
    interRelationships: [
      {
        from: "Deployment",
        to: "ReplicaSet",
        relation: "Manages versioned ReplicaSets using pod-template-hash selectors"
      },
      {
        from: "Service",
        to: "Pods",
        relation: "Matches Pod labels via label selectors and routes traffic to EndpointSlice IPs"
      },
      {
        from: "Pod",
        to: "ConfigMap & Secret",
        relation: "Consumes configuration as environment variables or mounted filesystems"
      },
      {
        from: "Pod",
        to: "PersistentVolumeClaim",
        relation: "Mounts persistent cloud volume dynamically provisioned by StorageClass"
      }
    ],
    endToEndFlow: [
      {
        step: 1,
        name: "Traffic Arrival",
        desc: "External HTTP request hits Ingress Controller or Service NodePort/LoadBalancer."
      },
      {
        step: 2,
        name: "DNAT Translation",
        desc: "Kube-proxy iptables rule rewrites ClusterIP VIP to a healthy Pod IP passing its Readiness probe."
      },
      {
        step: 3,
        name: "Pod Execution",
        desc: "Application container receives packet, reading configuration from injected ConfigMap/Secret."
      },
      {
        step: 4,
        name: "Persistent Write",
        desc: "Application writes transactional records to mount path backed by AWS EBS PersistentVolume."
      }
    ],
    moduleContext: "Module 19 Topic 2 details the core resource primitives (Pods, Deployments, Services, ConfigMaps, PV/PVC) that form the building blocks of cloud-native systems.",
    svg: `<svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="890" height="230" rx="12" fill="#0B1120" stroke="#1E293B" stroke-width="2"/>
      
      <!-- Left: Ingress & Service -->
      <g transform="translate(25, 45)">
        <rect width="180" height="150" rx="8" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
        <text x="90" y="28" fill="#06B6D4" font-size="11" font-weight="bold" text-anchor="middle">SERVICE &amp; INGRESS</text>
        <rect x="15" y="45" width="150" height="40" rx="4" fill="#0F172A" stroke="#06B6D4" stroke-width="1"/>
        <text x="90" y="65" fill="#22D3EE" font-size="8" font-family="monospace" text-anchor="middle">ClusterIP VIP: 10.96.0.1</text>
        <text x="90" y="77" fill="#94A3B8" font-size="7" text-anchor="middle">api-service.prod.svc</text>
        <rect x="15" y="95" width="150" height="40" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
        <text x="90" y="115" fill="#38BDF8" font-size="8" text-anchor="middle">Endpoints: Pod IPs</text>
        <text x="90" y="127" fill="#94A3B8" font-size="7" text-anchor="middle">Gated by Readiness Probe</text>
      </g>
      
      <path d="M 205 120 L 250 120" stroke="#06B6D4" stroke-width="2.5"/>
      <polygon points="255,120 245,115 245,125" fill="#06B6D4"/>
      
      <!-- Center: Deployment & Pods -->
      <g transform="translate(255, 30)">
        <rect width="330" height="180" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="1.5"/>
        <text x="165" y="24" fill="#10B981" font-size="11" font-weight="bold" text-anchor="middle">DEPLOYMENT (app=web)</text>
        
        <!-- ReplicaSet Box -->
        <rect x="15" y="38" width="300" height="126" rx="6" fill="#1E293B" stroke="#10B981" stroke-width="1" stroke-dasharray="3 2"/>
        <text x="165" y="55" fill="#34D399" font-size="9" font-family="monospace" text-anchor="middle">ReplicaSet (pod-template-hash: 7d4b)</text>
        
        <!-- Pod 1 -->
        <rect x="25" y="68" width="130" height="85" rx="5" fill="#0B1120" stroke="#38BDF8" stroke-width="1"/>
        <text x="90" y="86" fill="#38BDF8" font-size="8" font-weight="bold" text-anchor="middle">Pod-1 (10.244.1.2)</text>
        <text x="90" y="102" fill="#94A3B8" font-size="7" text-anchor="middle">Liveness: HTTP :8080/live</text>
        <text x="90" y="116" fill="#94A3B8" font-size="7" text-anchor="middle">Readiness: :8080/ready</text>
        <text x="90" y="138" fill="#10B981" font-size="8" font-weight="bold" text-anchor="middle">STATUS: Running</text>
        
        <!-- Pod 2 -->
        <rect x="170" y="68" width="130" height="85" rx="5" fill="#0B1120" stroke="#38BDF8" stroke-width="1"/>
        <text x="235" y="86" fill="#38BDF8" font-size="8" font-weight="bold" text-anchor="middle">Pod-2 (10.244.2.4)</text>
        <text x="235" y="102" fill="#94A3B8" font-size="7" text-anchor="middle">Liveness: HTTP :8080/live</text>
        <text x="235" y="116" fill="#94A3B8" font-size="7" text-anchor="middle">Readiness: :8080/ready</text>
        <text x="235" y="138" fill="#10B981" font-size="8" font-weight="bold" text-anchor="middle">STATUS: Running</text>
      </g>
      
      <path d="M 585 120 L 630 120" stroke="#F59E0B" stroke-width="2.5"/>
      <polygon points="635,120 625,115 625,125" fill="#F59E0B"/>
      
      <!-- Right: Decoupled Config & Storage -->
      <g transform="translate(635, 30)">
        <rect width="240" height="180" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
        <text x="120" y="24" fill="#F59E0B" font-size="11" font-weight="bold" text-anchor="middle">CONFIG &amp; STORAGE</text>
        
        <rect x="15" y="38" width="210" height="38" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
        <text x="120" y="54" fill="#38BDF8" font-size="8" font-family="monospace" text-anchor="middle">ConfigMap: app-config</text>
        <text x="120" y="68" fill="#94A3B8" font-size="7" text-anchor="middle">Plaintext ENV &amp; config files</text>
        
        <rect x="15" y="82" width="210" height="38" rx="4" fill="#0F172A" stroke="#EF4444" stroke-width="1"/>
        <text x="120" y="98" fill="#F87171" font-size="8" font-family="monospace" text-anchor="middle">Secret: app-credentials</text>
        <text x="120" y="112" fill="#94A3B8" font-size="7" text-anchor="middle">Base64 encrypted credentials</text>
        
        <rect x="15" y="126" width="210" height="42" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="120" y="142" fill="#34D399" font-size="8" font-family="monospace" text-anchor="middle">PVC -> AWS EBS PV (gp3)</text>
        <text x="120" y="156" fill="#94A3B8" font-size="7" text-anchor="middle">PersistentVolumeClaim (RWO)</text>
      </g>
    </svg>`
  },

  "k8s-workloads-services-networking-helm": {
    moduleNumber: 19,
    title: "Zero-Downtime Rollouts, Metrics-Driven Autoscaling (HPA) & Helm Lifecycle",
    category: "Kubernetes (K8s)",
    realDiagramUrl: '/images/kubernetes/12-deployment-rolling-update-rollback.png',
    realDiagramTitle: 'Zero-Downtime Deployment Rollouts & Instant Rollback Flow',
    realDiagramCaption: 'Visualizing RollingUpdate strategy gradually replacing old Pods with new replicas while serving live traffic.',
    description: "Continuous delivery and enterprise operations: RollingUpdate twin ReplicaSet deployment strategy governed by maxSurge and maxUnavailable, Horizontal Pod Autoscaler scraping cAdvisor metrics via Metrics Server, and Helm chart package management with atomic versioned rollbacks.",
    flowSteps: [
      "1. Helm Deploy Trigger",
      "2. Twin ReplicaSet Orchestration",
      "3. Health Gate Traffic Switch",
      "4. Metrics Server cAdvisor Scrape",
      "5. HPA Dynamic Replica Scaling"
    ],
    stepByStep: [
      {
        step: 1,
        component: "Helm 3 Package Manager",
        role: "Renders parameterized YAML templates from values.yaml, tracks deployment revisions, and enables atomic rollbacks.",
        why: "Eliminates repetitive manifest duplication across environments and enables single-command rollbacks."
      },
      {
        step: 2,
        component: "RollingUpdate Strategy",
        role: "Incrementally creates Pods in the new ReplicaSet while terminating old Pods, governed by maxSurge and maxUnavailable.",
        why: "Guarantees continuous 100% application uptime without service interruptions during deployments."
      },
      {
        step: 3,
        component: "Traffic Gating via Readiness Probes",
        role: "New Pods only receive customer traffic after passing readiness health checks; old Pods handle traffic until transition completes.",
        why: "Prevents customer 502/503 errors during cold-start application initialization."
      },
      {
        step: 4,
        component: "Metrics Server & cAdvisor",
        role: "Scrapes CPU and memory usage from worker node cgroups and serves metrics via metrics.k8s.io.",
        why: "Provides real-time resource telemetry required for automated autoscaling algorithms."
      },
      {
        step: 5,
        component: "Horizontal Pod Autoscaler (HPA)",
        role: "Calculates desired replicas using the formula ceil[current * (actual / target)] and patches Deployment spec.replicas.",
        why: "Automatically scales compute capacity in response to traffic spikes and scales down to cut cloud bills."
      }
    ],
    interRelationships: [
      {
        from: "Helm CLI",
        to: "Kubernetes Cluster",
        relation: "Applies rendered manifests and stores release state in namespace Secrets"
      },
      {
        from: "Deployment Controller",
        to: "Old & New ReplicaSets",
        relation: "Coordinates gradual pod replacement honoring maxSurge and maxUnavailable"
      },
      {
        from: "Metrics Server",
        to: "kubelet cAdvisor",
        relation: "Periodically scrapes container resource metrics over kubelet summary API"
      },
      {
        from: "HPA Controller",
        to: "Deployment",
        relation: "Scales replica count dynamically between minReplicas and maxReplicas"
      }
    ],
    endToEndFlow: [
      {
        step: 1,
        name: "Release Trigger",
        desc: "CI/CD executes 'helm upgrade api ./charts/api --set image.tag=v2.0.0'."
      },
      {
        step: 2,
        name: "Surge Scaling",
        desc: "DeploymentController spins up v2 ReplicaSet pod (maxSurge: 1 allows 5 pods total)."
      },
      {
        step: 3,
        name: "Readiness Check",
        desc: "Kubelet queries '/healthz'; once healthy, Pod IP is registered with Service endpoints."
      },
      {
        step: 4,
        name: "Old Pod Drainage",
        desc: "Kubelet sends SIGTERM to old v1 pod, waits grace period, and scales old ReplicaSet to 0."
      },
      {
        step: 5,
        name: "Autoscaling",
        desc: "Traffic spike pushes CPU to 85%; HPA calculates ceil[4 * (85/50)] and scales replicas to 7."
      }
    ],
    moduleContext: "Module 19 Topic 3 covers production lifecycle operations: zero-downtime upgrades, self-healing autoscaling, and parameterized Helm release engineering.",
    svg: `<svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="890" height="230" rx="12" fill="#0B1120" stroke="#1E293B" stroke-width="2"/>
      
      <!-- Helm Release Box -->
      <g transform="translate(25, 45)">
        <rect width="180" height="150" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="90" y="28" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">HELM RELEASE MGR</text>
        <rect x="15" y="45" width="150" height="38" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
        <text x="90" y="62" fill="#38BDF8" font-size="8" font-family="monospace" text-anchor="middle">helm upgrade --install</text>
        <text x="90" y="74" fill="#94A3B8" font-size="7" text-anchor="middle">values.yaml injection</text>
        <rect x="15" y="92" width="150" height="42" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="90" y="108" fill="#34D399" font-size="8" font-family="monospace" text-anchor="middle">helm rollback api 1</text>
        <text x="90" y="122" fill="#94A3B8" font-size="7" text-anchor="middle">Atomic Multi-Object Undo</text>
      </g>
      
      <path d="M 205 120 L 250 120" stroke="#38BDF8" stroke-width="2.5"/>
      <polygon points="255,120 245,115 245,125" fill="#38BDF8"/>
      
      <!-- Center: RollingUpdate Twin ReplicaSets -->
      <g transform="translate(255, 30)">
        <rect width="340" height="180" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5"/>
        <text x="170" y="24" fill="#F59E0B" font-size="11" font-weight="bold" text-anchor="middle">ROLLINGUPDATE DANCE</text>
        
        <!-- Old RS -->
        <rect x="15" y="38" width="145" height="126" rx="5" fill="#1E293B" stroke="#EF4444" stroke-width="1"/>
        <text x="87" y="56" fill="#F87171" font-size="9" font-weight="bold" text-anchor="middle">Old RS: v1.0.0</text>
        <text x="87" y="72" fill="#94A3B8" font-size="7" text-anchor="middle">Scaling: 4 -> 3 -> 0</text>
        <rect x="25" y="85" width="125" height="28" rx="3" fill="#0F172A" stroke="#EF4444" stroke-width="1"/>
        <text x="87" y="102" fill="#F87171" font-size="7" font-family="monospace" text-anchor="middle">Terminating (SIGTERM)</text>
        <text x="87" y="135" fill="#EF4444" font-size="8" text-anchor="middle">Grace Period: 30s</text>
        
        <!-- New RS -->
        <rect x="180" y="38" width="145" height="126" rx="5" fill="#1E293B" stroke="#10B981" stroke-width="1"/>
        <text x="252" y="56" fill="#34D399" font-size="9" font-weight="bold" text-anchor="middle">New RS: v2.0.0</text>
        <text x="252" y="72" fill="#94A3B8" font-size="7" text-anchor="middle">Scaling: 0 -> 1 -> 4</text>
        <rect x="190" y="85" width="125" height="28" rx="3" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="252" y="102" fill="#34D399" font-size="7" font-family="monospace" text-anchor="middle">Readiness: Healthy</text>
        <text x="252" y="135" fill="#10B981" font-size="8" font-weight="bold" text-anchor="middle">maxSurge: 1 (5 max)</text>
      </g>
      
      <path d="M 595 120 L 635 120" stroke="#F59E0B" stroke-width="2.5"/>
      <polygon points="640,120 630,115 630,125" fill="#F59E0B"/>
      
      <!-- Right: HPA & Metrics -->
      <g transform="translate(640, 30)">
        <rect width="235" height="180" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.5"/>
        <text x="117" y="24" fill="#10B981" font-size="11" font-weight="bold" text-anchor="middle">AUTOSCALING (HPA)</text>
        
        <rect x="15" y="38" width="205" height="42" rx="4" fill="#0F172A" stroke="#06B6D4" stroke-width="1"/>
        <text x="117" y="54" fill="#22D3EE" font-size="8" font-family="monospace" text-anchor="middle">Metrics Server (cAdvisor)</text>
        <text x="117" y="68" fill="#94A3B8" font-size="7" text-anchor="middle">Scrapes node cgroup CPU/Mem</text>
        
        <rect x="15" y="88" width="205" height="45" rx="4" fill="#0F172A" stroke="#10B981" stroke-width="1"/>
        <text x="117" y="104" fill="#34D399" font-size="8" font-family="monospace" text-anchor="middle">HPA Controller Formula</text>
        <text x="117" y="120" fill="#94A3B8" font-size="7" font-family="monospace" text-anchor="middle">ceil[cur * (actual / target)]</text>
        
        <rect x="15" y="140" width="205" height="28" rx="4" fill="#0F172A" stroke="#F59E0B" stroke-width="1"/>
        <text x="117" y="158" fill="#FBBF24" font-size="7" font-family="monospace" text-anchor="middle">Stabilization Window: 300s</text>
      </g>
    </svg>`
  },
};

// Fallback & Dynamic Generator ensuring all 24 topics have complete step-by-step, relationships, and flows
export function getArchitectureForTopic(topicSlug, moduleNumber, topicTitle) {
  if (TOPIC_ARCHITECTURE[topicSlug]) {
    return TOPIC_ARCHITECTURE[topicSlug];
  }

  const modNum = moduleNumber || 1;
  const title = topicTitle || `Module ${modNum} Architecture`;

  // Standardized dynamic architecture metadata for any module topic
  return {
    moduleNumber: modNum,
    title: `${title} - Architecture & Data Flow`,
    category: `Module ${modNum} Engineering`,
    description: `Complete architectural data path, component interactions, and execution flow for ${title}.`,
    flowSteps: [
      "1. Client Ingress / Trigger",
      "2. Security & Policy Gateway",
      "3. High Availability Compute / Processing Tier",
      "4. Resilient Persistence & Observability"
    ],
    stepByStep: [
      {
        step: 1,
        component: "Client Ingress Tier",
        role: "Receives incoming user traffic or automation events through authenticated endpoints.",
        why: "Provides an external entry point while shielding internal private resources."
      },
      {
        step: 2,
        component: "Security Boundary & Authentication",
        role: "Evaluates least-privilege policies, security groups, and encryption keys.",
        why: "Enforces zero-trust defense-in-depth before allowing internal processing."
      },
      {
        step: 3,
        component: "Application & Processing Tier",
        role: `Executes business logic using scalable compute resources for ${title}.`,
        why: "Decouples processing from storage, enabling automated self-healing and horizontal scaling."
      },
      {
        step: 4,
        component: "Persistence & Telemetry Tier",
        role: "Maintains durable ACID data storage and streams metric logs for continuous monitoring.",
        why: "Guarantees zero data loss and alerts operators upon abnormal performance thresholds."
      }
    ],
    interRelationships: [
      {
        from: "Ingress / Perimeter",
        to: "Security Gateway",
        relation: "Validates incoming headers, tokens, and SSL/TLS certificates.",
        protocol: "HTTPS / TLS 1.3"
      },
      {
        from: "Security Gateway",
        to: "Processing Tier",
        relation: "Forwards sanitized payload over private subnet interface.",
        protocol: "Private TCP / Internal VPC Route"
      },
      {
        from: "Processing Tier",
        to: "Persistence Layer",
        relation: "Executes state read/write operations over encrypted storage channels.",
        protocol: "Encrypted Storage (KMS)"
      }
    ],
    endToEndFlow: [
      {
        stage: "1. Trigger",
        action: "Event / Request Arrival",
        details: `Initial event or HTTP transaction initiates the execution flow for ${title}.`
      },
      {
        stage: "2. Verification",
        action: "Policy Check",
        details: "Security perimeter validates permissions, rate limits, and network rules."
      },
      {
        stage: "3. Core Processing",
        action: "Workload Execution",
        details: "Target compute worker executes assigned task with automated error handling."
      },
      {
        stage: "4. State Commit",
        action: "Durable Persistence",
        details: "Result is committed to storage and audit log is streamed to monitoring dashboards."
      }
    ],
    moduleContext: {
      prevModule: `Module ${modNum > 1 ? modNum - 1 : 'Foundation'}`,
      thisModule: `Module ${modNum}: ${title}`,
      nextModule: `Module ${modNum < 20 ? modNum + 1 : 'Capstone'}`,
      connectionReason: `This tier builds on preceding network and compute configurations to deliver scalable production capabilities for Module ${modNum}.`
    },
    svg: `<svg viewBox="0 0 850 220" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="210" rx="14" fill="#0b1120" stroke="#334155" stroke-width="2"/>
      <g transform="translate(30, 40)">
        <rect width="150" height="130" rx="10" fill="#1e293b" stroke="#38bdf8"/>
        <text x="75" y="30" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. CLIENT / INGRESS</text>
        <text x="75" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">Request Payload</text>
        <text x="75" y="95" fill="#94a3b8" font-size="8" text-anchor="middle">HTTPS / REST / CLI</text>
      </g>
      <path d="M 190 105 L 230 105" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="235,105 225,100 225,110" fill="#38bdf8"/>
      
      <g transform="translate(245, 40)">
        <rect width="160" height="130" rx="10" fill="#1e293b" stroke="#a855f7"/>
        <text x="80" y="30" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">2. SECURITY GATEWAY</text>
        <text x="80" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">IAM / Policy Check</text>
        <text x="80" y="95" fill="#94a3b8" font-size="8" text-anchor="middle">Least-Privilege Guardrail</text>
      </g>
      <path d="M 415 105 L 455 105" stroke="#a855f7" stroke-width="2"/>
      <polygon points="460,105 450,100 450,110" fill="#a855f7"/>
      
      <g transform="translate(470, 40)">
        <rect width="160" height="130" rx="10" fill="#1e293b" stroke="#f59e0b"/>
        <text x="80" y="30" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. COMPUTE / SERVICE</text>
        <text x="80" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">${title.length > 22 ? title.slice(0, 20) + '...' : title}</text>
        <text x="80" y="95" fill="#94a3b8" font-size="8" text-anchor="middle">Worker / Microservice</text>
      </g>
      <path d="M 640 105 L 680 105" stroke="#10b981" stroke-width="2"/>
      <polygon points="685,105 675,100 675,110" fill="#10b981"/>
      
      <g transform="translate(695, 40)">
        <rect width="130" height="130" rx="10" fill="#1e293b" stroke="#10b981"/>
        <text x="65" y="30" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. PERSISTENCE TIER</text>
        <text x="65" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">Encrypted at Rest</text>
        <text x="65" y="95" fill="#6ee7b7" font-size="8" text-anchor="middle">Storage &amp; Monitoring</text>
      </g>
    </svg>`
  };
}
