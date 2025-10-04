import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/userContext";
import { z } from "zod";
import { toast } from "sonner";
import { TipsContext } from "@/context/tipsContext";

const Home = () => {
    const navigate = useNavigate();
    const { age, setAge, gender, setGender, goal, setGoal } = useUser();
    const { tips, setTips } = useContext(TipsContext);

    const formSchema = z.object({
        age: z
            .string()
            .nonempty("Age is required")
            .regex(/^\d+$/, "Age must be a number")
            .transform((val) => parseInt(val, 10)),
        gender: z.string().nonempty("Gender is required"),
        goal: z.string().nonempty("Goal is required"),
    });

    const handleSubmit = () => {
        try {
            const data = formSchema.parse({ age, gender, goal });
            setTips("");
            navigate(`/dashboard/${data.age}/${data.gender}/${data.goal}`);
        } catch (err) {
            if (err instanceof z.ZodError) {
                err.issues.forEach((e) => toast.error(e.message));
            }
        }
    };

    return (
        <div className="pt-3 bg-[#FFF2E6] text-[#3A0E2B] min-h-screen">
            <div className="justify-center flex text-xl font-semibold mb-10 mt-10">Wellness Guide</div>
            <div className="flex justify-center items-center min-h-[60vh]">
                <Card className="w-full max-w-sm md:max-w-md lg:w-lg bg-[#3A0E2B] text-white p-10">
                    <CardHeader className="flex justify-center flex-col items-center text-center">
                        <CardTitle>Welcome!</CardTitle>
                        <CardDescription>
                            To personalize your experience, we just need a few details from you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="Enter your age"
                                className="w-full"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <Label htmlFor="gender">Gender</Label>
                            <Select onValueChange={(e) => setGender(e)} value={gender}>
                                <SelectTrigger id="gender" className="w-full">
                                    <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <Label htmlFor="Goal">What Goal do you want to Achieve?</Label>
                            <Input
                                id="goal"
                                type="text"
                                placeholder="Enter your goal"
                                className="w-full"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={handleSubmit} className="bg-[#FF4052] hover:bg-[#FF2A3A]">
                            Get Tips
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Home;
