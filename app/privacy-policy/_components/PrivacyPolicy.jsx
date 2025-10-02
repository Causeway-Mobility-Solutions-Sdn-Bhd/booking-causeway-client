
"use client";
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrivacyPolicy = () => {
  const termsData = [
    {
      id: "scope",
      title: "Scope & Controllers",
      content: `This Privacy Policy applies to all personal data collected and 
      processed by our car rental service through our website, mobile application, 
      and physical locations. We act as the data controller for all personal information 
      collected during the rental process. This policy covers data collection from customers, 
      potential customers, website visitors, and business partners. Our privacy practices comply with 
      applicable data protection laws including GDPR and local privacy regulations. We are committed to 
      protecting your privacy and handling your personal data responsibly throughout our business relationship.`
    },
    {
      id: "dataCollection",
      title: "Data Collection (What & How)",
      content: `We collect personal information necessary for vehicle rental services including full name, date 
      of birth, contact details, address, driver's license information, and payment details. Additional data may 
      include rental preferences, vehicle usage patterns, GPS location data during rentals, and customer service 
      interactions. Information is collected directly from customers during booking, through our website and app usage, 
      from third-party verification services, and through vehicle monitoring systems. We also collect technical data 
      such as IP addresses, browser information, and device identifiers to improve our digital services and security.`
    },
    {
      id: "purposes",
      title: "Purposes For Processing",
      content: `Your personal data is processed to fulfill rental agreements, verify driver eligibility, process payments, 
      and provide customer support. We use your information for vehicle tracking and recovery, insurance claims processing, 
      traffic violation management, and service improvement. Marketing communications and promotional offers are sent based 
      on your preferences and consent. Data analysis helps us enhance our services, develop new offerings, and ensure operational 
      efficiency. We also process data to comply with legal obligations, protect against fraud, and maintain the security of our 
      systems and customers.`
    },
    {
      id: "disclosures",
      title: "Disclosures To Affiliates & Third Parties",
      content: `We may share your personal data with affiliated companies within our corporate group for business operations and s
      ervice delivery. Third-party sharing occurs with payment processors, insurance providers, vehicle recovery services, and credit 
      verification agencies as necessary for rental services. Law enforcement agencies may receive information when legally required or 
      for legitimate security purposes. Marketing partners may receive anonymized data for promotional activities with your consent. 
      Service providers including IT support, customer service platforms, and data storage companies have access to personal data under 
      strict confidentiality agreements and data protection requirements.`
    },
    {
      id: "cookies",
      title: "Cookies & Online Advertising Choices",
      content: `Our website and mobile applications use cookies and similar technologies to enhance user experience, analyze website performance, 
      and deliver personalized content. Essential cookies are necessary for basic site functionality, while analytical cookies help us understand 
      user behavior and improve our services. Marketing cookies enable targeted advertising and promotional content based on your interests and browsing 
      history. You can manage cookie preferences through your browser settings or our cookie consent tool. Third-party advertising networks may use cookies 
      to display relevant ads across different websites. We respect Do Not Track signals and provide opt-out options for marketing communications and behavioral advertising.`
    },
    {
      id: "security",
      title: "Security",
      content: `We implement comprehensive security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. 
      Technical safeguards include encryption, secure servers, firewalls, and regular security assessments. Physical security controls protect our facilities 
      and data storage systems. Access to personal data is restricted to authorized personnel who need the information to perform their duties. Regular security 
      training ensures our staff understand data protection responsibilities. We maintain incident response procedures to address any potential data breaches promptly 
      and transparently. While we strive to protect your information, no system is completely secure, and we encourage customers to take appropriate precautions when 
      sharing personal data online.`
    },
    {
      id: "retention",
      title: "Data Retention & Integrity",
      content: `Personal data is retained only as long as necessary for the purposes for which it was collected, typically for the duration of our business relationship 
      plus applicable legal retention periods. Rental agreement data is kept for up to seven years for legal and accounting purposes. Marketing data is retained based on 
      your consent and can be deleted upon request. We regularly review and update stored information to ensure accuracy and relevance. Automated deletion processes remove 
      outdated data according to our retention schedule. Data integrity is maintained through regular backups, error checking, and validation procedures. Upon account closure 
      or data deletion requests, we securely destroy personal information while preserving legally required records.`
    },
    {
      id: "access",
      title: "Access, Correction & Portability",
      content: `You have the right to access your personal data, request corrections to inaccurate information, and obtain copies of your data in a portable format. Data access 
      requests are processed within 30 days, and we provide clear information about what data we hold and how it's used. You can update your account information through our website or 
      mobile app, or by contacting customer service. Data portability requests allow you to transfer your information to other service providers in commonly used formats. We provide mechanisms 
      to correct errors, update preferences, and delete unnecessary information. Account holders can download their data history, rental records, and profile information through secure online portals or 
      by submitting formal requests to our privacy team.`
    }
  ];

  return (
    <div className="w-[95%] max-w-[1400px] mx-auto mt-[30px] pb-[80px] space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {termsData.map((term) => (
          <div key={term.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <AccordionItem value={term.id} className="border-0">
              <AccordionTrigger className="px-4 py-4 text-left [&>svg]:text-teal-500 hover:no-underline">
                <h3 className="text-sm font-semibold text-black leading-5">{term.title}</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700 text-sm leading-5 text-justify">
                  {term.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default PrivacyPolicy;