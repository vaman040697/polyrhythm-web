class Ball {
   constructor(track, radius, speed, soundFrequency, hue, duration) {
      this.track = track;
      this.radius = radius;
      this.speed = speed;
      this.soundFrequency = soundFrequency;
      this.hue = hue;
      this.offset = 0;
      this.round = 0;
      this.progress = 0;
      this.center = this.track.getPosition(this.offset);
      this.duration = duration;  // Duration in seconds
   }

   move() {
      this.offset += this.speed;
      const res = this.track.getPosition(this.offset);
      this.center = { x: res.x, y: res.y };
      this.progress = res.progress;

      // Check if the ball has completed a round
      if (res.round !== this.round) {
         playSound(this.soundFrequency, this.duration); // Play sound with specified duration
         this.round = res.round;
         // When ball hits the border, change the speed based on the next note's duration
         this.speed = this.calculateSpeedBasedOnDuration(this.duration);
      }
   }

   // Calculate ball speed based on note duration
   calculateSpeedBasedOnDuration(duration) {
      if (duration === 0.5) {
         return 0.02;  // Faster for eighth notes
      } else if (duration === 1) {
         return 0.015;  // Slower for quarter notes
      } else if (duration === 2) {
         return 0.01;   // Even slower for half notes
      }
      return this.speed; // Default speed if not matched
   }

   draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      const lightness = 100 - 50 * this.progress;
      ctx.fillStyle = `hsl(${this.hue}, 100%, ${lightness}%)`;
      ctx.fill();
      ctx.stroke();
   }
}
