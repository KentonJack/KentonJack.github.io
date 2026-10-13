'use strict';
const scenarios = {
  normal: {request:'Receive request',decision:'Create one operation',decisionNote:'Persist identity before execution',outcome:'Confirmed',outcomeNote:'Record the observed result',label:'THE HAPPY PATH',explanation:'A stable request identity connects the internal operation to its external outcome. Confirmation completes the workflow.',pending:false},
  retry: {request:'Receive the same request',decision:'Find the existing operation',decisionNote:'Same identity → same operation',outcome:'Return the known result',outcomeNote:'Do not create another transfer',label:'RETRIES SHOULD BE BORING',explanation:'The request is repeated, but the operation is not. A durable idempotency key lets the workflow return its existing state instead of moving money twice.',pending:false},
  timeout: {request:'External call times out',decision:'Keep the operation pending',decisionNote:'An unknown outcome needs observation',outcome:'Await reconciliation',outcomeNote:'Confirm external state before recovery',label:'UNCERTAINTY IS A STATE',explanation:'A timeout does not tell us whether the transfer happened. Keep the operation pending, reconcile with the external system, and recover only once its outcome is known.',pending:true}
};
const scenarioButtons = document.querySelectorAll('[data-scenario]');
const fields = {'request-label':'request','decision-label':'decision','decision-note':'decisionNote','outcome-label':'outcome','outcome-note':'outcomeNote','explanation-label':'label','explanation-text':'explanation'};
scenarioButtons.forEach(button => button.addEventListener('click', () => {
  const scenario = scenarios[button.dataset.scenario];
  if (!scenario) return;
  scenarioButtons.forEach(item => {const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected));});
  Object.entries(fields).forEach(([id, key]) => {document.getElementById(id).textContent = scenario[key];});
  document.getElementById('result-node').classList.toggle('is-pending', scenario.pending);
}));
document.getElementById('year').textContent = String(new Date().getFullYear());
