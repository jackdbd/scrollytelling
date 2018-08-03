/**
 * Steps module.
 * A Step component triggers the updates of a Graphic component.
 * Scrollama uses the Intersection Observer API. In such API, the DOM element
 * observed is called "target". Basically the Step component is the target.
 * Please note that StepA and StepB could be different components, as long as
 * they are wrapped in a ScrollText component.
 *
 * ScrollContainer
 *   ScrollText
 *     StepA
 *     StepB
 *     ...
 *     StepN
 *   ScrollGraphic
 *     Graphic
 * @module /components/Steps
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API|MDN}
 * @see {@link https://github.com/russellgoldenberg/scrollama|Scrollama}
 */
import StepA from "./StepA";
import StepB from "./StepB";

export { StepA, StepB };
