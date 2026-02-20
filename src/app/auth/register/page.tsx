"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                password,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || "Something went wrong");
            setLoading(false);
            return;
        }

        router.push("/auth/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">🍳 Fridge to Fork</CardTitle>
                    <CardDescription>Buat akun baru</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {
                            error && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
                                    {error}
                                </div>
                            )
                        }
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" name="name" type="text" placeholder="Nama kamu" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Jhon@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Password kamu" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Konfirmasi password kamu" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 mt-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Mendaftar..." : "Daftar"}
                        </Button>
                        <p className="text-sm text-slate-500">Sudah punya akun?{""}
                            <Link href="/auth/login" className="text-blue-500 hover:underline ml-1">Masuk</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}