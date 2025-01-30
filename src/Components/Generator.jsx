import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/exercis';


function Header(props){

    const {index,title,description} = props;
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2 justify-center'>
                <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
                <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
            </div>
            <p className='text-sm sm:text-base mx-auto '>{description}</p>
        </div>
    )
}

function Generator() {

    const [showModel,setShowModal] = useState(false);
    const [split,setsplit] = useState('individual');
    const [muscles,setMuscles] = useState([]);
    const [goals,setGoals] = useState('strength_power')



    function toggleModal(){
        setShowModal(!showModel )
    }

    function updateMuscles(musclesGroup){ 

        if(muscles.includes(musclesGroup)){ 
            setMuscles(muscles.filter(val=>val !== musclesGroup))
            return
        }

        if(muscles.length > 3 ){
            return
        }

        if(split != 'individual'){
            setMuscles([musclesGroup])
            setShowModal(false)
            return
        }
        if(muscles.length == 3){
            setShowModal(false);
            return
        }

        setMuscles([...muscles,musclesGroup])

        

    }

    return (
            <SectionWrapper header={"generate your workout"} title={[
                'It\'s', 'HUGE', 'o\'clock'  
            ]}>

                <Header index={'01'} title={'Pick your Split'} 
                description={"Select the workout you wish to enjoy"} />
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 '>
                {Object.keys(WORKOUTS).map((type,typeIndex)=>{
                    return(
                        <button onClick={()=>{
                            setMuscles([])
                            setsplit(type)
                        }} className={'bg-slate-950 border py-3 rounded-lg duration-200 hover:border-blue-600 ' + 
                            (type === split ? 'border-blue-900' : 'border-blue-400' ) }
                        key={typeIndex}>
                            <p className='capitalize'>{type.replaceAll('_'," ")}</p>
                        </button>
                    )
                })}
                </div>

                <Header index={'02'} title={'Lock on targets '} 
                description={"Select the muscles judege"} />
                <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
                    <button onClick={toggleModal} className='relative flex p-3 items-center justify-center'>
                        <p className='capitalize'>{muscles.length ==0 ? 'Select muscles groups' : muscles.join(" ")}</p>
                        <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
                    </button>
                    {showModel && (
                        <div className='flex flex-col p-3 '>
                             {(split === 'individual' ? WORKOUTS[split] : Object.keys(WORKOUTS[split])).map((musclesGroup,musclesGroupIndex)=>{
                                return(
                                    <button onClick={()=>{
                                        updateMuscles(musclesGroup)
                                    }} className={'hover:text-blue-400 duration-200 ' + 
                                    (muscles.includes(musclesGroup) ? "text-blue-400" : '')}>
                                        <p className='uppercase ' key={musclesGroupIndex}>{musclesGroup}</p>
                                    </button>
                                )
                             })}
                        </div>
                    )}
                </div>

                <Header index={'02'} title={'Set your goal'} 
                description={"Select your objective "} />
                <div className='grid grid-cols-3 gap-4 '>
                {Object.keys(SCHEMES).map((scheme,schemeIndex)=>{
                    return(
                        <button onClick={()=>{
                            setGoals(scheme)
                        }} className={'bg-slate-950 border py-3 rounded-lg duration-200 hover:border-blue-600 ' + 
                            (scheme === goals ? 'border-blue-900' : 'border-blue-400' ) }
                        key={schemeIndex}>
                            <p className='capitalize'>{scheme}</p>
                        </button>
                    )
                })}
                </div>
            </SectionWrapper>
    )
}

export default Generator
