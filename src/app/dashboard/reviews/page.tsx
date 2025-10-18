
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type Review = {
  id: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  submittedAt: Timestamp;
};

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
          )}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const firestore = useFirestore();

  const reviewsQuery = useMemoFirebase(
    () => {
        if (!firestore) return null;
        return query(collection(firestore, 'reviews'), orderBy('submittedAt', 'desc'))
    },
    [firestore]
  );
  
  const { data: reviews, isLoading, error } = useCollection<Review>(reviewsQuery);

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-48" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
           <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        </TableRow>
      ));
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center text-destructive">
            Error loading reviews: {error.message}
          </TableCell>
        </TableRow>
      );
    }

    if (!reviews || reviews.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center text-muted-foreground">
            No reviews submitted yet.
          </TableCell>
        </TableRow>
      );
    }

    return reviews.map((review) => (
      <TableRow key={review.id}>
        <TableCell className="font-medium">{review.name}</TableCell>
        <TableCell>{review.email}</TableCell>
        <TableCell className="text-muted-foreground">
          {review.submittedAt?.toDate().toLocaleString() || 'N/A'}
        </TableCell>
        <TableCell>
            <RatingDisplay rating={review.rating} />
        </TableCell>
        <TableCell>{review.comment}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
        <CardDescription>
          Here are the latest reviews submitted by your customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderContent()}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    