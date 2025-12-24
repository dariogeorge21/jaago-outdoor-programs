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
    <div className="mb-12 md:mb-16">
      <div
        className={`flex flex-col ${
          isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        } bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-[40%] h-64 md:h-auto min-h-[400px]">
          <Image
            src={event.posterPath}
            alt={`${event.name} event poster`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={false}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {event.name}
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
            {event.description}
          </p>
          <ul className="space-y-3 mb-8">
            {event.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start text-gray-700 leading-relaxed"
              >
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <Link href={`/register/${event.slug}`} className="w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto">
              {event.ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

