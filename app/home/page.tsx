/**
 * v0 by Vercel.
 * @see https://v0.dev/t/E5pKO3aa2Yu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import { Button } from "@/components/ui/button"

export default function Component() {
  const [prompt, setPrompt] = useState("")
  const [mood, setMood] = useState("happy")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [colorPalette, setColorPalette] = useState("#FFFFFF")
  const [style, setStyle] = useState("realistic")
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const handleGenerate = async () => {
    if (attempts >= 5) {
      return
    }
    setLoading(true)
    try {
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          mood,
          aspectRatio,
          colorPalette,
          style,
        }),
      })
      const data = await response.json()
      setImages(data.images)
      setAttempts(attempts + 1)
    } catch (error) {
      console.error("Error generating images:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-background text-foreground">
      <div className="max-w-md w-full px-6 py-10 sm:px-8 lg:px-10 md:mr-10 border-r border-muted shadow-md">
        <h1 className="text-3xl font-bold mb-8">Text-to-Image Generator</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block font-medium mb-2">
              Main Text Prompt
            </label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your text prompt"
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="mood" className="block font-medium mb-2">
              Mood
            </label>
            <Select  value={mood} onValueChange={(value) => setMood(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">Happy</SelectItem>
                <SelectItem value="sad">Sad</SelectItem>
                <SelectItem value="mysterious">Mysterious</SelectItem>
                <SelectItem value="energetic">Energetic</SelectItem>
                <SelectItem value="serene">Serene</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="aspect-ratio" className="block font-medium mb-2">
              Aspect Ratio
            </label>
            <Select
              
              value={aspectRatio}
              
              onValueChange={(value) => setAspectRatio(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <label htmlFor="color-palette" className="block font-medium mb-2 mr-4">
              Color Palette
            </label>
            <div className="flex-1" />
            <Input
              id="color-code"
              value={colorPalette}
              onChange={(e) => setColorPalette(e.target.value)}
              className="ml-4 w-32"
            />
          </div>
          <div>
            <label htmlFor="style" className="block font-medium mb-2">
              Aesthetic Style
            </label>
            <Select value={style}  onValueChange={(value) => setStyle(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="cartoon">Cartoon</SelectItem>
                <SelectItem value="abstract">Abstract</SelectItem>
                <SelectItem value="impressionistic">Impressionistic</SelectItem>
                <SelectItem value="surreal">Surreal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-muted-foreground">Attempts remaining: {5 - attempts}</div>
            <div />
          </div>
          <Button type="button" onClick={handleGenerate} disabled={attempts >= 5 || loading} className="w-full">
            {loading ? <div className="mr-2" /> : "Generate Images"}
          </Button>
        </form>
      </div>
      <div className="max-w-md w-full px-6 py-10 sm:px-8 lg:px-10 md:ml-10 mt-10 md:mt-0 shadow-md h-full flex flex-col">
        <h2 className="text-3xl font-bold mb-6">Generated Images</h2>
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <div className="mr-2" />
            <span>Generating images...</span>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
            {images.map((image, index) => (
              <img
                key={index}
                src="{image}"
                alt={`Generated image ${index + 1}`}
                width={400}
                height={400}
                className="object-cover rounded-lg"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-1">
            <span>No images generated yet.</span>
          </div>
        )}
      </div>
    </div>
  )
}