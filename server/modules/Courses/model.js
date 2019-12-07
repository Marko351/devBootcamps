import { Schema, model } from 'mongoose';

const CourseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginer', 'intermediate', 'advanced']
  },
  schoolarshipAvailable: {
    type: Boolean,
    default: false
  },
  createfAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: Schema.Types.ObjectId,
    ref: 'bootcamp',
    required: true
  }
});

export default model('courses', CourseSchema);
