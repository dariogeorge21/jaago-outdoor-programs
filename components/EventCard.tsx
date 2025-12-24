'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EventConfig } from '@/types/registration';
import { Button } from './ui/Button';

interface EventCardProps {
  event: EventConfig;
  imagePosition: 'left' | 'right';
}

export function EventCard({ event, imagePosition }: EventCardProps) {
  const isLeft = imagePosition === 'left';

  return (
    <div className="mb-16 md:mb-24 group">
      <div
        className={`flex flex-col ${
          isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        } bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 card-hover`}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-[45%] h-80 md:h-auto min-h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
          <Image
            src={event.posterPath}
            alt={`${event.name} event poster`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority={false}
          />
          {/* Overlay gradient for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-teal-500/10 z-0"></div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-br from-white to-amber-50/30">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
          
          <div className="relative z-10">
            {/* Event badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Upcoming Event
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {event.name}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {event.description}
            </p>
            
            <ul className="space-y-4 mb-10">
              {event.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 leading-relaxed group/item"
                >
                  <span className="flex-shrink-0 w-6 h-6 mr-4 mt-0.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="flex-1 group-hover/item:text-gray-900 transition-colors">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
            
            <Link href={`/register/${event.slug}`} className="inline-block">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                {event.ctaText}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
