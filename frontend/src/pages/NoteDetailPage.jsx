import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, LoaderIcon, Trash2, Trash2Icon } from "lucide-react";
import { Link } from "react-router";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
        console.log(`Error in fetching note ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete the note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-16 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeft className="size-5 mr-2" />
              Back to Notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-4 mr-2" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Note Title"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>

                  <textarea
                    className="input input-bordered h-32 pt-4"
                    placeholder="Write your note here"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mb-4 mr-4">
              <button
                className="btn btn-primary"
                disable={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
