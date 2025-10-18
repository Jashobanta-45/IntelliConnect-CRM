
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
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, orderBy, Timestamp, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: Timestamp;
  ownerId: string | null;
};

const ADMIN_EMAIL = 'beherajashobanta892@gmail.com';

export default function ContactsPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  const contactsQuery = useMemoFirebase(
    () => {
        if (!firestore || !user) return null;

        const contactsCollection = collection(firestore, 'contacts');
        const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL;
        
        if (isAdmin) {
          // Admin sees all contacts
          return query(contactsCollection, orderBy('submittedAt', 'desc'));
        } else {
          // Regular user sees only their own contacts
          return query(contactsCollection, where('ownerId', '==', user.uid), orderBy('submittedAt', 'desc'));
        }
    },
    [firestore, user]
  );
  
  const { data: contacts, isLoading, error } = useCollection<Contact>(contactsQuery);

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
            <Skeleton className="h-4 w-full" />
          </TableCell>
        </TableRow>
      ));
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center text-destructive">
            Error loading contacts: {error.message}
          </TableCell>
        </TableRow>
      );
    }

    if (!contacts || contacts.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center text-muted-foreground">
            No contact submissions found.
          </TableCell>
        </TableRow>
      );
    }

    return contacts.map((contact) => (
      <TableRow key={contact.id}>
        <TableCell className="font-medium">{contact.name}</TableCell>
        <TableCell>{contact.email}</TableCell>
        <TableCell className="text-muted-foreground">
          {contact.submittedAt?.toDate().toLocaleString() || 'N/A'}
        </TableCell>
        <TableCell>{contact.message}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Submissions</CardTitle>
        <CardDescription>
          Here are the latest messages from the contact form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Message</TableHead>
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
