import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { saveTokenToLocalStorage } from "@/utils/utils.ts";
import { useActionState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertCircleIcon } from "lucide-react";

interface FormState {
  errors: string[] | null;
  enteredValues: {
    username: string;
  } | null;
  successfullySubmitted: boolean;
}

interface LoginResponse {
  message: string;
  token: string;
}

export function LoginForm() {
  const navigate = useNavigate();

  async function loginAction(
    _prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const errors: string[] = [];

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const loginResponse: LoginResponse = await response.json();

    if (!response.ok) {
      errors.push(loginResponse.message);
    } else {
      saveTokenToLocalStorage(loginResponse.token);
    }

    if (errors.length === 0) {
      return {
        errors: null,
        enteredValues: null,
        successfullySubmitted: true,
      };
    }

    return {
      errors: errors,
      enteredValues: {
        username,
      },
      successfullySubmitted: false,
    };
  }

  const [formState, formAction, pending] = useActionState(loginAction, {
    errors: null,
    enteredValues: null,
    successfullySubmitted: false,
  });

  useEffect(() => {
    if (formState.successfullySubmitted) {
      navigate("/home");
    }
  }, [formState.successfullySubmitted, navigate]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name={"username"}
                  type="text"
                  placeholder=""
                  required
                  defaultValue={formState.enteredValues?.username}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name={"password"}
                  type="password"
                  required
                />
              </div>

              <>
                {formState.errors && (
                  <Alert variant={"destructive"}>
                    <AlertCircleIcon />
                    <AlertTitle>Invalid Details!</AlertTitle>
                    <AlertDescription>
                      <p>Please verify the errors and try again.</p>
                      <ul className="list-inside list-disc">
                        {formState.errors.map((error, key) => (
                          <li key={key}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={pending}>
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Signup
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
