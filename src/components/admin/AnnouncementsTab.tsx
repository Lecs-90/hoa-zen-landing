import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AnnouncementsTab = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  // Mock data - will be replaced with real data later
  const announcements = [
    {
      id: 1,
      title: "Pool Maintenance Scheduled",
      content: "The community pool will be closed for maintenance from January 20-22. Please plan accordingly.",
      date: "2024-01-15",
      author: "Admin"
    },
    {
      id: 2,
      title: "Community Meeting Next Week",
      content: "Monthly HOA meeting will be held on January 25th at 7 PM in the community center.",
      date: "2024-01-12",
      author: "Admin"
    },
    {
      id: 3,
      title: "New Parking Guidelines",
      content: "Please review the updated parking guidelines posted on the community bulletin board.",
      date: "2024-01-10",
      author: "Admin"
    }
  ];

  const handleCreateAnnouncement = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual announcement creation
    toast({
      title: "Success",
      description: "Announcement created successfully"
    });
    
    setTitle("");
    setContent("");
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground">Manage community announcements and updates</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Create Announcement Form */}
      {showCreateForm && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title..."
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter announcement content..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="file">Attach File (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input id="file" type="file" accept="image/*,.pdf,.doc,.docx" />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateAnnouncement}>Create Announcement</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="feature-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    By {announcement.author} • {announcement.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsTab;