"use client";

// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
//import { Checkbox } from "@/components/ui/checkbox";
//import { Input } from "@/components/ui/input";
//import { Loader2, Trash2 } from "lucide-react";
//import { useState } from "react";

import { useMutation, useQuery } from "convex/react";
import { api } from "@onfindr-betterauth-convex-next-expo/backend/convex/_generated/api";
import type { Id } from "@onfindr-betterauth-convex-next-expo/backend/convex/_generated/dataModel";

export default function Businesses() {

    const buinesses = useQuery(api.businesses.getAll);

    return (
        <div className="mx-auto w-full max-w-md py-10">
            Businesses
        </div>
    );
}
