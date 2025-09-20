import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const OtherInformation = ({ register }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Other Information
      </h2>
      <div className="bg-white w-full sm:w-[70%] md:w-[45%] px-6 py-2 rounded-lg shadow-sm">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <div className="flex items-center justify-between">
            <p className="text-md font-medium text-gray-800">
              Flight Details (Optional)
            </p>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0 flex items-center gap-2"
              >
                {isOpen ? (
                  <>
                    <ChevronUp color="#2dbdb6" className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <ChevronDown color="#2dbdb6" className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <Textarea
              {...register("otherInfo")}
              placeholder="Flight details, special requests, or other information (Optional)"
              rows={3}
              className="mt-4 mb-2 w-full border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors"
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default OtherInformation;
