import VideoPlayer from "@/components/video-player";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 p-8">
      <VideoPlayer
        src={`https://agitated-nightingale-nintmjxec.storage.iran.liara.space/20230428_175834.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=342080d4-c2d1-45a3-a670-00ed1438736c%2F20230605%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230605T070948Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=13fd852506ead5905a68e7572f8bce6d887007f70f46ac3149c6dfe5c01185aa`}
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut hic vitae
        rem amet quod consectetur, similique ullam recusandae quisquam iure
        officia. Natus laudantium ipsa rerum tempora numquam pariatur optio
        dolore.
      </p>
    </main>
  );
}
