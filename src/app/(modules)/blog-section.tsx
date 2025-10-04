import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Blog } from "@/types";

interface BlogSectionProps {
  blogs: Blog[];
}

const timeSince = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} năm trước`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} tháng trước`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} ngày trước`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} giờ trước`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} phút trước`;
  }
  return "Vừa xong";
};

export const BlogSection = ({ blogs }: BlogSectionProps) => {
  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
            Prom Blogs
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-lg">
            Các bài viết cập nhật các tin tức mới nhất liên quan đến Prompts và
            AI.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(post => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className="mb-2 text-gray-500 text-sm">
                  Đã tạo: {timeSince(post.updatedAt)}
                </div>
                <CardTitle className="text-xl line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/blog/${post.id}`}>
                  <Button
                    variant="outline"
                    className="group-hover:bg-purple-50 group-hover:border-purple-200 w-full"
                  >
                    Đọc thêm <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
