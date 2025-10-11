import { VideoCaptionGenerator } from "@/components/video-caption-generator";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						AI Video Caption Generator
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					The Simple, Open-Source Caption Generator for Developers and
					Creators. <br /> Bring Your Own Model (BYOM)
				</p>
				</div>
				<VideoCaptionGenerator />
			</div>
		</div>
	);
}
