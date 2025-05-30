import { CMSLogo } from "@/common/assets/CMSLogo";
import { Button } from "@/common/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/ui/card";
import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";
import { SignInBackground } from "@/domains/auth/components/SignInBackground";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
    const [isLoading] = useState<boolean>(false);

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <SignInBackground />

            <Card className="w-full max-w-md mx-4 relative z-10 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="text-center pb-4">
                    <CMSLogo />
                    <CardTitle className="text-3xl font-bold text-gray-900">CMS Login</CardTitle>
                    <p className="text-gray-600 mt-2">2024 KNUD Content Management System</p>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6">
                        <Label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                            이메일
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="이메일을 입력하세요"
                                className="pl-10 h-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <span>로그인</span>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
