"use client";
import React from "react";
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
      title: "Rental charges",
      content: `The charges are calculated based on the 24-hour period from commencement of the 
      Rental Period for Daily and Weekly rentals, a month or monthly rentals are calculated 
      based on the 30-day period. Daily rental rates will be applied for rental below 7 days. 
      Weekly rental rates will be applied for rental 7 days and above. If the rentals more than 
      14 days, a month rate will be calculated whichever lower. In relation to the monthly 
      rental, any extension of the rental period will be prorated based on calendar month.`,
    },
    {
      id: "protection",
      title: "Protection & Coverage",
      content: `Our comprehensive protection plans provide financial security and peace of mind 
      during your rental period. Coverage options include collision damage waiver, theft protection, 
      and liability coverage. Different protection tiers are available to suit your needs and budget, 
      with varying deductibles and coverage limits. All protection plans must be selected at the time
      of booking and cannot be modified once the rental commences.`,
    },
    {
      id: "roadside",
      title: "Roadside Assistance (RA)",
      content: `24/7 roadside assistance is available throughout your rental period to ensure uninterrupted 
      travel. Services include emergency towing, battery jump-start, flat tire assistance, lockout service, 
      and emergency fuel delivery. Response times vary by location and weather conditions. Some services may 
      incur additional charges depending on the nature of assistance required and your protection plan coverage.`,
    },
    {
      id: "maintenance",
      title: "Full Maintenance",
      content: `All rental vehicles undergo comprehensive maintenance programs including regular oil changes, 
      tire rotations, brake inspections, and scheduled manufacturer servicing. Emergency repairs and breakdowns 
      due to normal wear and tear are covered under our maintenance program. Customers are responsible for checking 
      fluid levels, tire pressure, and reporting any mechanical issues immediately. Neglect or misuse resulting in 
      mechanical failure may result in additional charges.`,
    },
    {
      id: "notIncluded",
      title: "Items Not Included in Rental Rates",
      content: `Rental rates exclude fuel, toll charges, parking fees, traffic fines, additional driver fees, and
      optional equipment such as GPS units, child safety seats, or ski racks. Insurance deductibles, damage repairs 
      beyond normal wear and tear, and cleaning fees for excessive soiling are also excluded. International travel 
      permits, border crossing documentation, and associated fees are customer responsibilities.`,
    },
    {
      id: "delivery",
      title: "Delivery and Collection Services",
      content: `Vehicle delivery and collection services are available within designated service areas for an additional 
      fee. Delivery fees are calculated based on distance from our location to your specified address. Same-day delivery 
      requests may incur premium charges and are subject to availability. Collection services must be scheduled in advance, 
      and late collection fees may apply if vehicles are not ready at the agreed time.`,
    },
    {
      id: "oneWay",
      title: "One Way & Intercity Charges",
      content: `One-way rentals between different locations incur additional drop-off charges that vary by distance and 
      destination popularity. Intercity travel may require special authorization and documentation. Drop-off charges are 
      non-refundable and must be paid in advance. Some vehicle categories may not be available for one-way rentals, and 
      advance booking is strongly recommended for intercity travel.`,
    },
    {
      id: "extension",
      title: "Extension of Rental / Excess Hours",
      content: `Rental extensions must be approved and confirmed before the original return time to avoid unauthorized use 
      charges. Extensions are charged at the applicable daily, weekly, or monthly rate depending on the extension period. 
      Excess hours beyond the agreed return time incur hourly penalty charges. Unauthorized extensions may result in 
      additional fees and affect future rental eligibility.`,
    },
    {
      id: "earlyReturn",
      title: "Early Return Policy",
      content: `Early returns do not automatically qualify for refunds of unused rental days. Refund eligibility depends 
      on the rental duration, rate type, and advance notice provided. Weekly and monthly rentals returned early may 
      receive partial refunds based on our refund schedule. Daily rentals typically do not qualify for early return refunds. 
      Processing fees may apply to approved refunds.`,
    },
    {
      id: "fuel",
      title: "Fuel Policy",
      content: `All vehicles are provided with a full tank of fuel and must be returned with a full tank to avoid refueling 
      charges. If returned with less fuel, refueling fees will be charged at premium rates plus a service fee. Fuel receipts 
      from stations within 10 miles of the return location and dated within 24 hours of return may be accepted for fuel credit. 
      Alternative fuel vehicles follow specific charging or refueling protocols as outlined in the rental agreement.`,
    },
  ];

  return (
    <div className="w-[95%] max-w-[1400px] mx-auto mt-[30px] pb-[80px] space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {termsData.map((term) => (
          <div
            key={term.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <AccordionItem value={term.id} className="border-0">
              <AccordionTrigger className="px-4 py-4 text-left [&>svg]:text-teal-500 hover:no-underline">
                <h3 className="text-[14px] font-bold text-gray-900">
                  {term.title}
                </h3>
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

export default TermsConditions;
