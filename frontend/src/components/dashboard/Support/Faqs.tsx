import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
   {
      type: "Admission Issues",
      questions: [
         {
            question: "How can I retrieve my admission letter?",
            answer: "You can retrieve your admission letter by logging into the student portal and navigating to the 'Admission' section.",
         },
         {
            question: "How can I retrieve my admission letter?",
            answer: "Ensure you have your admission number and password to access the portal and download the letter.",
         },
         {
            question: "How can I retrieve my admission letter?",
            answer: "If you encounter issues, contact the admissions office for assistance.",
         },
      ],
   },
   {
      type: "Payment Problem",
      questions: [
         {
            question: "How do I confirm my payment?",
            answer: "You can confirm your payment by checking your transaction history in the payment section of the portal.",
         },
         {
            question: "What if my payment fails?",
            answer: "If your payment fails, verify your payment method and try again. If the issue persists, contact support.",
         },
      ],
   },
   {
      type: "Academic Records",
      questions: [
         {
            question: "How can I request my transcript?",
            answer: "Request your transcript through the academic records section of the portal or visit the registrar's office.",
         },
         {
            question: "Why is my result not updated?",
            answer: "Your result may not be updated due to delays in data processing. Contact the academic office for clarification.",
         },
      ],
   },
   {
      type: "General",
      questions: [
         {
            question: "Who do I contact for technical issues with the portal?",
            answer: "For technical issues, contact the IT support team via the support section on the portal.",
         },
      ],
   },
];

const FAQ = () => {
   const [openQuestion, setOpenQuestion] = useState(null);

   const toggleQuestion = (index) => {
      setOpenQuestion(openQuestion === index ? null : index);
   };

   return (
      <div className="md:p-6 ">
         <h1 className="text-3xl font-bold text-gray-800 mb-8 md:mx-[3rem] my-[1rem]">FAQs</h1>
         {faqs.map((section, sectionIndex) => (
            <div
               key={sectionIndex}
               className="mb-8"
            >
               <h2 className="text-2xl font-semibold text-gray-700 md:mx-[3rem] mb-[1rem]">{section.type}</h2>
               <div className="space-y-4">
                  {section.questions.map((faq, i) => {
                     const isOpen = openQuestion === `${sectionIndex}-${i}`;
                     return (
                        <div
                           key={i}
                           className="rounded-lg"
                        >
                           <button
                              className="w-full flex rounded-lg justify-between items-center py-4 px-[1rem] md:px-[3rem]  bg-white hover:bg-gray-100"
                              onClick={() => toggleQuestion(`${sectionIndex}-${i}`)}
                           >
                              <span className=" text-[#000]/50">{faq.question}</span>
                              <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                           </button>
                           <div className={`overflow-hidden transition-all duration-300 px-[3rem] ${isOpen ? "max-h-screen p-4 bg-gray-100 text-gray-600" : "max-h-0"}`}>{isOpen && <p>{faq.answer}</p>}</div>
                        </div>
                     );
                  })}
               </div>
            </div>
         ))}
      </div>
   );
};

export default FAQ;
