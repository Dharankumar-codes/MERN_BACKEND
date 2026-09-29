export const initialCategories = [
  {
    id: 'CAT-101',
    name: 'Education',
    description: 'Services related to public education, student grants, scholarships, and academic accreditation.',
    status: 'Active',
    createdAt: '2026-01-15'
  },
  {
    id: 'CAT-102',
    name: 'Healthcare',
    description: 'Public health services, medical certifications, hospital registration, and health insurance schemes.',
    status: 'Active',
    createdAt: '2026-01-18'
  },
  {
    id: 'CAT-103',
    name: 'Transport',
    description: 'Vehicle licensing, road permits, public transit permits, and transport infrastructure registrations.',
    status: 'Active',
    createdAt: '2026-01-20'
  },
  {
    id: 'CAT-104',
    name: 'Revenue',
    description: 'Property tax filing, land revenue services, commercial tax assessment, and municipal duties.',
    status: 'Active',
    createdAt: '2026-01-22'
  },
  {
    id: 'CAT-105',
    name: 'Public Safety',
    description: 'Emergency response, police verification services, fire safety certifications, and disaster management.',
    status: 'Active',
    createdAt: '2026-01-25'
  }
];

export const initialDepartments = [
  {
    id: 'DEP-201',
    name: 'Department of Education',
    code: 'DOE-GOV',
    category: 'Education',
    description: 'Oversees primary, secondary, and higher education initiatives and scholarship funds across the state.',
    status: 'Active',
    createdAt: '2026-01-16'
  },
  {
    id: 'DEP-202',
    name: 'Department of Health',
    code: 'DOH-GOV',
    category: 'Healthcare',
    description: 'Manages public medical institutions, sanitization standards, and citizen health records.',
    status: 'Active',
    createdAt: '2026-01-19'
  },
  {
    id: 'DEP-203',
    name: 'Transport Department',
    code: 'DOT-GOV',
    category: 'Transport',
    description: 'Regulates motor vehicles, issues driving licenses, and enforces road transport safety guidelines.',
    status: 'Active',
    createdAt: '2026-01-21'
  },
  {
    id: 'DEP-204',
    name: 'Revenue Department',
    code: 'DOR-GOV',
    category: 'Revenue',
    description: 'Handles municipal tax collection, land ownership registries, and fiscal administrative policies.',
    status: 'Active',
    createdAt: '2026-01-23'
  },
  {
    id: 'DEP-205',
    name: 'Police Department',
    code: 'PPD-GOV',
    category: 'Public Safety',
    description: 'Maintains public law and order, processes verification requests, and coordinates emergency response.',
    status: 'Active',
    createdAt: '2026-01-26'
  }
];

export const initialServices = [
  {
    id: 'SRV-301',
    name: 'Scholarship Application',
    code: 'SRV-SCH-01',
    category: 'Education',
    department: 'Department of Education',
    serviceType: 'Online',
    description: 'State government merit-cum-means scholarship for undergraduate and postgraduate students.',
    status: 'Active',
    createdAt: '2026-02-01'
  },
  {
    id: 'SRV-302',
    name: 'Health Certificate',
    code: 'SRV-HLT-02',
    category: 'Healthcare',
    department: 'Department of Health',
    serviceType: 'Online & Offline',
    description: 'Official medical fitness certificate issued by authorized government healthcare officers.',
    status: 'Active',
    createdAt: '2026-02-03'
  },
  {
    id: 'SRV-303',
    name: 'Driving Licence Renewal',
    code: 'SRV-DRV-03',
    category: 'Transport',
    department: 'Transport Department',
    serviceType: 'Online',
    description: 'Online portal for instant renewal of non-commercial and commercial motor driving licenses.',
    status: 'Active',
    createdAt: '2026-02-05'
  },
  {
    id: 'SRV-304',
    name: 'Property Tax Payment',
    code: 'SRV-TAX-04',
    category: 'Revenue',
    department: 'Revenue Department',
    serviceType: 'Online',
    description: 'Secure digital portal for annual residential and commercial property tax filing and receipt download.',
    status: 'Active',
    createdAt: '2026-02-08'
  },
  {
    id: 'SRV-305',
    name: 'Police Clearance Certificate',
    code: 'SRV-POL-05',
    category: 'Public Safety',
    department: 'Police Department',
    serviceType: 'Online & Offline',
    description: 'Official background check verification certificate for employment, visa, and passport applications.',
    status: 'Active',
    createdAt: '2026-02-10'
  },
  {
    id: 'SRV-306',
    name: 'Vehicle Registration (RC)',
    code: 'SRV-VEH-06',
    category: 'Transport',
    department: 'Transport Department',
    serviceType: 'Online & Offline',
    description: 'New vehicle registration, transfer of ownership, and duplicate registration certificate issuance.',
    status: 'Active',
    createdAt: '2026-02-12'
  },
  {
    id: 'SRV-307',
    name: 'Birth & Death Registration',
    code: 'SRV-REG-07',
    category: 'Healthcare',
    department: 'Department of Health',
    serviceType: 'Online',
    description: 'Application and instant verification download of vital statistics certificates.',
    status: 'Active',
    createdAt: '2026-02-15'
  },
  {
    id: 'SRV-308',
    name: 'Commercial Trade License',
    code: 'SRV-TRD-08',
    category: 'Revenue',
    department: 'Revenue Department',
    serviceType: 'Offline',
    description: 'Municipal trade license approval and annual renewal for business establishments.',
    status: 'Inactive',
    createdAt: '2026-02-18'
  }
];

export const initialIssues = [
  {
    id: 'ISS-401',
    title: 'Delayed Driving License Dispatch',
    description: 'Applied for DL renewal on Feb 10th (Ref: DL-9921), payment successful but status still shows pending dispatch.',
    category: 'Transport',
    department: 'Transport Department',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-03-01'
  },
  {
    id: 'ISS-402',
    title: 'Property Tax Online Payment Receipt Failed to Generate',
    description: 'Amount deducted from bank account for PID #48291, but transaction status failed on portal.',
    category: 'Revenue',
    department: 'Revenue Department',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-03-04'
  },
  {
    id: 'ISS-403',
    title: 'Scholarship Application Portal Server Timeout',
    description: 'Unable to upload document attachments during step 3 of state merit scholarship form submission.',
    category: 'Education',
    department: 'Department of Education',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-03-08'
  },
  {
    id: 'ISS-404',
    title: 'Incorrect Name on Birth Certificate Record',
    description: 'Minor spelling mistake in mother name on digital birth certificate downloaded from portal.',
    category: 'Healthcare',
    department: 'Department of Health',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-03-12'
  },
  {
    id: 'ISS-405',
    title: 'Police Clearance Appointment Reschedule Request',
    description: 'Need to update physical verification appointment date due to emergency travel.',
    category: 'Public Safety',
    department: 'Police Department',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-03-15'
  }
];
