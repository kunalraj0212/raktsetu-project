import React from 'react';
import { Quote, Heart } from 'lucide-react';
import './ImpactStories.css';

const stories = [
    {
        id: 1,
        image: '/story_father.png',
        quote: "When my daughter needed O- blood during her surgery, we were panicking. Every blood bank we called was empty. We posted an emergency request on RaktaSetu, and within 20 minutes, 3 verified donors responded. They didn't just give blood; they gave my daughter her future back.",
        author: "Rajesh Kumar",
        role: "Patient's Father",
        location: "Mumbai"
    },
    {
        id: 2,
        image: '/story_donor.png',
        quote: "I used to think donating blood was complicated. RaktaSetu makes it so transparent. I get an alert only when my specific blood type is urgently needed nearby. Knowing exactly where my blood goes and seeing the 'Life Saved' badge on my dashboard gives me immense peace.",
        author: "Priya Sharma",
        role: "Regular Donor (14 Donations)",
        location: "Delhi"
    },
    {
        id: 3,
        image: '/story_doctor.png',
        quote: "As a doctor in a tier-2 city, managing rare blood groups was a nightmare. RaktaSetu completely digitized our inventory tracking and connected us to a state-wide network. Last month alone, this platform helped us source AB- platelets in time for three critical trauma patients.",
        author: "Dr. Anil Desai",
        role: "Chief Medical Officer",
        location: "Pune"
    }
];

const ImpactStories = () => {
    return (
        <section className="impact-section section">
            <div className="container">
                <div className="impact-header">
                    <div className="impact-badge">
                        <Heart size={16} className="text-primary" />
                        <span>Real Impact</span>
                    </div>
                    <h2>Stories of Life and Hope</h2>
                    <p>Behind every data point is a human story. See how RaktaSetu is bridging the gap and saving lives across the country.</p>
                </div>

                <div className="stories-grid">
                    {stories.map(story => (
                        <div key={story.id} className="story-card">
                            <div className="story-image-wrap">
                                <img src={story.image} alt={story.author} className="story-image" />
                                <div className="quote-icon-wrap">
                                    <Quote size={20} />
                                </div>
                            </div>
                            <div className="story-content">
                                <p className="story-quote">"{story.quote}"</p>
                                <div className="story-author-info">
                                    <h4 className="story-author">{story.author}</h4>
                                    <span className="story-role">{story.role}</span>
                                    <span className="story-location">{story.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStories;
