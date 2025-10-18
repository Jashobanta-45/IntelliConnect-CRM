
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser, useAuth } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { Loader2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }),
});

export default function ReviewPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      comment: '',
      rating: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedRating === 0) {
      form.setError('rating', { type: 'manual', message: 'Please select a rating.' });
      return;
    }
    setIsSubmitting(true);

    try {
      // Ensure user is authenticated, anonymously if needed
      if (!user && auth) {
        await signInAnonymously(auth);
      }

      if (!firestore) {
          throw new Error("Firestore is not available");
      }

      const reviewsCollection = collection(firestore, 'reviews');
      const docData = {
        ...values,
        rating: selectedRating,
        submittedAt: serverTimestamp(),
      };
      
      addDoc(reviewsCollection, docData)
      .catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'reviews',
            operation: 'create',
            requestResourceData: docData,
        }))
      });

      toast({
        title: 'Review Submitted!',
        description: 'Thank you for your feedback. We appreciate you taking the time.',
      });
      form.reset();
      setSelectedRating(0);
    } catch (error) {
      console.error('Error sending review:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Could not send your review. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline text-xl">IntelliConnect CRM</span>
          </Link>
          <nav>
            <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Leave a Review</CardTitle>
            <CardDescription>
              We'd love to hear your feedback about our service.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'h-8 w-8 cursor-pointer transition-colors',
                                (hoverRating >= star || selectedRating >= star)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-muted-foreground'
                              )}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => {
                                setSelectedRating(star);
                                field.onChange(star);
                              }}
                            />
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us what you think..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Review
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
