import { Loader } from "lucide-react"

function LoaderComp() {
  return (
    <span className="flex items-center justify-center my-auto h-[60dvh]">
      <Loader className="animate-spin h-10 w-10" />
    </span>
  )
}

export default LoaderComp
