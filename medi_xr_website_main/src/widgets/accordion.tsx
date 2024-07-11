import React, { useState } from 'react'
import { accordionData } from '@/constants' 
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const Accordion = () => {
  const [openAccordion, setOpenAccordion] = useState(null)

  const handleAccordionClick = (index: any) => {
    setOpenAccordion((prev) => (prev === index ? null : index))
  }

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="box-shadow">
      {accordionData.map((item, index) => (
        <div key={item.id} className='bg-white'>
          <h2 id={`accordion-collapse-heading-${item.id}`}>
            <button
              type="button"
              className={`${index === 0 && "rounded-t-xl"} ${index !== accordionData.length - 1 && "border-b-0"} ${openAccordion === item.id ? "bg-blue-gradient text-white" : "text-dimBlacker bg-white"} flex font-bold items-center justify-between w-full p-6 rtl:text-right border border-dimBlack hover:bg-blue-gradient gap-3`}
              data-accordion-target={`#accordion-collapse-body-${item.id}`}
              aria-expanded={openAccordion === item.id}
              aria-controls={`accordion-collapse-body-${item.id}`}
              onClick={() => handleAccordionClick(item.id)}
            >
              <p className='text-left'>{item.question}</p>
              <ChevronDownIcon className={`w-4 h-4 rotate-${openAccordion === item.id ? '180' : '0'} shrink-0`} />
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${item.id}`}
            className={`p-5 border border-dimBlack ${index == accordionData.length - 1 ? "border-b-2" : "border-b-0"} ${
              openAccordion === item.id ? '' : 'hidden'
            }`}
            aria-labelledby={`accordion-collapse-heading-${item.id}`}
          >
            <p className="mb-2 p-6">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
