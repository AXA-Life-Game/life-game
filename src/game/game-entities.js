import axaLogo from "../assets/axa-logo.svg.png";
import secondPillar from "../assets/events/second-pillar.png";
import threeAInsurance from "../assets/events/three-a-insurance.png";
import buyHouse from "../assets/events/buy-house.png";
import divorce from "../assets/events/divorce.png";
import education from "../assets/events/education.png";
import flooding from "../assets/events/flooding.png";
import getJob from "../assets/events/get-job.png";
import houseInsurance from "../assets/events/house-insurance.png";
import householdLiabilityInsurance from "../assets/events/household-liability-insurance.png";
import jobLoss from "../assets/events/job-loss.png";
import kids from "../assets/events/kids.png";
import lottery from "../assets/events/lottery.png";
import marriage from "../assets/events/marriage.png";
import partTime from "../assets/events/part-time.png";
import randomEvent from "../assets/events/random-event.png";
import rentApartment from "../assets/events/rent-apartment.png";
import robbery from "../assets/events/robbery.png";
import salaryIncrease from "../assets/events/salary-increase.png";
import larry from "../assets/larry-man-blue-walk.png";
import larryJump from "../assets/larry-man-blue-jump.png";
import runningKid from "../assets/pink-man-run-32x32.png";
import idleKid from "../assets/pink-man-idle-32x32.png";
import background from "../assets/background.png";

export function loadEntities() {
  // load assets
  loadSprite("background", background);
  loadSprite("axaLogo", axaLogo);
  loadSprite("secondPillar", secondPillar);
  loadSprite("threeAInsurance", threeAInsurance);
  loadSprite("buyHouse", buyHouse);
  loadSprite("divorce", divorce);
  loadSprite("education", education);
  loadSprite("flooding", flooding);
  loadSprite("getJob", getJob);
  loadSprite("houseInsurance", houseInsurance);
  loadSprite("householdLiabilityInsurance", householdLiabilityInsurance);
  loadSprite("jobLoss", jobLoss);
  loadSprite("kids", kids);
  loadSprite("lottery", lottery);
  loadSprite("marriage", marriage);
  loadSprite("partTime", partTime);
  loadSprite("randomEvent", randomEvent);
  loadSprite("rentApartment", rentApartment);
  loadSprite("robbery", robbery);
  loadSprite("salaryIncrease", salaryIncrease);
  loadSprite("larry", larry, {
    sliceX: 4,
    sliceY: 0,
    anims: {
      run: {
        from: 0,
        to: 3,
        loop: true,
        speed: 15,
      },
    },
  });
  loadSprite("babyLarry", runningKid, {
    sliceX: 12,
    sliceY: 0,
    anims: {
      run: {
        from: 0,
        to: 11,
        loop: true,
        speed: 30,
      },
    },
  });
  loadSprite("idleKid", idleKid, {
    sliceX: 11,
    sliceY: 0,
    anims: {
      idle: {
        from: 0,
        to: 10,
        loop: true,
        speed: 30,
      },
    },
  });
  loadSprite("larryJump", larryJump, {
    sliceX: 2,
    sliceY: 0,
    anims: {
      jump: {
        from: 0,
        to: 1,
        loop: false,
        speed: 15,
      },
    },
  });
  loadSprite("dino", "https://kaboomjs.com/sprites/dino.png");
  loadSprite("mushroom", "https://kaboomjs.com/sprites/mushroom.png");
  loadSprite("ghosty", "https://kaboomjs.com/sprites/ghosty.png");
  loadSprite("spike", "https://kaboomjs.com/sprites/spike.png");
  loadSprite("grass", "https://kaboomjs.com/sprites/grass.png");
  loadSprite("steel", "https://kaboomjs.com/sprites/steel.png");
  loadSprite("prize", "https://kaboomjs.com/sprites/jumpy.png");
  loadSprite("bacon", "https://kaboomjs.com/sprites/meat.png");
  loadSprite("portal", "https://kaboomjs.com/sprites/portal.png");
  loadSprite("coin", "https://kaboomjs.com/sprites/coin.png");
  loadSound("coin", "https://kaboomjs.com/examples/sounds/score.mp3");
  loadSound("powerup", "https://kaboomjs.com/examples/sounds/powerup.mp3");
  loadSound("blip", "https://kaboomjs.com/examples/sounds/blip.mp3");
  loadSound("hit", "https://kaboomjs.com/examples/sounds/hit.mp3");
  loadSound("portal", "https://kaboomjs.com/examples/sounds/portal.mp3");
}
