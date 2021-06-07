import Block from '@/components/blocks/Block';
import ImageBlock from '@/components/blocks/ImageBlock';
import TitleBlock from '@/components/blocks/TitleBlock';
import ContactInfo from '@/components/contact/ContactInfo';
import Meta from '@/components/Meta';
import ScrollableContainer from '@/components/scrollable-container/ScrollableContainer';
import TheFooter from '@/components/the-footer/TheFooter';

const Home = () => {
  return (
    <>
      <Meta description="Building advanced IT services, native mobile applications and websites. xKern delivers solutions that blend in with our lives ease our tasks." url="/" />

      <ScrollableContainer>
        <TitleBlock
          title="xKern"
          slogan="Vision To Innovation"
          id="home"
        />

        <ImageBlock
          src="/images/home/xkern_logo.png"
          id="image"
          secondary={true}
        >
          <h2>Vision To Innovation</h2>
          <p>
            xKern is a software company that plans to bring about simple but significant changes to how technology is interwoven in everyday life. We intend to pave a foundation of our vision and start building up on it with breakthrough platforms. Our products and services will heavily focus on user experience and accessibility. We strive to become the gold standard of software development with the quality of our software and services.
	 </p>
        </ImageBlock>

        <ImageBlock
          src="/images/home/apps.png"
          id="image3"
          reverse={true}
        >
          <h2>Native Applications</h2>
          <p>
            We build world class applications. We respect the design patterns, hardware and software features and the accessibility options provided by the platform to build applications that feel natural to use.
          </p>
        </ImageBlock>

        <ImageBlock
          src="/images/home/GitHub-Mark.png"
          id="image4"
          secondary={true}
        >
          <h2>Open Source Contributions</h2>
          <p>
            The software and libraries we create will be partially or fully open source for others to refer, learn or contribute.
          </p>
        </ImageBlock>

        <ImageBlock
          src="/images/home/donation.png"
          id="image4"
          reverse={true}
        >
          <h2>Socially Committed</h2>
          <p>
            We make our donations to charities and knowledge sources now and then to keep them running. Our donations are money, effort and knowledge. We believe in foundations that help humans and wildlife survive and thrive.
          </p>
        </ImageBlock>

        <ImageBlock
          src="/images/home/sprout.png"
          id="image5"
          secondary={true}
        >
          <h2>Green Earth</h2>
          <p>
            We plant a tree for every 200,000 INR we make. We have a commitment to our planet. In addition to being as eco-friendly as we can in our operations, we plant trees and nurture them for a better tomorrow. Join us in this mission.
          </p>
        </ImageBlock>

        <Block id="footer" center>
          <div style={{ padding: '3em' }}>
            <h2 className="subtitle">More Soon</h2>
            <p>
              Our projects are in the works. We'll release something  truly remarkable soon enough
            </p>
          </div>
          <TheFooter home />
        </Block>
      </ScrollableContainer>
    </>
  );
};

export default Home;
