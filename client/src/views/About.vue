<template>
        <transition appear name="fade">

  <v-container>
    <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%; " />
    <!-- <v-flex xs12 sm12 md12> -->
    <!-- <v-flex xs12 sm12 md12> -->
      <h1>About</h1> 
      <div class="totalContent" style="display: flex; flex-direction: column;">
        <div class="topHalf" style="display: flex; width: 100%; justify-content: flex-start;">
          <div class="topHalfContentImages">
            <img
              class="aboutImage"
              src="../assets/image27.jpeg"
              alt="LOGO"
              
            />
            <img
                class="aboutImage"
                src="../assets/image37.jpeg"
                alt="LOGO"
              />
            
          </div>
          <div  class="topHalfContent" style="width:100%; text-align: center;">
            <br />
            <br />
            <p>
              Welcome to
              <strong>Boredom Busters</strong>
              , your number one source for meaningful, innovative, and creative
              off-line activities for children.
            </p>
            <p>
              We’re dedicated to giving you the very best unique and innovative
              activities with great customer service.
            </p>

            <p>
              Founded in 2000, Boredom Busters has grown from humble beginnings
              into a well-loved brand and small home-based family business. When
              I first started out, as a parent of preschoolers, my passion for
              encouraging creativity in children and inspiring other parents to
              do the same, drove me to design a range of activities in kit form,
              using quality materials and supporting other small local
              businesses.
            </p>

            <p>
              Over the years, my experience as an educator at local schools, as
              a homeschooling mom, as well as the opportunity to design and
              facilitate workshops for the Children’s National Arts Festival,
              enabled me to work with large numbers of children from all walks
              of life.
            </p>

            <p>
              In 2007, as a ‘mature student’, I pursued my Master’s degree in
              the science of well-being, Positive Psychology. I graduated with
              distinction and through this enriching journey gained valuable
              knowledge that was vastly beneficial for me as both a parent and
              as the designer of Boredom Busters.
            </p>

            <p>
              These experiences led me to see the creative expression of
              children as a platform for gaining confidence and learning more
              about themselves in a positive way. My children are now young
              adults actively pursuing their passions whilst continuing to be
              involved in all aspects of Boredom Busters.
            </p>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <div>
            <p>
              Today we live in a fast changing, multi-faceted globalized world.
              In a knowledge-driven society, finding a
              <em>mindful</em> balance between the use of technology, social
              media, and hands-on play can be challenging for any family. If you
              are striving to raise creative, resilient, happy kids whose mental
              well-being is a paramount goal in your parenting strategy, you’re
              at the right place. Through our products, Boredom Busters can
              assist you to do just that! Our mission is to make it easier for
              you to help your children flourish by offering you fun and
              engaging activities that encourage:
            </p>
            <br />
            <p>
              <em>• Spending quality time together</em>
            </p>
            <p>
              <em
                >• Developing a growth mindset that builds character strengths
                in your child
              </em>
            </p>
            <p>
              <em>• Bridging the generation gap</em>
            </p>
            <p>
              <em
                >• Creativity that puts an end to those “bored-nothing-to-do”
                days
              </em>
            </p>
            <p>
              <em>• Off-line time that is engaging, meaningful and fun</em>
            </p>
          </div>
          <br />
          <hr />
          <br />
          <div class="topHalf" style="display: flex;">
            <div class="topHalfContent" style="width:100%; text-align: center;">
              <br />
              <br />
              <br />
              <br />
              <p>
                Packaged in 100% re-usable zipper bags or boxes, our products
                come with an informative and age-appropriate introduction, easy
                to follow instructions, and all the supplies necessary to
                complete the activity.
              </p>
              <p>
                We have a limited range of gifts, all handcrafted and designed
                for playtime that inspires your child’s imagination and
                curiosity.
              </p>
              <p>
                These products can also be personalized for an extra special
                gift.
              </p>
              <p>
                We hope you and your children enjoy our products as much as we
                enjoy offering them to you.
              </p>
              <p>
                If you have any questions or comments, please don’t hesitate to
                contact us. Join our Facebook page for updates and inspiring
                tips on parenting.
              </p>
              <p>
                Enjoy browsing our range - we’re sure you’ll find the perfect
                Boredom Busters off-line activity to bring a smile to your
                child’s face.
              </p>
            </div>
            <div class="topHalfContentImages" >
              <img
                class="aboutImage"
                src="../assets/image37.jpeg"
                alt="LOGO"
              />
              <img
              class="aboutImage"
              src="../assets/image27.jpeg"
              alt="LOGO"
              
            />
            </div>
          </div>
        </div>
      </div>
    <!-- </v-flex> -->
  </v-container>
        </transition>

</template>

<style scoped>
p {
  font-size: 115%;
}

.topHalfContentImages {
 width:100%; 
 padding: 20px;   
 margin: 20px;
 display: flex;
 flex-direction: column;
 align-items: center;
 align-content: space-between;
 
}

.aboutImage {
  width:100%;
  /* height: 100%; */
  border: 1px solid black;
  border-radius: 7px;
  margin-bottom: 15px;
}
@media screen and (max-width: 768px) {
  .topHalf {
    flex-direction: column;
    align-items: center;
     padding: 0px;
    margin: 0px;
  }
}

</style>
