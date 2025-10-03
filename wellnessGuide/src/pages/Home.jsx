import React, {useState} from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [goal, setGoal] = useState("");

    const handleSubmit = () => {
        navigate(`/dashboard/${age}/${gender}/${goal}`);
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
                            <Select onValueChange={(e) => setGender(e)}>
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
