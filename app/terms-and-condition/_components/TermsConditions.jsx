"use client";
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TermsConditions = () => {
  const termsData = [
    {
      id: "charges",
      title: "Rental Charges",
      content: `The charges are calculated based on the 24-hour period from commencement of the 
      Rental Period for Daily and Weekly rentals, a month or monthly rentals are calculated 
      based on the 30-day period. Daily rental rates will be applied for rental below 7 days. 
      Weekly rental rates will be applied for rental 7 days and above. If the rentals more than 
      14 days, a month rate will be calculated whichever lower. In relation to the monthly 
      rental, any extension of the rental period will be prorated based on calendar month.`
    },
    {
      id: "protection",
      title: "Protection & Coverage",
      type: "complex",
      sections: [
        {
          subtitle: "Comprehensive Insurance Coverage:",
          items: [
            { label: "Collision Damage Waiver (CDW)", description: "Covers damage to the rental vehicle" },
            { label: "Third Party Liability", description: "Coverage for damage to other vehicles/property" },
            { label: "Personal Accident Insurance", description: "Medical coverage for driver and passengers" },
            { label: "Theft Protection", description: "Coverage against vehicle theft" }
          ]
        },
        {
          subtitle: "Coverage Limitations:",
          items: [
            "Damage caused by negligent driving or traffic violations",
            "Damage to tires, wheels, windscreen, and undercarriage",
            "Damage caused while driving under influence of alcohol/drugs"
          ]
        }
      ]
    },
    {
      id: "roadside",
      title: "Roadside Assistance (RA)",
      type: "complex",
      sections: [
        {
          subtitle: "24/7 Emergency Support:",
          items: [
            { label: "Breakdown Service", description: "Immediate assistance for mechanical failures" },
            { label: "Battery Jump-start", description: "Emergency battery assistance" },
            { label: "Flat Tire Service", description: "Tire change assistance" },
            { label: "Emergency Fuel", description: "Fuel delivery service" },
            { label: "Lockout Service", description: "Key retrieval assistance" },
            { label: "Towing Service", description: "Vehicle recovery when necessary" }
          ]
        }
      ],
      infoBox: {
        type: "info",
        content: "Response Time: 30-60 minutes in urban areas\nCoverage: Available throughout Malaysia"
      }
    },
    {
      id: "maintenance",
      title: "Full Maintenance",
      type: "complex",
      sections: [
        {
          subtitle: "Included Services:",
          items: [
            { label: "Regular Servicing", description: "Scheduled maintenance as per manufacturer guidelines" },
            { label: "Oil Changes", description: "Engine oil and filter replacements" },
            { label: "Brake Maintenance", description: "Brake pad and fluid checks" },
            { label: "Tire Rotation", description: "Regular tire maintenance and rotation" },
            { label: "Battery Maintenance", description: "Battery checks and replacements" }
          ]
        }
      ],
      infoBox: {
        type: "success",
        content: "All vehicles are serviced according to manufacturer specifications to ensure optimal performance."
      }
    },
    {
      id: "notIncluded",
      title: "Items Not Included in Rental Rates",
      type: "complex",
      sections: [
        {
          subtitle: "Additional Costs:",
          items: [
            { label: "Fuel", description: "Vehicle provided with full tank, return with full tank" },
            { label: "Toll Charges", description: "All highway and bridge tolls" },
            { label: "Parking Fees", description: "All parking charges during rental period" },
            { label: "Traffic Fines", description: "All traffic violations and summons" },
            { label: "Additional Driver", description: "Charges for additional authorized drivers" },
            { label: "GPS Navigation", description: "Optional GPS device rental" },
            { label: "Child Safety Seats", description: "Baby/child car seat rental" }
          ]
        }
      ]
    },
    {
      id: "delivery",
      title: "Delivery and Collection Services",
      type: "grid",
      sections: [
        {
          subtitle: "Delivery Service:",
          items: [
            "Airport Delivery",
            "Hotel/Residence",
            "Office/Business",
            "Custom Location"
          ]
        },
        {
          subtitle: "Collection Service:",
          items: [
            "Scheduled Pickup",
            "Emergency Collection",
            "Multiple Locations",
            "24/7 Service Available"
          ]
        }
      ],
      infoBox: {
        type: "warning",
        content: "Free Service: Within 20km radius\nAdditional Charges: RM 2 per km beyond free radius"
      }
    },
    {
      id: "oneWay",
      title: "One Way & Intercity Charges",
      type: "complex",
      sections: [
        {
          subtitle: "One-Way Rental Charges:",
          items: [
            { label: "Within State", description: "RM 100-200 depending on distance" },
            { label: "Interstate", description: "RM 200-500 depending on destination" },
            { label: "East Malaysia", description: "Special rates apply" },
            { label: "Popular Routes", description: "Discounted rates for common destinations" }
          ]
        }
      ],
      infoBox: {
        type: "error",
        content: "Important: Minimum 24 hours notice required. Subject to vehicle availability at return location."
      }
    },
    {
      id: "extension",
      title: "Extension of Rental / Excess Hours",
      type: "complex",
      sections: [
        {
          subtitle: "Extension Policy:",
          items: [
            { label: "Advance Notice", description: "Minimum 24 hours notice preferred" },
            { label: "Same Day Extension", description: "Subject to availability and additional charges" },
            { label: "Rate Application", description: "Extended period charged at daily/weekly/monthly rates" }
          ]
        },
        {
          subtitle: "Late Return Fees:",
          items: [
            "1-3 hours late: RM 50 per hour",
            "3-6 hours late: RM 75 per hour",
            "Over 6 hours: Full additional day charge"
          ]
        }
      ]
    },
    {
      id: "earlyReturn",
      title: "Early Return Policy",
      type: "complex",
      sections: [
        {
          subtitle: "Refund Policy:",
          items: [
            { label: "Advance Notice", description: "24 hours notice required for refund consideration" },
            { label: "Minimum Rental", description: "No refund for rentals less than 3 days" },
            { label: "Weekly Rentals", description: "50% refund if returned 3+ days early with notice" },
            { label: "Monthly Rentals", description: "Prorated refund for weeks not used" }
          ]
        },
        {
          subtitle: "Non-Refundable Fees:",
          items: [
            "Booking and processing fees",
            "Insurance and protection costs",
            "Add-on services utilized"
          ]
        }
      ]
    },
    {
      id: "fuel",
      title: "Fuel Policy",
      type: "complex",
      sections: [
        {
          subtitle: "Full-to-Full Policy:",
          items: [
            { label: "Pickup", description: "Vehicle provided with full fuel tank" },
            { label: "Return", description: "Vehicle must be returned with full fuel tank" },
            { label: "Documentation", description: "Fuel receipts must be provided for verification" },
            { label: "Location", description: "Refueling must be done within 10km of return location" }
          ]
        },
        {
          subtitle: "Fuel Charges:",
          items: [
            { label: "Refueling Service", description: "RM 50 service charge + fuel cost at premium rates" },
            { label: "Partial Tank", description: "Charged per liter at premium rates" },
            { label: "Empty Return", description: "Full tank charge + RM 100 service fee" }
          ]
        }
      ],
      infoBox: {
        type: "info",
        content: "Fuel Card Option Available: Pre-paid fuel card with competitive rates and no refueling hassle."
      }
    }
  ];

  const renderInfoBox = (infoBox) => {
    const getBoxStyles = (type) => {
      switch (type) {
        case 'info':
          return 'bg-blue-50 text-blue-800';
        case 'success':
          return 'bg-green-50 text-green-800';
        case 'warning':
          return 'bg-yellow-50 text-yellow-800';
        case 'error':
          return 'bg-red-50 text-red-800';
        default:
          return 'bg-gray-50 text-gray-800';
      }
    };

    return (
      <div className={`mt-4 p-3 rounded-lg ${getBoxStyles(infoBox.type)}`}>
        <p className="text-[14px]">
          {infoBox.content.split('\n').map((line, index) => (
            <span key={index}>
              {line.includes(':') ? <strong>{line}</strong> : line}
              {index < infoBox.content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    );
  };

  const renderContent = (term) => {
    if (typeof term.content === 'string') {
      return (
        <p className="text-gray-700 text-[14px] leading-relaxed">
          {term.content}
        </p>
      );
    }

    if (term.type === 'grid') {
      return (
        <div className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            {term.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-900 text-[14px]">{section.subtitle}</h4>
                <ul className="list-disc list-inside text-gray-700 text-[14px] space-y-1 mt-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {term.infoBox && renderInfoBox(term.infoBox)}
        </div>
      );
    }

    if (term.type === 'complex') {
      return (
        <div className="space-y-3">
          {term.sections?.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-gray-900 text-[14px]">{section.subtitle}</h4>
              <ul className="list-disc list-inside text-gray-700 text-[14px] space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {typeof item === 'object' && item.label ? (
                      <>
                        <strong>{item.label}:</strong> {item.description}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {term.infoBox && renderInfoBox(term.infoBox)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-[95%] max-w-[1400px] mx-auto mt-[30px] pb-[80px] space-y-4">
      {termsData.map((term) => (
        <div key={term.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={term.id} className="border-0">
              <AccordionTrigger className="px-4 py-4 text-left">
                <h3 className="text-[14px] font-bold text-gray-900">{term.title}</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-4 bg-gray-50">
                {renderContent(term)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default TermsConditions;