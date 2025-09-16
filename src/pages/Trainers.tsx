import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const trainersData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@fitgym.com",
    phone: "+1 (555) 987-6543",
    specialization: "Strength Training",
    status: "Active",
    hireDate: "2023-06-15",
    classesThisWeek: 12,
    avatar: "",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@fitgym.com",
    phone: "+1 (555) 876-5432",
    specialization: "Yoga & Flexibility",
    status: "Active",
    hireDate: "2023-03-20",
    classesThisWeek: 15,
    avatar: "",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@fitgym.com",
    phone: "+1 (555) 765-4321",
    specialization: "HIIT & Cardio",
    status: "On Leave",
    hireDate: "2022-11-10",
    classesThisWeek: 0,
    avatar: "",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    email: "emma.rodriguez@fitgym.com",
    phone: "+1 (555) 654-3210",
    specialization: "Personal Training",
    status: "Active",
    hireDate: "2024-01-08",
    classesThisWeek: 20,
    avatar: "",
  },
];

const Trainers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trainers, setTrainers] = useState(trainersData);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "default",
      "On Leave": "secondary",
      Inactive: "outline",
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trainers</h1>
          <p className="text-muted-foreground">Manage your gym trainers and their schedules</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="hero" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Trainer
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="gym-card md:col-span-2">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search trainers by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gym-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{trainers.length}</div>
              <p className="text-sm text-muted-foreground">Total Trainers</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gym-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {trainers.filter(t => t.status === "Active").length}
              </div>
              <p className="text-sm text-muted-foreground">Active Trainers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trainers Table */}
      <Card className="gym-card">
        <CardHeader>
          <CardTitle>Trainer Directory</CardTitle>
          <CardDescription>
            Complete list of all gym trainers and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trainer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Classes This Week</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainers.map((trainer) => (
                <TableRow key={trainer.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={trainer.avatar} alt={trainer.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
                          {getInitials(trainer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{trainer.name}</p>
                        <p className="text-sm text-muted-foreground">ID: #{trainer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-foreground">{trainer.email}</p>
                      <p className="text-sm text-muted-foreground">{trainer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                      {trainer.specialization}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(trainer.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{trainer.classesThisWeek}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(trainer.hireDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Trainer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trainers;