"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { authClient } from "@/lib/auth-client";

interface UpgradeModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeModel = ({ open, onOpenChange }: UpgradeModelProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
          <AlertDialogDescription>
            you need an active subscription to access this feature. Upgrade to
            Pro to unlock all features and enjoy unlimited access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => authClient.checkout({ slug: "pro" })}
          >
            Upgrade Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
