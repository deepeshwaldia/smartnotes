import React from 'react'
import { motion } from "motion/react"
import { useState } from 'react'
import { generateNotes } from '../services/api.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/usersice.js'
const topicform = ({setResult ,setLoading,loading,setError}) => {
    const [topic, setTopic] = useState("")
const [classLevel, setClassLevel] = useState("")
const [examType, setExamType] = useState("")
const [revisionMode, setRevisionMode] = useState(false)
const [includeDiagram, setIncludeDiagram] = useState(false)
const [includeChart, setIncludeChart] = useState(false)
const [progress, setProgress] = useState(0)
const [progressText,setprogressText]=useState("");
const dispatch =useDispatch()
const handleSubmit = async () => {

    if (!topic.trim()) {
        setError("Please enter the topic")
        return
    }

    setError("")
    setLoading(true)
    setResult(null)

    try {

        const result = await generateNotes({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        })

        setResult(result.data)
        setLoading(false)
        setClassLevel("")
        setTopic("")
        setExamType("")
        setIncludeChart(false)
        if(typeof result.creditsLeft ==="number"){
            dispatch(updateCredits(result.creditsLeft));
        }

    } catch (error) {

        console.log(error)
        setError("Failed to fetch notes from server")
        setLoading(false)

    } finally {

        setLoading(false)

    }
}
useEffect(()=>{
if(!loading){
    setProgress(0)
   setprogressText("")
    return
   
}
let value =0;
const interval = setInterval(()=>{
value += Math.random()*8;
if(value>=95){
    value=95;
    setprogressText("Almost done..");
}
else if(value >70){
    setprogressText("finalizing notes...");
}
else if(value>40){
    setprogressText("processing content...");
}
else{
    setprogressText("Generating notes...");
}
setProgress(Math.floor(value))

},700)
return ()=>clearInterval(interval);
},[loading])
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className='rounded-2xl from-black/90 via-black/80 to-black/90 bg-linear-to-br backdrop-blur-2xl border border-white/10 shadow-[0_25_30px_rgba(0,0,0,0.75)] p-8 text-white space-y-6'>

      <input type="text"
      className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30'placeholder='Enter topic (e.g. Web Development)' 
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      />
       <input type="text"
      className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30'placeholder='class level (e.g. 10th, 12th, Undergraduate)' 
      value={classLevel}
      onChange={(e) => setClassLevel(e.target.value)}
      />
       <input type="text"
      className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30'placeholder='exam type (e.g. board, competitive, university)' 
      value={examType}
      onChange={(e) => setExamType(e.target.value)}
      />
      <div className='flex flex-col md:flex-row gap-6'>
        <Toogle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
        <Toogle label="Include Diagram" checked={includeDiagram} onChange={() => setIncludeDiagram(!includeDiagram)} />
        <Toogle label="Include Chart" checked={includeChart} onChange={() => setIncludeChart(!includeChart)} />
      </div>
      <motion.button 
      onClick={handleSubmit}
      whileHover={!loading?{scale:1.02}:{}}
      whileTap={!loading?{scale:0.95}:{}}
      disabled={loading}
       className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition ${
        loading?
        "bg-gray-300 text-gray-600 cursor-not-allowed"
        :"bg-linear-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]"}
        `

      }>
        {loading ?"Generating Notes..":"Generate Notes"}

      </motion.button>

    {loading &&  <div className='mt-4 space-y-2'>
        <div className='w-full h-2 rounded-full bg-white/10 overflow-hidden'>
        <motion.div 
        initial={{width:0}}
        animate={{width:`${progress}%`}}
        transition={{ease:"easeOut",duration:0.6}}
        className='h-full bg-linear-to-r from-green-400 via-emerald-400 to-green-500'>

        </motion.div>
        </div>
        <div className='flex justify-between text-sm text-gray-300'>
            <span>{progressText}</span>
            <span>{ progress}%</span>
        </div>
        <p className='text-sm text-gray-400 text-center'>
            This may take up to 2-5 minutes. Please don't close or refresh the page.
        </p>
        </div>}

    </motion.div>
  )
}
function Toogle({label,checked,onChange}){
    return(
        <div className='flex items-center gap-4 cursor-pointer select-none' onClick={onChange}>
            <motion.div 
            animate={{backgroundColor: checked? "rgb(34,197,94,0.35)": "rgb(255,255,255,0.1)"}}
            transition={{duration:0.25}} className='relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg'
            >
                <motion.div 
                layout
                transition={{type:"spring", stiffness:500 ,damping:30}}
                className='absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]'
                style={{left:checked?"1.6rem":"0.25rem"}} >

                </motion.div>

            </motion.div>
            <span className={`text-sm transition-colors ${checked ? "text-green-300" : "text-gray-300"}`}>{label}</span>

        </div>
    )
}

export default topicform
