const database = 'quantum_data';

use(database);

// Create all the collections
db.createCollection("vendor_data");
db.createCollection("contract");
db.createCollection("ai_systems");
db.createCollection("quantum_encryption");
db.createCollection("simulation_engine");
db.createCollection("quantum_data");
db.createCollection("quantum_decryption");
db.createCollection("result");

// Insert data into vendor_data
db.vendor_data.insertOne({
    name: "Googly",
    industry: "Tech",
    contact_details: { 
        email: "contact@googly.com", 
        phone: "123-456-7890" 
    },
    vendor_id: "V00001",
    company_overview: {
        size: "Large",
        employees: 15000,
        headquarters: "San Francisco, USA",
        annual_revenue: "2.5B USD"
    }
});

// Insert data into contract
db.contract.insertOne({
    vendor_id: "V00001",
    contract_id: "C00001",
    services: ["AI", "Encryption", "Simulation"],
    price: 1124425,
    lease_duration: "2 Years",
    payment_schedule: [
        { installment: 1, amount: 374808, due_date: "2024-06-15", status: "Paid" },
        { installment: 2, amount: 374808, due_date: "2025-06-15", status: "Pending" },
        { installment: 3, amount: 374809, due_date: "2026-06-15", status: "Pending" }
    ]
});

// Insert data into ai_systems
db.ai_systems.insertOne({
    model_name: "QuantumAI",
    version: "1.2",
    data_encryption: true,
    supported_algorithms: ["Quantum RSA", "AES-256", "SHA-3"],
    performance_metrics: {
        training_time: "45 hours",
        accuracy: "92%",
        energy_usage: "10 kWh"
    }
});

// Insert data into quantum_encryption
db.quantum_encryption.insertOne({
    model_version: "1.5",
    algorithm_name: "Quantum RSA",
    vendor_logs: [
        "Encryption process started at 2024-12-15 10:00 AM",
        "Vendor data successfully encrypted.",
        "Quantum key exchange initiated.",
        "Encryption completed at 2024-12-15 10:05 AM."
    ],
    security_level: "High",
    keys_used: ["QKey-123", "QKey-124"]
});

// Insert data into simulation_engine
db.simulation_engine.insertOne({
    simulation_id: "S00001",
    scenario_id: "Scenario-123",
    date: "2024-12-15",
    inputs: {
        data_source: "Encrypted Vendor Data",
        parameters: ["Operational Efficiency", "Risk Analysis", "Market Adaptation"]
    },
    outputs: [
        "Encrypted Simulation Results",
        "Time Series Analysis Completed",
        "Threat and Opportunity Matrix Generated"
    ],
    runtime: "3 hours",
    computational_cost: "750 USD"
});

// Insert data into quantum_data
db.quantum_data.insertOne({
    simulation_results: "Results Data",
    encryption_models: ["QEncrypt-Model1", "QEncrypt-Model2"],
    research_papers: [
        { title: "Quantum Encryption in Modern AI", author: "Dr. Smith", year: 2023 },
        { title: "Improving Efficiency Through Simulation", author: "Dr. Johnson", year: 2024 }
    ],
    metadata: {
        last_updated: "2024-12-16",
        version: "1.1.0"
    }
});

// Insert data into quantum_decryption
db.quantum_decryption.insertOne({
    algorithm_name: "Quantum RSA",
    decrypted_output: [
        "Decrypted Simulation Results",
        "Recommendations Extracted for Analysis"
    ],
    decryption_time: "30 seconds",
    verification_status: "Verified"
});

// Insert data into result
db.result.insertOne({
    result_id: "R001",
    report: "Final Report for Googly",
    recommendations: {
        financial: [
            "Reduce operational costs by 10% over the next 12 months.",
            "Reallocate 15% of budget towards R&D for AI enhancements."
        ],
        operational: [
            "Avoid delays in encryption key rotations.",
            "Implement an automated encryption monitoring system."
        ],
        management: [
            "Focus on upskilling employees to use AI tools effectively.",
            "Improve communication between technical and business teams."
        ],
        threats: [
            "Potential delays in simulation processes due to heavy encryption.",
            "Competitors are advancing in AI-driven encryption systems."
        ],
        opportunities: [
            "Expand encryption services to healthcare and finance sectors.",
            "Introduce faster AI-driven decryption algorithms."
        ]
    },
    simulation_summary: {
        runtime: "12 hours",
        processed_data_size: "12 TB",
        overall_accuracy: "95.44%"
    }
});

// Adding another vendor
db.vendor_data.insertOne({
  name: "InnovaSecure",
  industry: "Healthcare",
  contact_details: { email: "contact@innovasecure.com", phone: "987-654-3210" },
  vendor_id: "V00002",
  company_overview: {
      size: "Medium",
      employees: 5000,
      headquarters: "New York, USA",
      annual_revenue: "800M USD"
  }
});

// Adding a related contract
db.contract.insertOne({
  vendor_id: "V00002",
  contract_id: "C00002",
  services: ["Encryption", "Simulation"],
  price: 845000,
  lease_duration: "1 Year",
  payment_schedule: [
      { installment: 1, amount: 422500, due_date: "2024-06-15", status: "Pending" },
      { installment: 2, amount: 422500, due_date: "2025-06-15", status: "Pending" }
  ]
});

//Aggregate pipeline to view vendor name with contract details
db.contract.aggregate([
  {
      $lookup: {
          from: "vendor_data",
          localField: "vendor_id",
          foreignField: "vendor_id",
          as: "vendor_details"
      }
  },
  { 
      $unwind: "$vendor_details"
  },
  {
      $project: {                   
          _id: 0,
          contract_id: 1,
          services: 1,
          price: 1,
          lease_duration: 1,
          vendor_name: "$vendor_details.name"
      }
  }
]);

//Aggregate pipeline to view the count of reccomendations
db.result.aggregate([
  {
      $project: {
          _id: 0,
          result_id: 1,
          financial_count: { $size: "$recommendations.financial" },
          operational_count: { $size: "$recommendations.operational" },
          management_count: { $size: "$recommendations.management" },
          threats_count: { $size: "$recommendations.threats" },
          opportunities_count: { $size: "$recommendations.opportunities" }
      }
  }
]);
//Aggregate pipeline to view the total sum of all contracts
db.contract.aggregate([
  {
      $group: {
          _id: null,
          total_contract_price: { $sum: "$price" }
      }
  }
]);



