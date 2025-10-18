'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser } from "@/firebase";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function Home() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const cyberImages = PlaceHolderImages.filter(image => image.imageHint.includes("cyber"));

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };
  
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline text-xl">IntelliConnect CRM</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/review">Leave a Review</Link>
            </Button>
            <Button onClick={handleGetStarted} disabled={isUserLoading}>
              {isUserLoading ? 'Loading...' : (user ? 'Go to Dashboard' : 'Get Started')}
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
          <div className="text-center lg:text-start space-y-6">
            <main className="text-5xl md:text-6xl font-bold font-headline">
              <h1 className="inline">
                <span className="inline bg-gradient-to-r from-[#42A5F5] to-[#26A69A] text-transparent bg-clip-text">
                  IntelliConnect
                </span>{" "}
                CRM
              </h1>{" "}
              for modern business
            </main>

            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              Leverage AI to automate communication, gain deep insights from interactions, and build stronger customer relationships across all channels.
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button className="w-full md:w-1/3" onClick={handleGetStarted} disabled={isUserLoading}>
                {isUserLoading ? 'Loading...' : 'Get Started'}
              </Button>
            </div>
          </div>

          <div className="z-10">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-xl"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {cyberImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={700}
                      height={500}
                      data-ai-hint={image.imageHint}
                      className="rounded-lg shadow-2xl"
                      priority={cyberImages.indexOf(image) === 0}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="absolute inset-0 -z-10 h-full w-full bg-background [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true"></div>

        </section>
      </main>
    </div>
  );
}

    