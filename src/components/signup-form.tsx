import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useActionState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

interface FormState {
  errors: string[] | null;
  enteredValues: {
    username: string;
  } | null;
  successfullySubmitted: boolean;
}
interface SignupResponse {
  message: string;
}

export function SignupForm() {
  const navigate = useNavigate();

  async function signupAction(
    _prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const errors: string[] = [];

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    } else {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      // const response = await fetch("http://localhost:8080/auth/signup", {
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const signupResponse: SignupResponse = await response.json();

      if (!response.ok) {
        errors.push(signupResponse.message);
      }
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

  const [formState, formAction, pending] = useActionState(signupAction, {
    errors: null,
    enteredValues: null,
    successfullySubmitted: false,
  });

  useEffect(() => {
    if (formState.successfullySubmitted) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [formState.successfullySubmitted, navigate]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="any name or email"
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

              <>
                {formState.successfullySubmitted && (
                  <Alert className="bg-green-700">
                    <CheckCircle2Icon />
                    <AlertTitle>Account created successfully!</AlertTitle>
                    <AlertDescription className={"text-white"}>
                      Please proceed to login.
                    </AlertDescription>
                  </Alert>
                )}
              </>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={pending}>
                  Signup
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
