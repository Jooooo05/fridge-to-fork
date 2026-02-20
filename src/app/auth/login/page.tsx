"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        const formData = new FormData(e.currentTarget);

        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">🍳 Fridge to Fork</CardTitle>
                    <CardDescription>Masuk ke akun kamu</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="kamu@email.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="••••••••" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 mt-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Masuk..." : "Masuk"}
                        </Button>
                        <p className="text-sm text-slate-500">
                            Belum punya akun?{" "}
                            <Link href="/auth/register" className="text-slate-900 font-medium hover:underline">
                                Daftar sekarang
                            </Link>
                        </p>
                    </CardFooter>
                    </form>
            </Card>
        </div>
    )
}