import { useState } from "react";

const faqInfo = [
  {
    question: "What is TailGotchi?",
    answer:
      "TailGotchi is a platform designed to simplify pet care by helping you track tasks, manage your pet’s health, and collaborate with others to ensure the best care for your furry friends.",
  },
  {
    question: "How do I get started?",
    answer:
      "To get started, simply create your profile, add your pet’s details, and begin tracking their care routine. You can also invite others to join and collaborate on tasks.",
  },
  {
    question: "Can I add multiple pets?",
    answer:
      "Yes, you can create a profile for each of your pets and manage their care individually.",
  },
  {
    question: "How do I collaborate with others?",
    answer:
      "You can invite family members, friends, or fellow pet caretakers to join your pet's care team and share responsibilities like feeding, grooming, and vet visits.",
  },
  {
    question: "How do I track my pet’s care?",
    answer:
      "You can create tasks like feeding, grooming, and vet visits. The platform will help you stay on top of them, and you can mark them as completed when done.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-lightblue py-12 px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {faqInfo.map((item, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3
                className="text-xl sm:text-2xl font-semibold text-lightblue mb-4 cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
              </h3>
              {openIndex === index && (
                <p className="text-sm sm:text-base md:text-lg text-gray-700">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
