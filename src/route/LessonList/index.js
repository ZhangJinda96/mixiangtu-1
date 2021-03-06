import React from 'react'
import LessonDetailBlock from '../../components/LessonDetailBlock/index.js'
import './index.css'

export default class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lessons:[]
        }
    }
    componentDidMount(){
        this.handleGetLessonList()
    }

    handleGetLessonList = () => {
        const { id } = this.props.match.params
        var LessonMode = new window.AV.Object.createWithoutData('LessonMode', id);
        var lesson = new window.AV.Query('Lesson');
        lesson.equalTo('lesson_mode', LessonMode);
        lesson.find().then((obj) => {
            console.log("zxxxx", obj)
           
            const lessons = obj.map((res) => {
                return{
                id: res.id,
                lesson_image: res.get('lesson_image').attributes.url,
                lesson_name: res.get('lesson_name'),
                people_count: res.get('people_count'),
                lesson_time: res.get('lesson_time'),
                lesson_detail: res.get('lesson_detail')
                }
            })
            this.setState({
                lessons
            })
});
    }
    render(){
        
        var path_params = this.props.location.query || {};
        return(
            <div className="lesson_page">
                <div className="lesson_name">
                    {path_params.lesson}
                </div>
                <div className="lesson_list">
                {
                    this.state.lessons.map((item, index) => {
                        return(
                            <LessonDetailBlock
                                img={item.lesson_image}
                                key={item.id}
                                id={item.id}
                                lesson_mode_name={path_params.lesson}
                                lesson={item.lesson_name}    
                                teacher={'未知'}
                                type={path_params.type}
                                age={item.lesson_time}
                            >
                            </LessonDetailBlock>
                        )
                    })
                } 
            </div>
            </div>
            
        )
    }
}